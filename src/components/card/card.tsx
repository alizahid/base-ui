import { useRender } from '@base-ui/react/use-render'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import type { Radius } from '../../lib/theme'

// The hairline of a card: the gray border color mixed with a bit of the solid gray,
// so it stays visible on any background. Taken from Radix Themes (`base-card.css`).
// A card that is a link, a button or a label gets a darker line on hover and press.
const border = [
  'after:shadow-[0_0_0_1px_color-mix(in_oklab,var(--gray-a5),var(--gray-5)_25%)]',
  '[&:is(:any-link,button,label)]:hover:after:shadow-[0_0_0_1px_color-mix(in_oklab,var(--gray-a7),var(--gray-7)_25%)]',
  '[&:is(:any-link,button,label)]:data-popup-open:after:shadow-[0_0_0_1px_color-mix(in_oklab,var(--gray-a7),var(--gray-7)_25%)]',
  '[&:is(:any-link,button,label)]:active:after:shadow-[0_0_0_1px_color-mix(in_oklab,var(--gray-a6),var(--gray-6)_25%)]',
]

// Values follow Radix Themes' Card.
export const cardVariants = tv({
  base: [
    // `contain-paint` keeps the background layer (z -1) inside the card
    'relative block overflow-hidden text-start font-normal text-gray-12 no-underline contain-paint',
    // ::before is the background, under the content.
    // ::after is the border, on top of the content, so an image that touches the edge is still framed.
    'before:pointer-events-none before:absolute before:inset-(--card-border) before:-z-1 before:[border-radius:calc(var(--ui-radius)-var(--card-border))]',
    'after:pointer-events-none after:absolute after:inset-(--card-border) after:[border-radius:calc(var(--ui-radius)-var(--card-border))]',
    // Keyboard focus. The ring is also drawn on ::after, so content cannot cover it.
    '-outline-offset-1 outline-accent-8 focus-visible:outline-2',
    'focus-visible:after:outline-2 focus-visible:after:outline-accent-8 focus-visible:after:-outline-offset-1',
  ],
  variants: {
    variant: {
      surface: [
        '[--card-border:1px] before:bg-panel before:backdrop-panel',
        border,
        'focus-visible:active:before:bg-linear-to-b focus-visible:active:before:from-accent-a2 focus-visible:active:before:to-accent-a2',
      ],
      // No box. Only a gray wash on hover when the card can be clicked.
      ghost: [
        '[--card-border:0px]',
        '[&:is(:any-link,button,label)]:hover:bg-gray-a3 [&:is(:any-link,button,label)]:data-popup-open:bg-gray-a3',
        '[&:is(:any-link,button,label)]:active:bg-gray-a4',
        '[&:is(:any-link,button,label)]:hover:focus-visible:bg-accent-a2 [&:is(:any-link,button,label)]:active:focus-visible:bg-accent-a2',
      ],
    },
    // Radix sizes 1 to 5
    size: {
      sm: 'rounded-panel-lg p-3',
      md: 'rounded-panel-lg p-4',
      lg: 'rounded-panel-xl p-6',
      xl: 'rounded-panel-xl p-8',
      '2xl': 'rounded-panel-2xl p-12',
    },
  },
  defaultVariants: {
    size: 'sm',
    variant: 'surface',
  },
})

export type CardProps = useRender.ComponentProps<'div'> &
  VariantProps<typeof cardVariants> & {
    /** How round the corners are. Follows the theme when not set. */
    radius?: Radius
  }

/**
 * A box for content. With `render={<a href="..." />}` or `render={<button />}`
 * the whole card becomes clickable and gets hover and focus styles.
 *
 * The background is drawn by `::before` and the border by `::after`, so to
 * change them use `before:bg-*` and `after:shadow-*` in `className`.
 */
export function Card({ className, radius, render, size, variant, ...props }: CardProps) {
  return useRender({
    defaultTagName: 'div',
    props: {
      'data-radius': radius,
      ...props,
      className: cn(cardVariants({ size, variant }), className as string | undefined),
    },
    render,
  })
}
