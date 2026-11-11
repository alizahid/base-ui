import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { type ComponentProps, createContext, useContext } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'

// Values follow Radix Themes' SegmentedControl.
export const segmentedControlVariants = tv({
  slots: {
    // The track. Items share the width equally. `segmented-track` counts them for the indicator.
    // The gray is a layer on top of the surface color.
    root: [
      'group/segmented segmented-track relative isolate inline-grid min-w-max auto-cols-fr grid-flow-col items-stretch align-top',
      'bg-[linear-gradient(var(--gray-a3),var(--gray-a3))] bg-surface text-center text-gray-12',
      'data-disabled:bg-gray-3 data-disabled:bg-none data-disabled:text-gray-a8',
    ],
    item: [
      'group/item relative flex cursor-default select-none items-stretch whitespace-nowrap',
      // Only the outer corners of the first and last item are round
      'first-of-type:rounded-l-[inherit] last-of-type:rounded-r-[inherit]',
      '-outline-offset-1 outline-accent-8 focus-visible:rounded-[inherit] focus-visible:outline-2',
      'data-disabled:cursor-not-allowed data-disabled:text-gray-a8',
    ],
    // The text of an item. It is rendered twice, see `SegmentedControlItem`.
    label: [
      'flex grow items-center justify-center rounded-[inherit]',
      'group-hover/item:group-not-data-checked/item:group-not-data-disabled/item:bg-gray-a2',
    ],
    labelText: 'flex items-center justify-center [&_svg]:shrink-0',
    // Medium weight, shown when the item is picked. It also sets the item width.
    labelActive: [
      'font-medium tracking-[-0.01em] opacity-0 transition-opacity duration-80 ease-in',
      'group-data-checked/item:opacity-100 group-data-checked/item:ease-out',
    ],
    // Regular weight, laid on top, shown when the item is not picked
    labelInactive: [
      'absolute font-normal tracking-normal opacity-100 transition-opacity duration-80 ease-out',
      'group-data-checked/item:opacity-0 group-data-checked/item:ease-in',
    ],
    // A thin line between two items. Hidden next to the picked or focused item.
    // `-z-1` puts it under the indicator.
    separator: [
      'absolute inset-y-[3px] left-[-0.5px] -z-1 w-px bg-gray-a4 transition-opacity duration-80 ease-out',
      'group-first-of-type/item:opacity-0',
      'group-data-checked/item:opacity-0 group-focus-visible/item:opacity-0',
      // The item after the picked or focused one (Base UI may put an <input> between them)
      '[[data-checked]+*>&]:opacity-0 [[data-checked]+input+*>&]:opacity-0',
      '[:focus-visible+*>&]:opacity-0 [:focus-visible+input+*>&]:opacity-0',
    ],
    // The raised panel behind the picked item. It slides when the pick changes.
    // `indicatorArea` covers the track, `indicatorSlide` is one item wide and moves,
    // `indicator` is the panel you see, 1px inside it.
    indicatorArea: 'pointer-events-none absolute inset-0 -z-1 rounded-[inherit]',
    indicatorSlide: [
      'segmented-indicator h-full p-px group-data-disabled/segmented:p-0',
      'transition-[translate] duration-100 ease-[cubic-bezier(0.445,0.05,0.55,0.95)] motion-reduce:transition-none',
      // Nothing to show until an item is picked
      'opacity-0 group-has-data-checked/segmented:opacity-100',
    ],
    indicator: [
      'size-full rounded-inner-px bg-white shadow-[0_0_0_1px_var(--gray-a4)] dark:bg-gray-a3',
      'group-data-disabled/segmented:bg-gray-a3 group-data-disabled/segmented:shadow-none',
    ],
  },
  variants: {
    // Radix Themes sizes 1 to 3: 24, 32 and 40px tall
    size: {
      sm: {
        root: 'h-6 rounded-ui-sm text-xs',
        label: 'px-3',
        labelText: 'gap-1',
        labelInactive: 'tracking-[0.0025em]',
      },
      md: { root: 'h-8 rounded-ui-sm text-sm', label: 'px-4', labelText: 'gap-2' },
      lg: { root: 'h-10 rounded-ui-md text-base', label: 'px-4', labelText: 'gap-3' },
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
          <div className={styles.indicatorSlide()}>
            <div className={cn(styles.indicator(), classNames?.indicator)} />
          </div>
        </div>
      </BaseRadioGroup>
    </SizeContext.Provider>
  )
}

export type SegmentedControlItemProps = Omit<ComponentProps<typeof BaseRadio.Root>, 'className'> & {
  className?: string
}

/**
 * The text is rendered twice, like in Radix Themes: once in medium weight (picked)
 * and once in regular weight (not picked), on top of each other. The medium one
 * always takes up the space, so the width does not jump when the pick changes.
 */
export function SegmentedControlItem({ children, className, ...props }: SegmentedControlItemProps) {
  const size = useContext(SizeContext)
  const styles = segmentedControlVariants({ size })

  return (
    <BaseRadio.Root {...props} className={cn(styles.item(), className)}>
      <span className={styles.separator()} />
      <span className={styles.label()}>
        <span className={cn(styles.labelText(), styles.labelActive())}>{children}</span>
        <span aria-hidden="true" className={cn(styles.labelText(), styles.labelInactive())}>
          {children}
        </span>
      </span>
    </BaseRadio.Root>
  )
}
