'use client'

import {
  type AlertDialogCloseProps,
  AlertDialog as Component,
  type AlertDialogRootProps as ComponentRootProps,
  type AlertDialogTriggerProps as ComponentTriggerProps,
} from '@base-ui/react/alert-dialog'

import {
  type DialogContentProps,
  type DialogDescriptionProps,
  type DialogTitleProps,
} from '../dialog/index.js'

// a dialog that needs an answer: base ui won't close it on an outside click.
// everything but the root and the trigger is the same as Dialog
export {
  Content,
  Description,
  Title,
} from '../dialog/index.js'

export type AlertDialogRootProps = ComponentRootProps

export function Root(props: AlertDialogRootProps) {
  return <Component.Root {...props} />
}

export type AlertDialogTriggerProps = ComponentTriggerProps

// unstyled: render={<Button />}
export function Trigger(props: AlertDialogTriggerProps) {
  return <Component.Trigger {...props} />
}

export type AlertDialogContentProps = DialogContentProps
export type AlertDialogTitleProps = DialogTitleProps
export type AlertDialogDescriptionProps = DialogDescriptionProps

export type AlertDialogActionProps = AlertDialogCloseProps

// Action and Cancel both close the dialog; they are separate so the two
// buttons read clearly. put the action's own work in its onClick
export function Action(props: AlertDialogActionProps) {
  return <Component.Close {...props} />
}

export type AlertDialogCancelProps = AlertDialogCloseProps

export function Cancel(props: AlertDialogCancelProps) {
  return <Component.Close {...props} />
}
