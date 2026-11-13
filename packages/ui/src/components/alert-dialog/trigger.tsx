'use client'

import {
  AlertDialog as Component,
  type AlertDialogTriggerProps as ComponentTriggerProps,
} from '@base-ui/react/alert-dialog'

export type AlertDialogTriggerProps = ComponentTriggerProps

// unstyled: render={<Button />}
export function Trigger(props: AlertDialogTriggerProps) {
  return <Component.Trigger {...props} />
}
