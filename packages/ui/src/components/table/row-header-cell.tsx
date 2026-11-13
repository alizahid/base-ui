import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '../../lib/stylex.js'
import { cell } from './styles.js'

export type TableRowHeaderCellProps = ComponentProps<'th'>

// the cell that names its row
export function RowHeaderCell({
  className,
  style,
  ...props
}: TableRowHeaderCellProps) {
  return (
    <th
      scope="row"
      {...props}
      {...merge(stylex.props(cell.main), className, style)}
    />
  )
}
