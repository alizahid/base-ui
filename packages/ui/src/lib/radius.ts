import * as stylex from '@stylexjs/stylex'

// biome-ignore assist/source/useSortedKeys: go away
export const radii = stylex.create({
  xs: {
    borderRadius: 'var(--radius-xs)',
  },
  sm: {
    borderRadius: 'var(--radius-sm)',
  },
  md: {
    borderRadius: 'var(--radius-md)',
  },
  lg: {
    borderRadius: 'var(--radius-lg)',
  },
  xl: {
    borderRadius: 'var(--radius-xl)',
  },
  '2xl': {
    borderRadius: 'var(--radius-2xl)',
  },
  '3xl': {
    borderRadius: 'var(--radius-3xl)',
  },
  '4xl': {
    borderRadius: 'var(--radius-4xl)',
  },
  none: {
    borderRadius: 0,
  },
  full: {
    borderRadius: 'calc(infinity * 1px)',
  },
})

export type RadiusToken = keyof typeof radii
