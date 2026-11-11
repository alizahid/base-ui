import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import type { ComponentProps, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'

export const avatarVariants = tv({
  slots: {
    root: 'inline-flex shrink-0 select-none items-center justify-center overflow-hidden align-middle font-medium uppercase',
    image: 'size-full object-cover',
    fallback: 'flex size-full items-center justify-center',
  },
  variants: {
    variant: {
      soft: { root: 'bg-accent-a3 text-accent-a11' },
      solid: { root: 'bg-accent-9 text-accent-contrast' },
    },
    size: {
      xs: { root: 'size-6 rounded-ui-sm text-xs' },
      sm: { root: 'size-8 rounded-ui-md text-sm' },
      md: { root: 'size-10 rounded-ui-md text-base' },
      lg: { root: 'size-12 rounded-ui-lg text-lg' },
      xl: { root: 'size-16 rounded-ui-lg text-2xl' },
    },
  },
  defaultVariants: {
    variant: 'soft',
    size: 'md',
  },
})

type ImageProps = ComponentProps<typeof BaseAvatar.Image>

export type AvatarProps = Omit<ComponentProps<typeof BaseAvatar.Root>, 'className' | 'color'> &
  VariantProps<typeof avatarVariants> &
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
  onLoadingStatusChange,
  radius,
  referrerPolicy,
  size,
  src,
  variant,
  ...props
}: AvatarProps) {
  const styles = avatarVariants({ size, variant })

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
        {fallback ?? children}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  )
}
