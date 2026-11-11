import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import { type ComponentProps, createContext, useContext, useMemo } from 'react'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'
import { Toggle, type ToggleProps } from '../toggle'

type GroupStyle = Pick<ToggleProps, 'highContrast' | 'size' | 'variant'>

// Lets the root set the size and variant of every item
const ToggleGroupContext = createContext<GroupStyle>({})

export type ToggleGroupRootProps = Omit<
  ComponentProps<typeof BaseToggleGroup>,
  'className' | 'color'
> &
  GroupStyle & {
    className?: string
    /**
     * The color scale of all items. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /** How round the corners of all items are. Follows the theme when not set. */
    radius?: Radius
  }

export function ToggleGroupRoot({
  className,
  color,
  highContrast,
  radius,
  size,
  variant,
  ...props
}: ToggleGroupRootProps) {
  const context = useMemo(() => ({ highContrast, size, variant }), [highContrast, size, variant])

  return (
    <ToggleGroupContext.Provider value={context}>
      <BaseToggleGroup
        data-color={colorAttribute(color)}
        data-radius={radius}
        {...props}
        className={cn('inline-flex gap-1 data-[orientation=vertical]:flex-col', className)}
      />
    </ToggleGroupContext.Provider>
  )
}

export type ToggleGroupItemProps = ToggleProps

/** A `Toggle` that takes its size and variant from the group. */
export function ToggleGroupItem({ highContrast, size, variant, ...props }: ToggleGroupItemProps) {
  const group = useContext(ToggleGroupContext)

  return (
    <Toggle
      {...props}
      highContrast={highContrast ?? group.highContrast}
      size={size ?? group.size}
      variant={variant ?? group.variant}
    />
  )
}
