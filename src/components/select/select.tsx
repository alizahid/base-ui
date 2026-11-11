import { Select as BaseSelect } from '@base-ui/react/select'
import { type ComponentProps, createContext, useContext } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { fieldBoxVariants } from '../../lib/field-box'
import { type PositionerProps, splitPositionerProps } from '../../lib/positioner'
import {
  type ControlSize,
  controlSize,
  inputSurface,
  listItem,
  listLabel,
  listPopup,
  listSeparator,
} from '../../lib/styles'
import type { Radius } from '../../lib/theme'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '../dropdown-menu/shared'
import { useThemeProps } from '../theme-provider'

// `Root` sets the size, `Trigger`, `Content` and the rows read it
const SelectSizeContext = createContext<ControlSize>('md')

export type SelectRootProps<Value, Multiple extends boolean | undefined = false> = ComponentProps<
  typeof BaseSelect.Root<Value, Multiple>
> & {
  /**
   * The size of the trigger and of the rows in the list.
   * @default 'md'
   */
  size?: ControlSize
}

export function SelectRoot<Value, Multiple extends boolean | undefined = false>({
  size = 'md',
  ...props
}: SelectRootProps<Value, Multiple>) {
  return (
    <SelectSizeContext.Provider value={size}>
      <BaseSelect.Root {...props} />
    </SelectSizeContext.Provider>
  )
}

export const SelectGroup = BaseSelect.Group

export type SelectGroupProps = ComponentProps<typeof BaseSelect.Group>

export const selectTriggerVariants = tv({
  slots: {
    root: [
      'group/trigger inline-flex w-auto shrink-0 cursor-default select-none items-center justify-between gap-2 whitespace-nowrap align-top',
      'data-disabled:cursor-not-allowed',
    ],
    value: 'min-w-0 truncate data-placeholder:text-gray-a10',
    icon: 'shrink-0 text-gray-a11 group-data-disabled/trigger:text-gray-a8',
  },
  variants: {
    variant: {
      // Surface and soft start from the shared box (`fieldBoxVariants`), see `SelectTrigger`
      surface: { root: 'hover:not-data-disabled:inset-ring-gray-a8' },
      soft: {
        root: 'hover:not-data-disabled:bg-accent-a4 data-popup-open:bg-accent-a4',
        value: 'data-placeholder:text-accent-12 data-placeholder:opacity-60',
        icon: 'text-accent-a11',
      },
      ghost: {
        root: [
          'text-accent-12',
          '-outline-offset-1 outline-accent-8 focus-visible:outline-2',
          'hover:bg-accent-a3 data-popup-open:bg-accent-a3',
          'data-disabled:bg-transparent data-disabled:text-gray-a8',
        ],
        icon: 'text-accent-a11',
      },
    },
    size: {
      xs: { root: [controlSize.xs, 'gap-1'], icon: 'size-3.5' },
      sm: { root: controlSize.sm },
      md: { root: controlSize.md },
      lg: { root: [controlSize.lg, 'gap-3'] },
    },
  },
  defaultVariants: {
    variant: 'surface',
    size: 'md',
  },
})

export type SelectTriggerProps = Omit<
  ComponentProps<typeof BaseSelect.Trigger>,
  'children' | 'className' | 'color'
> &
  Omit<VariantProps<typeof selectTriggerVariants>, 'size'> & {
    /**
     * Changes what is shown for the picked value.
     * A node, or a function that gets the value. Same as Base UI's `Select.Value` children.
     */
    children?: ComponentProps<typeof BaseSelect.Value>['children']
    className?: string
    /** Classes for the parts that `Trigger` renders inside itself. */
    classNames?: {
      icon?: string
      value?: string
    }
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /** Shown when nothing is picked. */
    placeholder?: string
    /** How round the corners are. Follows the theme when not set. */
    radius?: Radius
  }

/** The button that opens the list. Includes Base UI's `Value` and `Icon`. */
export function SelectTrigger({
  children,
  className,
  classNames,
  color,
  placeholder,
  radius,
  variant,
  ...props
}: SelectTriggerProps) {
  const size = useContext(SelectSizeContext)
  const styles = selectTriggerVariants({ size, variant })
  // The same box as TextField. Ghost has no box.
  const box = variant === 'ghost' ? undefined : fieldBoxVariants({ size, variant }).root()

  return (
    <BaseSelect.Trigger
      data-color={colorAttribute(color)}
      data-radius={radius}
      {...props}
      className={cn(box, styles.root(), className)}
    >
      <BaseSelect.Value className={cn(styles.value(), classNames?.value)} placeholder={placeholder}>
        {children}
      </BaseSelect.Value>
      <BaseSelect.Icon
        render={<ChevronDownIcon />}
        className={cn(styles.icon(), classNames?.icon)}
      />
    </BaseSelect.Trigger>
  )
}

