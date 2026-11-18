import * as stylex from '@stylexjs/stylex'

// each also names its radius, for what sits inside to work its own out from
// biome-ignore assist/source/useSortedKeys: go away
export const radii = stylex.create({
  xs: {
    '--outer-radius': 'var(--ui-radius-xs)',
    borderRadius: 'var(--ui-radius-xs)',
  },
  sm: {
    '--outer-radius': 'var(--ui-radius-sm)',
    borderRadius: 'var(--ui-radius-sm)',
  },
  md: {
    '--outer-radius': 'var(--ui-radius-md)',
    borderRadius: 'var(--ui-radius-md)',
  },
  lg: {
    '--outer-radius': 'var(--ui-radius-lg)',
    borderRadius: 'var(--ui-radius-lg)',
  },
  xl: {
    '--outer-radius': 'var(--ui-radius-xl)',
    borderRadius: 'var(--ui-radius-xl)',
  },
  '2xl': {
    '--outer-radius': 'var(--ui-radius-2xl)',
    borderRadius: 'var(--ui-radius-2xl)',
  },
  '3xl': {
    '--outer-radius': 'var(--ui-radius-3xl)',
    borderRadius: 'var(--ui-radius-3xl)',
  },
  '4xl': {
    '--outer-radius': 'var(--ui-radius-4xl)',
    borderRadius: 'var(--ui-radius-4xl)',
  },
  none: {
    '--outer-radius': '0px',
    borderRadius: 0,
  },
  full: {
    '--outer-radius': 'calc(infinity * 1px)',
    borderRadius: 'calc(infinity * 1px)',
  },
})

export type RadiusToken = keyof typeof radii
