import { Popover as BasePopover } from '@base-ui/react/popover'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type PositionerProps, splitPositionerProps } from '../../lib/positioner'
import { useThemeProps } from '../theme-provider'

export const PopoverRoot = BasePopover.Root

export type PopoverRootProps = ComponentProps<typeof BasePopover.Root>

export const PopoverTrigger = BasePopover.Trigger

export type PopoverTriggerProps = ComponentProps<typeof BasePopover.Trigger>

export const PopoverClose = BasePopover.Close

export type PopoverCloseProps = ComponentProps<typeof BasePopover.Close>

/**
 * How floating popups open and close in Radix Themes (`.rt-PopperContent`):
 * a fade, a small scale and a 4px slide towards their place. 160ms in, 100ms out.
 * Also used by `HoverCard`.
 */
export const popperAnimation = [
  'origin-(--transform-origin) transition-[opacity,translate,scale] duration-160 ease-[cubic-bezier(0.16,1,0.3,1)]',
  'motion-reduce:transition-none data-instant:transition-none',
  'data-starting-style:scale-97 data-starting-style:opacity-0',
  'data-ending-style:scale-97 data-ending-style:opacity-0 data-ending-style:duration-100',
  'data-[side=top]:data-ending-style:translate-y-1 data-[side=top]:data-starting-style:translate-y-1',
  'data-[side=bottom]:data-ending-style:-translate-y-1 data-[side=bottom]:data-starting-style:-translate-y-1',
  'data-[side=left]:data-ending-style:translate-x-1 data-[side=left]:data-starting-style:translate-x-1',
  'data-[side=right]:data-ending-style:-translate-x-1 data-[side=right]:data-starting-style:-translate-x-1',
  'data-[side=inline-start]:data-ending-style:translate-x-1 data-[side=inline-start]:data-starting-style:translate-x-1',
  'data-[side=inline-end]:data-ending-style:-translate-x-1 data-[side=inline-end]:data-starting-style:-translate-x-1',
].join(' ')

// Values follow Radix Themes' Popover (popover.css).
export const popoverContentVariants = tv({
  base: [
    'relative bg-panel-solid text-gray-12 shadow-ui-5 outline-none',
    // At least as wide as the trigger, at most 480px (Radix's default `maxWidth`)
    // and never wider than the free space. A `max-w-*` class changes it.
    'min-w-(--anchor-width) max-w-[min(480px,var(--available-width))]',
    popperAnimation,
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
    size: 'md',
  },
})

/**
 * A small arrow that looks like a corner of the panel: a turned square that
 * sits half outside the popup, with a border on its two outer sides.
 * The border color is the hairline of the popup shadow (Radix shadows 4 and 5).
 */
export const panelArrow = [
  'size-2.5 rotate-45 bg-panel-solid',
  'border-[color-mix(in_oklab,var(--gray-a3),var(--gray-3)_25%)] dark:border-[color-mix(in_oklab,var(--gray-a6),var(--gray-6)_25%)]',
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

/**
 * The popover box. Base UI's `Portal`, `Positioner`, `Popup` and `Arrow` in one.
 * Like in Radix Themes it lines up with the start of the trigger, 8px away,
 * and stays 10px from the screen edges.
 */
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
        align="start"
        collisionPadding={10}
        sideOffset={8}
        {...positionerProps}
        className={classNames?.positioner}
      >
        <BasePopover.Popup
          {...popupProps}
          // Long content scrolls inside the box. Not with an arrow: it would be cut off.
          className={cn(popoverContentVariants({ size }), !arrow && 'overflow-auto', className)}
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
