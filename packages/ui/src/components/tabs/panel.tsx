'use client'

import {
  Tabs as Component,
  type TabsPanelProps as ComponentProps,
} from '@base-ui/react/tabs'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '#lib/stylex.js'

export type TabsPanelProps = ComponentProps & {
  className?: string
  style?: CSSProperties
}

// the content for one tab. spacing is left to the consumer
export function Panel({ className, style, ...props }: TabsPanelProps) {
  return (
    <Component.Panel
      {...props}
      {...merge(stylex.props(styles.main), className, style)}
    />
  )
}

const styles = stylex.create({
  main: {
    outline: {
      ':focus-visible': '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: 2,
  },
})
