import * as stylex from '@stylexjs/stylex'

// ported from radix themes' base-menu.css. the popup sets the size variables
// and the rows inside read them. the variables are the listbox's, so the
// check column, labels and separators can be the listbox's own styles

// stylex doesn't order these against each other, so they must not overlap
const off = ':is([data-disabled])'
const highlighted = ':is([data-highlighted]:not([data-disabled]))'
const open = ':is([data-popup-open]:not([data-highlighted], [data-disabled]))'
const tinted = ':is([data-accent]:not([data-highlighted], [data-disabled]))'

export const menu = stylex.create({
  // the chevron on a submenu trigger; flipped where text runs right to left
  chevron: {
    color: 'var(--menu-chevron)',
    transform: {
      ':dir(rtl)': 'scaleX(-1)',
      default: null,
    },
  },
  content: {
    backgroundColor: 'var(--panel-background)',
    boxShadow: 'var(--panel-shadow)',
    color: 'var(--gray-12)',
    maxHeight: 'var(--available-height)',
    outline: 'none',
    overflow: 'auto',
    padding: 'var(--listbox-content-padding)',
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
    borderRadius: 'var(--listbox-item-radius)',
    // a `color` on an item tints its text
    color: {
      [highlighted]: 'var(--menu-highlight-color)',
      [off]: 'var(--gray-a8)',
      [tinted]: 'var(--accent-a11)',
    },
    cursor: 'default',
    display: 'flex',
    gap: 'calc(var(--ui-spacing) * 2)',
    height: 'var(--listbox-item-height)',
    outline: 'none',
    paddingInlineEnd: 'var(--listbox-separator-margin)',
    paddingInlineStart: 'var(--listbox-indicator-width)',
    position: 'relative',
    scrollMarginBlock: 'var(--listbox-content-padding)',
    userSelect: 'none',
  },
  shortcut: {
    alignItems: 'center',
    color: 'var(--menu-shortcut)',
    display: 'flex',
    marginInlineStart: 'auto',
    paddingInlineStart: 'calc(var(--ui-spacing) * 4)',
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
    '--listbox-content-padding': 'var(--ui-spacing)',
    '--listbox-indicator-width': {
      [checkable]: 'calc(var(--ui-spacing) * 5)',
      default: 'calc(var(--ui-spacing) * 2)',
    },
    '--listbox-item-height': 'calc(var(--ui-spacing) * 6)',
    '--listbox-item-radius': 'var(--ui-radius-sm)',
    '--listbox-separator-margin': 'calc(var(--ui-spacing) * 2)',
    borderRadius: 'var(--ui-radius-md)',
    fontSize: 'var(--ui-text-xs)',
    lineHeight: 'var(--ui-text-xs--line-height)',
  },
  2: {
    '--listbox-content-padding': 'calc(var(--ui-spacing) * 2)',
    '--listbox-indicator-width': {
      [checkable]: 'calc(var(--ui-spacing) * 6)',
      default: 'calc(var(--ui-spacing) * 3)',
    },
    '--listbox-item-height': 'calc(var(--ui-spacing) * 8)',
    '--listbox-item-radius': 'var(--ui-radius-sm)',
    '--listbox-separator-margin': 'calc(var(--ui-spacing) * 3)',
    borderRadius: 'var(--ui-radius-lg)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
})
