'use client'

import {
  Menu as Component,
  type MenuSubmenuTriggerProps as ComponentTriggerProps,
} from '@base-ui/react/menu'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, use } from 'react'

import { ChevronRightIcon } from '../../lib/icons.js'
import { merge } from '../../lib/stylex.js'
import { MenuContext } from './context.js'
import { menu, menuContrast, menuVariants } from './styles.js'

export type MenuSubTriggerProps = ComponentTriggerProps & {
  className?: string
  style?: CSSProperties
}

// the row that opens a submenu; goes inside Menu.Sub
export function SubTrigger({
  children,
  className,
  style,
  ...props
}: MenuSubTriggerProps) {
  const { highContrast, variant } = use(MenuContext)

  return (
    <Component.SubmenuTrigger
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

      <div {...stylex.props(menu.shortcut)}>
        <ChevronRightIcon {...stylex.props(menu.chevron)} />
      </div>
    </Component.SubmenuTrigger>
  )
}
