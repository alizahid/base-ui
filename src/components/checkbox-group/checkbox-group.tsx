import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import { type ComponentProps, createContext, type ReactNode, useContext, useMemo } from 'react'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { Checkbox, type CheckboxProps } from '../checkbox'

type GroupStyle = Pick<CheckboxProps, 'size' | 'variant'>

// Lets the root set the size and variant of every item
const CheckboxGroupContext = createContext<GroupStyle>({})

/** Text size of an item label for each checkbox size. */
const labelSize = { sm: 'gap-1.5 text-xs', md: 'gap-2 text-sm', lg: 'gap-2 text-base' } as const

export type CheckboxGroupRootProps = Omit<
  ComponentProps<typeof BaseCheckboxGroup>,
  'className' | 'color'
> &
  GroupStyle & {
    className?: string
    /**
     * The color scale of all items. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
  }

export function CheckboxGroupRoot({
  className,
  color,
  size,
  variant,
  ...props
}: CheckboxGroupRootProps) {
  const context = useMemo(() => ({ size, variant }), [size, variant])

  return (
    <CheckboxGroupContext.Provider value={context}>
      <BaseCheckboxGroup
        data-color={colorAttribute(color)}
        {...props}
        className={cn('flex flex-col items-start gap-2', className)}
      />
    </CheckboxGroupContext.Provider>
  )
}

export type CheckboxGroupItemProps = Omit<CheckboxProps, 'children' | 'classNames'> & {
  /** The label text. */
  children?: ReactNode
  /** Classes for the parts that the item renders inside itself. */
  classNames?: {
    checkbox?: string
    indicator?: string
  }
}

/** A `<label>` row with a `Checkbox` and its text. `className` goes to the label. */
export function CheckboxGroupItem({
  children,
  className,
  classNames,
  size: sizeProp,
  variant: variantProp,
  ...props
}: CheckboxGroupItemProps) {
  const group = useContext(CheckboxGroupContext)
  const size = sizeProp ?? group.size ?? 'md'
  const variant = variantProp ?? group.variant

  return (
    <label
      className={cn(
        'inline-flex select-none items-center text-gray-12',
        'has-data-disabled:cursor-not-allowed has-data-disabled:text-gray-a8',
        labelSize[size],
        className,
      )}
    >
      <Checkbox
        {...props}
        className={classNames?.checkbox}
        classNames={{ indicator: classNames?.indicator }}
        size={size}
        variant={variant}
      />
      {children}
    </label>
  )
}
