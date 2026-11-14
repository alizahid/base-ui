'use client'

import {
  Drawer as Component,
  type DrawerTriggerProps as ComponentTriggerProps,
} from '@base-ui/react/drawer'

export type DrawerTriggerProps = ComponentTriggerProps

// unstyled: pass the element to open the drawer with as `render`, e.g.
// render={<Button />}
export function Trigger(props: DrawerTriggerProps) {
  return <Component.Trigger {...props} />
}
