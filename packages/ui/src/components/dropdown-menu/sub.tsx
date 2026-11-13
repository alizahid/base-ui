'use client'

import {
  Menu as Component,
  type MenuSubmenuRootProps as ComponentProps,
} from '@base-ui/react/menu'

export type DropdownMenuSubProps = ComponentProps

// wraps a SubTrigger and its SubContent
export function Sub(props: DropdownMenuSubProps) {
  return <Component.SubmenuRoot {...props} />
}
