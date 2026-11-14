'use client'

import {
  Toolbar as Component,
  type ToolbarSeparatorProps as ComponentProps,
} from '@base-ui/react/toolbar'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'

export type ToolbarSeparatorProps = Omit<
  ComponentProps,
  'className' | 'style'
> & {
  className?: string
  style?: CSSProperties
}

// base ui turns it across the toolbar: an upright line in a row of controls
export function Separator({
  className,
  style,
  ...props
}: ToolbarSeparatorProps) {
  return (
    <Component.Separator
      {...props}
      {...merge(stylex.props(styles.main), className, style)}
    />
  )
}

const upright = ':is([data-orientation="vertical"])'

const styles = stylex.create({
  main: {
    alignSelf: 'stretch',
    backgroundColor: 'var(--gray-a6)',
    flexShrink: 0,
    height: {
      [upright]: 'auto',
      default: 1,
    },
    marginBlock: 'calc(var(--spacing) * 1)',
    marginInline: 'calc(var(--spacing) * 1)',
    width: {
      [upright]: 1,
      default: 'auto',
    },
  },
})
