import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '#lib/stylex.js'

export type DataListItemProps = ComponentProps<'div'> & {
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
}

// one label and its value
export function Item({ align, className, style, ...props }: DataListItemProps) {
  return (
    <div
      {...props}
      {...merge(
        stylex.props(styles.main, align && aligns[align]),
        className,
        style,
      )}
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

const aligns = stylex.create({
  baseline: {
    alignItems: 'baseline',
  },
  center: {
    alignItems: 'center',
  },
  end: {
    alignItems: 'end',
  },
  start: {
    alignItems: 'start',
  },
  stretch: {
    alignItems: 'stretch',
  },
})
