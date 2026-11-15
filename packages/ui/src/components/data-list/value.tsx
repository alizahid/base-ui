import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '#lib/stylex.js'

export type DataListValueProps = ComponentProps<'dd'>

export function Value({ className, style, ...props }: DataListValueProps) {
  return (
    <dd {...props} {...merge(stylex.props(styles.main), className, style)} />
  )
}

const styles = stylex.create({
  main: {
    '::before': {
      content: '"\\200d"',
    },
    display: 'flex',
    // lets the value truncate
    minWidth: 0,
  },
})
