import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '../../lib/stylex.js'

export type DataListItemProps = ComponentProps<'div'> & {
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
}

// one label and its value
export function Item({
  align = 'baseline',
  className,
  style,
  ...props
}: DataListItemProps) {
  return (
    <div
      {...props}
      {...merge(stylex.props(styles.main, aligns[align]), className, style)}
    />
  )
}

const styles = stylex.create({
  // a row of the root's grid when horizontal, a column when vertical. the
  // grid and flex properties that don't apply are ignored
  main: {
    alignItems: 'var(--data-list-item-align)',
    display: 'var(--data-list-item-display)',
    flexDirection: 'column',
    gap: 'var(--data-list-item-gap)',
    gridColumn: 'span 2',
    // keeps the label columns of all items aligned
    gridTemplateColumns: 'subgrid',
  },
})

// which sides of the row a tall value may poke out of. the first and last
// items stay inside the root, unless centered, where both sides must match
const aligns = stylex.create({
  baseline: {
    '--data-list-first-trim-start': '0px',
    '--data-list-last-trim-end': '0px',
    '--data-list-trim-end': 'var(--data-list-trim)',
    '--data-list-trim-start': 'var(--data-list-trim)',
  },
  center: {
    '--data-list-first-trim-start': 'var(--data-list-trim)',
    '--data-list-last-trim-end': 'var(--data-list-trim)',
    '--data-list-trim-end': 'var(--data-list-trim)',
    '--data-list-trim-start': 'var(--data-list-trim)',
    alignItems: 'center',
  },
  end: {
    '--data-list-first-trim-start': '0px',
    '--data-list-last-trim-end': '0px',
    '--data-list-trim-end': '0px',
    '--data-list-trim-start': 'var(--data-list-trim)',
    alignItems: 'end',
  },
  start: {
    '--data-list-first-trim-start': '0px',
    '--data-list-last-trim-end': '0px',
    '--data-list-trim-end': 'var(--data-list-trim)',
    '--data-list-trim-start': '0px',
    alignItems: 'start',
  },
  stretch: {
    '--data-list-first-trim-start': '0px',
    '--data-list-last-trim-end': '0px',
    '--data-list-trim-end': '0px',
    '--data-list-trim-start': '0px',
    alignItems: 'stretch',
  },
})
