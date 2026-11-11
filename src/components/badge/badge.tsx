import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'

export const badgeVariants = tv({
  base: 'inline-flex shrink-0 items-center whitespace-nowrap font-medium',
  variants: {
    variant: {
      solid: 'bg-accent-9 text-accent-contrast',
      soft: 'bg-accent-a3 text-accent-a11',
      surface: 'bg-accent-a2 text-accent-a11 inset-ring inset-ring-accent-a6',
      outline: 'text-accent-a11 inset-ring inset-ring-accent-a8',
    },
    size: {
      sm: 'h-5 gap-1 rounded-ui-xs px-1.5 text-xs',
      md: 'h-6 gap-1.5 rounded-ui-sm px-2 text-xs',
      lg: 'h-7 gap-2 rounded-ui-sm px-2.5 text-sm',
    },
  },
  defaultVariants: {
    size: 'sm',
    variant: 'soft',
  },
})

export type BadgeProps = Omit<ComponentProps<'span'>, 'color'> &
  VariantProps<typeof badgeVariants> & {
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /** How round the corners are. Follows the theme when not set. */
    radius?: Radius
  }

export function Badge({ className, color, radius, size, variant, ...props }: BadgeProps) {
  return (
    <span
      data-color={colorAttribute(color)}
      data-radius={radius}
      {...props}
      className={cn(badgeVariants({ size, variant }), className)}
    />
  )
}
