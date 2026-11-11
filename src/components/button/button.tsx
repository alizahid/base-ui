import { Button as BaseButton } from '@base-ui/react/button'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'
import { Spinner } from '../spinner'

export const buttonVariants = tv({
  base: [
    'relative inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap align-top font-medium',
    'outline-accent-8 outline-offset-2 focus-visible:outline-2',
    'data-disabled:cursor-not-allowed',
  ],
  variants: {
    variant: {
      solid: [
        'bg-accent-9 text-accent-contrast',
        'hover:bg-accent-10',
        'active:bg-accent-10 active:brightness-92 active:saturate-110',
        'data-disabled:bg-gray-a3 data-disabled:text-gray-a8 data-disabled:filter-none',
      ],
      soft: [
        'bg-accent-a3 text-accent-a11',
        'hover:bg-accent-a4',
        'active:bg-accent-a5',
        'data-disabled:bg-gray-a3 data-disabled:text-gray-a8',
      ],
      surface: [
        'bg-accent-a2 text-accent-a11 inset-ring inset-ring-accent-a7',
        'hover:inset-ring-accent-a8',
        'active:bg-accent-a3 active:inset-ring-accent-a8',
        'data-disabled:bg-gray-a2 data-disabled:text-gray-a8 data-disabled:inset-ring-gray-a6',
      ],
      outline: [
        'text-accent-a11 inset-ring inset-ring-accent-a8',
        'hover:bg-accent-a2',
        'active:bg-accent-a3',
        'data-disabled:bg-transparent data-disabled:text-gray-a8 data-disabled:inset-ring-gray-a7',
      ],
      ghost: [
        'text-accent-a11',
        'hover:bg-accent-a3',
        'active:bg-accent-a4',
        'data-disabled:bg-transparent data-disabled:text-gray-a8',
      ],
    },
    size: {
      xs: 'h-6 gap-1 rounded-ui-sm px-2 text-xs',
      sm: 'h-8 gap-2 rounded-ui-md px-3 text-sm',
      md: 'h-10 gap-3 rounded-ui-md px-4 text-base',
      lg: 'h-12 gap-3 rounded-ui-lg px-6 text-lg',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
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
      className={cn(buttonVariants({ size, variant }), className)}
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
