import * as stylex from '@stylexjs/stylex'

// stylex doesn't order these against each other, so they must not overlap
const active = ':is([data-active])'
const open = ':is([data-popup-open], [data-pressed])'
const hover =
  ':is(:hover:not([data-active], [data-popup-open], [data-pressed]))'

// what a trigger and a link share. the root and the content set the
// variables, so the same link is a compact item in the list and a roomier
// row inside a popup. it grows to fill its li
export const navigation = stylex.create({
  item: {
    alignItems: 'center',
    backgroundColor: {
      [active]: 'var(--accent-a3)',
      [hover]: {
        '@media (hover: hover)': 'var(--navigation-hover, var(--gray-a3))',
        default: null,
      },
      [open]: 'var(--navigation-hover, var(--gray-a3))',
      default: null,
    },
    borderRadius: 'var(--navigation-item-radius, var(--ui-radius-md))',
    color: {
      [active]: 'var(--accent-a11)',
      default: 'var(--gray-12)',
    },
    cursor: 'pointer',
    display: 'flex',
    flexGrow: 1,
    fontSize: 'var(--ui-text-sm)',
    gap: 'var(--ui-spacing)',
    justifyContent: 'var(--navigation-item-justify, center)',
    lineHeight: 'var(--ui-text-sm--line-height)',
    // inside the item, as the popup clips whatever leaves it
    outline: {
      ':focus-visible': '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: -2,
    // the height comes from the padding around one line of text, not a
    // min-height: safari doesn't center inside a stretched one
    padding:
      'var(--navigation-item-padding, calc(var(--ui-spacing) * 1.5) calc(var(--ui-spacing) * 3))',
    textAlign: 'start',
    userSelect: 'none',
    width: 'var(--navigation-item-width, auto)',
  },
})
