import { Progress as BaseProgress } from '@base-ui/react/progress'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'

/** The bar look. `Meter` uses the same one. */
export const progressVariants = tv({
  slots: {
    root: 'block w-full',
    track: 'relative block w-full overflow-hidden rounded-ui-thumb',
    indicator: [
      'block h-full rounded-ui-thumb transition-[width] duration-300',
      // No value yet: fill the track and pulse
      'data-indeterminate:w-full data-indeterminate:animate-pulse',
    ],
  },
  variants: {
    variant: {
      surface: { track: 'bg-gray-a3 inset-ring inset-ring-gray-a4', indicator: 'bg-accent-9' },
      soft: { track: 'bg-gray-a4', indicator: 'bg-accent-a9' },
    },
    size: {
      sm: { track: 'h-1' },
      md: { track: 'h-1.5' },
      lg: { track: 'h-2' },
    },
  },
  defaultVariants: {
    variant: 'surface',
    size: 'md',
  },
})

/** The props that `Progress` and `Meter` add on top of Base UI. */
export type BarProps = VariantProps<typeof progressVariants> & {
  className?: string
  /** Classes for the parts that the bar renders inside itself. */
  classNames?: {
    indicator?: string
    track?: string
  }
  /**
   * The color scale to use. `accent` follows the theme.
   * @default 'accent'
   */
  color?: Color
  /** How round the corners are. Follows the theme when not set. */
  radius?: Radius
}

export type ProgressProps = Omit<
  ComponentProps<typeof BaseProgress.Root>,
  'children' | 'className' | 'color' | 'value'
> &
  BarProps & {
    /**
     * The current value. `null` means "working, but no known value".
     * @default null
     */
    value?: number | null
  }

/** Includes Base UI's `Progress.Track` and `Progress.Indicator`. */
export function Progress({
  className,
  classNames,
  color,
  radius,
  size,
  value = null,
  variant,
  ...props
}: ProgressProps) {
  const styles = progressVariants({ size, variant })

  return (
    <BaseProgress.Root
      data-color={colorAttribute(color)}
      data-radius={radius}
      value={value}
      {...props}
      className={cn(styles.root(), className)}
    >
      <BaseProgress.Track className={cn(styles.track(), classNames?.track)}>
        <BaseProgress.Indicator className={cn(styles.indicator(), classNames?.indicator)} />
      </BaseProgress.Track>
    </BaseProgress.Root>
  )
}
