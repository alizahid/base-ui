import { Radio as BaseRadio } from '@base-ui/react/radio'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { focusRing } from '../../lib/styles'

export const radioVariants = tv({
  slots: {
    root: [
      'inline-flex shrink-0 items-center justify-center rounded-full align-top',
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
          'data-checked:bg-accent-9 data-checked:inset-ring-0',
          'data-invalid:inset-ring-(--red-a8)',
          'data-disabled:bg-gray-a3 data-disabled:text-gray-a8 data-disabled:inset-ring data-disabled:inset-ring-gray-a6',
        ],
      },
      soft: {
        root: [
          'bg-accent-a4 text-accent-a11',
          'data-invalid:inset-ring data-invalid:inset-ring-(--red-a8)',
          'data-disabled:bg-gray-a3 data-disabled:text-gray-a8',
        ],
      },
    },
    size: {
      sm: { root: 'size-3.5' },
      md: { root: 'size-4' },
      lg: { root: 'size-5' },
    },
  },
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
export function Radio({ className, classNames, color, size, variant, ...props }: RadioProps) {
  const styles = radioVariants({ size, variant })

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
