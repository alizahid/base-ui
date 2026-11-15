'use client'

import {
  Select as Component,
  type SelectItemProps as ComponentItemProps,
} from '@base-ui/react/select'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { CheckIcon, icon } from '#lib/icons.js'
import { listbox } from '#lib/listbox.js'
import { merge } from '#lib/stylex.js'

export type SelectItemProps = ComponentItemProps & {
  className?: string
  style?: CSSProperties
}

export function Item({
  children,
  className,
  style,
  ...props
}: SelectItemProps) {
  return (
    <Component.Item
      {...props}
      {...merge(stylex.props(listbox.item), className, style)}
    >
      <Component.ItemIndicator {...stylex.props(listbox.indicator)}>
        <CheckIcon {...stylex.props(icon.small)} />
      </Component.ItemIndicator>

      <Component.ItemText {...stylex.props(listbox.text)}>
        {children}
      </Component.ItemText>
    </Component.Item>
  )
}
