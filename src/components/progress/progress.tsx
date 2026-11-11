import { Progress as BaseProgress } from '@base-ui/react/progress'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'

/**
 * The bar look. `Meter` uses the same one. Values follow Radix Themes' Progress.
 */
export const progressVariants = tv({
  slots: {
    root: 'pointer-events-none block w-full',
    track: [
      'relative block h-(--progress-height) w-full overflow-hidden',
      // Radix: a third of the height, or fully round when the theme radius allows it
      'rounded-[max(calc(var(--radius-factor)*var(--progress-height)/3),calc(var(--radius-factor)*var(--radius-thumb)))]',
      // A layer on top for the inner hairline
      'after:absolute after:inset-0 after:rounded-[inherit]',
    ],
    // The track clips the indicator, so its end is straight like in Radix
    indicator: [
      'block h-full transition-[width] duration-[120ms]',
      // No value yet: grow to full width in 5s, then wait 5s, then pulse slowly
      'data-indeterminate:w-full data-indeterminate:origin-left',
      'data-indeterminate:animate-[ui-progress-grow_5s_both,ui-progress-fade_2.5s_10s,ui-progress-pulse_5s_12.5s_infinite_alternate]',
      // A light that moves over the bar while it pulses
      'data-indeterminate:after:absolute data-indeterminate:after:inset-0 data-indeterminate:after:w-[400%]',
      'data-indeterminate:after:animate-[ui-progress-shine_5s_10s_infinite_backwards]',
      'data-indeterminate:after:bg-[linear-gradient(to_right,transparent_25%,var(--white-a5),var(--white-a9),var(--white-a5),transparent_75%)]',
      'dark:data-indeterminate:after:bg-[linear-gradient(to_right,transparent_25%,var(--white-a3),var(--white-a6),var(--white-a3),transparent_75%)]',
    ],
  },
  variants: {
    variant: {
      surface: {
        track: 'bg-gray-a3 after:inset-ring after:inset-ring-gray-a4',
        indicator:
          'bg-accent-track [--progress-pulse-from:var(--accent-7)] [--progress-pulse-to:var(--accent-track)]',
      },
      soft: {
        // A thin white layer makes the track easier to see in dark mode
        track: 'bg-gray-a4 bg-linear-to-b from-white-a1 to-white-a1',
        indicator: [
          'bg-accent-8 bg-linear-to-b from-accent-a5 to-accent-a5 data-indeterminate:after:opacity-75',
          '[--progress-pulse-from:var(--accent-5)] [--progress-pulse-to:var(--accent-7)]',
        ],
      },
    },
    // Radix sizes 1 to 3: 4px, 6px and 8px tall
    size: {
      sm: { track: '[--progress-height:--spacing(1)]' },
      md: { track: '[--progress-height:--spacing(1.5)]' },
      lg: { track: '[--progress-height:--spacing(2)]' },
    },
    /** A darker bar, using the darkest step of the color. */
    highContrast: {
      true: {
        indicator: [
          'bg-accent-12 data-indeterminate:after:opacity-75',
          'data-indeterminate:animate-[ui-progress-grow_5s_both,ui-progress-fade-contrast_2.5s_10s,ui-progress-pulse-contrast_5s_12.5s_infinite_alternate]',
        ],
      },
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
  highContrast,
  radius,
  size,
  value = null,
  variant,
  ...props
}: ProgressProps) {
  const styles = progressVariants({ highContrast, size, variant })

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
