import * as stylex from '@stylexjs/stylex'

// the text input look shared by TextField, TextArea and Combobox: a wrapper
// holding the input and any slots

// stylex doesn't order these against each other, so wherever one property
// uses more than one of them they must not overlap
const invalid = ':has(:is(input, textarea)[data-invalid])'
const readOnly =
  ':has(:is(input, textarea):is(:disabled, :read-only)):not(:has(:is(input, textarea)[data-invalid]))'
const date =
  ':is([type="date"], [type="datetime-local"], [type="time"], [type="week"], [type="month"])'

// ported from radix themes' text-field.css. the invalid state is ours, for Field
export const input = stylex.create({
  // a bare icon button inside the field: clear, open, remove a chip
  action: {
    alignItems: 'center',
    color: {
      ':is([data-disabled])': 'var(--gray-a9)',
      default: null,
    },
    cursor: {
      ':is([data-disabled])': 'not-allowed',
      default: 'pointer',
    },
    display: 'flex',
    opacity: {
      ':hover': {
        '@media (hover: hover)': 1,
        default: null,
      },
      default: 0.9,
    },
    outline: 'none',
  },
  // the edge-side padding gives up the border's width. radix uses a negative
  // margin for this; padding leaves margin free for a consumer's className
  end: {
    paddingInlineEnd:
      'calc(var(--text-field-slot-padding) - var(--text-field-border-width))',
    paddingInlineStart: 'var(--text-field-slot-padding)',
  },
  input: {
    '--text-field-placeholder-opacity': {
      ':is(:disabled, :read-only)': '0.5',
    },
    '::-webkit-inner-spin-button': {
      appearance: 'none',
    },
    '::-webkit-search-cancel-button': {
      appearance: 'none',
    },
    '::placeholder': {
      color: 'var(--text-field-placeholder)',
      opacity: 'var(--text-field-placeholder-opacity)',
    },
    alignItems: 'center',
    appearance: {
      ':is([type="number"])': 'textfield',
    },
    // follows the wrapper's corners, so the browser's autofill tint is clipped
    // to them, but stays square on a side that has a slot
    borderEndEndRadius: {
      ':has(~ [data-side="end"])': 0,
      default: 'inherit',
    },
    borderEndStartRadius: {
      ':has(~ [data-side="start"])': 0,
      default: 'inherit',
    },
    borderStartEndRadius: {
      ':has(~ [data-side="end"])': 0,
      default: 'inherit',
    },
    borderStartStartRadius: {
      ':has(~ [data-side="start"])': 0,
      default: 'inherit',
    },
    color: {
      ':is(:disabled, :read-only)': 'var(--gray-a11)',
      default: null,
    },
    cursor: {
      ':is(:disabled, :read-only):placeholder-shown': 'not-allowed',
      default: 'text',
    },
    display: 'flex',
    minWidth: 0,
    outline: 'none',
    paddingInlineEnd: {
      [`${date}:not(:has(~ [data-side="end"]))`]: 'var(--text-field-padding)',
    },
    paddingInlineStart: {
      [`${date}:not(:has(~ [data-side="start"]))`]: 'var(--text-field-padding)',
    },
    textAlign: 'inherit',
    // the text is inset with an indent rather than padding, unless a slot or
    // a native date control already takes that edge
    textIndent: {
      [`:is(${date}, :has(~ [data-side="start"]))`]: 0,
      default: 'var(--text-field-padding)',
    },
    WebkitTextFillColor: {
      ':is(:disabled, :read-only)': 'var(--gray-a11)',
    },
    width: '100%',
  },
  main: {
    // a slot shows the same cursor as the input next to it
    '--text-field-cursor': {
      ':has(:is(input, textarea):is(:disabled, :read-only):placeholder-shown)':
        'not-allowed',
      default: 'text',
    },
    '--text-field-focus': {
      [readOnly]: 'var(--gray-8)',
      default: 'var(--text-field-focus-color)',
    },
    backgroundClip: 'var(--text-field-clip, border-box)',
    backgroundColor: {
      [invalid]: 'var(--text-field-background-invalid)',
      [readOnly]: 'var(--text-field-background-disabled)',
      default: 'var(--text-field-background)',
    },
    // the read-only tint sits on top of the surface
    backgroundImage: {
      [readOnly]: 'var(--text-field-image-disabled, none)',
    },
    boxShadow: {
      [invalid]: 'var(--text-field-shadow-invalid)',
      [readOnly]: 'var(--text-field-shadow-disabled)',
      default: 'var(--text-field-shadow)',
    },
    color: 'var(--text-field-color)',
    cursor: 'var(--text-field-cursor)',
    display: 'flex',
    fontWeight: '400',
    // set by the sizes of a single-line field. a textarea sets none, and is as
    // tall as its content
    height: 'var(--text-field-height)',
    outline: {
      ':has(:is(input, textarea):focus:not([data-invalid]))':
        '2px solid var(--text-field-focus)',
      ':has(:is(input, textarea)[data-invalid]:focus)':
        '2px solid var(--red-8)',
      default: 'none',
    },
    outlineOffset: -1,
    padding: 'var(--text-field-border-width)',
    textAlign: 'start',
  },
  slot: {
    alignItems: 'center',
    // a `color` on the slot tints it, as in radix
    color: {
      ':is([data-accent])': 'var(--accent-a11)',
      default: 'var(--text-field-slot)',
    },
    cursor: 'var(--text-field-cursor)',
    display: 'flex',
    flexShrink: 0,
    gap: 'var(--text-field-slot-gap)',
  },
  start: {
    order: -1,
    paddingInlineEnd: 'var(--text-field-slot-padding)',
    paddingInlineStart:
      'calc(var(--text-field-slot-padding) - var(--text-field-border-width))',
  },
})

