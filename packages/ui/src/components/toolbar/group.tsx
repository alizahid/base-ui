'use client'

import {
  Toolbar as Component,
  type ToolbarGroupProps as ComponentProps,
} from '@base-ui/react/toolbar'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'

export type ToolbarGroupProps = Omit<ComponentProps, 'className' | 'style'> & {
  className?: string
  style?: CSSProperties
}

// controls that belong together: give it an aria-label
export function Group({ className, style, ...props }: ToolbarGroupProps) {
  return (
    <Component.Group
      {...props}
      {...merge(stylex.props(styles.main), className, style)}
    />
  )
}

const styles = stylex.create({
  main: {
    alignItems: {
      ':is([data-orientation="vertical"])': 'stretch',
      default: 'center',
    },
    display: 'flex',
    flexDirection: {
      ':is([data-orientation="vertical"])': 'column',
      default: 'row',
    },
    gap: 'calc(var(--spacing) * 1)',
  },
})
