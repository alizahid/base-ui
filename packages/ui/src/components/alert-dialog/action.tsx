'use client'

import {
  type AlertDialogCloseProps,
  AlertDialog as Component,
} from '@base-ui/react/alert-dialog'

export type AlertDialogActionProps = AlertDialogCloseProps

// Action and Cancel both close the dialog; they are separate so the two
// buttons read clearly. put the action's own work in its onClick
export function Action(props: AlertDialogActionProps) {
  return <Component.Close {...props} />
}
