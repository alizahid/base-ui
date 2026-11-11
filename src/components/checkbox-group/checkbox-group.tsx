import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import { type ComponentProps, createContext, type ReactNode, useContext, useMemo } from 'react'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { Checkbox, type CheckboxProps } from '../checkbox'

type GroupStyle = Pick<CheckboxProps, 'highContrast' | 'size' | 'variant'>

// Lets the root set the size and variant of every item
const CheckboxGroupContext = createContext<GroupStyle>({})

/** Text size of an item label for each size. Radix Themes uses Text sizes 1 to 3 here. */
const labelSize = {
  sm: 'text-xs tracking-[0.0025em]',
  md: 'text-sm',
  lg: 'text-base',
} as const

/** Top margin that centers the checkbox on the first line of the label text. */
const nudge = { sm: 'mt-px', md: 'mt-0.5', lg: 'mt-0.5' } as const

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
  highContrast,
  size,
  variant,
  ...props
}: CheckboxGroupRootProps) {
  const context = useMemo(() => ({ highContrast, size, variant }), [highContrast, size, variant])

  return (
    <CheckboxGroupContext.Provider value={context}>
      <BaseCheckboxGroup
        data-color={colorAttribute(color)}
        {...props}
        className={cn('flex flex-col gap-1', className)}
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
  highContrast: highContrastProp,
  size: sizeProp,
  variant: variantProp,
  ...props
}: CheckboxGroupItemProps) {
  const group = useContext(CheckboxGroupContext)
  const size = sizeProp ?? group.size ?? 'md'
  const variant = variantProp ?? group.variant
  const highContrast = highContrastProp ?? group.highContrast

  return (
    <label
      className={cn(
        // `w-fit` so the empty space to the right of the text is not clickable
        'flex w-fit cursor-default select-none items-start gap-[0.5em] text-gray-12',
        'has-data-disabled:cursor-not-allowed',
        labelSize[size],
        className,
      )}
    >
      <Checkbox
        {...props}
        className={cn(nudge[size], classNames?.checkbox)}
        classNames={{ indicator: classNames?.indicator }}
        highContrast={highContrast}
        size={size}
        variant={variant}
      />
      {children}
    </label>
  )
}
