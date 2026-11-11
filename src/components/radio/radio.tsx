import { Radio as BaseRadio } from '@base-ui/react/radio'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { focusRing } from '../../lib/styles'

// Values follow Radix Themes' Radio (base-radio.css).
export const radioVariants = tv({
  slots: {
    root: [
      'inline-flex shrink-0 cursor-default items-center justify-center rounded-full align-top',
      'data-disabled:cursor-not-allowed',
      focusRing,
    ],
    // The dot is 40% of the circle, like Radix Themes
    indicator: 'size-2/5 rounded-full bg-current',
  },
  variants: {
    variant: {
      surface: {
        root: [
          'bg-surface inset-ring inset-ring-gray-a7 text-accent-contrast',
          'data-checked:bg-accent-indicator data-checked:inset-ring-0',
          'data-invalid:inset-ring-(--red-a8)',
          // The doubled selector is needed to win over the checked classes above
          'data-disabled:bg-gray-a3 data-disabled:text-gray-a8 data-disabled:inset-ring data-disabled:inset-ring-gray-a6',
          'data-disabled:data-checked:bg-gray-a3 data-disabled:data-checked:inset-ring',
        ],
      },
      soft: {
        root: [
          'bg-accent-a4 text-accent-a11 outline-accent-a8',
          'data-invalid:inset-ring data-invalid:inset-ring-(--red-a8)',
          'data-disabled:bg-gray-a3 data-disabled:text-gray-a8',
        ],
      },
    },
    // Radix Themes sizes 1 to 3: 14, 16 and 20px
    size: {
      sm: { root: 'size-3.5' },
      md: { root: 'size-4' },
      lg: { root: 'size-5' },
    },
    /** A darker circle (or dot, for `soft`), using the darkest step of the color. */
    highContrast: {
      true: '',
    },
  },
  compoundVariants: [
    {
      highContrast: true,
      variant: 'surface',
      class: {
        root: [
          'data-checked:bg-accent-12 data-checked:text-accent-1',
          'data-disabled:data-checked:bg-gray-a3 data-disabled:data-checked:text-gray-a8',
        ],
      },
    },
    {
      highContrast: true,
      variant: 'soft',
      class: { root: 'text-accent-12 data-disabled:text-gray-a8' },
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'surface',
  },
})

export type RadioProps = Omit<ComponentProps<typeof BaseRadio.Root>, 'className' | 'color'> &
  VariantProps<typeof radioVariants> & {
    className?: string
    /** Classes for the parts that `Radio` renders inside itself. */
    classNames?: {
      indicator?: string
    }
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
  }

/** Includes Base UI's `Radio.Indicator` (the dot). Use it inside a `RadioGroup.Root`. */
export function Radio({
  className,
  classNames,
  color,
  highContrast,
  size,
  variant,
  ...props
}: RadioProps) {
  const styles = radioVariants({ highContrast, size, variant })

  return (
    <BaseRadio.Root
      data-color={colorAttribute(color)}
      {...props}
      className={cn(styles.root(), className)}
    >
      <BaseRadio.Indicator className={cn(styles.indicator(), classNames?.indicator)} />
    </BaseRadio.Root>
  )
}
