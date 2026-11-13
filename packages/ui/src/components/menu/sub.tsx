'use client'

import {
  Menu as Component,
  type MenuSubmenuRootProps as ComponentProps,
} from '@base-ui/react/menu'

export type MenuSubProps = ComponentProps

// wraps a SubTrigger and its SubContent
export function Sub(props: MenuSubProps) {
  return <Component.SubmenuRoot {...props} />
}
