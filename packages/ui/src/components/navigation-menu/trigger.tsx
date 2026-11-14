'use client'

import {
  NavigationMenu as Component,
  type NavigationMenuTriggerProps as ComponentProps,
} from '@base-ui/react/navigation-menu'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { ChevronDownIcon } from '../../lib/icons.js'
import { merge } from '../../lib/stylex.js'
import { navigation } from './styles.js'

export type NavigationMenuTriggerProps = Omit<
  ComponentProps,
  'className' | 'style'
> & {
  className?: string
  style?: CSSProperties
}

// opens its item's Content on hover, press or focus + enter. the chevron is
// included
export function Trigger({
  children,
  className,
  style,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <Component.Trigger
      {...props}
      {...merge(stylex.props(navigation.item, styles.main), className, style)}
    >
      {children}

      <Component.Icon {...stylex.props(styles.icon)}>
        <ChevronDownIcon {...stylex.props(styles.chevron)} />
      </Component.Icon>
    </Component.Trigger>
  )
}

const styles = stylex.create({
  chevron: {
    display: 'block',
    height: '1lh',
    width: '1lh',
  },
  icon: {
    color: 'var(--gray-a11)',
    flexShrink: 0,
    marginInlineEnd: -2,
    rotate: {
      ':is([data-popup-open])': 'var(--navigation-icon-open, 180deg)',
      default: 'var(--navigation-icon-rotate, 0deg)',
    },
    transitionDuration: '200ms',
    transitionProperty: {
      '@media (prefers-reduced-motion: reduce)': 'none',
      default: 'rotate',
    },
  },
  main: {
    whiteSpace: 'nowrap',
  },
})
