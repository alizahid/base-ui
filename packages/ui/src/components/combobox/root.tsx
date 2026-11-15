'use client'

import {
  Combobox as Component,
  type ComboboxRootProps as ComponentRootProps,
} from '@base-ui/react/combobox'

import { type Size, SizeContext } from '#lib/size.js'

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
        <Component.Root isItemEqualToValue={isEqual} {...props} />
      </MultipleContext>
    </SizeContext>
  )
}

// base ui compares items to the value by identity, so a { label, value }
// object built apart from `items` (a default from a form, anything sent from
// the server) would show as a chip but not as selected in the list. objects
// with a `value` are compared by it instead. `isItemEqualToValue` overrides
// this
function isEqual(item: unknown, value: unknown) {
  return hasValue(item) && hasValue(value)
    ? Object.is(item.value, value.value)
    : Object.is(item, value)
}

function hasValue(item: unknown): item is {
  value: unknown
} {
  return typeof item === 'object' && item !== null && 'value' in item
}
