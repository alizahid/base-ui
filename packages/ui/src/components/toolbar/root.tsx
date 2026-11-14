'use client'

import {
  Toolbar as Component,
  type ToolbarRootProps as ComponentProps,
} from '@base-ui/react/toolbar'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'

export type ToolbarRootProps = Omit<ComponentProps, 'className' | 'style'> & {
  className?: string
  style?: CSSProperties
  variant?: 'ghost' | 'surface'
}

// a row of controls that is one stop in the tab order: arrow keys move
// between them. radix themes has no toolbar, so the look is our own: surface
// is a small panel around the controls, ghost only lays them out
export function Root({
  className,
  style,
  variant = 'surface',
  ...props
}: ToolbarRootProps) {
  return (
    <Component.Root
      {...props}
      {...merge(stylex.props(styles.main, variants[variant]), className, style)}
    />
  )
}

const styles = stylex.create({
  main: {
    alignItems: {
      ':is([data-orientation="vertical"])': 'stretch',
      default: 'center',
    },
    boxSizing: 'border-box',
    display: 'inline-flex',
    flexDirection: {
      ':is([data-orientation="vertical"])': 'column',
      default: 'row',
    },
    gap: 'calc(var(--spacing) * 1)',
  },
})

const variants = stylex.create({
  ghost: {},
  // the radius is a size 2 button's, plus the padding around it
  surface: {
    backgroundColor: 'var(--panel-background)',
    borderRadius: 'calc(var(--radius-md) + var(--spacing) * 1)',
    boxShadow: 'inset 0 0 0 1px var(--gray-a6)',
    padding: 'calc(var(--spacing) * 1)',
  },
})
