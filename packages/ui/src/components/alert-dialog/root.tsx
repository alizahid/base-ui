'use client'

import {
  AlertDialog as Component,
  type AlertDialogRootProps as ComponentRootProps,
} from '@base-ui/react/alert-dialog'

export type AlertDialogRootProps = ComponentRootProps

// a dialog that needs an answer: base ui won't close it on an outside click.
// everything but the root and the trigger is the same as Dialog
export function Root(props: AlertDialogRootProps) {
  return <Component.Root {...props} />
}
