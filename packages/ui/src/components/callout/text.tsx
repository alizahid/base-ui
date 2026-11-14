import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '../../lib/stylex.js'

export type CalloutTextProps = ComponentProps<'p'>

export function Text({ className, style, ...props }: CalloutTextProps) {
  return (
    <p {...props} {...merge(stylex.props(styles.main), className, style)} />
  )
}

const styles = stylex.create({
  main: {
    margin: 0,
  },
})
