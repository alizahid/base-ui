'use client'

import {
  Select as Component,
  type SelectSeparatorProps as ComponentSeparatorProps,
} from '@base-ui/react/select'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { listbox } from '../../lib/listbox.js'
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
      {...merge(stylex.props(listbox.separator), className, style)}
    />
  )
}
