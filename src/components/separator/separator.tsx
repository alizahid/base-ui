import { Separator as BaseSeparator } from '@base-ui/react/separator'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'

// Values follow Radix Themes' Separator: 16px, 32px, 64px or the full length
export const separatorVariants = tv({
  base: 'block shrink-0',
  variants: {
    orientation: {
      horizontal: 'h-px',
      vertical: 'w-px',
    },
    size: { sm: '', md: '', lg: '', full: '' },
    /** Gray by default. With a `color` the line uses that color. */
    colored: {
      false: 'bg-gray-a6',
      true: 'bg-accent-a6',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', size: 'sm', class: 'w-4' },
    { orientation: 'horizontal', size: 'md', class: 'w-8' },
    { orientation: 'horizontal', size: 'lg', class: 'w-16' },
    { orientation: 'horizontal', size: 'full', class: 'w-full' },
    { orientation: 'vertical', size: 'sm', class: 'h-4' },
    { orientation: 'vertical', size: 'md', class: 'h-8' },
    { orientation: 'vertical', size: 'lg', class: 'h-16' },
    // `self-stretch` fills a flex row even when the row has no fixed height
    { orientation: 'vertical', size: 'full', class: 'h-full self-stretch' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    // Short by default, like Radix Themes. Use `size="full"` for a divider.
    size: 'sm',
    colored: false,
  },
})

export type SeparatorProps = Omit<ComponentProps<typeof BaseSeparator>, 'className' | 'color'> &
  Pick<VariantProps<typeof separatorVariants>, 'size'> & {
    className?: string
    /**
     * The color scale to use. The line is gray when not set;
     * `accent` uses the theme color.
     */
    color?: Color
  }

export function Separator({
  className,
  color,
  orientation = 'horizontal',
  size,
  ...props
}: SeparatorProps) {
  return (
    <BaseSeparator
      data-color={colorAttribute(color)}
      orientation={orientation}
      {...props}
      className={cn(
        separatorVariants({ colored: color !== undefined, orientation, size }),
        className,
      )}
    />
  )
}
