import * as stylex from '@stylexjs/stylex'

// the shared listbox leaves room at the start of each row for a select's
// check mark. suggestions are never checked, so the rows start at the edge
export const flush = stylex.create({
  // room above every group but the first
  group: {
    marginBlockStart: {
      ':not(:first-child)': 'calc(var(--spacing) * 2)',
      default: null,
    },
  },
  row: {
    paddingInlineStart: 'var(--listbox-separator-margin)',
  },
  separator: {
    marginInlineStart: 'var(--listbox-separator-margin)',
  },
})
