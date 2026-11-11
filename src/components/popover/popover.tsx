import { Popover as BasePopover } from '@base-ui/react/popover'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type PositionerProps, splitPositionerProps } from '../../lib/positioner'
import { popupAnimation, popupSurface } from '../../lib/styles'
import { useThemeProps } from '../theme-provider'

export const PopoverRoot = BasePopover.Root

export type PopoverRootProps = ComponentProps<typeof BasePopover.Root>

export const PopoverTrigger = BasePopover.Trigger

export type PopoverTriggerProps = ComponentProps<typeof BasePopover.Trigger>

export const PopoverClose = BasePopover.Close

export type PopoverCloseProps = ComponentProps<typeof BasePopover.Close>

/** The box of a popover like popup. Also used by `HoverCard`. */
export const popoverContentVariants = tv({
  base: [popupSurface, popupAnimation, 'max-w-(--available-width)'],
  variants: {
    size: {
      sm: 'p-3 text-sm',
      md: 'p-4 text-base',
      lg: 'p-6 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

/**
 * A small arrow that looks like a corner of the panel: a turned square that
 * sits half outside the popup, with a border on its two outer sides.
 */
export const panelArrow = [
  'size-2.5 rotate-45 border-gray-a5 bg-panel',
  'data-[side=top]:-bottom-[5px] data-[side=top]:border-r data-[side=top]:border-b',
  'data-[side=bottom]:-top-[5px] data-[side=bottom]:border-t data-[side=bottom]:border-l',
  'data-[side=left]:-right-[5px] data-[side=left]:border-t data-[side=left]:border-r',
  'data-[side=right]:-left-[5px] data-[side=right]:border-b data-[side=right]:border-l',
  'data-[side=inline-start]:-right-[5px] data-[side=inline-start]:border-t data-[side=inline-start]:border-r',
  'data-[side=inline-end]:-left-[5px] data-[side=inline-end]:border-b data-[side=inline-end]:border-l',
].join(' ')

export type PopoverContentProps = Omit<ComponentProps<typeof BasePopover.Popup>, 'className'> &
  PositionerProps<ComponentProps<typeof BasePopover.Positioner>> &
  VariantProps<typeof popoverContentVariants> &
  Pick<ComponentProps<typeof BasePopover.Portal>, 'container' | 'keepMounted'> & {
    /**
     * Shows a small arrow that points at the trigger.
     * @default false
     */
    arrow?: boolean
    className?: string
    /** Classes for the parts that `Content` renders around itself. */
    classNames?: {
      arrow?: string
      positioner?: string
    }
  }

/** The popover box. Base UI's `Portal`, `Positioner`, `Popup` and `Arrow` in one. */
export function PopoverContent({
  arrow = false,
  children,
  className,
  classNames,
  container,
  keepMounted,
  size,
  ...props
}: PopoverContentProps) {
  const themeProps = useThemeProps()
  const [positionerProps, popupProps] = splitPositionerProps(props)

  return (
    <BasePopover.Portal {...themeProps} container={container} keepMounted={keepMounted}>
      <BasePopover.Positioner
        sideOffset={8}
        {...positionerProps}
        className={classNames?.positioner}
      >
        <BasePopover.Popup
          {...popupProps}
          className={cn(popoverContentVariants({ size }), className)}
        >
          {arrow && <BasePopover.Arrow className={cn(panelArrow, classNames?.arrow)} />}
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

export type PopoverTitleProps = Omit<ComponentProps<typeof BasePopover.Title>, 'className'> & {
  className?: string
}

export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return <BasePopover.Title {...props} className={cn('mb-1 font-bold', className)} />
}

export type PopoverDescriptionProps = Omit<
  ComponentProps<typeof BasePopover.Description>,
  'className'
> & {
  className?: string
}

export function PopoverDescription({ className, ...props }: PopoverDescriptionProps) {
  return <BasePopover.Description {...props} className={cn('text-gray-11', className)} />
}
