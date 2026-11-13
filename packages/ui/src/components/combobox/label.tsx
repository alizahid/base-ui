'use client'

import {
  type ComboboxGroupLabelProps,
  Combobox as Component,
} from '@base-ui/react/combobox'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { listbox } from '../../lib/listbox.js'
import { merge } from '../../lib/stylex.js'

export type ComboboxLabelProps = ComboboxGroupLabelProps & {
  className?: string
  style?: CSSProperties
}

// a group's heading; goes inside Combobox.Group
export function Label({ className, style, ...props }: ComboboxLabelProps) {
  return (
    <Component.GroupLabel
      {...props}
      {...merge(stylex.props(listbox.label), className, style)}
    />
  )
}
