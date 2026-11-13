'use client'

import {
  Tabs as Component,
  type TabsRootProps as ComponentProps,
} from '@base-ui/react/tabs'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { merge } from '../../lib/stylex.js'

export type TabsRootProps = Omit<
  ComponentProps,
  'className' | 'color' | 'orientation' | 'style'
> & {
  className?: string
  color?: ColorToken | 'gray'
  highContrast?: boolean
  size?: '1' | '2'
  style?: CSSProperties
}

// the options only set variables here; the list, tabs and indicator read
// them through the cascade
export function Root({
  className,
  color,
  highContrast,
  size = '2',
  style,
  ...props
}: TabsRootProps) {
  return (
    <Component.Root
      data-accent={color}
      {...props}
      {...merge(
        stylex.props(sizes[size], highContrast && styles.contrast),
        className,
        style,
      )}
    />
  )
}

const styles = stylex.create({
  contrast: {
    '--tabs-indicator': 'var(--accent-12)',
  },
})

const sizes = stylex.create({
  1: {
    '--tabs-gap': 'calc(var(--spacing) * 4)',
    '--tabs-padding': 'calc(var(--spacing) * 2)',
    '--tabs-tab-gap': 'var(--spacing)',
    fontSize: 'var(--text-xs)',
    lineHeight: 'var(--text-xs--line-height)',
  },
  2: {
    '--tabs-gap': 'calc(var(--spacing) * 6)',
    '--tabs-padding': 'calc(var(--spacing) * 3)',
    '--tabs-tab-gap': 'calc(var(--spacing) * 1.5)',
    fontSize: 'var(--text-sm)',
    lineHeight: 'var(--text-sm--line-height)',
  },
})
