import * as stylex from '@stylexjs/stylex'

// the text input look shared by TextField, TextArea and Combobox: a wrapper
// holding the input and any slots

// stylex doesn't order these against each other, so wherever one property
// uses more than one of them they must not overlap
const invalid = ':has(:is(input, textarea)[data-invalid])'
const readOnly =
  ':has(:is(input, textarea):is(:disabled, :read-only)):not(:has(:is(input, textarea)[data-invalid]))'
// 1password marks the fields it fills with its own attribute
const autofill =
  ':has(:is(input, textarea):is(:autofill, [data-com-onepassword-filled])):not(:has(:is(input, textarea):is(:disabled, :read-only, [data-invalid])))'
const date =
  ':is([type="date"], [type="datetime-local"], [type="time"], [type="week"], [type="month"])'

// ported from radix themes' text-field.css. the invalid state is ours, for Field
export const input = stylex.create({
  // the edge-side padding gives up the border's width. radix uses a negative
  // margin for this; padding leaves margin free for a consumer's className
  end: {
    paddingInlineEnd:
      'calc(var(--text-field-slot-padding) - var(--text-field-border-width))',
    paddingInlineStart: 'var(--text-field-slot-padding)',
  },
  input: {
    '--text-field-picker-margin': {
      ':is([type="time"])': '0px',
      default: 'var(--spacing)',
    },
    '--text-field-placeholder-opacity': {
      ':is(:disabled, :read-only)': '0.5',
    },
    // the native date and time picker button
    '::-webkit-calendar-picker-indicator': {
      borderRadius: 'var(--radius-sm)',
      boxSizing: 'content-box',
      height: 'var(--text-field-native-icon-size)',
      marginInlineEnd: 'calc(var(--spacing) * -1)',
      marginInlineStart: 'var(--text-field-picker-margin)',
      padding: 'var(--spacing)',
      width: 'var(--text-field-native-icon-size)',
    },
    '::-webkit-inner-spin-button': {
      appearance: 'none',
    },
    '::-webkit-search-cancel-button': {
      appearance: 'none',
    },
    // safari's credentials and contacts autofill button
    '::-webkit-textfield-decoration-container': {
      marginRight: 'var(--text-field-decoration-margin)',
      paddingRight: 'var(--text-field-decoration-padding)',
    },
    '::placeholder': {
      color: 'var(--text-field-placeholder)',
      opacity: 'var(--text-field-placeholder-opacity)',
    },
    '::selection': {
      backgroundColor: 'var(--text-field-selection)',
    },
    alignItems: 'center',
    appearance: {
      ':is([type="number"])': 'textfield',
    },
    backgroundClip: {
      ':is(:autofill, [data-com-onepassword-filled])': 'text',
    },
    backgroundColor: 'transparent',
    // follows the wrapper's corners, so an autofill tint is clipped to them,
    // but stays square on a side that has a slot
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
    borderStyle: 'none',
    color: {
      ':is(:disabled, :read-only)': 'var(--gray-a11)',
      default: 'inherit',
    },
    cursor: {
      ':is(:disabled, :read-only):placeholder-shown': 'not-allowed',
      default: 'text',
    },
    display: 'flex',
    font: 'inherit',
    minWidth: 0,
    outline: 'none',
    padding: 0,
    // radix nudges the size 2 text down half a pixel
    paddingBlockEnd: 'var(--text-field-nudge, 0px)',
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
      ':is(:autofill, [data-com-onepassword-filled]):not(:disabled, :read-only)':
        'var(--gray-12)',
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
    '--text-field-selection': {
      [readOnly]: 'var(--gray-a5)',
      default: 'var(--text-field-selection-color)',
    },
    '::selection': {
      backgroundColor: 'var(--text-field-selection)',
    },
    alignItems: 'stretch',
    backgroundClip: 'var(--text-field-clip, border-box)',
    backgroundColor: {
      [autofill]: 'var(--text-field-background-autofill)',
      [invalid]: 'var(--text-field-background-invalid)',
      [readOnly]: 'var(--text-field-background-disabled)',
      default: 'var(--text-field-background)',
    },
    // surface tints for autofill and read-only sit on top of the surface
    backgroundImage: {
      [autofill]: 'var(--text-field-image-autofill, none)',
      [readOnly]: 'var(--text-field-image-disabled, none)',
    },
    boxShadow: {
      [autofill]: 'var(--text-field-shadow-autofill)',
      [invalid]: 'var(--text-field-shadow-invalid)',
      [readOnly]: 'var(--text-field-shadow-disabled)',
      default: 'var(--text-field-shadow)',
    },
    boxSizing: 'border-box',
    color: 'var(--text-field-color)',
    cursor: 'var(--text-field-cursor)',
    display: 'flex',
    fontWeight: '400',
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
    boxSizing: 'border-box',
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
  soft: {
    '--text-field-background': 'var(--accent-a3)',
    '--text-field-background-autofill': 'var(--accent-a3)',
    '--text-field-background-disabled': 'var(--gray-a3)',
    '--text-field-background-invalid': 'var(--red-a3)',
    '--text-field-border-width': '0px',
    '--text-field-color': 'var(--accent-12)',
    '--text-field-focus-color': 'var(--focus-8)',
    '--text-field-placeholder': 'var(--accent-12)',
    '--text-field-placeholder-opacity': '0.6',
    '--text-field-selection-color': 'var(--accent-a5)',
    '--text-field-shadow': 'none',
    '--text-field-shadow-autofill':
      'inset 0 0 0 1px var(--accent-a5), inset 0 0 0 1px var(--gray-a4)',
    '--text-field-shadow-disabled': 'none',
    '--text-field-shadow-invalid': 'none',
    '--text-field-slot': 'var(--accent-12)',
  },
  surface: {
    '--text-field-background': 'var(--surface)',
    '--text-field-background-autofill': 'var(--surface)',
    '--text-field-background-disabled': 'var(--surface)',
    '--text-field-background-invalid': 'var(--surface)',
    '--text-field-border-width': '1px',
    '--text-field-clip': 'content-box',
    '--text-field-color': 'var(--gray-12)',
    '--text-field-focus-color': 'var(--focus-8)',
    '--text-field-image-autofill':
      'linear-gradient(var(--focus-a2), var(--focus-a2))',
    '--text-field-image-disabled':
      'linear-gradient(var(--gray-a2), var(--gray-a2))',
    '--text-field-placeholder': 'var(--gray-a10)',
    '--text-field-placeholder-opacity': '1',
    '--text-field-selection-color': 'var(--focus-a5)',
    '--text-field-shadow': 'inset 0 0 0 1px var(--gray-a7)',
    '--text-field-shadow-autofill':
      'inset 0 0 0 1px var(--focus-a5), inset 0 0 0 1px var(--gray-a5)',
    '--text-field-shadow-disabled': 'inset 0 0 0 1px var(--gray-a6)',
    '--text-field-shadow-invalid': 'inset 0 0 0 1px var(--red-8)',
    '--text-field-slot': 'var(--gray-a11)',
  },
})

export const inputSizes = stylex.create({
  1: {
    '--text-field-decoration-margin': '-2px',
    '--text-field-decoration-padding': '0px',
    '--text-field-native-icon-size': 'calc(var(--spacing) * 3)',
    '--text-field-padding':
      'calc(var(--spacing) * 1.5 - var(--text-field-border-width))',
    '--text-field-slot-gap': 'calc(var(--spacing) * 2)',
    '--text-field-slot-padding': 'var(--spacing)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-xs)',
    height: 'calc(var(--spacing) * 6)',
    lineHeight: 'var(--text-xs--line-height)',
  },
  2: {
    '--text-field-decoration-margin': '0px',
    '--text-field-decoration-padding': '2px',
    '--text-field-native-icon-size': 'calc(var(--spacing) * 4)',
    '--text-field-nudge': '0.5px',
    '--text-field-padding':
      'calc(var(--spacing) * 2 - var(--text-field-border-width))',
    '--text-field-slot-gap': 'calc(var(--spacing) * 2)',
    '--text-field-slot-padding': 'calc(var(--spacing) * 2)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--text-sm)',
    height: 'calc(var(--spacing) * 8)',
    lineHeight: 'var(--text-sm--line-height)',
  },
  3: {
    '--text-field-decoration-margin': '0px',
    '--text-field-decoration-padding': '5px',
    '--text-field-native-icon-size': 'calc(var(--spacing) * 4)',
    '--text-field-padding':
      'calc(var(--spacing) * 3 - var(--text-field-border-width))',
    '--text-field-slot-gap': 'calc(var(--spacing) * 3)',
    '--text-field-slot-padding': 'calc(var(--spacing) * 3)',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--text-base)',
    height: 'calc(var(--spacing) * 10)',
    lineHeight: 'var(--text-base--line-height)',
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
    '::-webkit-scrollbar': {
      height: 'calc(var(--spacing) * 3)',
      width: 'calc(var(--spacing) * 3)',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundClip: 'content-box',
      backgroundColor: 'var(--gray-a8)',
      borderColor: 'transparent',
      borderRadius: 'calc(var(--spacing) * 3)',
      borderStyle: 'solid',
      borderWidth: 'var(--spacing)',
    },
    '::-webkit-scrollbar-track': {
      backgroundClip: 'content-box',
      backgroundColor: 'var(--gray-a3)',
      borderColor: 'transparent',
      borderRadius: 'calc(var(--spacing) * 3)',
      borderStyle: 'solid',
      borderWidth: 'var(--spacing)',
    },
    '::placeholder': {
      color: 'var(--text-field-placeholder)',
      opacity: 'var(--text-field-placeholder-opacity)',
    },
    '::selection': {
      backgroundColor: 'var(--text-field-selection)',
    },
    backgroundClip: {
      ':is(:autofill, [data-com-onepassword-filled])': 'text',
    },
    backgroundColor: 'transparent',
    borderRadius: 'inherit',
    borderStyle: 'none',
    color: {
      ':is(:disabled, :read-only)': 'var(--gray-a11)',
      default: 'inherit',
    },
    // an arrow over the scrollbar
    cursor: {
      ':is(:disabled, :read-only):placeholder-shown': 'not-allowed',
      default: 'auto',
    },
    display: 'block',
    flexGrow: 1,
    font: 'inherit',
    // lets it shrink and scroll under a max-height on the wrapper
    minHeight: 0,
    minWidth: 0,
    outline: 'none',
    paddingBlock: 'var(--text-area-padding-y)',
    // a slot brings its own padding on its side
    paddingInlineEnd: {
      ':has(~ [data-side="end"])': 0,
      default: 'var(--text-area-padding-x)',
    },
    paddingInlineStart: {
      ':has(~ [data-side="start"])': 0,
      default: 'var(--text-area-padding-x)',
    },
    resize: 'none',
    textAlign: 'inherit',
    WebkitTextFillColor: {
      ':is(:autofill, [data-com-onepassword-filled]):not(:disabled, :read-only)':
        'var(--gray-12)',
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
    '--text-area-padding-x':
      'calc(var(--spacing) * 1.5 - var(--text-field-border-width))',
    '--text-area-padding-y':
      'calc(var(--spacing) - var(--text-field-border-width))',
    '--text-field-slot-gap': 'calc(var(--spacing) * 2)',
    '--text-field-slot-padding': 'var(--spacing)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-xs)',
    lineHeight: 'var(--text-xs--line-height)',
    minHeight: 'calc(var(--spacing) * 10)',
  },
  2: {
    '--text-area-padding-x':
      'calc(var(--spacing) * 2 - var(--text-field-border-width))',
    '--text-area-padding-y':
      'calc(var(--spacing) * 1.5 - var(--text-field-border-width))',
    '--text-field-slot-gap': 'calc(var(--spacing) * 2)',
    '--text-field-slot-padding': 'calc(var(--spacing) * 2)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--text-sm)',
    lineHeight: 'var(--text-sm--line-height)',
    minHeight: 'calc(var(--spacing) * 16)',
  },
  3: {
    '--text-area-padding-x':
      'calc(var(--spacing) * 3 - var(--text-field-border-width))',
    '--text-area-padding-y':
      'calc(var(--spacing) * 2 - var(--text-field-border-width))',
    '--text-field-slot-gap': 'calc(var(--spacing) * 3)',
    '--text-field-slot-padding': 'calc(var(--spacing) * 3)',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--text-base)',
    lineHeight: 'var(--text-base--line-height)',
    minHeight: 'calc(var(--spacing) * 20)',
  },
})
