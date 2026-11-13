import * as stylex from '@stylexjs/stylex'

// ported from radix themes' base-menu.css. the popup sets the size variables
// and the rows inside read them

// stylex doesn't order these against each other, so they must not overlap
const off = ':is([data-disabled])'
const highlighted = ':is([data-highlighted]:not([data-disabled]))'
const open = ':is([data-popup-open]:not([data-highlighted], [data-disabled]))'
const tinted = ':is([data-accent]:not([data-highlighted], [data-disabled]))'

export const menu = stylex.create({
  check: {
    height: 'var(--menu-icon-size)',
    width: 'var(--menu-icon-size)',
  },
  // the chevron on a submenu trigger; flipped where text runs right to left
  chevron: {
    color: 'var(--menu-chevron)',
    height: 'var(--menu-icon-size)',
    marginInlineEnd: -2,
    transform: {
      ':dir(rtl)': 'scaleX(-1)',
      default: 'none',
    },
    width: 'var(--menu-icon-size)',
  },
  content: {
    backgroundColor: 'var(--panel-background)',
    boxShadow: 'var(--panel-shadow)',
    boxSizing: 'border-box',
    color: 'var(--gray-12)',
    maxHeight: 'var(--available-height)',
    outline: 'none',
    overflow: 'auto',
    padding: 'var(--menu-content-padding)',
  },
  indicator: {
    alignItems: 'center',
    display: 'inline-flex',
    insetInlineStart: 0,
    justifyContent: 'center',
    position: 'absolute',
    width: 'var(--menu-item-padding-start)',
  },
  // every kind of row: item, checkbox item, radio item, submenu trigger
  item: {
    // the shortcut and the chevron are muted until the row is highlighted
    '--menu-chevron': {
      [highlighted]: 'currentColor',
      [off]: 'currentColor',
      default: 'var(--gray-12)',
    },
    '--menu-shortcut': {
      [highlighted]: 'inherit',
      [off]: 'inherit',
      [open]: 'inherit',
      default: 'var(--gray-a11)',
    },
    alignItems: 'center',
    backgroundColor: {
      [highlighted]: 'var(--menu-highlight)',
      [open]: 'var(--menu-open)',
    },
    borderRadius: 'var(--menu-item-radius)',
    boxSizing: 'border-box',
    // a `color` on an item tints its text
    color: {
      [highlighted]: 'var(--menu-highlight-color)',
      [off]: 'var(--gray-a8)',
      [tinted]: 'var(--accent-a11)',
    },
    cursor: 'default',
    display: 'flex',
    gap: 'calc(var(--spacing) * 2)',
    height: 'var(--menu-item-height)',
    outline: 'none',
    paddingInlineEnd: 'var(--menu-item-padding-end)',
    paddingInlineStart: 'var(--menu-item-padding-start)',
    position: 'relative',
    scrollMarginBlock: 'var(--menu-content-padding)',
    userSelect: 'none',
  },
  label: {
    alignItems: 'center',
    boxSizing: 'border-box',
    color: 'var(--gray-a10)',
    cursor: 'default',
    display: 'flex',
    height: 'var(--menu-item-height)',
    // a label that comes straight after a row gets some room above it
    marginBlockStart: {
      ':is([role^="menuitem"] + *)': 'calc(var(--spacing) * 2)',
    },
    paddingInlineEnd: 'var(--menu-item-padding-end)',
    paddingInlineStart: 'var(--menu-item-padding-start)',
    userSelect: 'none',
  },
  separator: {
    backgroundColor: 'var(--gray-a6)',
    height: 1,
    marginBlock: 'calc(var(--spacing) * 2)',
    marginInlineEnd: 'var(--menu-item-padding-end)',
    marginInlineStart: 'var(--menu-item-padding-start)',
  },
  shortcut: {
    alignItems: 'center',
    color: 'var(--menu-shortcut)',
    display: 'flex',
    marginInlineStart: 'auto',
    paddingInlineStart: 'calc(var(--spacing) * 4)',
  },
})

// what a highlighted row and an open submenu trigger look like. set on each
// row rather than the popup, so a row with its own `color` uses that color
export const menuVariants = stylex.create({
  soft: {
    '--menu-highlight': 'var(--accent-a4)',
    '--menu-highlight-color': 'inherit',
    '--menu-open': 'var(--accent-a3)',
  },
  solid: {
    '--menu-highlight': 'var(--accent-9)',
    '--menu-highlight-color': 'var(--accent-contrast)',
    '--menu-open': 'var(--gray-a3)',
  },
})

// solid only, and not for a row with its own color, which keeps its fill
export const menuContrast = stylex.create({
  main: {
    '--menu-highlight': {
      ':is([data-accent])': 'var(--accent-9)',
      default: 'var(--accent-12)',
    },
    '--menu-highlight-color': {
      ':is([data-accent])': 'var(--accent-contrast)',
      default: 'var(--accent-1)',
    },
  },
})

// rows get a wider start gutter once the menu has a checkbox or radio item,
// to make room for the checkmark
const checkable = ':has([role="menuitemcheckbox"], [role="menuitemradio"])'

export const menuSizes = stylex.create({
  1: {
    '--menu-content-padding': 'var(--spacing)',
    '--menu-icon-size': '13px',
    '--menu-item-height': 'calc(var(--spacing) * 6)',
    '--menu-item-padding-end': 'calc(var(--spacing) * 2)',
    '--menu-item-padding-start': {
      [checkable]: 'calc(var(--spacing) * 5)',
      default: 'calc(var(--spacing) * 2)',
    },
    '--menu-item-radius': 'var(--radius-sm)',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--text-xs)',
    lineHeight: 'var(--text-xs--line-height)',
  },
  2: {
    '--menu-content-padding': 'calc(var(--spacing) * 2)',
    '--menu-icon-size': '15px',
    '--menu-item-height': 'calc(var(--spacing) * 8)',
    '--menu-item-padding-end': 'calc(var(--spacing) * 3)',
    '--menu-item-padding-start': {
      [checkable]: 'calc(var(--spacing) * 6)',
      default: 'calc(var(--spacing) * 3)',
    },
    '--menu-item-radius': 'var(--radius-md)',
    borderRadius: 'var(--radius-xl)',
    fontSize: 'var(--text-sm)',
    lineHeight: 'var(--text-sm--line-height)',
  },
})
