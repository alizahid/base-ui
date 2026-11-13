import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '../../lib/stylex.js'

export type TableHeaderProps = ComponentProps<'thead'>

// the head rows
export function Header({ className, style, ...props }: TableHeaderProps) {
  return (
    <thead {...props} {...merge(stylex.props(styles.main), className, style)} />
  )
}

const styles = stylex.create({
  main: {
    verticalAlign: 'inherit',
  },
})
