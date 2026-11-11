import { useRender } from '@base-ui/react/use-render'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { focusRing } from '../../lib/styles'
import type { Radius } from '../../lib/theme'

export const cardVariants = tv({
  base: 'block text-gray-12',
  variants: {
    variant: {
      surface: 'bg-panel inset-ring inset-ring-gray-a5',
      ghost: '',
    },
    size: {
      sm: 'rounded-panel-md p-3',
      md: 'rounded-panel-lg p-4',
      lg: 'rounded-panel-xl p-6',
    },
    /** Set when the card is a link or a button */
    interactive: {
      true: ['cursor-pointer text-left no-underline', focusRing],
    },
  },
  compoundVariants: [
    {
      interactive: true,
      variant: 'surface',
      class: 'hover:inset-ring-gray-a7 active:inset-ring-gray-a8',
    },
    { interactive: true, variant: 'ghost', class: 'hover:bg-gray-a3 active:bg-gray-a4' },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'surface',
  },
})

export type CardProps = useRender.ComponentProps<'div'> &
  Omit<VariantProps<typeof cardVariants>, 'interactive'> & {
    /** How round the corners are. Follows the theme when not set. */
    radius?: Radius
  }

/**
 * A box for content. With `render={<a href="..." />}` or `render={<button />}`
 * the whole card becomes clickable and gets hover and focus styles.
 */
export function Card({ className, radius, render, size, variant, ...props }: CardProps) {
  return useRender({
    defaultTagName: 'div',
    props: {
      'data-radius': radius,
      ...props,
      className: cn(
        cardVariants({ interactive: render !== undefined, size, variant }),
        className as string | undefined,
      ),
    },
    render,
  })
}
