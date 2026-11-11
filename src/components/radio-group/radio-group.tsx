import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { type ComponentProps, createContext, type ReactNode, useContext, useMemo } from 'react'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { Radio, type RadioProps } from '../radio'

type GroupStyle = Pick<RadioProps, 'size' | 'variant'>

// Lets the root set the size and variant of every item
const RadioGroupContext = createContext<GroupStyle>({})

/** Text size of an item label for each radio size. */
const labelSize = { sm: 'gap-1.5 text-xs', md: 'gap-2 text-sm', lg: 'gap-2 text-base' } as const

export type RadioGroupRootProps = Omit<
  ComponentProps<typeof BaseRadioGroup>,
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

export function RadioGroupRoot({ className, color, size, variant, ...props }: RadioGroupRootProps) {
  const context = useMemo(() => ({ size, variant }), [size, variant])

  return (
    <RadioGroupContext.Provider value={context}>
      <BaseRadioGroup
        data-color={colorAttribute(color)}
        {...props}
        className={cn('flex flex-col items-start gap-2', className)}
      />
    </RadioGroupContext.Provider>
  )
}

export type RadioGroupItemProps = Omit<RadioProps, 'children' | 'classNames'> & {
  /** The label text. */
  children?: ReactNode
  /** Classes for the parts that the item renders inside itself. */
  classNames?: {
    indicator?: string
    radio?: string
  }
}

/** A `<label>` row with a `Radio` and its text. `className` goes to the label. */
export function RadioGroupItem({
  children,
  className,
  classNames,
  size: sizeProp,
  variant: variantProp,
  ...props
}: RadioGroupItemProps) {
  const group = useContext(RadioGroupContext)
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
      <Radio
        {...props}
        className={classNames?.radio}
        classNames={{ indicator: classNames?.indicator }}
        size={size}
        variant={variant}
      />
      {children}
    </label>
  )
}
