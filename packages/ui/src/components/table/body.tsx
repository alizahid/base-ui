import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '../../lib/stylex.js'

export type TableBodyProps = ComponentProps<'tbody'>

// the body rows
export function Body({ className, style, ...props }: TableBodyProps) {
  return (
    <tbody {...props} {...merge(stylex.props(styles.main), className, style)} />
  )
}

const styles = stylex.create({
  main: {
    verticalAlign: 'inherit',
  },
})