// variants only set variables, the styles above decide where they apply
export const inputVariants = stylex.create({
  // ours: no fill or border until it has focus, for a field inside something
  // that already draws the frame, like a toolbar
  ghost: {
    '--text-field-background': 'transparent',
    '--text-field-background-disabled': 'transparent',
    '--text-field-background-invalid': 'var(--red-a3)',
    '--text-field-border-width': '0px',
    '--text-field-color': 'var(--gray-12)',
    '--text-field-focus-color': 'var(--focus-8)',
    '--text-field-placeholder': 'var(--gray-a10)',
    '--text-field-placeholder-opacity': '1',
    '--text-field-shadow': 'none',
    '--text-field-shadow-disabled': 'none',
    '--text-field-shadow-invalid': 'none',
    '--text-field-slot': 'var(--gray-a11)',
  },
  soft: {
    '--text-field-background': 'var(--accent-a3)',
    '--text-field-background-disabled': 'var(--gray-a3)',
    '--text-field-background-invalid': 'var(--red-a3)',
    '--text-field-border-width': '0px',
    '--text-field-color': 'var(--accent-12)',
    '--text-field-focus-color': 'var(--focus-8)',
    '--text-field-placeholder': 'var(--accent-12)',
    '--text-field-placeholder-opacity': '0.6',
    '--text-field-shadow': 'none',
    '--text-field-shadow-disabled': 'none',
    '--text-field-shadow-invalid': 'none',
    '--text-field-slot': 'var(--accent-12)',
  },
  surface: {
    '--text-field-background': 'var(--surface)',
    '--text-field-background-disabled': 'var(--surface)',
    '--text-field-background-invalid': 'var(--surface)',
    '--text-field-border-width': '1px',
    '--text-field-clip': 'content-box',
    '--text-field-color': 'var(--gray-12)',
    '--text-field-focus-color': 'var(--focus-8)',
    '--text-field-image-disabled':
      'linear-gradient(var(--gray-a2), var(--gray-a2))',
    '--text-field-placeholder': 'var(--gray-a10)',
    '--text-field-placeholder-opacity': '1',
    '--text-field-shadow': 'inset 0 0 0 1px var(--gray-a7)',
    '--text-field-shadow-disabled': 'inset 0 0 0 1px var(--gray-a6)',
    '--text-field-shadow-invalid': 'inset 0 0 0 1px var(--red-8)',
    '--text-field-slot': 'var(--gray-a11)',
  },
})

