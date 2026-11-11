import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card'
import type { ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type PositionerProps, splitPositionerProps } from '../../lib/positioner'
import { panelArrow, popoverContentVariants } from '../popover/popover'
import { useThemeProps } from '../theme-provider'

export const HoverCardRoot = BasePreviewCard.Root

export type HoverCardRootProps = ComponentProps<typeof BasePreviewCard.Root>

/** The link that shows the card on hover. Renders an `<a>` with no styles. */
export const HoverCardTrigger = BasePreviewCard.Trigger

export type HoverCardTriggerProps = ComponentProps<typeof BasePreviewCard.Trigger>

// Looks the same as a popover
export const hoverCardContentVariants = popoverContentVariants

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

/** The card. Base UI's `Portal`, `Positioner`, `Popup` and `Arrow` in one. */
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
        sideOffset={8}
        {...positionerProps}
        className={classNames?.positioner}
      >
        <BasePreviewCard.Popup
          {...popupProps}
          className={cn(hoverCardContentVariants({ size }), className)}
        >
          {arrow && <BasePreviewCard.Arrow className={cn(panelArrow, classNames?.arrow)} />}
          {children}
        </BasePreviewCard.Popup>
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  )
}
