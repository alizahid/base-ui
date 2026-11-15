'use client'

import {
  Select as Component,
  type SelectRootProps as ComponentRootProps,
} from '@base-ui/react/select'

import { type Size, SizeContext } from '#lib/size.js'

export type SelectRootProps<
  Value,
  Multiple extends boolean | undefined = false,
> = ComponentRootProps<Value, Multiple> & {
  size?: Size
}

export function Root<Value, Multiple extends boolean | undefined = false>({
  size = '2',
  ...props
}: SelectRootProps<Value, Multiple>) {
  return (
    <SizeContext value={size}>
      <Component.Root {...props} />
    </SizeContext>
  )
}
