import * as stylex from '@stylexjs/stylex'

// biome-ignore assist/source/useSortedKeys: go away
export const radii = stylex.create({
  xs: {
    borderRadius: 'var(--ui-radius-xs)',
  },
  sm: {
    borderRadius: 'var(--ui-radius-sm)',
  },
  md: {
    borderRadius: 'var(--ui-radius-md)',
  },
  lg: {
    borderRadius: 'var(--ui-radius-lg)',
  },
  xl: {
    borderRadius: 'var(--ui-radius-xl)',
  },
  '2xl': {
    borderRadius: 'var(--ui-radius-2xl)',
  },
  '3xl': {
    borderRadius: 'var(--ui-radius-3xl)',
  },
  '4xl': {
    borderRadius: 'var(--ui-radius-4xl)',
  },
  none: {
    borderRadius: 0,
  },
  full: {
    borderRadius: 'calc(infinity * 1px)',
  },
})

export type RadiusToken = keyof typeof radii
