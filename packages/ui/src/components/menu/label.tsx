'use client'

import {
  Menu as Component,
  type MenuGroupLabelProps as ComponentProps,
} from '@base-ui/react/menu'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { listbox } from '#lib/listbox.js'
import { merge } from '#lib/stylex.js'

export type MenuLabelProps = ComponentProps & {
  className?: string
  style?: CSSProperties
}

// a group's heading; goes inside Menu.Group
export function Label({ className, style, ...props }: MenuLabelProps) {
  return (
    <Component.GroupLabel
      {...props}
      {...merge(stylex.props(listbox.label), className, style)}
    />
  )
}
