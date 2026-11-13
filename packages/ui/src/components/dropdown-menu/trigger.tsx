'use client'

import {
  Menu as Component,
  type MenuTriggerProps as ComponentTriggerProps,
} from '@base-ui/react/menu'

export type DropdownMenuTriggerProps = ComponentTriggerProps

// unstyled: pass the element that opens the menu as `render`, e.g.
// render={<Button />}
export function Trigger(props: DropdownMenuTriggerProps) {
  return <Component.Trigger {...props} />
}
