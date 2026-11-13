'use client'

import {
  Combobox as Component,
  type ComboboxSeparatorProps as ComponentSeparatorProps,
} from '@base-ui/react/combobox'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { menu } from '../../lib/menu.js'
import { merge } from '../../lib/stylex.js'

export type ComboboxSeparatorProps = ComponentSeparatorProps & {
  className?: string
  style?: CSSProperties
}

export function Separator({
  className,
  style,
  ...props
}: ComboboxSeparatorProps) {
  return (
    <Component.Separator
      {...props}
      {...merge(stylex.props(menu.separator), className, style)}
    />
  )
}
