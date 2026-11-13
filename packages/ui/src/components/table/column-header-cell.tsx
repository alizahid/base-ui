import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '../../lib/stylex.js'
import { cell } from './styles.js'

export type TableColumnHeaderCellProps = ComponentProps<'th'>

// a column heading; goes in a Header row
export function ColumnHeaderCell({
  className,
  style,
  ...props
}: TableColumnHeaderCellProps) {
  return (
    <th
      scope="col"
      {...props}
      {...merge(stylex.props(cell.main, cell.bold), className, style)}
    />
  )
}
