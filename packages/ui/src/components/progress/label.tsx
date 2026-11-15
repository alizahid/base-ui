'use client'

import {
  Progress as Component,
  type ProgressLabelProps as ComponentProps,
} from '@base-ui/react/progress'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '#lib/stylex.js'

export type ProgressLabelProps = ComponentProps & {
  className?: string
  style?: CSSProperties
}

// names the bar; sits above it at the start
export function Label({ className, style, ...props }: ProgressLabelProps) {
  return (
    <Component.Label
      {...props}
      {...merge(stylex.props(styles.main), className, style)}
    />
  )
}

const styles = stylex.create({
  main: {
    color: 'var(--gray-12)',
    fontWeight: '500',
    gridRow: 1,
    paddingBlockEnd: 'calc(var(--ui-spacing) * 2)',
  },
})
