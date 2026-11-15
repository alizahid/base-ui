'use client'

import { Menu as Component } from '@base-ui/react/menu'
import * as stylex from '@stylexjs/stylex'
import { type ComponentProps, type CSSProperties } from 'react'

import { listbox } from '#lib/listbox.js'
import { merge } from '#lib/stylex.js'

export type MenuSeparatorProps = ComponentProps<typeof Component.Separator> & {
  className?: string
  style?: CSSProperties
}

export function Separator({ className, style, ...props }: MenuSeparatorProps) {
  return (
    <Component.Separator
      {...props}
      {...merge(stylex.props(listbox.separator), className, style)}
    />
  )
}
