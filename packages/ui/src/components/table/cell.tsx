import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '../../lib/stylex.js'
import { cell } from './styles.js'

export type TableCellProps = ComponentProps<'td'>

// a data cell
export function Cell({ className, style, ...props }: TableCellProps) {
  return <td {...props} {...merge(stylex.props(cell.main), className, style)} />
}