export const selectItemVariants = tv({
  slots: {
    // Room on the left for the check icon
    item: [listItem, 'pr-6 pl-8'],
    indicator: 'absolute left-2 inline-flex items-center justify-center',
    label: [listLabel, 'pl-8'],
  },
  variants: {
    size: {
      xs: {
        item: 'h-6 pr-4 pl-6 text-xs',
        indicator: 'left-1 [&>svg]:size-3.5',
        label: 'h-6 pl-6',
      },
      sm: { item: 'h-7' },
      md: {},
      lg: { item: 'h-10 text-base', label: 'h-10 text-sm' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const scrollArrow =
  'z-1 flex h-5 w-full cursor-default items-center justify-center bg-panel text-gray-11'

export type SelectContentProps = Omit<
  ComponentProps<typeof BaseSelect.Popup>,
  'className' | 'color'
> &
  PositionerProps<ComponentProps<typeof BaseSelect.Positioner>> &
  Pick<ComponentProps<typeof BaseSelect.Positioner>, 'alignItemWithTrigger'> &
  Pick<ComponentProps<typeof BaseSelect.Portal>, 'container'> & {
    className?: string
    /** Classes for the parts that `Content` renders around and inside itself. */
    classNames?: {
      list?: string
      positioner?: string
      scrollArrow?: string
    }
    /**
     * The color of the highlighted row. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
  }

/**
 * The list box. Base UI's `Portal`, `Positioner`, `Popup`, `List` and the two
 * scroll arrows in one.
 */
export function SelectContent({
  alignItemWithTrigger,
  children,
  className,
  classNames,
  color,
  container,
  sideOffset = 4,
  ...props
}: SelectContentProps) {
  const themeProps = useThemeProps()
  const [positionerProps, popupProps] = splitPositionerProps(props)

  return (
    <BaseSelect.Portal {...themeProps} container={container}>
      <BaseSelect.Positioner
        alignItemWithTrigger={alignItemWithTrigger}
        sideOffset={sideOffset}
        {...positionerProps}
        className={cn('select-none outline-none', classNames?.positioner)}
      >
        <BaseSelect.Popup
          data-color={colorAttribute(color)}
          {...popupProps}
          className={cn(
            listPopup,
            'min-w-(--anchor-width) overflow-hidden p-0',
            // When the popup sits on top of the trigger it should not zoom in
            'data-[side=none]:min-w-[calc(var(--anchor-width)+1.5rem)] data-[side=none]:scale-100 data-[side=none]:transition-none',
            className,
          )}
        >
          <BaseSelect.ScrollUpArrow
            className={cn(scrollArrow, 'top-0 rounded-t-[inherit]', classNames?.scrollArrow)}
          >
            <ChevronUpIcon />
          </BaseSelect.ScrollUpArrow>
          <BaseSelect.List
            className={cn(
              'max-h-(--available-height) scroll-py-6 overflow-y-auto overscroll-contain p-1',
              classNames?.list,
            )}
          >
            {children}
          </BaseSelect.List>
          <BaseSelect.ScrollDownArrow
            className={cn(scrollArrow, 'bottom-0 rounded-b-[inherit]', classNames?.scrollArrow)}
          >
            <ChevronDownIcon />
          </BaseSelect.ScrollDownArrow>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

export type SelectItemProps = Omit<ComponentProps<typeof BaseSelect.Item>, 'className'> & {
  className?: string
  /** Classes for the parts that `Item` renders inside itself. */
  classNames?: {
    indicator?: string
    text?: string
  }
}

/** A row. Includes Base UI's `ItemIndicator` (check icon on the left) and `ItemText`. */
export function SelectItem({ children, className, classNames, ...props }: SelectItemProps) {
  const size = useContext(SelectSizeContext)
  const styles = selectItemVariants({ size })

  return (
    <BaseSelect.Item {...props} className={cn(styles.item(), className)}>
      <BaseSelect.ItemIndicator className={cn(styles.indicator(), classNames?.indicator)}>
        <CheckIcon />
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText className={cn('truncate', classNames?.text)}>
        {children}
      </BaseSelect.ItemText>
    </BaseSelect.Item>
  )
}

export type SelectLabelProps = Omit<ComponentProps<typeof BaseSelect.GroupLabel>, 'className'> & {
  className?: string
}

/** A small heading. Must be inside `Group`. */
export function SelectLabel({ className, ...props }: SelectLabelProps) {
  const size = useContext(SelectSizeContext)

  return (
    <BaseSelect.GroupLabel
      {...props}
      className={cn(selectItemVariants({ size }).label(), className)}
    />
  )
}

export type SelectSeparatorProps = Omit<
  ComponentProps<typeof BaseSelect.Separator>,
  'className'
> & {
  className?: string
}

export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return <BaseSelect.Separator {...props} className={cn(listSeparator, className)} />
}
