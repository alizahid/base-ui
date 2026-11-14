'use client'

import {
  Autocomplete as Component,
  type AutocompleteRootProps as ComponentRootProps,
} from '@base-ui/react/autocomplete'

import { type Size, SizeContext } from '../../lib/size.js'

export type AutocompleteRootProps<Value> = ComponentRootProps<Value> & {
  size?: Size
}

// a text input with suggestions: the value is the text, and picking a
// suggestion fills it in. for choosing one of a set, use Combobox. pass the
// suggestions as `items`: base ui filters them as the user types
export function Root<Value>({
  size = '2',
  ...props
}: AutocompleteRootProps<Value>) {
  return (
    <SizeContext value={size}>
      {/* base ui types flat and grouped `items` as two overloads, which a
          generic wrapper can't forward to; the props are the same at runtime */}
      <Component.Root {...(props as Omit<typeof props, 'items'>)} />
    </SizeContext>
  )
}
