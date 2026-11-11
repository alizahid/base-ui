import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import type { ComponentProps, ReactElement, ReactNode } from 'react'
import { tv } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type PositionerProps, splitPositionerProps } from '../../lib/positioner'
import { useThemeProps } from '../theme-provider'

/** Wrap several tooltips to share delays: after the first one shows, the next ones show at once. */
export const TooltipProvider = BaseTooltip.Provider

export type TooltipProviderProps = ComponentProps<typeof BaseTooltip.Provider>

// Values follow Radix Themes' Tooltip (tooltip.css).
export const tooltipVariants = tv({
  slots: {
    // Dark box in light mode, light box in dark mode. 12px text, 4px 8px padding,
    // at most 360px wide (Radix's default `maxWidth`).
    content: [
      'max-w-[min(360px,var(--available-width))] cursor-default select-none rounded-panel-sm bg-gray-12 px-2 py-1 text-gray-1 text-xs tracking-[0.0025em] outline-none',
      // Opens in 140ms with a fade, a small scale and a 4px slide towards its
      // place. Closes at once, like in Radix Themes.
      'origin-(--transform-origin) transition-[opacity,translate,scale] duration-140 ease-[cubic-bezier(0.16,1,0.3,1)]',
      'motion-reduce:transition-none data-ending-style:transition-none data-instant:transition-none',
      'data-starting-style:scale-97 data-starting-style:opacity-0',
      'data-[side=top]:data-starting-style:translate-y-1 data-[side=bottom]:data-starting-style:-translate-y-1',
      'data-[side=left]:data-starting-style:translate-x-1 data-[side=right]:data-starting-style:-translate-x-1',
      'data-[side=inline-start]:data-starting-style:translate-x-1 data-[side=inline-end]:data-starting-style:-translate-x-1',
    ],
    // A turned 7px square, half outside the box: it shows as a triangle
    // 10px wide and 5px tall, the size of the Radix arrow.
    arrow: [
      'size-[7px] rotate-45 bg-gray-12',
      'data-[side=top]:-bottom-[3.5px] data-[side=bottom]:-top-[3.5px]',
      'data-[side=left]:-right-[3.5px] data-[side=right]:-left-[3.5px]',
      'data-[side=inline-start]:-right-[3.5px] data-[side=inline-end]:-left-[3.5px]',
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
          collisionPadding={10}
          // Radix Themes: 4px between the trigger and the tip of the arrow
          // (the arrow is 5px tall), or the box when there is no arrow
          sideOffset={arrow ? 9 : 4}
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
