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
    // the baseline the indicator sits on. a box rather than a shadow, so its
    // ends can be round; before the children, so the indicator covers it
    '::before': {
      backgroundColor: 'var(--gray-a4)',
      borderRadius: 'calc(infinity * 1px)',
      bottom: 0,
      content: '""',
      height: 2,
      insetInline: 0,
      position: 'absolute',
    },
    display: 'flex',
    gap: 'var(--tabs-gap)',
    // as wide as its tabs when they don't fit, so the baseline runs under all
    // of them
    minWidth: '100%',
    position: 'relative',
    width: 'max-content',
  },
  // around the list: the row scrolls sideways when the tabs don't fit, with
  // no scrollbar, as in radix. a tab's focus ring reaches into the gap beside
  // it, which a scroller would clip at either end, so the scroller is that
  // much wider on both sides and pads the difference
  scroll: {
    marginInline: 'calc(var(--ui-spacing) * -2)',
    overflowX: 'auto',
    overflowY: 'hidden',
    paddingInline: 'calc(var(--ui-spacing) * 2)',
    scrollbarWidth: 'none',
  },
  tab: {
    // the focus ring. a tab has no inline padding, so the ring is drawn on a
    // box that reaches into the gap on either side, and the text gets room
    '::before': {
      // an inset shadow, not an outline: an outline on an edge that falls
      // between two pixels is drawn blurred, as if twice
      borderRadius: 'var(--ui-radius-md)',
      boxShadow: 'inset 0 0 0 2px var(--focus-8)',
      content: {
        ':is(:focus-visible)': '""',
        default: 'none',
      },
      inset: '0 calc(var(--ui-spacing) * -2)',
      pointerEvents: 'none',
      position: 'absolute',
    },
    alignItems: 'center',
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
    gap: 'var(--tabs-tab-gap)',
    // the ring is a shadow, which forced colors mode drops. an outline that
    // can't be seen otherwise takes its place there
    outline: {
      ':focus-visible': '2px solid transparent',
      default: 'none',
    },
    paddingBlock: 'var(--tabs-padding)',
    paddingInline: 0,
    position: 'relative',
    // for a tab rendered as a link
    userSelect: 'none',
    // heavier text for the active tab without changing its width, which
    // would move the tabs after it
    WebkitTextStrokeWidth: {
      [active]: '0.35px',
      default: null,
    },
    whiteSpace: 'nowrap',
  },
})

export const tabSizes = stylex.create({
  1: {
    '--tabs-gap': 'calc(var(--ui-spacing) * 4)',
    '--tabs-padding': 'calc(var(--ui-spacing) * 2)',
    '--tabs-tab-gap': 'var(--ui-spacing)',
    fontSize: 'var(--ui-text-xs)',
    lineHeight: 'var(--ui-text-xs--line-height)',
  },
  2: {
    '--tabs-gap': 'calc(var(--ui-spacing) * 6)',
    '--tabs-padding': 'calc(var(--ui-spacing) * 3)',
    '--tabs-tab-gap': 'calc(var(--ui-spacing) * 1.5)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
})
