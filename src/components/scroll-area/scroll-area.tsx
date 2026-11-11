import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import type { Radius } from '../../lib/theme'

export const scrollAreaVariants = tv({
  slots: {
    root: 'relative overflow-hidden',
    viewport: [
      'size-full overscroll-contain rounded-[inherit]',
      '-outline-offset-1 outline-accent-8 focus-visible:outline-2',
    ],
    content: '',
    scrollbar: [
      'pointer-events-none m-1 flex touch-none select-none rounded-ui-thumb opacity-0 transition-[opacity,background-color]',
      'hover:bg-gray-a3',
      // Shown while the pointer is over the area, or while it scrolls
      'data-hovering:pointer-events-auto data-hovering:opacity-100',
      'data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0',
    ],
    thumb: [
      'relative rounded-[inherit] bg-gray-a8 transition-colors hover:bg-gray-a9 active:bg-gray-a10',
      // A bigger area to grab than the thin line that is drawn
      'before:absolute before:top-1/2 before:left-1/2 before:size-full before:min-h-4 before:min-w-4 before:-translate-1/2',
    ],
  },
  variants: {
    orientation: {
      vertical: { thumb: 'w-full' },
      horizontal: { scrollbar: 'flex-col', thumb: 'h-full' },
    },
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
    size: 'md',
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
     * @default 'vertical'
     */
    scrollbars?: 'vertical' | 'horizontal' | 'both'
  }

/** Base UI's `Root`, `Viewport`, `Content`, `Scrollbar`, `Thumb` and `Corner` in one. */
export function ScrollArea({
  children,
  className,
  classNames,
  radius,
  scrollbars = 'vertical',
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
