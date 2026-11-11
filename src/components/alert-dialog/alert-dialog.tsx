import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
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

// Same box as Dialog, one step narrower
export const alertDialogContentVariants = tv({
  base: [
    'relative w-full rounded-panel-xl bg-panel text-gray-12 shadow-xl inset-ring inset-ring-gray-a5 outline-none',
    'transition-[opacity,scale] duration-150',
    'data-starting-style:scale-95 data-starting-style:opacity-0',
    'data-ending-style:scale-95 data-ending-style:opacity-0',
  ],
  variants: {
    size: {
      sm: 'max-w-xs p-4',
      md: 'max-w-sm p-6',
      lg: 'max-w-md p-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

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
      <BaseAlertDialog.Backdrop
        className={cn(
          'fixed inset-0 bg-overlay transition-opacity duration-150',
          'data-ending-style:opacity-0 data-starting-style:opacity-0',
          classNames?.backdrop,
        )}
      />
      <BaseAlertDialog.Viewport
        className={cn('fixed inset-0 flex items-center justify-center p-4', classNames?.viewport)}
      >
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
  return <BaseAlertDialog.Title {...props} className={cn('mb-2 font-bold text-xl', className)} />
}

export type AlertDialogDescriptionProps = Omit<
  ComponentProps<typeof BaseAlertDialog.Description>,
  'className'
> & {
  className?: string
}

export function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return <BaseAlertDialog.Description {...props} className={cn('mb-4 text-gray-11', className)} />
}
