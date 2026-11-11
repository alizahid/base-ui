import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type PositionerProps, splitPositionerProps } from '../../lib/positioner'
import { panelArrow, popperAnimation } from '../popover/popover'
import { useThemeProps } from '../theme-provider'

export const HoverCardRoot = BasePreviewCard.Root

export type HoverCardRootProps = ComponentProps<typeof BasePreviewCard.Root>

/** The link that shows the card on hover. Renders an `<a>` with no styles. */
export const HoverCardTrigger = BasePreviewCard.Trigger

export type HoverCardTriggerProps = ComponentProps<typeof BasePreviewCard.Trigger>

// Values follow Radix Themes' HoverCard (hover-card.css): like a popover,
// with a lighter shadow and three sizes.
export const hoverCardContentVariants = tv({
  base: [
    'relative bg-panel-solid text-gray-12 shadow-ui-4 outline-none',
    // At most 480px (Radix's default `maxWidth`) and never wider than the free space
    'max-w-[min(480px,var(--available-width))]',
    popperAnimation,
  ],
  variants: {
    // Radix sizes 1 to 3: padding 12, 16, 24px
    size: {
      sm: 'rounded-panel-lg p-3',
      md: 'rounded-panel-lg p-4',
      lg: 'rounded-panel-xl p-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type HoverCardContentProps = Omit<
  ComponentProps<typeof BasePreviewCard.Popup>,
  'className'
> &
  PositionerProps<ComponentProps<typeof BasePreviewCard.Positioner>> &
  VariantProps<typeof hoverCardContentVariants> &
  Pick<ComponentProps<typeof BasePreviewCard.Portal>, 'container' | 'keepMounted'> & {
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
 * The card. Base UI's `Portal`, `Positioner`, `Popup` and `Arrow` in one.
 * Like in Radix Themes it lines up with the start of the trigger, 8px away,
 * and stays 10px from the screen edges.
 */
export function HoverCardContent({
  arrow = false,
  children,
  className,
  classNames,
  container,
  keepMounted,
  size,
  ...props
}: HoverCardContentProps) {
  const themeProps = useThemeProps()
  const [positionerProps, popupProps] = splitPositionerProps(props)

  return (
    <BasePreviewCard.Portal {...themeProps} container={container} keepMounted={keepMounted}>
      <BasePreviewCard.Positioner
        align="start"
        collisionPadding={10}
        sideOffset={8}
        {...positionerProps}
        className={classNames?.positioner}
      >
        <BasePreviewCard.Popup
          {...popupProps}
          // Long content scrolls inside the box. Not with an arrow: it would be cut off.
          className={cn(hoverCardContentVariants({ size }), !arrow && 'overflow-auto', className)}
        >
          {arrow && <BasePreviewCard.Arrow className={cn(panelArrow, classNames?.arrow)} />}
          {children}
        </BasePreviewCard.Popup>
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  )
}
