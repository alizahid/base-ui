import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { focusRing } from '../../lib/styles'
import type { Radius } from '../../lib/theme'

// Values follow Radix Themes' Checkbox (base-checkbox.css + checkbox.css).
export const checkboxVariants = tv({
  slots: {
    root: [
      'relative inline-flex shrink-0 cursor-default items-center justify-center align-top',
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
          'data-checked:bg-accent-indicator data-checked:inset-ring-0',
          'data-indeterminate:bg-accent-indicator data-indeterminate:inset-ring-0',
          'data-invalid:inset-ring-(--red-a8)',
          // Disabled: a gray wash, a lighter border and a gray mark, checked or not.
          // The doubled selectors are needed to win over the checked classes above.
          'data-disabled:bg-gray-a3 data-disabled:text-gray-a8 data-disabled:inset-ring data-disabled:inset-ring-gray-a6',
          'data-disabled:data-checked:bg-gray-a3 data-disabled:data-checked:inset-ring',
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
    // Radix Themes sizes 1 to 3: a 14, 16 or 20px box with a 9, 10 or 12px mark.
    // The corners follow the theme radius but never turn into a circle,
    // so a checkbox can always be told apart from a radio.
    size: {
      sm: {
        root: 'size-3.5 rounded-[calc(0.1875rem*0.875*var(--radius-factor))]',
        indicator: 'size-[9px]',
      },
      md: {
        root: 'size-4 rounded-[calc(0.1875rem*var(--radius-factor))]',
        indicator: 'size-2.5',
      },
      lg: {
        root: 'size-5 rounded-[calc(0.1875rem*1.25*var(--radius-factor))]',
        indicator: 'size-3',
      },
    },
    /** A darker box (or mark, for `soft`), using the darkest step of the color. */
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
          'data-indeterminate:bg-accent-12 data-indeterminate:text-accent-1',
          'data-disabled:data-checked:bg-gray-a3 data-disabled:data-checked:text-gray-a8',
          'data-disabled:data-indeterminate:bg-gray-a3 data-disabled:data-indeterminate:text-gray-a8',
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
  highContrast,
  radius,
  size,
  variant,
  ...props
}: CheckboxProps) {
  const styles = checkboxVariants({ highContrast, size, variant })

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

// Both icons are the thick 9x9 ones Radix Themes uses in its Checkbox.
function CheckIcon() {
  return (
    <svg aria-hidden="true" className="size-full" fill="currentColor" viewBox="0 0 9 9">
      <path
        clipRule="evenodd"
        d="M8.53547 0.62293C8.88226 0.849446 8.97976 1.3142 8.75325 1.66099L4.5083 8.1599C4.38833 8.34356 4.19397 8.4655 3.9764 8.49358C3.75883 8.52167 3.53987 8.45309 3.3772 8.30591L0.616113 5.80777C0.308959 5.52987 0.285246 5.05559 0.563148 4.74844C0.84105 4.44128 1.31533 4.41757 1.62249 4.69547L3.73256 6.60459L7.49741 0.840706C7.72393 0.493916 8.18868 0.396414 8.53547 0.62293Z"
        fillRule="evenodd"
      />
    </svg>
  )
}

function DashIcon() {
  return (
    <svg aria-hidden="true" className="size-full" fill="currentColor" viewBox="0 0 9 9">
      <path
        clipRule="evenodd"
        d="M0.75 4.5C0.75 4.08579 1.08579 3.75 1.5 3.75H7.5C7.91421 3.75 8.25 4.08579 8.25 4.5C8.25 4.91421 7.91421 5.25 7.5 5.25H1.5C1.08579 5.25 0.75 4.91421 0.75 4.5Z"
        fillRule="evenodd"
      />
    </svg>
  )
}
