import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { focusRing } from '../../lib/styles'
import type { Radius } from '../../lib/theme'

export const checkboxVariants = tv({
  slots: {
    root: [
      'inline-flex shrink-0 items-center justify-center align-top',
      'data-disabled:cursor-not-allowed',
      focusRing,
    ],
    indicator: 'flex items-center justify-center',
  },
  variants: {
    variant: {
      surface: {
        root: [
          'bg-surface inset-ring inset-ring-gray-a7 text-accent-contrast',
          'data-checked:bg-accent-9 data-checked:inset-ring-0',
          'data-indeterminate:bg-accent-9 data-indeterminate:inset-ring-0',
          'data-invalid:inset-ring-(--red-a8)',
          'data-disabled:bg-gray-a3 data-disabled:text-gray-a8 data-disabled:inset-ring data-disabled:inset-ring-gray-a6',
          // Needed because `data-indeterminate` comes after `data-disabled` in the CSS
          'data-disabled:data-indeterminate:bg-gray-a3 data-disabled:data-indeterminate:inset-ring',
        ],
      },
      soft: {
        root: [
          'bg-accent-a5 text-accent-a11',
          'data-invalid:inset-ring data-invalid:inset-ring-(--red-a8)',
          'data-disabled:bg-gray-a3 data-disabled:text-gray-a8',
        ],
      },
    },
    // The corners follow the theme radius but never turn into a circle,
    // so a checkbox can always be told apart from a radio.
    size: {
      sm: {
        root: 'size-3.5 rounded-[calc(0.1875rem*var(--radius-factor))]',
        indicator: 'size-2.5',
      },
      md: { root: 'size-4 rounded-[calc(0.1875rem*var(--radius-factor))]', indicator: 'size-3' },
      lg: { root: 'size-5 rounded-[calc(0.25rem*var(--radius-factor))]', indicator: 'size-3.5' },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'surface',
  },
})

export type CheckboxProps = Omit<ComponentProps<typeof BaseCheckbox.Root>, 'className' | 'color'> &
  VariantProps<typeof checkboxVariants> & {
    className?: string
    /** Classes for the parts that `Checkbox` renders inside itself. */
    classNames?: {
      indicator?: string
    }
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /** How round the corners are. Follows the theme when not set. */
    radius?: Radius
  }

/** Includes Base UI's `Checkbox.Indicator` with a check icon (a dash when indeterminate). */
export function Checkbox({
  className,
  classNames,
  color,
  radius,
  size,
  variant,
  ...props
}: CheckboxProps) {
  const styles = checkboxVariants({ size, variant })

  return (
    <BaseCheckbox.Root
      data-color={colorAttribute(color)}
      data-radius={radius}
      {...props}
      className={cn(styles.root(), className)}
    >
      <BaseCheckbox.Indicator
        className={cn(styles.indicator(), classNames?.indicator)}
        render={(indicatorProps, state) => (
          <span {...indicatorProps}>{state.indeterminate ? <DashIcon /> : <CheckIcon />}</span>
        )}
      />
    </BaseCheckbox.Root>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="size-full" fill="none" viewBox="0 0 12 12">
      <path
        d="M2.5 6.5 5 9l4.5-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  )
}

function DashIcon() {
  return (
    <svg aria-hidden="true" className="size-full" fill="none" viewBox="0 0 12 12">
      <path d="M3 6h6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
    </svg>
  )
}
