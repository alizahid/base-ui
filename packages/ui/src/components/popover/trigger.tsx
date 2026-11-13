'use client'

import {
  Popover as Component,
  type PopoverTriggerProps as ComponentTriggerProps,
} from '@base-ui/react/popover'

export type PopoverTriggerProps = ComponentTriggerProps

// unstyled: pass the element that opens the popover as `render`, e.g.
// render={<Button />}
export function Trigger(props: PopoverTriggerProps) {
  return <Component.Trigger {...props} />
}
