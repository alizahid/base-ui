import { Slider as BaseSlider } from '@base-ui/react/slider'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'

export const sliderVariants = tv({
  slots: {
    root: 'data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
    // The padding makes the area you can grab bigger than the thin track
    control: [
      'flex touch-none select-none items-center justify-center',
      'data-[orientation=horizontal]:w-full data-[orientation=horizontal]:py-2',
      'data-[orientation=vertical]:h-full data-[orientation=vertical]:px-2',
      'data-disabled:cursor-not-allowed',
    ],
    track: [
      'rounded-ui-thumb',
      'data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
    ],
    indicator: 'rounded-[inherit] data-disabled:bg-gray-a5',
    thumb: [
      'rounded-ui-thumb bg-white shadow-sm ring-1 ring-gray-a6',
      'outline-accent-8 outline-offset-2 has-[:focus-visible]:outline-2',
      'data-disabled:bg-gray-2 data-disabled:shadow-none',
    ],
  },
  variants: {
    variant: {
      surface: {
        track: 'bg-gray-a3 inset-ring inset-ring-gray-a5',
        indicator: 'bg-accent-9',
      },
      soft: {
        track: 'bg-gray-a4',
        indicator: 'bg-accent-a10',
      },
    },
    size: {
      sm: {
        track: 'data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5',
        thumb: 'size-2.5',
      },
      md: {
        track: 'data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2',
        thumb: 'size-3',
      },
      lg: {
        track: 'data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5',
        thumb: 'size-3.5',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'surface',
  },
})

export type SliderProps = Omit<ComponentProps<typeof BaseSlider.Root>, 'className' | 'color'> &
  VariantProps<typeof sliderVariants> & {
    className?: string
    /** Classes for the parts that `Slider` renders inside itself. */
    classNames?: {
      control?: string
      indicator?: string
      thumb?: string
      track?: string
    }
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /** How round the track and thumbs are. Follows the theme when not set. */
    radius?: Radius
    /**
     * Accessible name of each thumb, in order.
     * With one thumb you can also just set `aria-label`.
     */
    thumbLabels?: string[]
  }

/**
 * Includes Base UI's `Slider.Control`, `Track`, `Indicator` and `Thumb`.
 * Pass an array as `value` or `defaultValue` to get one thumb per number.
 */
export function Slider({
  'aria-label': ariaLabel,
  className,
  classNames,
  color,
  radius,
  size,
  thumbLabels,
  variant,
  ...props
}: SliderProps) {
  const styles = sliderVariants({ size, variant })

  const value = props.value ?? props.defaultValue
  const thumbCount = Array.isArray(value) ? value.length : 1
  const range = thumbCount > 1

  return (
    <BaseSlider.Root
      // With one thumb the label belongs on the thumb, with more it names the group
      aria-label={range ? ariaLabel : undefined}
      data-color={colorAttribute(color)}
      data-radius={radius}
      {...props}
      className={cn(styles.root(), className)}
    >
      <BaseSlider.Control className={cn(styles.control(), classNames?.control)}>
        <BaseSlider.Track className={cn(styles.track(), classNames?.track)}>
          <BaseSlider.Indicator className={cn(styles.indicator(), classNames?.indicator)} />
          {Array.from({ length: thumbCount }, (_, index) => (
            <BaseSlider.Thumb
              aria-label={thumbLabels?.[index] ?? (range ? undefined : ariaLabel)}
              className={cn(styles.thumb(), classNames?.thumb)}
              index={index}
              key={index}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}
