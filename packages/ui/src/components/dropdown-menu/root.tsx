'use client'

import {
  Menu as Component,
  type MenuRootProps as ComponentRootProps,
} from '@base-ui/react/menu'

export type DropdownMenuRootProps = ComponentRootProps

export function Root(props: DropdownMenuRootProps) {
  return <Component.Root {...props} />
}
