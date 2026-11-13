'use client'

import {
  Combobox as Component,
  type ComboboxRootProps as ComponentRootProps,
} from '@base-ui/react/combobox'

import { type Size, SizeContext } from '../../lib/size.js'
import { MultipleContext } from './context.js'

export type ComboboxRootProps<
  Value,
  Multiple extends boolean | undefined = false,
> = ComponentRootProps<Value, Multiple> & {
  size?: Size
}

// pass the options as `items`: base ui filters them as the user types
export function Root<Value, Multiple extends boolean | undefined = false>({
  size = '2',
  ...props
}: ComboboxRootProps<Value, Multiple>) {
  return (
    <SizeContext value={size}>
      <MultipleContext value={Boolean(props.multiple)}>
        <Component.Root {...props} />
      </MultipleContext>
    </SizeContext>
  )
}
