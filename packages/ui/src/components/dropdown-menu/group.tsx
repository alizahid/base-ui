'use client'

import {
  Menu as Component,
  type MenuGroupProps as ComponentProps,
} from '@base-ui/react/menu'

export type DropdownMenuGroupProps = ComponentProps

export function Group(props: DropdownMenuGroupProps) {
  return <Component.Group {...props} />
}
