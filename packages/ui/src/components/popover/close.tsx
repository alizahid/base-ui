'use client'

import {
  Popover as Component,
  type PopoverCloseProps as ComponentCloseProps,
} from '@base-ui/react/popover'

export type PopoverCloseProps = ComponentCloseProps

// unstyled, like Trigger: render={<Button />}
export function Close(props: PopoverCloseProps) {
  return <Component.Close {...props} />
}
