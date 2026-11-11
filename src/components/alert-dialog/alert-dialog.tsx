import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import type { ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import {
  dialogBackdrop,
  dialogContentVariants,
  dialogDescription,
  dialogTitle,
  dialogViewport,
} from '../dialog/dialog'
import { useThemeProps } from '../theme-provider'

export const AlertDialogRoot = BaseAlertDialog.Root

export type AlertDialogRootProps = ComponentProps<typeof BaseAlertDialog.Root>

export const AlertDialogTrigger = BaseAlertDialog.Trigger

export type AlertDialogTriggerProps = ComponentProps<typeof BaseAlertDialog.Trigger>

/** The button that confirms. Closes the dialog; do the work in `onClick`. */
export const AlertDialogAction = BaseAlertDialog.Close

export type AlertDialogActionProps = ComponentProps<typeof BaseAlertDialog.Close>

/** The button that backs out. Closes the dialog. */
export const AlertDialogCancel = BaseAlertDialog.Close

export type AlertDialogCancelProps = ComponentProps<typeof BaseAlertDialog.Close>

// Same box as Dialog, like in Radix Themes
export const alertDialogContentVariants = dialogContentVariants

export type AlertDialogContentProps = Omit<
  ComponentProps<typeof BaseAlertDialog.Popup>,
  'className'
> &
  VariantProps<typeof alertDialogContentVariants> &
  Pick<ComponentProps<typeof BaseAlertDialog.Portal>, 'container' | 'keepMounted'> & {
    className?: string
    /** Classes for the parts that `Content` renders around itself. */
    classNames?: {
      backdrop?: string
      viewport?: string
    }
  }

/** The dialog box. Base UI's `Portal`, `Backdrop`, `Viewport` and `Popup` in one. */
export function AlertDialogContent({
  className,
  classNames,
  container,
  keepMounted,
  size,
  ...props
}: AlertDialogContentProps) {
  const themeProps = useThemeProps()

  return (
    <BaseAlertDialog.Portal {...themeProps} container={container} keepMounted={keepMounted}>
      <BaseAlertDialog.Backdrop className={cn(dialogBackdrop, classNames?.backdrop)} />
      <BaseAlertDialog.Viewport className={cn(dialogViewport, classNames?.viewport)}>
        <BaseAlertDialog.Popup
          {...props}
          className={cn(alertDialogContentVariants({ size }), className)}
        />
      </BaseAlertDialog.Viewport>
    </BaseAlertDialog.Portal>
  )
}

export type AlertDialogTitleProps = Omit<
  ComponentProps<typeof BaseAlertDialog.Title>,
  'className'
> & {
  className?: string
}

export function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return <BaseAlertDialog.Title {...props} className={cn(dialogTitle, className)} />
}

export type AlertDialogDescriptionProps = Omit<
  ComponentProps<typeof BaseAlertDialog.Description>,
  'className'
> & {
  className?: string
}

export function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return <BaseAlertDialog.Description {...props} className={cn(dialogDescription, className)} />
}
