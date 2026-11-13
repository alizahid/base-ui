'use client'

import {
  Combobox as Component,
  type ComboboxItemProps as ComponentItemProps,
} from '@base-ui/react/combobox'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { CheckIcon } from '../../lib/icons.js'
import { menu } from '../../lib/menu.js'
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
      {...merge(stylex.props(menu.item), className, style)}
    >
      <Component.ItemIndicator {...stylex.props(menu.indicator)}>
        <CheckIcon {...stylex.props(menu.check)} />
      </Component.ItemIndicator>

      <span {...stylex.props(menu.text)}>{children}</span>
    </Component.Item>
  )
}
