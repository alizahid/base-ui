'use client'

import {
  Select as Component,
  type SelectGroupLabelProps,
} from '@base-ui/react/select'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'

export type SelectLabelProps = SelectGroupLabelProps & {
  className?: string
  style?: CSSProperties
}

// a group's heading; goes inside Select.Group
export function Label({ className, style, ...props }: SelectLabelProps) {
  return (
    <Component.GroupLabel
      {...props}
      {...merge(stylex.props(styles.label), className, style)}
    />
  )
}

// ported from radix themes' select.css, with solid colors in place of alpha
// ones. the invalid state is ours, for Field. a ghost trigger is a standard
// one with a transparent background, without radix's negative margins
const styles = stylex.create({
  label: {
    alignItems: 'center',
    color: 'var(--gray-10)',
    cursor: 'default',
    display: 'flex',
    height: 'var(--select-item-height)',
    paddingInlineEnd: 'var(--select-separator-margin)',
    paddingInlineStart: 'var(--select-indicator-width)',
    userSelect: 'none',
  },
})
