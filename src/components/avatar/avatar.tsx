import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import type { ComponentProps, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'

// Values follow Radix Themes' Avatar. Our sizes are Radix sizes 1 to 6.
export const avatarVariants = tv({
  slots: {
    root: 'inline-flex shrink-0 select-none items-center justify-center align-middle',
    image: 'size-full rounded-[inherit] object-cover',
    // The colors are on the fallback, so a see-through image has nothing behind it
    fallback:
      'flex size-full items-center justify-center rounded-[inherit] font-medium uppercase leading-none',
  },
  variants: {
    variant: {
      soft: { fallback: 'bg-accent-a3 text-accent-a11' },
      solid: { fallback: 'bg-accent-9 text-accent-contrast' },
    },
    size: {
      sm: { root: 'size-6 rounded-ui-sm tracking-[0.0025em]' },
      md: { root: 'size-8 rounded-ui-sm' },
      lg: { root: 'size-10 rounded-ui-md' },
      xl: { root: 'size-12 rounded-ui-md tracking-[-0.0025em]' },
      '2xl': { root: 'size-16 rounded-ui-lg tracking-[-0.00625em]' },
      '3xl': { root: 'size-20 rounded-ui-xl tracking-[-0.0075em]' },
    },
    // One letter is drawn one step bigger than two letters (up to size `xl`)
    letters: { one: '', two: '' },
    /** Stronger colors, using the darkest step of the color. */
    highContrast: {
      true: '',
    },
  },
  compoundVariants: [
    { size: 'sm', letters: 'one', class: { fallback: 'text-sm' } },
    { size: 'sm', letters: 'two', class: { fallback: 'text-xs' } },
    { size: 'md', letters: 'one', class: { fallback: 'text-base' } },
    { size: 'md', letters: 'two', class: { fallback: 'text-sm' } },
    { size: 'lg', letters: 'one', class: { fallback: 'text-lg' } },
    { size: 'lg', letters: 'two', class: { fallback: 'text-base' } },
    { size: 'xl', letters: 'one', class: { fallback: 'text-xl' } },
    { size: 'xl', letters: 'two', class: { fallback: 'text-lg' } },
    { size: '2xl', class: { fallback: 'text-2xl' } },
    { size: '3xl', class: { fallback: 'text-[1.75rem]' } },
    { highContrast: true, variant: 'solid', class: { fallback: 'bg-accent-12 text-accent-1' } },
    { highContrast: true, variant: 'soft', class: { fallback: 'text-accent-12' } },
  ],
  defaultVariants: {
    letters: 'two',
    size: 'lg',
    variant: 'soft',
  },
})

type ImageProps = ComponentProps<typeof BaseAvatar.Image>

export type AvatarProps = Omit<ComponentProps<typeof BaseAvatar.Root>, 'className' | 'color'> &
  Omit<VariantProps<typeof avatarVariants>, 'letters'> &
  Pick<ImageProps, 'alt' | 'crossOrigin' | 'onLoadingStatusChange' | 'referrerPolicy' | 'src'> & {
    className?: string
    /** Classes for the parts that `Avatar` renders inside itself. */
    classNames?: {
      fallback?: string
      image?: string
    }
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /** Shown when there is no image, or it did not load. Usually one or two letters. */
    fallback?: ReactNode
    /** How long to wait before the fallback is shown, in milliseconds. */
    fallbackDelay?: number
    /** How round the corners are. Follows the theme when not set. `full` gives a circle. */
    radius?: Radius
  }

/** Includes Base UI's `Avatar.Image` and `Avatar.Fallback`. */
export function Avatar({
  alt,
  children,
  className,
  classNames,
  color,
  crossOrigin,
  fallback,
  fallbackDelay,
  highContrast,
  onLoadingStatusChange,
  radius,
  referrerPolicy,
  size,
  src,
  variant,
  ...props
}: AvatarProps) {
  const content = fallback ?? children
  // Like Radix Themes: a single letter gets a bigger font
  const letters = typeof content === 'string' && content.length === 1 ? 'one' : 'two'
  const styles = avatarVariants({ highContrast, letters, size, variant })

  return (
    <BaseAvatar.Root
      data-color={colorAttribute(color)}
      data-radius={radius}
      {...props}
      className={cn(styles.root(), className)}
    >
      {src ? (
        <BaseAvatar.Image
          alt={alt}
          className={cn(styles.image(), classNames?.image)}
          crossOrigin={crossOrigin}
          onLoadingStatusChange={onLoadingStatusChange}
          referrerPolicy={referrerPolicy}
          src={src}
        />
      ) : null}
      <BaseAvatar.Fallback
        className={cn(styles.fallback(), classNames?.fallback)}
        delay={fallbackDelay}
      >
        {content}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  )
}