export const inputSizes = stylex.create({
  1: {
    '--text-field-height': 'calc(var(--ui-spacing) * 6)',
    '--text-field-padding':
      'calc(var(--ui-spacing) * 1.5 - var(--text-field-border-width))',
    '--text-field-slot-gap': 'calc(var(--ui-spacing) * 2)',
    '--text-field-slot-padding': 'var(--ui-spacing)',
    borderRadius: 'var(--ui-radius-sm)',
    fontSize: 'var(--ui-text-xs)',
    lineHeight: 'var(--ui-text-xs--line-height)',
  },
  2: {
    '--text-field-height': 'calc(var(--ui-spacing) * 8)',
    '--text-field-padding':
      'calc(var(--ui-spacing) * 2 - var(--text-field-border-width))',
    '--text-field-slot-gap': 'calc(var(--ui-spacing) * 2)',
    '--text-field-slot-padding': 'calc(var(--ui-spacing) * 2)',
    borderRadius: 'var(--ui-radius-sm)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
  3: {
    '--text-field-height': 'calc(var(--ui-spacing) * 10)',
    '--text-field-padding':
      'calc(var(--ui-spacing) * 3 - var(--text-field-border-width))',
    '--text-field-slot-gap': 'calc(var(--ui-spacing) * 3)',
    '--text-field-slot-padding': 'calc(var(--ui-spacing) * 3)',
    borderRadius: 'var(--ui-radius-md)',
    fontSize: 'var(--ui-text-base)',
    lineHeight: 'var(--ui-text-base--line-height)',
  },
})

// ported from radix themes' text-area.css. the wrapper is `input.main`
export const textArea = stylex.create({
  // grows with its content, up to a max-height on the wrapper. browsers
  // without field-sizing keep the wrapper's height and scroll
  autoResize: {
    fieldSizing: 'content',
  },
  main: {
    '--text-field-placeholder-opacity': {
      ':is(:disabled, :read-only)': '0.5',
    },
    '::placeholder': {
      color: 'var(--text-field-placeholder)',
      opacity: 'var(--text-field-placeholder-opacity)',
    },
    borderRadius: 'inherit',
    color: {
      ':is(:disabled, :read-only)': 'var(--gray-a11)',
      default: null,
    },
    // an arrow over the scrollbar
    cursor: {
      ':is(:disabled, :read-only):placeholder-shown': 'not-allowed',
      default: 'auto',
    },
    display: 'block',
    flexGrow: 1,
    // lets it shrink and scroll under a max-height on the wrapper
    minHeight: 0,
    minWidth: 0,
    outline: 'none',
    paddingBlock: 'var(--text-area-padding-y)',
    // a slot brings its own padding on its side
    paddingInlineEnd: {
      ':has(~ [data-side="end"])': 0,
      default: 'var(--text-field-padding)',
    },
    paddingInlineStart: {
      ':has(~ [data-side="start"])': 0,
      default: 'var(--text-field-padding)',
    },
    resize: 'none',
    textAlign: 'inherit',
    WebkitTextFillColor: {
      ':is(:disabled, :read-only)': 'var(--gray-a11)',
    },
    width: '100%',
  },
  // sits beside the first line and stays there while the text scrolls. a
  // consumer's className can align it elsewhere
  slot: {
    alignSelf: 'flex-start',
    minHeight: 'calc(1lh + var(--text-area-padding-y) * 2)',
  },
})

export const textAreaSizes = stylex.create({
  1: {
    '--text-area-padding-y':
      'calc(var(--ui-spacing) - var(--text-field-border-width))',
    '--text-field-padding':
      'calc(var(--ui-spacing) * 1.5 - var(--text-field-border-width))',
    '--text-field-slot-gap': 'calc(var(--ui-spacing) * 2)',
    '--text-field-slot-padding': 'var(--ui-spacing)',
    borderRadius: 'var(--ui-radius-sm)',
    fontSize: 'var(--ui-text-xs)',
    lineHeight: 'var(--ui-text-xs--line-height)',
    minHeight: 'calc(var(--ui-spacing) * 10)',
  },
  2: {
    '--text-area-padding-y':
      'calc(var(--ui-spacing) * 1.5 - var(--text-field-border-width))',
    '--text-field-padding':
      'calc(var(--ui-spacing) * 2 - var(--text-field-border-width))',
    '--text-field-slot-gap': 'calc(var(--ui-spacing) * 2)',
    '--text-field-slot-padding': 'calc(var(--ui-spacing) * 2)',
    borderRadius: 'var(--ui-radius-sm)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
    minHeight: 'calc(var(--ui-spacing) * 16)',
  },
  3: {
    '--text-area-padding-y':
      'calc(var(--ui-spacing) * 2 - var(--text-field-border-width))',
    '--text-field-padding':
      'calc(var(--ui-spacing) * 3 - var(--text-field-border-width))',
    '--text-field-slot-gap': 'calc(var(--ui-spacing) * 3)',
    '--text-field-slot-padding': 'calc(var(--ui-spacing) * 3)',
    borderRadius: 'var(--ui-radius-md)',
    fontSize: 'var(--ui-text-base)',
    lineHeight: 'var(--ui-text-base--line-height)',
    minHeight: 'calc(var(--ui-spacing) * 20)',
  },
})
