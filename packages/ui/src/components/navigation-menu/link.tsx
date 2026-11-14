'use client'

import {
  NavigationMenu as Component,
  type NavigationMenuLinkProps as ComponentProps,
} from '@base-ui/react/navigation-menu'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, type ReactNode } from 'react'

import { merge } from '../../lib/stylex.js'
import { navigation } from './styles.js'

export type NavigationMenuLinkProps = Omit<
  ComponentProps,
  'className' | 'style'
> & {
  className?: string
  // a muted line under the link's text, for links inside a Content
  description?: ReactNode
  style?: CSSProperties
}

// a list item with a link in it, so it goes straight into a List or a
// Content. `active` marks the current page, and `render` swaps in a
// framework's link
export function Link({
  children,
  className,
  description,
  style,
  ...props
}: NavigationMenuLinkProps) {
  const stacked = description !== undefined

  return (
    <li {...stylex.props(styles.main)}>
      <Component.Link
        {...props}
        {...merge(
          stylex.props(navigation.item, stacked && styles.stacked),
          className,
          style,
        )}
      >
        {stacked ? (
          <>
            <span {...stylex.props(styles.title)}>{children}</span>
            <span {...stylex.props(styles.description)}>{description}</span>
          </>
        ) : (
          children
        )}
      </Component.Link>
    </li>
  )
}

const styles = stylex.create({
  description: {
    color: 'var(--gray-a11)',
  },
  // the link fills it, so links in a grid row are as tall as each other
  main: {
    display: 'flex',
  },
  stacked: {
    alignItems: 'stretch',
    flexDirection: 'column',
    gap: 2,
    // from the top, so titles in a grid row line up
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: '500',
  },
})
