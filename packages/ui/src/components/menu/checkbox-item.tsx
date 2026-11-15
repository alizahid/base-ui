'use client'

import {
  Menu as Component,
  type MenuCheckboxItemProps as ComponentItemProps,
} from '@base-ui/react/menu'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, type ReactNode, use } from 'react'

import { type ColorToken } from '#lib/colors.js'
import { CheckIcon, icon } from '#lib/icons.js'
import { listbox } from '#lib/listbox.js'
import { merge } from '#lib/stylex.js'

import { MenuContext } from './context.js'
import { menu, menuContrast, menuVariants } from './styles.js'

export type MenuCheckboxItemProps = ComponentItemProps & {
  className?: string
  color?: ColorToken | 'gray'
  shortcut?: ReactNode
  style?: CSSProperties
}

// a row that toggles: `checked` / `defaultChecked` / `onCheckedChange`
export function CheckboxItem({
  children,
  className,
  color,
  shortcut,
  style,
  ...props
}: MenuCheckboxItemProps) {
  const { highContrast, variant } = use(MenuContext)

  return (
    <Component.CheckboxItem
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
      <Component.CheckboxItemIndicator {...stylex.props(listbox.indicator)}>
        <CheckIcon {...stylex.props(icon.small)} />
      </Component.CheckboxItemIndicator>

      {children}

      {shortcut ? <div {...stylex.props(menu.shortcut)}>{shortcut}</div> : null}
    </Component.CheckboxItem>
  )
}
