import * as stylex from '@stylexjs/stylex'

// shared by Tabs and TabNav, which look the same: the root's options only set
// variables, and the list and the tabs read them through the cascade

// stylex doesn't order these against each other, so they must not overlap
const active = ':is([data-active]:not([data-disabled]))'
const disabled = ':is([data-disabled])'
const hover = ':is(:hover:not([data-active], [data-disabled]))'

export const tabs = stylex.create({
  contrast: {
    '--tabs-indicator': 'var(--accent-12)',
  },
  list: {
    // the baseline the indicator sits on
    boxShadow: 'inset 0 -2px 0 var(--gray-a4)',
    display: 'flex',
    gap: 'var(--tabs-gap)',
    position: 'relative',
  },
  tab: {
    // the focus ring. a tab has no inline padding, so the ring is drawn on a
    // box that reaches into the gap on either side, and the text gets room
    '::before': {
      borderRadius: 'var(--radius-sm)',
      content: {
        ':is(:focus-visible)': '""',
        default: 'none',
      },
      inset: '0 calc(var(--spacing) * -2)',
      outline: '2px solid var(--focus-8)',
      outlineOffset: -2,
      pointerEvents: 'none',
      position: 'absolute',
    },
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 'var(--radius-sm)',
    borderStyle: 'none',
    color: {
      [active]: 'var(--gray-12)',
      [disabled]: 'var(--gray-a8)',
      [hover]: {
        '@media (hover: hover)': 'var(--gray-12)',
        default: null,
      },
      default: 'var(--gray-a11)',
    },
    cursor: {
      [disabled]: 'not-allowed',
      default: 'pointer',
    },
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    font: 'inherit',
    gap: 'var(--tabs-tab-gap)',
    outline: 'none',
    paddingBlock: 'var(--tabs-padding)',
    paddingInline: 0,
    position: 'relative',
    // for a tab rendered as a link
    textDecoration: 'none',
    userSelect: 'none',
    // heavier text for the active tab without changing its width, which
    // would move the tabs after it
    WebkitTextStrokeColor: 'currentColor',
    WebkitTextStrokeWidth: {
      [active]: '0.35px',
      default: 0,
    },
    whiteSpace: 'nowrap',
  },
})

export const tabSizes = stylex.create({
  1: {
    '--tabs-gap': 'calc(var(--spacing) * 4)',
    '--tabs-padding': 'calc(var(--spacing) * 2)',
    '--tabs-tab-gap': 'var(--spacing)',
    fontSize: 'var(--text-xs)',
    lineHeight: 'var(--text-xs--line-height)',
  },
  2: {
    '--tabs-gap': 'calc(var(--spacing) * 6)',
    '--tabs-padding': 'calc(var(--spacing) * 3)',
    '--tabs-tab-gap': 'calc(var(--spacing) * 1.5)',
    fontSize: 'var(--text-sm)',
    lineHeight: 'var(--text-sm--line-height)',
  },
})
