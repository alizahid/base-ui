import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'

// Values follow Radix Themes' Badge. The height comes from the line height
// plus the padding: 20px, 24px and 28px.
export const badgeVariants = tv({
  base: 'inline-flex h-fit shrink-0 items-center whitespace-nowrap font-medium',
  variants: {
    variant: {
      solid: 'bg-accent-9 text-accent-contrast selection:bg-accent-7 selection:text-accent-12',
      soft: 'bg-accent-a3 text-accent-a11',
      surface: 'bg-accent-surface text-accent-a11 inset-ring inset-ring-accent-a6',
      outline: 'text-accent-a11 inset-ring inset-ring-accent-a8',
    },
    size: {
      sm: 'gap-1.5 rounded-ui-xs px-1.5 py-0.5 text-xs tracking-[0.0025em]',
      md: 'gap-1.5 rounded-ui-sm px-2 py-1 text-xs tracking-[0.0025em]',
      lg: 'gap-2 rounded-ui-sm px-2.5 py-1 text-sm',
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
      class: 'bg-accent-12 text-accent-1 selection:bg-accent-a11 selection:text-accent-1',
    },
    { highContrast: true, variant: ['soft', 'surface'], class: 'text-accent-12' },
    {
      highContrast: true,
      variant: 'outline',
      class:
        'text-accent-12 shadow-[inset_0_0_0_1px_var(--accent-a7),inset_0_0_0_1px_var(--gray-a11)]',
    },
  ],
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

export function Badge({
  className,
  color,
  highContrast,
  radius,
  size,
  variant,
  ...props
}: BadgeProps) {
  return (
    <span
      data-color={colorAttribute(color)}
      data-radius={radius}
      {...props}
      className={cn(badgeVariants({ highContrast, size, variant }), className)}
    />
  )
}
