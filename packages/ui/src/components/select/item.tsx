'use client'

import {
  Select as Component,
  type SelectItemProps as ComponentItemProps,
} from '@base-ui/react/select'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { CheckIcon } from '../../lib/icons.js'
import { menu } from '../../lib/menu.js'
import { merge } from '../../lib/stylex.js'

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
      {...merge(stylex.props(menu.item), className, style)}
    >
      <Component.ItemIndicator {...stylex.props(menu.indicator)}>
        <CheckIcon {...stylex.props(menu.check)} />
      </Component.ItemIndicator>

      <Component.ItemText {...stylex.props(menu.text)}>
        {children}
      </Component.ItemText>
    </Component.Item>
  )
}
