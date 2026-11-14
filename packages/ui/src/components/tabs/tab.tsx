'use client'

import {
  Tabs as Component,
  type TabsTabProps as ComponentProps,
} from '@base-ui/react/tabs'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'
import { tabs } from './styles.js'

export type TabsTabProps = ComponentProps & {
  className?: string
  style?: CSSProperties
}

// its children stack, so an icon sits above the label
export function Tab({ className, style, ...props }: TabsTabProps) {
  return (
    <Component.Tab
      {...props}
      {...merge(stylex.props(tabs.tab), className, style)}
    />
  )
}
