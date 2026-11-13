'use client'

import {
  Dialog as Component,
  type DialogRootProps as ComponentRootProps,
} from '@base-ui/react/dialog'

export type DialogRootProps = ComponentRootProps

export function Root(props: DialogRootProps) {
  return <Component.Root {...props} />
}
