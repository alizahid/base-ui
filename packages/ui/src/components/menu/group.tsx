'use client'

import {
  Menu as Component,
  type MenuGroupProps as ComponentProps,
} from '@base-ui/react/menu'

export type MenuGroupProps = ComponentProps

export function Group(props: MenuGroupProps) {
  return <Component.Group {...props} />
}
