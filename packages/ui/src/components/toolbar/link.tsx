'use client'

import {
  Toolbar as Component,
  type ToolbarLinkProps as ComponentProps,
} from '@base-ui/react/toolbar'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'

export type ToolbarLinkProps = Omit<ComponentProps, 'className' | 'style'> & {
  className?: string
  style?: CSSProperties
}

// a link among the controls, muted like the ghost buttons beside it
export function Link({ className, style, ...props }: ToolbarLinkProps) {
  return (
    <Component.Link
      {...props}
      {...merge(stylex.props(styles.main), className, style)}
    />
  )
}

const styles = stylex.create({
  main: {
    borderRadius: 'var(--ui-radius-sm)',
    color: {
      ':hover': {
        '@media (hover: hover)': 'var(--gray-12)',
        default: null,
      },
      default: 'var(--gray-11)',
    },
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
    outline: {
      ':focus-visible': '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: 2,
    paddingInline: 'calc(var(--ui-spacing) * 2)',
    whiteSpace: 'nowrap',
  },
})
