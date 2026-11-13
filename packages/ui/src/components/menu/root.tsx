'use client'

import {
  Menu as Component,
  type MenuRootProps as ComponentRootProps,
} from '@base-ui/react/menu'

export type MenuRootProps = ComponentRootProps

export function Root(props: MenuRootProps) {
  return <Component.Root {...props} />
}
