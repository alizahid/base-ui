'use client'

import {
  type AlertDialogCloseProps,
  AlertDialog as Component,
} from '@base-ui/react/alert-dialog'

export type AlertDialogCancelProps = AlertDialogCloseProps

export function Cancel(props: AlertDialogCancelProps) {
  return <Component.Close {...props} />
}
