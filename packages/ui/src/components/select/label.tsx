'use client'

import {
  Select as Component,
  type SelectGroupLabelProps,
} from '@base-ui/react/select'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { menu } from '../../lib/menu.js'
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
      {...merge(stylex.props(menu.label), className, style)}
    />
  )
}
