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

// The curve Radix Themes uses for every open and close animation
const ease = 'ease-[cubic-bezier(0.16,1,0.3,1)]'

/**
 * The dark layer behind a dialog. Fades like Radix Themes' overlay:
 * 200ms in, 160ms out. Also used by `AlertDialog`.
 */
export const dialogBackdrop = [
  'fixed inset-0 bg-overlay transition-opacity duration-200 motion-reduce:transition-none',
  ease,
  'data-ending-style:opacity-0 data-starting-style:opacity-0',
  'data-ending-style:duration-160',
].join(' ')

/**
 * The area the dialog is centered in. It scrolls when the dialog is taller
 * than the screen. Paddings are from Radix Themes: 24px on top, 16px on the
 * sides, and at least 24px (or 6% of the screen) at the bottom.
 */
export const dialogViewport = 'fixed inset-0 flex overflow-auto px-4 pt-6 pb-[max(1.5rem,6vh)]'

// Values follow Radix Themes' Dialog (base-dialog.css). Also used by `AlertDialog`.
export const dialogContentVariants = tv({
  base: [
    // `m-auto` centers the box and still lets the viewport scroll to its top.
    // 600px is the default `maxWidth` of Radix Themes; a `max-w-*` class changes it.
    'relative m-auto w-full max-w-[600px] overflow-auto bg-panel-solid text-gray-12 shadow-ui-6 outline-none',
    // Opens in 200ms from 5px lower and a bit smaller; closes in 100ms
    'transition-[opacity,translate,scale] duration-200 motion-reduce:transition-none',
    ease,
    'data-starting-style:translate-y-[5px] data-starting-style:scale-97 data-starting-style:opacity-0',
    'data-ending-style:translate-y-[5px] data-ending-style:scale-99 data-ending-style:opacity-0',
    'data-ending-style:duration-100',
  ],
  variants: {
    // Radix sizes 1 to 4: padding 12, 16, 24, 32px
    size: {
      sm: 'rounded-panel-lg p-3',
      md: 'rounded-panel-lg p-4',
      lg: 'rounded-panel-xl p-6',
      xl: 'rounded-panel-xl p-8',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
})

/**
 * The title: Radix Themes' Heading size 5 (20px bold) with 12px below.
 * The `before:` part trims the empty space above the first line of text, so
 * the text top sits near the padding edge (Radix's `trim="start"`).
 */
export const dialogTitle = [
  'mb-3 font-bold text-xl leading-[26px] tracking-[-0.005em]',
  "before:table before:mb-[calc(0.42em-0.5lh)] before:content-['']",
].join(' ')

/** The description: Radix Themes' Text size 3 (16px). It has no margin, add your own. */
export const dialogDescription = 'text-base'

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
      <BaseDialog.Backdrop className={cn(dialogBackdrop, classNames?.backdrop)} />
      <BaseDialog.Viewport className={cn(dialogViewport, classNames?.viewport)}>
        <BaseDialog.Popup {...props} className={cn(dialogContentVariants({ size }), className)} />
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  )
}

export type DialogTitleProps = Omit<ComponentProps<typeof BaseDialog.Title>, 'className'> & {
  className?: string
}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <BaseDialog.Title {...props} className={cn(dialogTitle, className)} />
}

export type DialogDescriptionProps = Omit<
  ComponentProps<typeof BaseDialog.Description>,
  'className'
> & {
  className?: string
}

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return <BaseDialog.Description {...props} className={cn(dialogDescription, className)} />
}
