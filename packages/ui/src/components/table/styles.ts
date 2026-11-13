import * as stylex from '@stylexjs/stylex'

// stylex doesn't order these against each other, so they must not overlap
const header = ':is(thead *)'
const last = ':is(tbody > tr:last-child > *)'

// shared by the three kinds of cell. the line under a row is drawn by its
// cells; the last row of a surface table has none
export const cell = stylex.create({
  bold: {
    fontWeight: '700',
  },
  main: {
    backgroundColor: {
      [header]: 'var(--table-header)',
      default: 'transparent',
    },
    boxShadow: {
      [last]: 'var(--table-last-row)',
      default: 'inset 0 -1px var(--gray-a5)',
    },
    boxSizing: 'border-box',
    fontWeight: '400',
    // works as a min-height
    height: 'var(--table-cell-height)',
    padding: 'var(--table-cell-padding)',
    textAlign: 'start',
    verticalAlign: 'inherit',
  },
})
