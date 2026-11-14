'use client'

import {
  Tabs as Component,
  type TabsListProps as ComponentProps,
} from '@base-ui/react/tabs'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'
import { tabs } from './styles.js'

export type TabsListProps = ComponentProps & {
  className?: string
  style?: CSSProperties
}

// the row of tabs, with the line under the active one
export function List({ children, className, style, ...props }: TabsListProps) {
  return (
    <Component.List
      {...props}
      {...merge(stylex.props(tabs.list), className, style)}
    >
      {children}

      <Component.Indicator {...stylex.props(styles.indicator)} />
    </Component.List>
  )
}

const still = '@media (prefers-reduced-motion: reduce)'

const styles = stylex.create({
  // base ui measures the active tab; the line slides to it
  indicator: {
    backgroundColor: 'var(--tabs-indicator, var(--accent-indicator))',
    bottom: 0,
    height: 2,
    left: 'var(--active-tab-left)',
    position: 'absolute',
    transitionDuration: '200ms',
    transitionProperty: {
      [still]: 'none',
      default: 'left, width',
    },
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    width: 'var(--active-tab-width)',
  },
})
