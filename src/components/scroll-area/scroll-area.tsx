import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import type { Radius } from '../../lib/theme'

// Values follow Radix Themes' ScrollArea.
export const scrollAreaVariants = tv({
  slots: {
    root: 'relative overflow-hidden',
    viewport: [
      'size-full overscroll-contain rounded-[inherit]',
      '-outline-offset-2 outline-accent-8 focus-visible:outline-2',
    ],
    content: '',
    // The track is always tinted (gray-a3), with 4px of space around it
    scrollbar: [
      'pointer-events-none m-1 flex touch-none select-none rounded-ui-xs bg-gray-a3 opacity-0',
      'transition-opacity duration-[120ms] ease-out',
      // Shown while the pointer is over the area, or while it scrolls
      'data-hovering:pointer-events-auto data-hovering:opacity-100',
      'data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0',
    ],
    thumb: [
      'relative rounded-[inherit] bg-gray-a8 transition-colors duration-100 hover:bg-gray-a9',
      // A bigger area to grab than the thin line that is drawn
      'before:absolute before:top-1/2 before:left-1/2 before:size-full before:min-h-4 before:min-w-4 before:-translate-1/2',
    ],
  },
  variants: {
    orientation: {
      vertical: { thumb: 'w-full' },
      horizontal: { scrollbar: 'flex-col', thumb: 'h-full' },
    },
    // Radix sizes 1 to 3: 4px, 8px and 12px thick
    size: { sm: '', md: '', lg: '' },
  },
  compoundVariants: [
    { orientation: 'vertical', size: 'sm', class: { scrollbar: 'w-1' } },
    { orientation: 'vertical', size: 'md', class: { scrollbar: 'w-2' } },
    { orientation: 'vertical', size: 'lg', class: { scrollbar: 'w-3' } },
    { orientation: 'horizontal', size: 'sm', class: { scrollbar: 'h-1' } },
    { orientation: 'horizontal', size: 'md', class: { scrollbar: 'h-2' } },
    { orientation: 'horizontal', size: 'lg', class: { scrollbar: 'h-3' } },
  ],
  defaultVariants: {
    orientation: 'vertical',
    size: 'sm',
  },
})

export type ScrollAreaProps = Omit<ComponentProps<typeof BaseScrollArea.Root>, 'className'> &
  Pick<VariantProps<typeof scrollAreaVariants>, 'size'> & {
    /** Goes on the outer box. Set the height and the width here. */
    className?: string
    /** Classes for the parts that `ScrollArea` renders inside itself. */
    classNames?: {
      /** The box around the children, inside the viewport. */
      content?: string
      scrollbar?: string
      thumb?: string
      /** The part that scrolls. */
      viewport?: string
    }
    /** How round the scrollbars are. Follows the theme when not set. */
    radius?: Radius
    /**
     * Which scrollbars to show.
     * @default 'both'
     */
    scrollbars?: 'vertical' | 'horizontal' | 'both'
  }

/** Base UI's `Root`, `Viewport`, `Content`, `Scrollbar`, `Thumb` and `Corner` in one. */
export function ScrollArea({
  children,
  className,
  classNames,
  radius,
  scrollbars = 'both',
  size,
  ...props
}: ScrollAreaProps) {
  const styles = scrollAreaVariants({ size })

  const scrollbar = (orientation: 'vertical' | 'horizontal') => (
    <BaseScrollArea.Scrollbar
      className={cn(styles.scrollbar({ orientation }), classNames?.scrollbar)}
      orientation={orientation}
    >
      <BaseScrollArea.Thumb className={cn(styles.thumb({ orientation }), classNames?.thumb)} />
    </BaseScrollArea.Scrollbar>
  )

  return (
    <BaseScrollArea.Root data-radius={radius} {...props} className={cn(styles.root(), className)}>
      <BaseScrollArea.Viewport
        className={cn(
          styles.viewport(),
          // Do not scroll in a direction that has no scrollbar
          scrollbars === 'vertical' && 'overflow-x-hidden!',
          scrollbars === 'horizontal' && 'overflow-y-hidden!',
          classNames?.viewport,
        )}
      >
        <BaseScrollArea.Content className={cn(styles.content(), classNames?.content)}>
          {children}
        </BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      {scrollbars !== 'horizontal' && scrollbar('vertical')}
      {scrollbars !== 'vertical' && scrollbar('horizontal')}
      {scrollbars === 'both' && <BaseScrollArea.Corner />}
    </BaseScrollArea.Root>
  )
}
