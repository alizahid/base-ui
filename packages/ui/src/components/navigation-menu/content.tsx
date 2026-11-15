'use client'

import {
  NavigationMenu as Component,
  type NavigationMenuContentProps as ComponentProps,
} from '@base-ui/react/navigation-menu'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, createContext } from 'react'

import { merge } from '../../lib/stylex.js'

export type NavigationMenuContentProps = Omit<
  ComponentProps,
  'className' | 'style'
> & {
  className?: string
  style?: CSSProperties
}

// a Root inside a Content is a submenu, and renders as one of its list's
// items
export const ContentContext = createContext(false)

// what a trigger opens, shown in the shared popup: a list of Links. as wide as
// what is inside it, up to 512px; lay the links out with a className
export function Content({
  children,
  className,
  style,
  ...props
}: NavigationMenuContentProps) {
  return (
    <Component.Content
      render={<ul />}
      {...props}
      {...merge(stylex.props(styles.main), className, style)}
    >
      <ContentContext value>{children}</ContentContext>
    </Component.Content>
  )
}

// the content slides in from the side of the trigger the pointer came from,
// and the one it replaces leaves the other way
const startLeft = ':is([data-starting-style][data-activation-direction="left"])'
const startRight =
  ':is([data-starting-style][data-activation-direction="right"])'
const startUp = ':is([data-starting-style][data-activation-direction="up"])'
const startDown = ':is([data-starting-style][data-activation-direction="down"])'
const endLeft = ':is([data-ending-style][data-activation-direction="left"])'
const endRight = ':is([data-ending-style][data-activation-direction="right"])'
const endUp = ':is([data-ending-style][data-activation-direction="up"])'
const endDown = ':is([data-ending-style][data-activation-direction="down"])'

const styles = stylex.create({
  main: {
    // links in here are roomier rows
    '--navigation-item-justify': 'flex-start',
    '--navigation-item-padding':
      'calc(var(--spacing) * 2) calc(var(--spacing) * 3)',
    '--navigation-item-width': '100%',
    height: '100%',
    maxHeight: 'var(--available-height)',
    maxWidth:
      'min(calc(var(--spacing) * 128), calc(100vw - var(--spacing) * 5))',
    opacity: {
      ':is([data-starting-style], [data-ending-style])': 0,
      default: null,
    },
    overflowY: 'auto',
    padding: 'calc(var(--spacing) * 2)',
    transform: {
      [endDown]: 'translateY(-50%)',
      [endLeft]: 'translateX(50%)',
      [endRight]: 'translateX(-50%)',
      [endUp]: 'translateY(50%)',
      [startDown]: 'translateY(50%)',
      [startLeft]: 'translateX(-50%)',
      [startRight]: 'translateX(50%)',
      [startUp]: 'translateY(-50%)',
      default: null,
    },
    // the fade is over before the slide
    transitionDuration: '150ms, 300ms',
    transitionProperty: {
      '@media (prefers-reduced-motion: reduce)': 'none',
      default: 'opacity, transform',
    },
    transitionTimingFunction: 'ease, cubic-bezier(0.16, 1, 0.3, 1)',
    width: 'max-content',
  },
})
