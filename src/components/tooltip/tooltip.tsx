import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import type { ComponentProps, ReactElement, ReactNode } from 'react'
import { tv } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type PositionerProps, splitPositionerProps } from '../../lib/positioner'
import { popupAnimation } from '../../lib/styles'
import { useThemeProps } from '../theme-provider'

/** Wrap several tooltips to share delays: after the first one shows, the next ones show at once. */
export const TooltipProvider = BaseTooltip.Provider

export type TooltipProviderProps = ComponentProps<typeof BaseTooltip.Provider>

export const tooltipVariants = tv({
  slots: {
    // Dark box in light mode, light box in dark mode
    content: [
      'max-w-xs rounded-panel-sm bg-gray-12 px-2 py-1 text-gray-1 text-xs shadow-sm outline-none',
      popupAnimation,
    ],
    arrow: [
      'size-2 rotate-45 rounded-[1px] bg-gray-12',
      'data-[side=top]:-bottom-1 data-[side=bottom]:-top-1',
      'data-[side=left]:-right-1 data-[side=right]:-left-1',
      'data-[side=inline-start]:-right-1 data-[side=inline-end]:-left-1',
    ],
  },
})

export type TooltipProps = Omit<
  ComponentProps<typeof BaseTooltip.Popup>,
  'children' | 'className' | 'content'
> &
  PositionerProps<ComponentProps<typeof BaseTooltip.Positioner>> &
  Pick<
    BaseTooltip.Root.Props,
    | 'defaultOpen'
    | 'disabled'
    | 'disableHoverablePopup'
    | 'onOpenChange'
    | 'onOpenChangeComplete'
    | 'open'
    | 'trackCursorAxis'
  > &
  Pick<BaseTooltip.Trigger.Props, 'closeDelay' | 'closeOnClick' | 'delay'> &
  Pick<ComponentProps<typeof BaseTooltip.Portal>, 'container' | 'keepMounted'> & {
    /**
     * Shows a small arrow that points at the trigger.
     * @default true
     */
    arrow?: boolean
    /** The element that shows the tooltip on hover and focus, for example a `Button`. */
    children: ReactElement<Record<string, unknown>>
    className?: string
    /** Classes for the parts that the tooltip renders around its box. */
    classNames?: {
      arrow?: string
      positioner?: string
    }
    /** What the tooltip says. */
    content: ReactNode
  }

/**
 * A small label for the element inside it.
 * Base UI's `Root`, `Trigger`, `Portal`, `Positioner`, `Popup` and `Arrow` in one.
 */
export function Tooltip({
  arrow = true,
  children,
  className,
  classNames,
  closeDelay,
  closeOnClick,
  container,
  content,
  defaultOpen,
  delay,
  disabled,
  disableHoverablePopup,
  keepMounted,
  onOpenChange,
  onOpenChangeComplete,
  open,
  trackCursorAxis,
  ...props
}: TooltipProps) {
  const themeProps = useThemeProps()
  const [positionerProps, popupProps] = splitPositionerProps(props)
  const styles = tooltipVariants()

  return (
    <BaseTooltip.Root
      defaultOpen={defaultOpen}
      disabled={disabled}
      disableHoverablePopup={disableHoverablePopup}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      open={open}
      trackCursorAxis={trackCursorAxis}
    >
      <BaseTooltip.Trigger
        closeDelay={closeDelay}
        closeOnClick={closeOnClick}
        delay={delay}
        render={children}
      />
      <BaseTooltip.Portal {...themeProps} container={container} keepMounted={keepMounted}>
        <BaseTooltip.Positioner
          sideOffset={8}
          {...positionerProps}
          className={classNames?.positioner}
        >
          <BaseTooltip.Popup {...popupProps} className={cn(styles.content(), className)}>
            {arrow && <BaseTooltip.Arrow className={cn(styles.arrow(), classNames?.arrow)} />}
            {content}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  )
}
