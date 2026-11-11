import { Meter as BaseMeter } from '@base-ui/react/meter'
import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'
import { colorAttribute } from '../../lib/colors'
import { type BarProps, progressVariants } from '../progress'

/** `Meter` looks the same as `Progress`. */
export const meterVariants = progressVariants

export type MeterProps = Omit<
  ComponentProps<typeof BaseMeter.Root>,
  'children' | 'className' | 'color'
> &
  BarProps

/** Includes Base UI's `Meter.Track` and `Meter.Indicator`. */
export function Meter({
  className,
  classNames,
  color,
  radius,
  size,
  variant,
  ...props
}: MeterProps) {
  const styles = meterVariants({ size, variant })

  return (
    <BaseMeter.Root
      data-color={colorAttribute(color)}
      data-radius={radius}
      {...props}
      className={cn(styles.root(), className)}
    >
      <BaseMeter.Track className={cn(styles.track(), classNames?.track)}>
        <BaseMeter.Indicator className={cn(styles.indicator(), classNames?.indicator)} />
      </BaseMeter.Track>
    </BaseMeter.Root>
  )
}
