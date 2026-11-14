'use client'

import {
  Drawer as Component,
  type DrawerCloseProps as ComponentCloseProps,
} from '@base-ui/react/drawer'

export type DrawerCloseProps = ComponentCloseProps

// unstyled, like Trigger: render={<Button />}
export function Close(props: DrawerCloseProps) {
  return <Component.Close {...props} />
}
