import * as stylex from '@stylexjs/stylex'

// the popup list shared by Select and Combobox: the surface, its items, group
// labels and separators. ported from radix themes' select.css
export const listbox = stylex.create({
  check: {
    height: '1lh',
    width: '1lh',
  },
  content: {
    backgroundColor: 'var(--panel-background)',
    boxShadow: 'var(--panel-shadow)',
    boxSizing: 'border-box',
    color: 'var(--gray-12)',
    maxHeight: 'var(--available-height)',
    // a select lines the selected item's text up with the trigger's, which
    // pulls the popup out past the trigger's start edge (data-side is "none"
    // then). the extra width keeps it covering the trigger's far edge too
    minWidth: {
      ':is([data-side="none"])':
        'calc(var(--anchor-width) + var(--listbox-align-extra))',
      default: 'var(--anchor-width)',
    },
    // base ui focuses the popup when it opens; the highlighted item shows focus
    outline: 'none',
    overflow: 'hidden',
    transformOrigin: 'var(--transform-origin)',
  },
  contrast: {
    '--listbox-highlight': 'var(--accent-12)',
    '--listbox-highlight-color': 'var(--accent-1)',
  },
  indicator: {
    alignItems: 'center',
    display: 'inline-flex',
    insetInlineStart: 0,
    justifyContent: 'center',
    position: 'absolute',
    width: 'var(--listbox-indicator-width)',
  },
  item: {
    alignItems: 'center',
    backgroundColor: {
      ':is([data-highlighted]:not([data-disabled]))':
        'var(--listbox-highlight)',
    },
    borderRadius: 'var(--listbox-item-radius)',
    boxSizing: 'border-box',
    color: {
      ':is([data-disabled])': 'var(--gray-a8)',
      ':is([data-highlighted]:not([data-disabled]))':
        'var(--listbox-highlight-color)',
    },
    cursor: 'default',
    display: 'flex',
    height: 'var(--listbox-item-height)',
    outline: 'none',
    // radix pads both sides by the indicator's width; the end only needs the
    // same margin as the separator
    paddingInlineEnd: 'var(--listbox-separator-margin)',
    paddingInlineStart: 'var(--listbox-indicator-width)',
    position: 'relative',
    scrollMarginBlock: 'var(--listbox-content-padding)',
    userSelect: 'none',
  },
  label: {
    alignItems: 'center',
    color: 'var(--gray-a10)',
    cursor: 'default',
    display: 'flex',
    // stays a step smaller than the items at size 3
    fontSize: 'var(--listbox-label-font-size)',
    height: 'var(--listbox-item-height)',
    lineHeight: 'var(--listbox-label-line-height)',
    // a label that comes straight after an item gets some room above it
    marginBlockStart: {
      ':is([role="option"] + *)': 'calc(var(--spacing) * 2)',
    },
    paddingInlineEnd: 'var(--listbox-separator-margin)',
    paddingInlineStart: 'var(--listbox-indicator-width)',
    userSelect: 'none',
  },
  list: {
    boxSizing: 'border-box',
    maxHeight: 'var(--available-height)',
    outline: 'none',
    overflowY: 'auto',
    padding: 'var(--listbox-content-padding)',
    position: 'relative',
    // keeps the highlighted item clear of the scroll arrows
    scrollPaddingBlock: 'calc(var(--spacing) * 6)',
  },
  separator: {
    backgroundColor: 'var(--gray-a6)',
    height: 1,
    marginBlock: 'calc(var(--spacing) * 2)',
    marginInlineEnd: 'var(--listbox-separator-margin)',
    marginInlineStart: 'var(--listbox-indicator-width)',
  },
  // fills the row, so custom item content can lay itself out across it
  text: {
    flexGrow: 1,
    minWidth: 0,
  },
})

// what a highlighted item looks like
export const listboxVariants = stylex.create({
  soft: {
    '--listbox-highlight': 'var(--accent-a4)',
    '--listbox-highlight-color': 'inherit',
  },
  solid: {
    '--listbox-highlight': 'var(--accent-9)',
    '--listbox-highlight-color': 'var(--accent-contrast)',
  },
})

// set on the popup; the items, labels and separators inside inherit them.
// --listbox-align-extra is how far the popup overhangs a select trigger of the
// same size on both sides combined: its padding and gutters less the
// trigger's own padding
export const listboxSizes = stylex.create({
  1: {
    '--listbox-align-extra': '20px',
    '--listbox-content-padding': 'var(--spacing)',
    '--listbox-indicator-width': 'calc(var(--spacing) * 5)',
    '--listbox-item-height': 'calc(var(--spacing) * 6)',
    '--listbox-item-radius': 'var(--radius-sm)',
    '--listbox-label-font-size': 'var(--text-xs)',
    '--listbox-label-line-height': 'var(--text-xs--line-height)',
    '--listbox-separator-margin': 'calc(var(--spacing) * 2)',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--text-xs)',
    lineHeight: 'var(--text-xs--line-height)',
  },
  2: {
    '--listbox-align-extra': '28px',
    '--listbox-content-padding': 'calc(var(--spacing) * 2)',
    '--listbox-indicator-width': 'calc(var(--spacing) * 6)',
    '--listbox-item-height': 'calc(var(--spacing) * 8)',
    '--listbox-item-radius': 'var(--radius-md)',
    '--listbox-label-font-size': 'var(--text-sm)',
    '--listbox-label-line-height': 'var(--text-sm--line-height)',
    '--listbox-separator-margin': 'calc(var(--spacing) * 3)',
    borderRadius: 'var(--radius-xl)',
    fontSize: 'var(--text-sm)',
    lineHeight: 'var(--text-sm--line-height)',
  },
  3: {
    '--listbox-align-extra': '20px',
    '--listbox-content-padding': 'calc(var(--spacing) * 2)',
    '--listbox-indicator-width': 'calc(var(--spacing) * 6)',
    '--listbox-item-height': 'calc(var(--spacing) * 8)',
    '--listbox-item-radius': 'var(--radius-md)',
    '--listbox-label-font-size': 'var(--text-sm)',
    '--listbox-label-line-height': 'var(--text-sm--line-height)',
    '--listbox-separator-margin': 'calc(var(--spacing) * 3)',
    borderRadius: 'var(--radius-xl)',
    fontSize: 'var(--text-base)',
    lineHeight: 'var(--text-sm--line-height)',
  },
})
