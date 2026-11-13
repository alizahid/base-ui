import * as stylex from '@stylexjs/stylex'

// the popup list shared by Select and Combobox: the surface, its items, group
// labels and separators. ported from radix themes' select.css, with solid
// colors in place of alpha ones
export const menu = stylex.create({
  check: {
    height: 'var(--menu-check-size)',
    width: 'var(--menu-check-size)',
  },
  content: {
    backgroundColor: 'var(--panel-background)',
    boxShadow: 'var(--panel-shadow)',
    boxSizing: 'border-box',
    color: 'var(--gray-12)',
    maxHeight: 'var(--available-height)',
    minWidth: 'var(--anchor-width)',
    // base ui focuses the popup when it opens; the highlighted item shows focus
    outline: 'none',
    overflow: 'hidden',
    transformOrigin: 'var(--transform-origin)',
  },
  contrast: {
    '--menu-highlight': 'var(--accent-12)',
    '--menu-highlight-color': 'var(--accent-1)',
  },
  indicator: {
    alignItems: 'center',
    display: 'inline-flex',
    insetInlineStart: 0,
    justifyContent: 'center',
    position: 'absolute',
    width: 'var(--menu-indicator-width)',
  },
  item: {
    alignItems: 'center',
    backgroundColor: {
      ':is([data-highlighted]:not([data-disabled]))': 'var(--menu-highlight)',
    },
    borderRadius: 'var(--menu-item-radius)',
    boxSizing: 'border-box',
    color: {
      ':is([data-disabled])': 'var(--gray-8)',
      ':is([data-highlighted]:not([data-disabled]))':
        'var(--menu-highlight-color)',
    },
    cursor: 'default',
    display: 'flex',
    height: 'var(--menu-item-height)',
    outline: 'none',
    // radix pads both sides by the indicator's width; the end only needs the
    // same margin as the separator
    paddingInlineEnd: 'var(--menu-separator-margin)',
    paddingInlineStart: 'var(--menu-indicator-width)',
    position: 'relative',
    scrollMarginBlock: 'var(--menu-content-padding)',
    userSelect: 'none',
  },
  label: {
    alignItems: 'center',
    color: 'var(--gray-10)',
    cursor: 'default',
    display: 'flex',
    height: 'var(--menu-item-height)',
    paddingInlineEnd: 'var(--menu-separator-margin)',
    paddingInlineStart: 'var(--menu-indicator-width)',
    userSelect: 'none',
  },
  list: {
    boxSizing: 'border-box',
    maxHeight: 'var(--available-height)',
    outline: 'none',
    overflowY: 'auto',
    padding: 'var(--menu-content-padding)',
    position: 'relative',
    // keeps the highlighted item clear of the scroll arrows
    scrollPaddingBlock: 'calc(var(--spacing) * 6)',
  },
  separator: {
    backgroundColor: 'var(--gray-6)',
    height: 1,
    marginBlock: 'calc(var(--spacing) * 2)',
    marginInlineEnd: 'var(--menu-separator-margin)',
    marginInlineStart: 'var(--menu-indicator-width)',
  },
  // fills the row, so custom item content can lay itself out across it
  text: {
    flexGrow: 1,
    minWidth: 0,
  },
})

// what a highlighted item looks like
export const menuVariants = stylex.create({
  soft: {
    '--menu-highlight': 'var(--accent-4)',
    '--menu-highlight-color': 'inherit',
  },
  solid: {
    '--menu-highlight': 'var(--accent-9)',
    '--menu-highlight-color': 'var(--accent-contrast)',
  },
})

// set on the popup; the items, labels and separators inside inherit them
export const menuSizes = stylex.create({
  1: {
    '--menu-check-size': '13px',
    '--menu-content-padding': 'var(--spacing)',
    '--menu-indicator-width': 'calc(var(--spacing) * 5)',
    '--menu-item-height': 'calc(var(--spacing) * 6)',
    '--menu-item-radius': 'var(--radius-sm)',
    '--menu-separator-margin': 'calc(var(--spacing) * 2)',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--text-xs)',
    lineHeight: 'var(--text-xs--line-height)',
  },
  2: {
    '--menu-check-size': '15px',
    '--menu-content-padding': 'calc(var(--spacing) * 2)',
    '--menu-indicator-width': 'calc(var(--spacing) * 6)',
    '--menu-item-height': 'calc(var(--spacing) * 8)',
    '--menu-item-radius': 'var(--radius-md)',
    '--menu-separator-margin': 'calc(var(--spacing) * 3)',
    borderRadius: 'var(--radius-xl)',
    fontSize: 'var(--text-sm)',
    lineHeight: 'var(--text-sm--line-height)',
  },
  3: {
    '--menu-check-size': '15px',
    '--menu-content-padding': 'calc(var(--spacing) * 2)',
    '--menu-indicator-width': 'calc(var(--spacing) * 6)',
    '--menu-item-height': 'calc(var(--spacing) * 8)',
    '--menu-item-radius': 'var(--radius-md)',
    '--menu-separator-margin': 'calc(var(--spacing) * 3)',
    borderRadius: 'var(--radius-xl)',
    fontSize: 'var(--text-base)',
    lineHeight: 'var(--text-sm--line-height)',
  },
})
