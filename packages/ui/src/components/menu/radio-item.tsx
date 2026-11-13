'use client'

import {
  Menu as Component,
  type MenuRadioItemProps as ComponentItemProps,
} from '@base-ui/react/menu'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, type ReactNode, use } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { CheckIcon } from '../../lib/icons.js'
import { merge } from '../../lib/stylex.js'
import { MenuContext } from './context.js'
import { menu, menuContrast, menuVariants } from './styles.js'

export type MenuRadioItemProps = ComponentItemProps & {
  className?: string
  color?: ColorToken | 'gray'
  shortcut?: ReactNode
  style?: CSSProperties
}

// one choice in a Menu.RadioGroup, picked by its `value`
export function RadioItem({
  children,
  className,
  color,
  shortcut,
  style,
  ...props
}: MenuRadioItemProps) {
  const { highContrast, variant } = use(MenuContext)

  return (
    <Component.RadioItem
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
      <Component.RadioItemIndicator {...stylex.props(menu.indicator)}>
        <CheckIcon {...stylex.props(menu.check)} />
      </Component.RadioItemIndicator>

      {children}

      {shortcut ? <div {...stylex.props(menu.shortcut)}>{shortcut}</div> : null}
    </Component.RadioItem>
  )
}
