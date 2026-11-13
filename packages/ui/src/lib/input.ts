import * as stylex from '@stylexjs/stylex'

// the text input look shared by TextField and Combobox: a wrapper holding the
// input and any slots

// stylex doesn't order these against each other, so wherever one property
// uses more than one of them they must not overlap
const invalid = ':has(input[data-invalid])'
const readOnly =
  ':has(input:is(:disabled, :read-only)):not(:has(input[data-invalid]))'
const autofill =
  ':has(input:autofill):not(:has(input:is(:disabled, :read-only, [data-invalid])))'
const date =
  ':is([type="date"], [type="datetime-local"], [type="time"], [type="week"], [type="month"])'

// ported from radix themes' text-field.css, with solid colors in place of
// alpha ones. the invalid state is ours, for Field
export const input = stylex.create({
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
    '::selection': {
      backgroundColor: 'var(--text-field-selection)',
    },
    alignItems: 'center',
    appearance: {
      ':is([type="number"])': 'textfield',
    },
    backgroundClip: {
      ':autofill': 'text',
    },
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: {
      ':is(:disabled, :read-only)': 'var(--gray-11)',
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
      ':autofill': 'var(--gray-12)',
      ':is(:disabled, :read-only):not(:autofill)': 'var(--gray-11)',
    },
    width: '100%',
  },
  main: {
    '--text-field-focus': {
      [readOnly]: 'var(--gray-8)',
      default: 'var(--accent-8)',
    },
    '--text-field-selection': {
      [readOnly]: 'var(--gray-5)',
      default: 'var(--accent-5)',
    },
    alignItems: 'stretch',
    backgroundClip: 'var(--text-field-clip, border-box)',
    backgroundColor: {
      [autofill]: 'var(--text-field-background-autofill)',
      [invalid]: 'var(--text-field-background-invalid)',
      [readOnly]: 'var(--text-field-background-disabled)',
      default: 'var(--text-field-background)',
    },
    boxShadow: {
      [autofill]: 'var(--text-field-shadow-autofill)',
      [invalid]: 'var(--text-field-shadow-invalid)',
      [readOnly]: 'var(--text-field-shadow-disabled)',
      default: 'var(--text-field-shadow)',
    },
    boxSizing: 'border-box',
    color: 'var(--text-field-color)',
    cursor: 'text',
    display: 'flex',
    fontWeight: '400',
    outline: {
      ':has(input:focus:not([data-invalid]))':
        '2px solid var(--text-field-focus)',
      ':has(input[data-invalid]:focus)': '2px solid var(--red-8)',
      default: 'none',
    },
    outlineOffset: -1,
    padding: 'var(--text-field-border-width)',
    textAlign: 'start',
  },
  slot: {
    alignItems: 'center',
    boxSizing: 'border-box',
    color: 'var(--text-field-slot)',
    cursor: 'text',
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
    '--text-field-background': 'var(--accent-3)',
    '--text-field-background-autofill': 'var(--accent-3)',
    '--text-field-background-disabled': 'var(--gray-3)',
    '--text-field-background-invalid': 'var(--red-3)',
    '--text-field-border-width': '0px',
    '--text-field-color': 'var(--accent-12)',
    '--text-field-placeholder': 'var(--accent-12)',
    '--text-field-placeholder-opacity': '0.6',
    '--text-field-shadow': 'none',
    '--text-field-shadow-autofill':
      'inset 0 0 0 1px var(--accent-5), inset 0 0 0 1px var(--gray-4)',
    '--text-field-shadow-disabled': 'none',
    '--text-field-shadow-invalid': 'none',
    '--text-field-slot': 'var(--accent-12)',
  },
  surface: {
    '--text-field-background': 'var(--gray-1)',
    '--text-field-background-autofill': 'var(--accent-2)',
    '--text-field-background-disabled': 'var(--gray-2)',
    '--text-field-background-invalid': 'var(--gray-1)',
    '--text-field-border-width': '1px',
    '--text-field-clip': 'content-box',
    '--text-field-color': 'var(--gray-12)',
    '--text-field-placeholder': 'var(--gray-10)',
    '--text-field-placeholder-opacity': '1',
    '--text-field-shadow': 'inset 0 0 0 1px var(--gray-7)',
    '--text-field-shadow-autofill':
      'inset 0 0 0 1px var(--accent-5), inset 0 0 0 1px var(--gray-5)',
    '--text-field-shadow-disabled': 'inset 0 0 0 1px var(--gray-6)',
    '--text-field-shadow-invalid': 'inset 0 0 0 1px var(--red-8)',
    '--text-field-slot': 'var(--gray-11)',
  },
})

export const inputSizes = stylex.create({
  1: {
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
