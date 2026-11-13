'use client'

import {
  Menu as Component,
  type MenuRadioGroupProps as ComponentProps,
} from '@base-ui/react/menu'

export type MenuRadioGroupProps = ComponentProps

// holds the selected `value` for the RadioItems inside
export function RadioGroup(props: MenuRadioGroupProps) {
  return <Component.RadioGroup {...props} />
}
