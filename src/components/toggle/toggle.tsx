import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { controlSize } from '../../lib/styles'
import type { Radius } from '../../lib/theme'

// Toggle looks like Button (values follow Radix Themes' Button), plus a
// pressed state with a stronger fill.
export const toggleVariants = tv({
  base: [
    'relative inline-flex shrink-0 cursor-default select-none items-center justify-center whitespace-nowrap align-top',
    'outline-accent-8 focus-visible:outline-2',
    'data-disabled:cursor-not-allowed',
  ],
  variants: {
    variant: {
      soft: [
        'bg-accent-a3 font-medium text-accent-a11 -outline-offset-1 [&_svg]:opacity-90',
        'hover:bg-accent-a4 active:bg-accent-a5',
        'data-pressed:bg-accent-a5 data-pressed:hover:bg-accent-a6',
        'data-disabled:bg-gray-a3 data-disabled:text-gray-a8',
        'data-disabled:data-pressed:bg-gray-a4',
      ],
      surface: [
        'bg-accent-surface font-medium text-accent-a11 inset-ring inset-ring-accent-a7 -outline-offset-1 [&_svg]:opacity-90',
        'hover:inset-ring-accent-a8 active:bg-accent-a3 active:inset-ring-accent-a8',
        'data-pressed:bg-accent-a4 data-pressed:inset-ring-accent-a8 data-pressed:active:bg-accent-a5',
        'data-disabled:bg-gray-a2 data-disabled:text-gray-a8 data-disabled:inset-ring-gray-a6',
        'data-disabled:data-pressed:bg-gray-a4 data-disabled:data-pressed:inset-ring-gray-a6',
      ],
      outline: [
        'font-medium text-accent-a11 inset-ring inset-ring-accent-a8 -outline-offset-1 [&_svg]:opacity-90',
        'hover:bg-accent-a2 active:bg-accent-a3',
        'data-pressed:bg-accent-a4 data-pressed:hover:bg-accent-a5',
        'data-disabled:bg-transparent data-disabled:text-gray-a8 data-disabled:inset-ring-gray-a7',
        'data-disabled:data-pressed:bg-gray-a4',
      ],
      ghost: [
        'text-accent-a11 -outline-offset-1',
        'hover:bg-accent-a3 active:bg-accent-a4',
        'data-pressed:bg-accent-a4 data-pressed:hover:bg-accent-a5',
        'data-disabled:bg-transparent data-disabled:text-gray-a8',
        'data-disabled:data-pressed:bg-gray-a4',
      ],
    },
    size: {
      sm: [controlSize.sm, 'gap-1'],
      md: [controlSize.md, 'gap-2'],
      lg: [controlSize.lg, 'gap-3'],
      xl: [controlSize.xl, 'gap-3'],
    },
    /** Stronger text, using the darkest step of the color. */
    highContrast: {
      true: 'text-accent-12',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'ghost',
  },
})

export type ToggleProps = Omit<ComponentProps<typeof BaseToggle>, 'className' | 'color'> &
  VariantProps<typeof toggleVariants> & {
    className?: string
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /** How round the corners are. Follows the theme when not set. */
    radius?: Radius
  }

/** A button that stays pressed. Looks like `Button`. */
export function Toggle({
  className,
  color,
  highContrast,
  radius,
  size,
  variant,
  ...props
}: ToggleProps) {
  return (
    <BaseToggle
      data-color={colorAttribute(color)}
      data-radius={radius}
      {...props}
      className={cn(toggleVariants({ highContrast, size, variant }), className)}
    />
  )
}
