import { Select as BaseSelect } from '@base-ui/react/select'
import { type ComponentProps, createContext, useContext } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { fieldBoxVariants } from '../../lib/field-box'
import { type PositionerProps, splitPositionerProps } from '../../lib/positioner'
import { controlSize, listVariants } from '../../lib/styles'
import type { Radius } from '../../lib/theme'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ListStyleProvider,
  useListStyle,
} from '../dropdown-menu/shared'
import { useThemeProps } from '../theme-provider'

/** Radix Themes sizes 1 to 3: a 24, 32 or 40px tall trigger. */
export type SelectSize = 'sm' | 'md' | 'lg'

// `Root` sets the size, `Trigger` and `Content` read it
const SelectSizeContext = createContext<SelectSize>('md')

export type SelectRootProps<Value, Multiple extends boolean | undefined = false> = ComponentProps<
  typeof BaseSelect.Root<Value, Multiple>
> & {
  /**
   * The size of the trigger and of the rows in the list.
   * @default 'md'
   */
  size?: SelectSize
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

// Values follow Radix Themes' Select trigger (select.css)
export const selectTriggerVariants = tv({
  slots: {
    root: [
      'group/trigger inline-flex w-auto shrink-0 cursor-default select-none items-center justify-between whitespace-nowrap text-start align-top font-normal',
      'data-disabled:cursor-not-allowed',
    ],
    value: 'min-w-0 truncate',
    // The arrow has the color of the text
    icon: 'shrink-0 group-data-disabled/trigger:text-gray-a9',
  },
  variants: {
    variant: {
      // Surface and soft start from the shared box (`fieldBoxVariants`), see `SelectTrigger`
      surface: {
        root: 'hover:not-data-disabled:inset-ring-gray-a8 data-popup-open:inset-ring-gray-a8',
        value: 'data-placeholder:text-gray-a10',
        icon: 'opacity-90',
      },
      soft: {
        root: 'hover:not-data-disabled:bg-accent-a4 data-popup-open:bg-accent-a4',
        value: 'data-placeholder:text-accent-12 data-placeholder:opacity-60',
        icon: 'opacity-90',
      },
      // Ghost has no box, but the same height and padding as the other variants
      ghost: {
        root: [
          'text-accent-12',
          '-outline-offset-1 outline-accent-8 focus-visible:outline-2',
          'hover:not-data-disabled:bg-accent-a3 data-popup-open:bg-accent-a3',
          'data-disabled:text-gray-a11',
        ],
        value: 'data-placeholder:text-accent-12 data-placeholder:opacity-60',
      },
    },
    size: {
      sm: { root: [controlSize.sm, 'gap-1'] },
      md: { root: [controlSize.md, 'gap-1.5'] },
      lg: { root: [controlSize.lg, 'gap-2'], icon: 'size-[11px]' },
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

const scrollArrow =
  'z-1 flex h-5 w-full cursor-default items-center justify-center bg-panel-solid text-gray-11'

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
    /**
     * With the `solid` variant: the highlighted row uses the darkest step of the color.
     * @default false
     */
    highContrast?: boolean
    /**
     * The look of the highlighted row: a full color fill (`solid`) or a light tint (`soft`).
     * @default 'solid'
     */
    variant?: 'solid' | 'soft'
  }

/**
 * The list box. Base UI's `Portal`, `Positioner`, `Popup`, `List` and the two
 * scroll arrows in one.
 *
 * Like in Radix Themes, the list opens on top of the trigger with the picked row
 * over it. Set `alignItemWithTrigger={false}` to open it below the trigger instead.
 */
export function SelectContent({
  // Used when the list opens below the trigger. Radix Themes lines it up with the start.
  align = 'start',
  alignItemWithTrigger,
  children,
  className,
  classNames,
  color,
  container,
  highContrast,
  sideOffset = 4,
  variant,
  ...props
}: SelectContentProps) {
  const themeProps = useThemeProps()
  const size = useContext(SelectSizeContext)
  const style = { highContrast, size, variant }
  const styles = listVariants(style)
  const [positionerProps, popupProps] = splitPositionerProps(props)

  return (
    <BaseSelect.Portal {...themeProps} container={container}>
      <BaseSelect.Positioner
        align={align}
        alignItemWithTrigger={alignItemWithTrigger}
        sideOffset={sideOffset}
        {...positionerProps}
        className={cn('select-none outline-none', classNames?.positioner)}
      >
        <BaseSelect.Popup
          data-color={colorAttribute(color)}
          {...popupProps}
          className={cn(
            styles.content(),
            'min-w-(--anchor-width) overflow-hidden',
            // When the popup sits on top of the trigger it does not move or zoom, like in Radix Themes
            'data-[side=none]:min-w-[calc(var(--anchor-width)+var(--list-pl))] data-[side=none]:transition-none',
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
              styles.viewport(),
              'max-h-(--available-height) scroll-py-6',
              classNames?.list,
            )}
          >
            <ListStyleProvider value={style}>{children}</ListStyleProvider>
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
  const styles = listVariants(useListStyle())

  return (
    // `data-inset` makes room on the left for the check mark. Radix Themes
    // leaves the same room on the right.
    <BaseSelect.Item
      data-inset=""
      {...props}
      className={cn(styles.item(), 'pr-(--list-pl)', className)}
    >
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
  const styles = listVariants(useListStyle())

  return (
    <BaseSelect.GroupLabel {...props} className={cn(styles.label(), 'pr-(--list-pl)', className)} />
  )
}

export type SelectSeparatorProps = Omit<
  ComponentProps<typeof BaseSelect.Separator>,
  'className'
> & {
  className?: string
}

export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return <BaseSelect.Separator {...props} className={cn(listVariants().separator(), className)} />
}
