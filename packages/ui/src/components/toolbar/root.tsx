'use client'

import {
  Toolbar as Component,
  type ToolbarRootProps as ComponentProps,
} from '@base-ui/react/toolbar'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '#lib/stylex.js'

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
      {...merge(
        stylex.props(styles.main, variant === 'surface' && variants.surface),
        className,
        style,
      )}
    />
  )
}

const styles = stylex.create({
  main: {
    alignItems: {
      ':is([data-orientation="vertical"])': 'stretch',
      default: 'center',
    },
    display: 'inline-flex',
    flexDirection: {
      ':is([data-orientation="vertical"])': 'column',
      default: null,
    },
    gap: 'calc(var(--ui-spacing) * 1)',
  },
})

const variants = stylex.create({
  surface: {
    backgroundColor: 'var(--panel-background)',
    borderRadius: 'var(--ui-radius-lg)',
    boxShadow: 'inset 0 0 0 1px var(--gray-a6)',
    padding: 'calc(var(--ui-spacing) * 1)',
  },
})
