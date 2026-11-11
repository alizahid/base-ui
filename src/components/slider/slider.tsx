import { Slider as BaseSlider } from '@base-ui/react/slider'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'

// Values follow Radix Themes' Slider.
export const sliderVariants = tv({
  slots: {
    root: [
      'data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
      // Disabled sliders are blended into the page, like Radix Themes does
      'data-disabled:mix-blend-multiply dark:data-disabled:mix-blend-screen',
    ],
    // As tall as the track. The `before` part makes the area you can grab bigger.
    control: [
      'relative flex touch-none select-none items-center justify-center',
      'before:absolute before:content-[""]',
      'data-[orientation=horizontal]:w-full data-[orientation=horizontal]:before:inset-x-0 data-[orientation=horizontal]:before:-inset-y-2',
      'data-[orientation=vertical]:h-full data-[orientation=vertical]:before:-inset-x-2 data-[orientation=vertical]:before:inset-y-0',
      'data-disabled:cursor-not-allowed',
    ],
    track: 'relative data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
    indicator:
      'rounded-[inherit] data-disabled:bg-transparent data-disabled:bg-none data-disabled:shadow-none',
    thumb: [
      'rounded-[max(calc(0.1875rem*var(--radius-factor)),var(--radius-thumb))] bg-white',
      'data-disabled:bg-gray-1',
    ],
  },
  variants: {
    variant: {
      surface: {
        track:
          'bg-gray-a3 shadow-[inset_0_0_0_1px_var(--gray-a5)] data-disabled:shadow-[inset_0_0_0_1px_var(--gray-a4)]',
        indicator: 'bg-accent-track shadow-[inset_0_0_0_1px_var(--gray-a5)]',
        thumb: [
          'shadow-[0_0_0_1px_var(--black-a4)]',
          // Keyboard focus adds two rings around the normal shadow
          'has-[:focus-visible]:shadow-[0_0_0_1px_var(--black-a4),0_0_0_3px_var(--accent-3),0_0_0_5px_var(--accent-8)]',
          'data-disabled:shadow-[0_0_0_1px_var(--gray-6)]',
        ],
      },
      soft: {
        // The white layer adds a little contrast in dark mode
        track:
          'bg-[linear-gradient(var(--white-a1),var(--white-a1))] bg-gray-a4 data-disabled:bg-none',
        indicator: 'bg-[linear-gradient(var(--accent-a5),var(--accent-a5))] bg-accent-6',
        thumb: [
          'shadow-[0_0_0_1px_var(--black-a3),0_0_0_1px_var(--gray-a2),0_0_0_1px_var(--accent-a2),0_1px_2px_var(--gray-a4),0_1px_3px_-0.5px_var(--gray-a3)]',
          'has-[:focus-visible]:shadow-[0_0_0_1px_var(--black-a3),0_0_0_1px_var(--gray-a2),0_0_0_1px_var(--accent-a2),0_1px_2px_var(--gray-a4),0_1px_3px_-0.5px_var(--gray-a3),0_0_0_3px_var(--accent-3),0_0_0_5px_var(--accent-8)]',
          'data-disabled:shadow-[0_0_0_1px_var(--gray-5)]',
        ],
      },
    },
    // Radix Themes sizes 1 to 3: a 6, 8 or 10px track. The thumb is 4px bigger
    // than the track and then sticks out a quarter of the track on each side.
    // The track radius is a third of its size, or a pill when the theme allows.
    size: {
      sm: {
        track: [
          'rounded-[max(calc(2px*var(--radius-factor)),calc(var(--radius-thumb)*var(--radius-factor)))]',
          'data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5',
        ],
        thumb: 'size-[13px]',
      },
      md: {
        track: [
          'rounded-[max(calc(8px/3*var(--radius-factor)),calc(var(--radius-thumb)*var(--radius-factor)))]',
          'data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2',
        ],
        thumb: 'size-4',
      },
      lg: {
        track: [
          'rounded-[max(calc(10px/3*var(--radius-factor)),calc(var(--radius-thumb)*var(--radius-factor)))]',
          'data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5',
        ],
        thumb: 'size-[19px]',
      },
    },
    /** A darker filled part (light mode only, like Radix Themes). */
    highContrast: {
      true: '',
    },
  },
  compoundVariants: [
    {
      highContrast: true,
      variant: 'surface',
      class: {
        indicator: 'bg-[linear-gradient(var(--black-a8),var(--black-a8))] dark:bg-none',
      },
    },
    {
      highContrast: true,
      variant: 'soft',
      class: {
        indicator: [
          'bg-[linear-gradient(var(--accent-a5),var(--accent-a5)),linear-gradient(var(--black-a8),var(--black-a8))]',
          'dark:bg-[linear-gradient(var(--accent-a5),var(--accent-a5))]',
        ],
      },
    },
  ],
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
  highContrast,
  radius,
  size,
  thumbLabels,
  variant,
  ...props
}: SliderProps) {
  const styles = sliderVariants({ highContrast, size, variant })

  const value = props.value ?? props.defaultValue
  const thumbCount = Array.isArray(value) ? value.length : 1
  const range = thumbCount > 1

  return (
    <BaseSlider.Root
      // With one thumb the label belongs on the thumb, with more it names the group
      aria-label={range ? ariaLabel : undefined}
      data-color={colorAttribute(color)}
      data-radius={radius}
      // The thumb stops at the ends of the track, like in Radix Themes
      thumbAlignment="edge"
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
