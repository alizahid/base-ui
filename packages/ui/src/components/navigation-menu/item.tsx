'use client'

import {
  NavigationMenu as Component,
  type NavigationMenuItemProps as ComponentProps,
} from '@base-ui/react/navigation-menu'

export type NavigationMenuItemProps = ComponentProps

// a Trigger and its Content. a Link is an item by itself
export function Item(props: NavigationMenuItemProps) {
  return <Component.Item {...props} />
}
