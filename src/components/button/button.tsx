import { Button as BaseButton } from '@base-ui/react/button'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { controlSize } from '../../lib/styles'
import type { Radius } from '../../lib/theme'
import { Spinner } from '../spinner'

// Values follow Radix Themes' Button. `data-popup-open` is set when the button
// is the trigger of an open menu, popover or dialog; it keeps the hover look.
export const buttonVariants = tv({
  base: [
    'relative inline-flex shrink-0 cursor-default select-none items-center justify-center whitespace-nowrap align-top',
    'outline-accent-8 focus-visible:outline-2',
    'data-disabled:cursor-not-allowed',
  ],
  variants: {
    variant: {
      solid: [
        'bg-accent-9 font-medium text-accent-contrast outline-offset-2 [&_svg]:opacity-90',
        'hover:bg-accent-10 data-popup-open:bg-accent-10',
        'active:bg-accent-10 active:brightness-92 active:saturate-110 dark:active:brightness-108 dark:active:saturate-100',
        'data-disabled:bg-gray-a3 data-disabled:text-gray-a8 data-disabled:filter-none',
      ],
      soft: [
        'bg-accent-a3 font-medium text-accent-a11 -outline-offset-1 [&_svg]:opacity-90',
        'hover:bg-accent-a4 data-popup-open:bg-accent-a4',
        'active:bg-accent-a5',
        'data-disabled:bg-gray-a3 data-disabled:text-gray-a8',
      ],
      surface: [
        'bg-accent-surface font-medium text-accent-a11 inset-ring inset-ring-accent-a7 -outline-offset-1 [&_svg]:opacity-90',
        'hover:inset-ring-accent-a8 data-popup-open:inset-ring-accent-a8',
        'active:bg-accent-a3 active:inset-ring-accent-a8',
        'data-disabled:bg-gray-a2 data-disabled:text-gray-a8 data-disabled:inset-ring-gray-a6',
      ],
      outline: [
        'font-medium text-accent-a11 inset-ring inset-ring-accent-a8 -outline-offset-1 [&_svg]:opacity-90',
        'hover:bg-accent-a2 data-popup-open:bg-accent-a2',
        'active:bg-accent-a3',
        'data-disabled:bg-transparent data-disabled:text-gray-a8 data-disabled:inset-ring-gray-a7',
      ],
      // Ghost has the same size and weight as the other variants, just no background
      // until hover. (In Radix Themes it is smaller and wraps its text.)
      ghost: [
        'font-medium text-accent-a11 -outline-offset-1 [&_svg]:opacity-90',
        'hover:bg-accent-a3 data-popup-open:bg-accent-a3',
        'active:bg-accent-a4',
        'data-disabled:bg-transparent data-disabled:text-gray-a8',
      ],
    },
    size: {
      sm: [controlSize.sm, 'gap-1'],
      md: [controlSize.md, 'gap-2'],
      lg: [controlSize.lg, 'gap-3'],
      xl: [controlSize.xl, 'gap-3'],
    },
    /** Stronger text and fills, using the darkest step of the color. */
    highContrast: {
      true: '',
    },
  },
  compoundVariants: [
    {
      highContrast: true,
      variant: 'solid',
      class: [
        'bg-accent-12 text-gray-1',
        'hover:bg-accent-12 hover:brightness-110 hover:contrast-88 hover:saturate-110',
        'data-popup-open:bg-accent-12 data-popup-open:brightness-110 data-popup-open:contrast-88 data-popup-open:saturate-110',
        'active:bg-accent-12 active:brightness-116 active:contrast-82 active:saturate-120',
        'dark:active:brightness-95 dark:active:contrast-100 dark:active:saturate-120',
      ],
    },
    { highContrast: true, variant: ['soft', 'surface', 'ghost'], class: 'text-accent-12' },
    {
      highContrast: true,
      variant: 'outline',
      class:
        'text-accent-12 shadow-[inset_0_0_0_1px_var(--accent-a7),inset_0_0_0_1px_var(--gray-a11)]',
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
})

export type ButtonProps = Omit<ComponentProps<typeof BaseButton>, 'className' | 'color'> &
  VariantProps<typeof buttonVariants> & {
    className?: string
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /**
     * Shows a spinner and disables the button. The width stays the same.
     * @default false
     */
    loading?: boolean
    /**
     * How round the corners are. Follows the theme when not set.
     * A `rounded-*` class in `className` still wins over this.
     */
    radius?: Radius
  }

export function Button({
  children,
  className,
  color,
  disabled,
  highContrast,
  loading = false,
  radius,
  size,
  variant,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      aria-busy={loading || undefined}
      data-color={colorAttribute(color)}
      data-radius={radius}
      disabled={disabled || loading}
      {...props}
      className={cn(buttonVariants({ highContrast, size, variant }), className)}
    >
      {loading ? (
        <>
          <span className="invisible contents">{children}</span>
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner className="size-[1em]" />
          </span>
        </>
      ) : (
        children
      )}
    </BaseButton>
  )
}
