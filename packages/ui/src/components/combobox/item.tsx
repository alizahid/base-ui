'use client'

import {
  Combobox as Component,
  type ComboboxItemProps as ComponentItemProps,
} from '@base-ui/react/combobox'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { CheckIcon } from '../../lib/icons.js'
import { listbox } from '../../lib/listbox.js'
import { merge } from '../../lib/stylex.js'

export type ComboboxItemProps = ComponentItemProps & {
  className?: string
  style?: CSSProperties
}

export function Item({
  children,
  className,
  style,
  ...props
}: ComboboxItemProps) {
  return (
    <Component.Item
      {...props}
      {...merge(stylex.props(listbox.item), className, style)}
    >
      <Component.ItemIndicator {...stylex.props(listbox.indicator)}>
        <CheckIcon {...stylex.props(listbox.check)} />
      </Component.ItemIndicator>

      <span {...stylex.props(listbox.text)}>{children}</span>
    </Component.Item>
  )
}
