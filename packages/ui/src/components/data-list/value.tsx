import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '../../lib/stylex.js'

export type DataListValueProps = ComponentProps<'dd'>

// stylex doesn't order these against each other, so they must not overlap.
// an only item matches both, but they set different properties
const first = ':is(:first-child > *)'
const last = ':is(:last-child > *)'

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
    marginBottom: {
      [last]: 'var(--data-list-last-trim-end)',
      default: 'var(--data-list-trim-end)',
    },
    marginInline: 0,
    marginTop: {
      [first]: 'var(--data-list-first-trim-start)',
      default: 'var(--data-list-trim-start)',
    },
    // lets the value truncate
    minWidth: 0,
  },
})
