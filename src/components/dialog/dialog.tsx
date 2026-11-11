import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { useThemeProps } from '../theme-provider'

export const DialogRoot = BaseDialog.Root

export type DialogRootProps = ComponentProps<typeof BaseDialog.Root>

export const DialogTrigger = BaseDialog.Trigger

export type DialogTriggerProps = ComponentProps<typeof BaseDialog.Trigger>

export const DialogClose = BaseDialog.Close

export type DialogCloseProps = ComponentProps<typeof BaseDialog.Close>

export const dialogContentVariants = tv({
  base: [
    'relative w-full rounded-ui-xl bg-panel text-gray-12 shadow-xl inset-ring inset-ring-gray-a5 outline-none',
    'transition-[opacity,scale] duration-150',
    'data-starting-style:scale-95 data-starting-style:opacity-0',
    'data-ending-style:scale-95 data-ending-style:opacity-0',
  ],
  variants: {
    size: {
      sm: 'max-w-sm p-4',
      md: 'max-w-md p-6',
      lg: 'max-w-xl p-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type DialogContentProps = Omit<ComponentProps<typeof BaseDialog.Popup>, 'className'> &
  VariantProps<typeof dialogContentVariants> &
  Pick<ComponentProps<typeof BaseDialog.Portal>, 'container' | 'keepMounted'> & {
    className?: string
    /** Classes for the parts that `Content` renders around itself. */
    classNames?: {
      backdrop?: string
      viewport?: string
    }
  }

/** The dialog box. Base UI's `Portal`, `Backdrop`, `Viewport` and `Popup` in one. */
export function DialogContent({
  className,
  classNames,
  container,
  keepMounted,
  size,
  ...props
}: DialogContentProps) {
  const themeProps = useThemeProps()

  return (
    <BaseDialog.Portal {...themeProps} container={container} keepMounted={keepMounted}>
      <BaseDialog.Backdrop
        className={cn(
          'fixed inset-0 bg-overlay transition-opacity duration-150',
          'data-ending-style:opacity-0 data-starting-style:opacity-0',
          classNames?.backdrop,
        )}
      />
      <BaseDialog.Viewport
        className={cn('fixed inset-0 flex items-center justify-center p-4', classNames?.viewport)}
      >
        <BaseDialog.Popup {...props} className={cn(dialogContentVariants({ size }), className)} />
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  )
}

export type DialogTitleProps = Omit<ComponentProps<typeof BaseDialog.Title>, 'className'> & {
  className?: string
}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <BaseDialog.Title {...props} className={cn('mb-2 font-bold text-xl', className)} />
}

export type DialogDescriptionProps = Omit<
  ComponentProps<typeof BaseDialog.Description>,
  'className'
> & {
  className?: string
}

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return <BaseDialog.Description {...props} className={cn('mb-4 text-gray-11', className)} />
}
