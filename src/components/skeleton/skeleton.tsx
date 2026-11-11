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
    <>
      <span
        aria-hidden="true"
        // `inert` keeps hidden buttons and links out of the tab order
        inert
        {...props}
        className={cn(
          // Radix Themes: 1s pulse, small corners, and nothing of the content shows
          'pointer-events-none animate-[ui-skeleton-pulse_1000ms_infinite_alternate-reverse] cursor-default select-none rounded-panel-xs text-transparent *:invisible',
          // Without children: a block that `className` sizes (12px tall, like Radix).
          // With children: wrap them and take their size.
          children === undefined ? 'block h-3' : 'inline-block w-fit',
          className,
        )}
      >
        {children}
      </span>
    </>
  )
}
