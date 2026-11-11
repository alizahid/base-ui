import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { type ComponentProps, createContext, useContext } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'

export const segmentedControlVariants = tv({
  slots: {
    // The track. Items share the width equally.
    root: 'inline-grid auto-cols-fr grid-flow-col bg-gray-a3 p-px text-gray-12',
    item: [
      // Follows the track radius, minus the 1px gap
      'inline-flex cursor-default select-none items-center justify-center whitespace-nowrap rounded-inner-px text-gray-a11',
      '-outline-offset-1 outline-accent-8 focus-visible:outline-2',
      'hover:not-data-checked:not-data-disabled:bg-gray-a3',
      'data-checked:bg-panel data-checked:font-medium data-checked:text-gray-12 data-checked:shadow-sm data-checked:inset-ring data-checked:inset-ring-gray-a4',
      'data-disabled:cursor-not-allowed data-disabled:text-gray-a8',
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
  className,
  color,
  radius,
  size,
  ...props
}: SegmentedControlRootProps) {
  return (
    <SizeContext.Provider value={size}>
      <BaseRadioGroup
        data-color={colorAttribute(color)}
        data-radius={radius}
        {...props}
        className={cn(segmentedControlVariants({ size }).root(), className)}
      />
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
