import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '../../lib/stylex.js'

export type TableRowProps = ComponentProps<'tr'>

// one row
export function Row({ className, style, ...props }: TableRowProps) {
  return (
    <tr {...props} {...merge(stylex.props(styles.main), className, style)} />
  )
}

const styles = stylex.create({
  main: {
    verticalAlign: 'inherit',
  },
})
