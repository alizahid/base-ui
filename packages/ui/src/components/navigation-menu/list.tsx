'use client'

import {
  NavigationMenu as Component,
  type NavigationMenuListProps as ComponentProps,
} from '@base-ui/react/navigation-menu'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'

export type NavigationMenuListProps = Omit<
  ComponentProps,
  'className' | 'style'
> & {
  className?: string
  style?: CSSProperties
}

export function List({ className, style, ...props }: NavigationMenuListProps) {
  return (
    <Component.List
      {...props}
      {...merge(stylex.props(styles.main), className, style)}
    />
  )
}

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'var(--navigation-direction, row)',
    gap: 'calc(var(--spacing) * 2)',
    position: 'relative',
  },
})
