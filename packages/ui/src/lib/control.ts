import * as stylex from '@stylexjs/stylex'

// styles shared by Checkbox, Radio and their groups.
//
// everything a group can set for its items is a css variable, so it cascades
// from the group's Root with no js. a prop on a single control sets the same
// variables on that control, which beats the inherited ones. the fallbacks in
// `control.main` are the defaults: size 2, surface

export type ControlProps = {
  highContrast?: boolean
  size?: '1' | '2' | '3'
  variant?: 'surface' | 'soft'
}

// stylex doesn't order these against each other, so they must not overlap
const on = ':is(:is([data-checked], [data-indeterminate]):not([data-disabled]))'
const disabled = ':is([data-disabled])'

// ported from radix themes' base-checkbox.css and base-radio.css

export const control = stylex.create({
  main: {
    alignItems: 'center',
    backgroundColor: {
      [disabled]: 'var(--gray-a3)',
      [on]: 'var(--control-background-checked, var(--accent-indicator))',
      default: 'var(--control-background, var(--surface))',
    },
    boxShadow: {
      [disabled]:
        'inset 0 0 0 1px var(--control-border-disabled, var(--gray-a6))',
      [on]: 'none',
      default: 'inset 0 0 0 1px var(--control-border, var(--gray-a7))',
    },
    color: {
      [disabled]: 'var(--gray-a8)',
      default: 'var(--control-indicator, var(--accent-contrast))',
    },
    cursor: {
      [disabled]: 'not-allowed',
      default: 'pointer',
    },
    display: 'inline-flex',
    flexShrink: 0,
    height: 'var(--control-size, calc(var(--ui-spacing) * 4))',
    justifyContent: 'center',
    // in a group item this centres the control on the first line of text
    marginBlock: 'var(--control-offset, 0px)',
    outline: {
      ':focus-visible': '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: 2,
    position: 'relative',
    verticalAlign: 'top',
    width: 'var(--control-size, calc(var(--ui-spacing) * 4))',
  },
})

// variants only set variables. each also carries its high contrast values,
// which `controlContrast` swaps in
export const controlVariants = stylex.create({
  soft: {
    '--control-background': 'var(--accent-a5)',
    '--control-background-checked': 'var(--accent-a5)',
    '--control-border': 'transparent',
    '--control-border-disabled': 'transparent',
    '--control-contrast-background-checked': 'var(--accent-a5)',
    '--control-contrast-indicator': 'var(--accent-12)',
    '--control-indicator': 'var(--accent-a11)',
  },
  surface: {
    '--control-background': 'var(--surface)',
    '--control-background-checked': 'var(--accent-indicator)',
    '--control-border': 'var(--gray-a7)',
    '--control-border-disabled': 'var(--gray-a6)',
    '--control-contrast-background-checked': 'var(--accent-12)',
    '--control-contrast-indicator': 'var(--accent-1)',
    '--control-indicator': 'var(--accent-contrast)',
  },
})

// switches to the contrast values of whichever variant is in effect, even one
// inherited from a group. the fallbacks are surface's
export const controlContrast = stylex.create({
  main: {
    '--control-background-checked':
      'var(--control-contrast-background-checked, var(--accent-12))',
    '--control-indicator': 'var(--control-contrast-indicator, var(--accent-1))',
  },
})

// the font size and line height are for the label text in a group item
export const controlSizes = stylex.create({
  1: {
    '--control-font-size': 'var(--ui-text-xs)',
    '--control-line-height': 'var(--ui-text-xs--line-height)',
    '--control-radius': 'var(--ui-radius-xs)',
    '--control-size': 'calc(var(--ui-spacing) * 3.5)',
  },
  2: {
    '--control-font-size': 'var(--ui-text-sm)',
    '--control-line-height': 'var(--ui-text-sm--line-height)',
    '--control-radius': 'var(--ui-radius-sm)',
    '--control-size': 'calc(var(--ui-spacing) * 4)',
  },
  3: {
    '--control-font-size': 'var(--ui-text-base)',
    '--control-line-height': 'var(--ui-text-base--line-height)',
    '--control-radius': 'var(--ui-radius-sm)',
    '--control-size': 'calc(var(--ui-spacing) * 5)',
  },
})

// `main` is a group's Root, `item` the label around a control and its text
export const group = stylex.create({
  // the control sits on the first line of the label, however many lines the
  // text runs to. `lh` is resolved on the control, which inherits the label's
  // line height
  item: {
    '--control-offset':
      'calc((1lh - var(--control-size, calc(var(--ui-spacing) * 4))) / 2)',
    alignItems: 'flex-start',
    cursor: {
      ':has([data-disabled])': 'not-allowed',
      default: 'pointer',
    },
    display: 'flex',
    fontSize: 'var(--control-font-size, var(--ui-text-sm))',
    gap: 'calc(var(--ui-spacing) * 2)',
    lineHeight: 'var(--control-line-height, var(--ui-text-sm--line-height))',
    width: 'fit-content',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ui-spacing)',
  },
  text: {
    minWidth: 0,
  },
})

// the variable classes for whichever of these props were actually passed, so
// anything left out keeps inheriting
export function controlStyles({ highContrast, size, variant }: ControlProps) {
  return [
    variant && controlVariants[variant],
    highContrast && controlContrast.main,
    size && controlSizes[size],
  ]
}
