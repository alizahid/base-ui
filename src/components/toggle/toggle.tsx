import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { controlSize, focusRing } from '../../lib/styles'
import type { Radius } from '../../lib/theme'

export const toggleVariants = tv({
  base: [
    'relative inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap align-top font-medium',
    'data-disabled:cursor-not-allowed',
    // A disabled toggle that is pressed keeps a gray fill
    'data-disabled:data-pressed:bg-gray-a4 data-disabled:data-pressed:text-gray-a8',
    focusRing,
  ],
  variants: {
    // Same looks as Button. The pressed state gets a stronger fill.
    variant: {
      soft: [
        'bg-accent-a3 text-accent-a11',
        'hover:bg-accent-a4',
        'data-pressed:bg-accent-a6 data-pressed:text-accent-12',
        'data-disabled:bg-gray-a3 data-disabled:text-gray-a8',
      ],
      surface: [
        'bg-accent-a2 text-accent-a11 inset-ring inset-ring-accent-a7',
        'hover:inset-ring-accent-a8',
        'data-pressed:bg-accent-a5 data-pressed:text-accent-12 data-pressed:inset-ring-accent-a8',
        'data-disabled:bg-gray-a2 data-disabled:text-gray-a8 data-disabled:inset-ring-gray-a6',
        'data-disabled:data-pressed:inset-ring-gray-a6',
      ],
      outline: [
        'text-accent-a11 inset-ring inset-ring-accent-a8',
        'hover:bg-accent-a2',
        'data-pressed:bg-accent-a5 data-pressed:text-accent-12',
        'data-disabled:bg-transparent data-disabled:text-gray-a8 data-disabled:inset-ring-gray-a7',
      ],
      ghost: [
        'text-accent-a11',
        'hover:bg-accent-a3',
        'data-pressed:bg-accent-a5 data-pressed:text-accent-12',
        'data-disabled:bg-transparent data-disabled:text-gray-a8',
      ],
    },
    size: {
      xs: [controlSize.xs, 'gap-1'],
      sm: [controlSize.sm, 'gap-2'],
      md: [controlSize.md, 'gap-3'],
      lg: [controlSize.lg, 'gap-3'],
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
export function Toggle({ className, color, radius, size, variant, ...props }: ToggleProps) {
  return (
    <BaseToggle
      data-color={colorAttribute(color)}
      data-radius={radius}
      {...props}
      className={cn(toggleVariants({ size, variant }), className)}
    />
  )
}
