'use client'

import {
  Progress as Component,
  type ProgressValueProps as ComponentProps,
} from '@base-ui/react/progress'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '#lib/stylex.js'

export type ProgressValueProps = ComponentProps & {
  className?: string
  style?: CSSProperties
}

// the formatted value; sits above the bar at the end
export function Value({ className, style, ...props }: ProgressValueProps) {
  return (
    <Component.Value
      {...props}
      {...merge(stylex.props(styles.main), className, style)}
    />
  )
}

const styles = stylex.create({
  main: {
    color: 'var(--gray-a11)',
    fontVariantNumeric: 'tabular-nums',
    gridColumnStart: 2,
    gridRow: 1,
    paddingBlockEnd: 'calc(var(--ui-spacing) * 2)',
    textAlign: 'end',
  },
})
