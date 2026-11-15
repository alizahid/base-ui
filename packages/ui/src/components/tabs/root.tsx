'use client'

import {
  Tabs as Component,
  type TabsRootProps as ComponentProps,
} from '@base-ui/react/tabs'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '#lib/colors.js'
import { merge } from '#lib/stylex.js'

import { tabSizes, tabs } from './styles.js'

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
        stylex.props(tabSizes[size], highContrast && tabs.contrast),
        className,
        style,
      )}
    />
  )
}
