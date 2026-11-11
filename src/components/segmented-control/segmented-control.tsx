import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { type ComponentProps, createContext, useContext } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'

export const segmentedControlVariants = tv({
  slots: {
    // The track. Items share the width equally. `segmented-track` counts them for the indicator.
    root: 'group/segmented segmented-track relative isolate inline-grid auto-cols-fr grid-flow-col bg-gray-a3 p-px text-gray-12',
    item: [
      'z-10 inline-flex cursor-default select-none items-center justify-center whitespace-nowrap rounded-inner-px text-gray-a11',
      '-outline-offset-1 outline-accent-8 focus-visible:outline-2',
      'transition-colors hover:not-data-checked:not-data-disabled:bg-gray-a3',
      'data-checked:font-medium data-checked:text-gray-12',
      'data-disabled:cursor-not-allowed data-disabled:text-gray-a8',
    ],
    // The raised panel behind the picked item. It slides when the pick changes.
    // The wrapper is the area inside the 1px padding; the panel is one item wide.
    indicatorArea: 'pointer-events-none absolute inset-px',
    indicator: [
      'segmented-indicator h-full rounded-inner-px bg-panel shadow-sm inset-ring inset-ring-gray-a4',
      'transition-[translate] duration-200 ease-out motion-reduce:transition-none',
      // Nothing to show until an item is picked
      'opacity-0 group-has-data-checked/segmented:opacity-100',
    ],
  },
  variants: {
    size: {
      sm: { root: 'h-6 rounded-ui-sm text-xs', item: 'gap-1 px-2' },
      md: { root: 'h-8 rounded-ui-md text-sm', item: 'gap-2 px-3' },
      lg: { root: 'h-10 rounded-ui-md text-base', item: 'gap-2 px-4' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type Size = VariantProps<typeof segmentedControlVariants>['size']

const SizeContext = createContext<Size>(undefined)

export type SegmentedControlRootProps = Omit<
  ComponentProps<typeof BaseRadioGroup>,
  'className' | 'color'
> & {
  className?: string
  /** Classes for the parts that `Root` renders inside itself. */
  classNames?: {
    indicator?: string
  }
  /**
   * The color scale used for the focus ring. `accent` follows the theme.
   * @default 'accent'
   */
  color?: Color
  /** How round the corners are. Follows the theme when not set. */
  radius?: Radius
  /**
   * @default 'md'
   */
  size?: Size
}

/** A row of options where one is picked. Arrow keys move between them. */
export function SegmentedControlRoot({
  children,
  className,
  classNames,
  color,
  radius,
  size,
  ...props
}: SegmentedControlRootProps) {
  const styles = segmentedControlVariants({ size })

  return (
    <SizeContext.Provider value={size}>
      <BaseRadioGroup
        data-color={colorAttribute(color)}
        data-radius={radius}
        {...props}
        className={cn(styles.root(), className)}
      >
        {children}
        {/* Not a span: the track counts its span children as items */}
        <div aria-hidden="true" className={styles.indicatorArea()}>
          <div className={cn(styles.indicator(), classNames?.indicator)} />
        </div>
      </BaseRadioGroup>
    </SizeContext.Provider>
  )
}

export type SegmentedControlItemProps = Omit<ComponentProps<typeof BaseRadio.Root>, 'className'> & {
  className?: string
}

export function SegmentedControlItem({ className, ...props }: SegmentedControlItemProps) {
  const size = useContext(SizeContext)

  return (
    <BaseRadio.Root
      {...props}
      className={cn(segmentedControlVariants({ size }).item(), className)}
    />
  )
}
