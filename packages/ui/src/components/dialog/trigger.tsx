'use client'

import {
  Dialog as Component,
  type DialogTriggerProps as ComponentTriggerProps,
} from '@base-ui/react/dialog'

export type DialogTriggerProps = ComponentTriggerProps

// unstyled: pass the element to open the dialog with as `render`, e.g.
// render={<Button />}
export function Trigger(props: DialogTriggerProps) {
  return <Component.Trigger {...props} />
}
