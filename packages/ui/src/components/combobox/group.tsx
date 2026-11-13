'use client'

import {
  Combobox as Component,
  type ComboboxGroupProps as ComponentGroupProps,
} from '@base-ui/react/combobox'

export type ComboboxGroupProps = ComponentGroupProps

export function Group(props: ComboboxGroupProps) {
  return <Component.Group {...props} />
}
