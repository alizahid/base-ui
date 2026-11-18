import * as stylex from '@stylexjs/stylex'

// the popup list shared by Select, Combobox and Autocomplete: the surface,
// its items, group labels and separators. Menu shares the check column,
// labels and separators. ported from radix themes' select.css
export const listbox = stylex.create({
  content: {
    backgroundColor: 'var(--panel-background)',
    boxShadow: 'var(--panel-shadow)',
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
  },
  contrast: {
    '--listbox-highlight': 'var(--accent-12)',
    '--listbox-highlight-color': 'var(--accent-1)',
  },
  // what a filtered list (Combobox, Autocomplete) shows when nothing matches
  empty: {
    color: 'var(--gray-a10)',
    padding: 'calc(var(--listbox-content-padding) + var(--ui-spacing) * 2)',
  },
  // a filtered list: shorter, and no padding once it is empty
  filtered: {
    maxHeight: 'min(calc(var(--ui-spacing) * 96), var(--available-height))',
    overscrollBehavior: 'contain',
    padding: {
      ':is([data-empty])': 0,
      default: 'var(--listbox-content-padding)',
    },
    scrollPaddingBlock: 'var(--listbox-content-padding)',
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
    // stays a step smaller than the items at size 3. a menu doesn't set
    // these, and keeps the size it inherits
    fontSize: 'var(--listbox-label-font-size)',
    height: 'var(--listbox-item-height)',
    lineHeight: 'var(--listbox-label-line-height)',
    // a label that comes straight after an item gets some room above it
    marginBlockStart: {
      ':is(:is([role="option"], [role^="menuitem"]) + *)':
        'calc(var(--ui-spacing) * 2)',
    },
    paddingInlineEnd: 'var(--listbox-separator-margin)',
    paddingInlineStart: 'var(--listbox-indicator-width)',
    userSelect: 'none',
  },
  list: {
    maxHeight: 'var(--available-height)',
    outline: 'none',
    overflowY: 'auto',
    padding: 'var(--listbox-content-padding)',
    position: 'relative',
    // keeps the highlighted item clear of the scroll arrows
    scrollPaddingBlock: 'calc(var(--ui-spacing) * 6)',
  },
  separator: {
    backgroundColor: 'var(--gray-a6)',
    height: 1,
    marginBlock: 'calc(var(--ui-spacing) * 2)',
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
const listboxSizes = stylex.create({
  1: {
    '--listbox-align-extra': 'calc(var(--ui-spacing) * 5)',
    '--listbox-content-padding': 'var(--ui-spacing)',
    '--listbox-indicator-width': 'calc(var(--ui-spacing) * 5)',
    '--listbox-item-height': 'calc(var(--ui-spacing) * 6)',
    '--listbox-item-radius': 'var(--ui-radius-sm)',
    '--listbox-label-font-size': 'var(--ui-text-xs)',
    '--listbox-label-line-height': 'var(--ui-text-xs--line-height)',
    '--listbox-separator-margin': 'calc(var(--ui-spacing) * 2)',
    borderRadius: 'var(--ui-radius-md)',
    fontSize: 'var(--ui-text-xs)',
    lineHeight: 'var(--ui-text-xs--line-height)',
  },
  2: {
    '--listbox-align-extra': 'calc(var(--ui-spacing) * 7)',
    '--listbox-content-padding': 'calc(var(--ui-spacing) * 2)',
    '--listbox-indicator-width': 'calc(var(--ui-spacing) * 6)',
    '--listbox-item-height': 'calc(var(--ui-spacing) * 8)',
    '--listbox-item-radius': 'var(--ui-radius-sm)',
    '--listbox-label-font-size': 'var(--ui-text-sm)',
    '--listbox-label-line-height': 'var(--ui-text-sm--line-height)',
    '--listbox-separator-margin': 'calc(var(--ui-spacing) * 3)',
    borderRadius: 'var(--ui-radius-lg)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
  // on top of size 2: only the text grows
  3: {
    '--listbox-align-extra': 'calc(var(--ui-spacing) * 5)',
    fontSize: 'var(--ui-text-base)',
    lineHeight: 'var(--ui-text-base--line-height)',
  },
})

export function listboxSize(size: '1' | '2' | '3') {
  return size === '3'
    ? [listboxSizes[2], listboxSizes[3]]
    : [listboxSizes[size]]
}
