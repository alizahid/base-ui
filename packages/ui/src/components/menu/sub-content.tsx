'use client'

import {
  Menu as Component,
  type MenuPopupProps,
  type MenuPositionerProps,
} from '@base-ui/react/menu'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, use } from 'react'

import { panel } from '../../lib/panel.js'
import { merge } from '../../lib/stylex.js'
import { ThemeContext } from '../../lib/theme.js'
import { MenuContext } from './context.js'
import { menu, menuSizes } from './styles.js'

export type MenuSubContentProps = MenuPopupProps &
  Pick<MenuPositionerProps, 'align' | 'alignOffset' | 'side' | 'sideOffset'> & {
    className?: string
    style?: CSSProperties
  }

// the popup of a submenu; goes inside Menu.Sub. it takes its size,
// variant and color from the menu's content
export function SubContent({
  align,
  alignOffset,
  side,
  sideOffset = 1,
  className,
  style,
  ...props
}: MenuSubContentProps) {
  const theme = use(ThemeContext)
  const { color, size } = use(MenuContext)

  return (
    <Component.Portal>
      <Component.Positioner
        align={align}
        // radix lines the submenu's first row up with its trigger
        alignOffset={alignOffset ?? -Number(size) * 4}
        collisionPadding={8}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(panel.positioner)}
      >
        {/* portaled out of the provider's element, so its colors are set again */}
        <Component.Popup
          data-accent={color ?? theme.accent}
          data-gray={theme.gray}
          {...props}
          {...merge(
            stylex.props(menu.content, panel.motion, menuSizes[size]),
            className,
            style,
          )}
        />
      </Component.Positioner>
    </Component.Portal>
  )
}
