import * as stylex from '@stylexjs/stylex'

// the button trigger shared by Select and Combobox: the selected value and a
// chevron

// stylex doesn't order these against each other, so they must not overlap
const off = ':is([data-disabled])'

const invalid = ':is([data-invalid]:not([data-disabled]))'

const open = ':is([data-popup-open]:not([data-disabled], [data-invalid]))'

// only where hovering is possible, so it doesn't stick after a tap
const hover =
  ':is(:hover:not([data-popup-open], [data-disabled], [data-invalid]))'

// ported from radix themes' select.css. the invalid state is ours, for Field. a ghost trigger is a standard
// one with a transparent background, without radix's negative margins
export const trigger = stylex.create({
  icon: {
    color: 'var(--select-icon)',
    flexShrink: 0,
    opacity: 'var(--select-icon-opacity, 0.9)',
  },
  trigger: {
    '--select-icon': {
      [off]: 'var(--gray-a9)',
      default: 'currentColor',
    },
    // the placeholder look is decided here, where data-placeholder is set, and
    // read by the value inside
    '--trigger-value-color': {
      ':is([data-placeholder])': 'var(--select-placeholder)',
      default: 'inherit',
    },
    '--trigger-value-opacity': {
      ':is([data-placeholder])': 'var(--select-placeholder-opacity)',
      default: '1',
    },
    alignItems: 'center',
    backgroundColor: {
      [invalid]: 'var(--select-background-invalid)',
      [off]: 'var(--select-background-disabled)',
      [hover]: {
        '@media (hover: hover)': 'var(--select-background-hover)',
        default: null,
      },
      [open]: 'var(--select-background-hover)',
      default: 'var(--select-background)',
    },
    boxShadow: {
      [invalid]: 'var(--select-shadow-invalid, none)',
      [off]: 'var(--select-shadow-disabled, none)',
      [hover]: {
        '@media (hover: hover)': 'var(--select-shadow-hover, none)',
        default: null,
      },
      [open]: 'var(--select-shadow-hover, none)',
      default: 'var(--select-shadow, none)',
    },
    color: {
      [off]: 'var(--gray-a11)',
      default: 'var(--select-color)',
    },
    cursor: {
      [off]: 'not-allowed',
      default: 'pointer',
    },
    display: 'inline-flex',
    flexShrink: 0,
    fontWeight: '400',
    justifyContent: 'space-between',
    outline: {
      ':is(:focus-visible:not([data-invalid]))': '2px solid var(--focus-8)',
      ':is([data-invalid]:focus-visible)': '2px solid var(--red-8)',
      default: 'none',
    },
    outlineOffset: -1,
    textAlign: 'start',
    userSelect: 'none',
    verticalAlign: 'top',
  },
  value: {
    color: 'var(--trigger-value-color)',
    opacity: 'var(--trigger-value-opacity)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
})

// variants only set variables, the styles above decide where they apply
export const triggerVariants = stylex.create({
  ghost: {
    '--select-background': 'transparent',
    '--select-background-disabled': 'transparent',
    '--select-background-hover': 'var(--accent-a3)',
    '--select-background-invalid': 'var(--red-a3)',
    '--select-color': 'var(--accent-12)',
    '--select-icon-opacity': '1',
    '--select-placeholder': 'var(--accent-12)',
    '--select-placeholder-opacity': '0.6',
  },
  soft: {
    '--select-background': 'var(--accent-a3)',
    '--select-background-disabled': 'var(--gray-a3)',
    '--select-background-hover': 'var(--accent-a4)',
    '--select-background-invalid': 'var(--red-a3)',
    '--select-color': 'var(--accent-12)',
    '--select-placeholder': 'var(--accent-12)',
    '--select-placeholder-opacity': '0.6',
  },
  surface: {
    '--select-background': 'var(--surface)',
    '--select-background-disabled': 'var(--gray-a2)',
    '--select-background-hover': 'var(--surface)',
    '--select-background-invalid': 'var(--surface)',
    '--select-color': 'var(--gray-12)',
    '--select-placeholder': 'var(--gray-a10)',
    '--select-placeholder-opacity': '1',
    '--select-shadow': 'inset 0 0 0 1px var(--gray-a7)',
    '--select-shadow-disabled': 'inset 0 0 0 1px var(--gray-a6)',
    '--select-shadow-hover': 'inset 0 0 0 1px var(--gray-a8)',
    '--select-shadow-invalid': 'inset 0 0 0 1px var(--red-8)',
  },
})

export const triggerSizes = stylex.create({
  1: {
    borderRadius: 'var(--ui-radius-sm)',
    fontSize: 'var(--ui-text-xs)',
    gap: 'var(--ui-spacing)',
    height: 'calc(var(--ui-spacing) * 6)',
    lineHeight: 'var(--ui-text-xs--line-height)',
    paddingInline: 'calc(var(--ui-spacing) * 2)',
  },
  2: {
    borderRadius: 'var(--ui-radius-md)',
    fontSize: 'var(--ui-text-sm)',
    gap: 'calc(var(--ui-spacing) * 1.5)',
    height: 'calc(var(--ui-spacing) * 8)',
    lineHeight: 'var(--ui-text-sm--line-height)',
    paddingInline: 'calc(var(--ui-spacing) * 3)',
  },
  3: {
    borderRadius: 'var(--ui-radius-lg)',
    fontSize: 'var(--ui-text-base)',
    gap: 'calc(var(--ui-spacing) * 2)',
    height: 'calc(var(--ui-spacing) * 10)',
    lineHeight: 'var(--ui-text-base--line-height)',
    paddingInline: 'calc(var(--ui-spacing) * 4)',
  },
})
