import { Meter as BaseMeter } from '@base-ui/react/meter'
import type { ComponentProps, ReactNode } from 'react'
import { tv } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { colorAttribute } from '../../lib/colors'
import { type BarProps, progressVariants } from '../progress'

/**
 * The bar is the same as `Progress`. What a meter adds is the row above it,
 * with a label on the left and the value on the right.
 */
export const meterVariants = tv({
  slots: {
    header: 'flex items-baseline justify-between gap-4',
    label: 'font-medium text-gray-12',
    value: 'ml-auto text-gray-a11 tabular-nums',
  },
  variants: {
    size: {
      sm: { header: 'mb-1 text-xs tracking-[0.0025em]' },
      md: { header: 'mb-1.5 text-sm' },
      lg: { header: 'mb-2 text-base' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type MeterState = 'good' | 'warn' | 'bad'

/**
 * Says how good a value is, with the same rules as the HTML `<meter>` element.
 * `low` and `high` split the range into three zones. The zone that holds
 * `optimum` is good, the one next to it is a warning and the far one is bad.
 * Without `optimum`, the middle zone is good and both outer zones are a warning.
 */
export function meterState(
  value: number,
  {
    high,
    low,
    max = 100,
    min = 0,
    optimum,
  }: { high?: number; low?: number; max?: number; min?: number; optimum?: number },
): MeterState {
  const lowEnd = low ?? min
  const highStart = high ?? max
  const best = optimum ?? (lowEnd + highStart) / 2

  // Low values are best, for example storage used
  if (best < lowEnd) {
    return value <= lowEnd ? 'good' : value <= highStart ? 'warn' : 'bad'
  }

  // High values are best, for example battery charge
  if (best > highStart) {
    return value >= highStart ? 'good' : value >= lowEnd ? 'warn' : 'bad'
  }

  return value >= lowEnd && value <= highStart ? 'good' : 'warn'
}

export type MeterProps = Omit<
  ComponentProps<typeof BaseMeter.Root>,
  'children' | 'className' | 'color'
> &
  Omit<BarProps, 'classNames'> & {
    /** Classes for the parts that `Meter` renders inside itself. */
    classNames?: {
      header?: string
      indicator?: string
      label?: string
      track?: string
      value?: string
    }
    /**
     * Changes the value text, for example to "35 GB of 100 GB". It gets the
     * value as formatted by `format`, and the raw number.
     */
    formatValue?: (formatted: string, value: number) => ReactNode
    /** From this value up the meter is in its high zone. See `optimum`. */
    high?: number
    /** Shown above the bar on the left. It also names the meter for screen readers. */
    label?: ReactNode
    /** Up to this value the meter is in its low zone. See `optimum`. */
    low?: number
    /**
     * The best value. With `low` and `high` it decides the color of the bar:
     * its own color in the zone that holds `optimum`, amber in the zone next
     * to it, red in the far one. Same rules as the HTML `<meter>` element.
     */
    optimum?: number
    /**
     * Shows the value above the bar on the right.
     * @default true
     */
    showValue?: boolean
  }

// The colors of the zones that are not the good one
const stateColor = { bad: 'red', warn: 'amber' } as const

/**
 * A measurement within a range, such as storage used or battery charge.
 * Includes Base UI's `Meter.Label`, `Value`, `Track` and `Indicator`.
 */
export function Meter({
  className,
  classNames,
  color,
  formatValue,
  high,
  highContrast,
  label,
  low,
  optimum,
  radius,
  showValue = true,
  size,
  variant,
  ...props
}: MeterProps) {
  const bar = progressVariants({ highContrast, size, variant })
  const styles = meterVariants({ size })

  const state = meterState(props.value, { high, low, max: props.max, min: props.min, optimum })

  return (
    <BaseMeter.Root
      data-color={state === 'good' ? colorAttribute(color) : stateColor[state]}
      data-radius={radius}
      data-state={state}
      {...props}
      className={cn(bar.root(), className)}
    >
      {(label !== undefined || showValue) && (
        <div className={cn(styles.header(), classNames?.header)}>
          {label !== undefined && (
            <BaseMeter.Label className={cn(styles.label(), classNames?.label)}>
              {label}
            </BaseMeter.Label>
          )}
          {showValue && (
            <BaseMeter.Value className={cn(styles.value(), classNames?.value)}>
              {formatValue}
            </BaseMeter.Value>
          )}
        </div>
      )}
      <BaseMeter.Track className={cn(bar.track(), classNames?.track)}>
        <BaseMeter.Indicator className={cn(bar.indicator(), classNames?.indicator)} />
      </BaseMeter.Track>
    </BaseMeter.Root>
  )
}
