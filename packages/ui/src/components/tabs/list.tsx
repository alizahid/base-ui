'use client'

import {
  Tabs as Component,
  type TabsListProps as ComponentProps,
} from '@base-ui/react/tabs'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { Scroller } from '#lib/scroller.js'
import { merge } from '#lib/stylex.js'

import { tabs } from './styles.js'

export type TabsListProps = ComponentProps & {
  className?: string
  style?: CSSProperties
}

// the row of tabs, with the line under the active one. it scrolls sideways
// when the tabs don't fit, starting at the active tab. className and style go
// to the list
export function List({ children, className, style, ...props }: TabsListProps) {
  return (
    <Scroller {...stylex.props(tabs.scroll)}>
      <Component.List
        {...props}
        {...merge(stylex.props(tabs.list), className, style)}
      >
        {children}

        <Component.Indicator {...stylex.props(styles.indicator)} />
      </Component.List>
    </Scroller>
  )
}

const still = '@media (prefers-reduced-motion: reduce)'

const styles = stylex.create({
  // base ui measures the active tab; the line slides to it
  indicator: {
    backgroundColor: 'var(--tabs-indicator, var(--accent-indicator))',
    borderRadius: 'calc(infinity * 1px)',
    bottom: 0,
    height: 2,
    left: 0,
    position: 'absolute',
    transitionDuration: '150ms',
    transitionProperty: {
      [still]: 'none',
      default: 'translate, width',
    },
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    translate: 'var(--active-tab-left) 0',
    width: 'var(--active-tab-width)',
  },
})
