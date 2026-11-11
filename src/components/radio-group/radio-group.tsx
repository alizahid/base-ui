import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { type ComponentProps, createContext, type ReactNode, useContext, useMemo } from 'react'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { Radio, type RadioProps } from '../radio'

type GroupStyle = Pick<RadioProps, 'highContrast' | 'size' | 'variant'>

// Lets the root set the size and variant of every item
const RadioGroupContext = createContext<GroupStyle>({})

/** Text size of an item label for each size. Radix Themes uses Text sizes 1 to 3 here. */
const labelSize = {
  sm: 'text-xs tracking-[0.0025em]',
  md: 'text-sm',
  lg: 'text-base',
} as const

/** Top margin that centers the radio on the first line of the label text. */
const nudge = { sm: 'mt-px', md: 'mt-0.5', lg: 'mt-0.5' } as const

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

export function RadioGroupRoot({
  className,
  color,
  highContrast,
  size,
  variant,
  ...props
}: RadioGroupRootProps) {
  const context = useMemo(() => ({ highContrast, size, variant }), [highContrast, size, variant])

  return (
    <RadioGroupContext.Provider value={context}>
      <BaseRadioGroup
        data-color={colorAttribute(color)}
        {...props}
        className={cn('flex flex-col gap-1', className)}
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
  highContrast: highContrastProp,
  size: sizeProp,
  variant: variantProp,
  ...props
}: RadioGroupItemProps) {
  const group = useContext(RadioGroupContext)
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
      <Radio
        {...props}
        className={cn(nudge[size], classNames?.radio)}
        classNames={{ indicator: classNames?.indicator }}
        highContrast={highContrast}
        size={size}
        variant={variant}
      />
      {children}
    </label>
  )
}
