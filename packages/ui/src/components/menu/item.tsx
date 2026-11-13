'use client'

import {
  Menu as Component,
  type MenuItemProps as ComponentItemProps,
} from '@base-ui/react/menu'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, type ReactNode, use } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { merge } from '../../lib/stylex.js'
import { MenuContext } from './context.js'
import { menu, menuContrast, menuVariants } from './styles.js'

export type MenuItemProps = ComponentItemProps & {
  className?: string
  color?: ColorToken | 'gray'
  shortcut?: ReactNode
  style?: CSSProperties
}

// `color` tints the row (red for a destructive action); `shortcut` is shown
// at the end of the row
export function Item({
  children,
  className,
  color,
  shortcut,
  style,
  ...props
}: MenuItemProps) {
  const { highContrast, variant } = use(MenuContext)

  return (
    <Component.Item
      data-accent={color}
      {...props}
      {...merge(
        stylex.props(
          menu.item,
          menuVariants[variant],
          highContrast && variant === 'solid' && menuContrast.main,
        ),
        className,
        style,
      )}
    >
      {children}

      {shortcut ? <div {...stylex.props(menu.shortcut)}>{shortcut}</div> : null}
    </Component.Item>
  )
}
