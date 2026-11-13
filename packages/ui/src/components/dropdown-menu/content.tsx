'use client'

import {
  Menu as Component,
  type MenuPopupProps,
  type MenuPositionerProps,
} from '@base-ui/react/menu'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, use } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { panel } from '../../lib/panel.js'
import { merge } from '../../lib/stylex.js'
import { ThemeContext } from '../../lib/theme.js'
import { MenuContext } from './context.js'
import { menu, menuSizes } from './styles.js'

export type DropdownMenuContentProps = MenuPopupProps &
  Pick<MenuPositionerProps, 'align' | 'alignOffset' | 'side' | 'sideOffset'> & {
    className?: string
    color?: ColorToken | 'gray'
    highContrast?: boolean
    size?: '1' | '2'
    style?: CSSProperties
    variant?: 'solid' | 'soft'
  }

// opens below the trigger, lined up with its start edge, as in radix. size,
// variant, color and highContrast also apply to every submenu inside
export function Content({
  align = 'start',
  alignOffset,
  color,
  highContrast,
  side,
  sideOffset = 4,
  size = '2',
  variant = 'solid',
  className,
  style,
  ...props
}: DropdownMenuContentProps) {
  const theme = use(ThemeContext)

  return (
    <MenuContext
      value={{
        color,
        highContrast,
        size,
        variant,
      }}
    >
      <Component.Portal>
        <Component.Positioner
          align={align}
          alignOffset={alignOffset}
          collisionPadding={10}
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
    </MenuContext>
  )
}
