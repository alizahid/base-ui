import * as stylex from '@stylexjs/stylex'

export type ControlProps = {
  highContrast?: boolean
  size?: '1' | '2' | '3'
  variant?: 'surface' | 'soft'
}

const on = ':is([data-checked], [data-indeterminate])'
const disabled = ':is([data-disabled])'

export const control = stylex.create({
  main: {
    alignItems: 'center',
    backgroundColor: {
      [on]: 'var(--control-background-checked, var(--accent-9))',
      default: 'var(--control-background, var(--gray-1))',
    },
    boxShadow: {
      [on]: 'none',
      default: 'inset 0 0 0 1px var(--control-border, var(--gray-7))',
    },
    color: 'var(--control-indicator, var(--accent-contrast))',
    cursor: {
      [disabled]: 'not-allowed',
      default: 'pointer',
    },
    display: 'inline-flex',
    filter: {
      [disabled]: 'grayscale(1)',
    },
    flexShrink: 0,
    height: 'var(--control-size, calc(var(--spacing) * 4))',
    justifyContent: 'center',
    opacity: {
      [disabled]: 0.6,
    },
    outline: {
      ':focus-visible': '2px solid var(--accent-8)',
      default: 'none',
    },
    outlineOffset: 2,
    width: 'var(--control-size, calc(var(--spacing) * 4))',
  },
})

export const controlVariants = stylex.create({
  soft: {
    '--control-background': 'var(--accent-4)',
    '--control-background-checked': 'var(--accent-4)',
    '--control-border': 'transparent',
    '--control-contrast-background-checked': 'var(--accent-4)',
    '--control-contrast-indicator': 'var(--accent-12)',
    '--control-indicator': 'var(--accent-11)',
  },
  surface: {
    '--control-background': 'var(--gray-1)',
    '--control-background-checked': 'var(--accent-9)',
    '--control-border': 'var(--gray-7)',
    '--control-contrast-background-checked': 'var(--accent-12)',
    '--control-contrast-indicator': 'var(--gray-1)',
    '--control-indicator': 'var(--accent-contrast)',
  },
})

export const controlContrast = stylex.create({
  main: {
    '--control-background-checked':
      'var(--control-contrast-background-checked, var(--accent-12))',
    '--control-indicator': 'var(--control-contrast-indicator, var(--gray-1))',
  },
})

export const controlSizes = stylex.create({
  1: {
    '--control-font-size': 'var(--text-xs)',
    '--control-gap': 'calc(var(--spacing) * 1.5)',
    '--control-line-height': 'var(--text-xs--line-height)',
    '--control-radius': 'var(--radius-xs)',
    '--control-size': 'calc(var(--spacing) * 3.5)',
  },
  2: {
    '--control-font-size': 'var(--text-sm)',
    '--control-gap': 'calc(var(--spacing) * 2)',
    '--control-line-height': 'var(--text-sm--line-height)',
    '--control-radius': 'var(--radius-sm)',
    '--control-size': 'calc(var(--spacing) * 4)',
  },
  3: {
    '--control-font-size': 'var(--text-base)',
    '--control-gap': 'calc(var(--spacing) * 2)',
    '--control-line-height': 'var(--text-base--line-height)',
    '--control-radius': 'var(--radius-sm)',
    '--control-size': 'calc(var(--spacing) * 5)',
  },
})

export const group = stylex.create({
  item: {
    alignItems: 'center',
    color: 'var(--gray-12)',
    cursor: {
      ':has([data-disabled])': 'not-allowed',
      default: 'pointer',
    },
    display: 'flex',
    fontSize: 'var(--control-font-size, var(--text-sm))',
    gap: 'var(--control-gap, calc(var(--spacing) * 2))',
    lineHeight: 'var(--control-line-height, var(--text-sm--line-height))',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'calc(var(--spacing) * 2)',
  },
})

export function controlStyles({ highContrast, size, variant }: ControlProps) {
  return [
    variant && controlVariants[variant],
    highContrast && controlContrast.main,
    size && controlSizes[size],
  ]
}
