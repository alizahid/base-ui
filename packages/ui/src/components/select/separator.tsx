'use client'

import {
  Select as Component,
  type SelectSeparatorProps as ComponentSeparatorProps,
} from '@base-ui/react/select'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'

export type SelectSeparatorProps = ComponentSeparatorProps & {
  className?: string
  style?: CSSProperties
}

export function Separator({
  className,
  style,
  ...props
}: SelectSeparatorProps) {
  return (
    <Component.Separator
      {...props}
      {...merge(stylex.props(styles.separator), className, style)}
    />
  )
}

// ported from radix themes' select.css, with solid colors in place of alpha
// ones. the invalid state is ours, for Field. a ghost trigger is a standard
// one with a transparent background, without radix's negative margins
const styles = stylex.create({
  separator: {
    backgroundColor: 'var(--gray-6)',
    height: 1,
    marginBlock: 'calc(var(--spacing) * 2)',
    marginInlineEnd: 'var(--select-separator-margin)',
    marginInlineStart: 'var(--select-indicator-width)',
  },
})
