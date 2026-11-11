import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'

export type SkeletonProps = ComponentProps<'span'> & {
  /**
   * While true, a pulsing block is shown. With children, the block takes their
   * size and they are hidden. When false, only the children are shown.
   * @default true
   */
  loading?: boolean
}

/** A placeholder for content that is still loading. */
export function Skeleton({ children, className, loading = true, ...props }: SkeletonProps) {
  if (!loading) {
    return children
  }

  return (
    <span
      aria-hidden="true"
      // `inert` keeps hidden buttons and links out of the tab order
      inert
      {...props}
      className={cn(
        'animate-pulse rounded-ui-sm bg-gray-a3',
        // With children: wrap them. Without: a block that `className` sizes.
        children === undefined ? 'block h-4' : 'inline-block w-fit select-none *:invisible',
        // Plain text is not an element, so hide it too
        'text-transparent',
        className,
      )}
    >
      {children}
    </span>
  )
}
