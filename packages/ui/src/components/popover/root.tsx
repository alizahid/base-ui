'use client'

import {
  Popover as Component,
  type PopoverRootProps as ComponentRootProps,
} from '@base-ui/react/popover'

export type PopoverRootProps = ComponentRootProps

export function Root(props: PopoverRootProps) {
  return <Component.Root {...props} />
}
