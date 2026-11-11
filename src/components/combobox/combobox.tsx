import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { type ComponentProps, type ComponentType, type ReactNode, useContext } from 'react'
import { tv } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { FieldBoxContext, type FieldBoxVariants, fieldBoxVariants } from '../../lib/field-box'
import { type PositionerProps, splitPositionerProps } from '../../lib/positioner'
import { type ControlSize, listVariants } from '../../lib/styles'
import type { Radius } from '../../lib/theme'
import {
  CheckIcon,
  ChevronDownIcon,
  ListStyleProvider,
  useListStyle,
  XIcon,
} from '../dropdown-menu/shared'

import { useThemeProps } from '../theme-provider'

export const ComboboxRoot = BaseCombobox.Root

export type ComboboxRootProps<
  Value,
  Multiple extends boolean | undefined = false,
  Item = Value,
> = ComponentProps<typeof BaseCombobox.Root<Value, Multiple, Item>>

export const ComboboxGroup = BaseCombobox.Group

export type ComboboxGroupProps = ComponentProps<typeof BaseCombobox.Group>

/**
 * Renders the items of one group when `Root` has grouped `items`.
 * Goes inside `Group`, with a function `(item) => <Item />` as children.
 */
export const ComboboxCollection = BaseCombobox.Collection

export type ComboboxCollectionProps = ComponentProps<typeof BaseCombobox.Collection>

/** Filter helpers that match the user's locale. Same as Base UI's `Combobox.useFilter`. */
export const useComboboxFilter = BaseCombobox.useFilter

/** The items left after filtering. Same as Base UI's `Combobox.useFilteredItems`. */
export const useComboboxFilteredItems = BaseCombobox.useFilteredItems

/**
 * What the Combobox adds to the shared box (`fieldBoxVariants`): the small
 * clear / open buttons, and the taller box that holds chips. Also used by Autocomplete.
 *
 * The buttons are sized like a ghost `IconButton` inside a Radix Themes
 * `TextField.Slot`: a small padding around the icon, and the same negative
 * margin, so the icon itself lines up with the padding of the slot.
 */
export const comboboxInputVariants = tv({
  slots: {
    root: '',
    input: '',
    button: [
      'flex shrink-0 cursor-default items-center justify-center rounded-ui-xs text-gray-a11',
      '-outline-offset-1 outline-accent-8 focus-visible:outline-2',
      'hover:bg-gray-a3 active:bg-gray-a4',
      'data-disabled:pointer-events-none data-disabled:text-gray-a8',
    ],
    clearIcon: '',
    triggerIcon: '',
    chip: [
      'inline-flex cursor-default items-center whitespace-nowrap bg-accent-a3 font-medium text-accent-a11 text-xs tracking-[0.0025em] outline-none',
      // The chip that the arrow keys are on
      'data-highlighted:bg-accent-9 data-highlighted:text-accent-contrast',
    ],
  },
  variants: {
    size: {
      sm: {
        button: '-m-1 size-5',
        clearIcon: 'size-3',
        // Radix Themes Badge size 1
        chip: 'h-5 gap-1 rounded-ui-xs px-1.5',
      },
      md: {
        button: '-m-1 size-5.5',
        clearIcon: 'size-3.5',
        chip: 'h-5 gap-1 rounded-ui-xs px-1.5',
      },
      lg: {
        button: '-m-1.5 size-7 rounded-ui-sm',
        triggerIcon: 'size-[11px]',
        // Radix Themes Badge size 2
        chip: 'h-6 gap-1.5 rounded-ui-sm px-2',
      },
      xl: {
        button: '-m-2 size-8 rounded-ui-sm',
        triggerIcon: 'size-[11px]',
        chip: 'h-6 gap-1.5 rounded-ui-sm px-2',
      },
    },
    /** The box grows with the chips inside it. */
    chips: {
      true: { root: 'h-auto flex-wrap', input: 'h-5 min-w-12 px-1' },
    },
  },
  compoundVariants: [
    // The padding keeps a box with one row of chips as tall as a plain input
    { chips: true, size: 'sm', class: { root: 'min-h-6 p-0.5' } },
    { chips: true, size: 'md', class: { root: 'min-h-8 p-1.5' } },
    { chips: true, size: 'lg', class: { root: 'min-h-10 p-2', input: 'h-6' } },
    { chips: true, size: 'xl', class: { root: 'min-h-12 p-3', input: 'h-6' } },
  ],
  defaultVariants: {
    size: 'md',
  },
})

type InputOwnProps = {
  /** `TextField.Slot` parts: icons, text or buttons shown inside the box. */
  children?: ReactNode
  className?: string
  /** Classes for the parts that `Input` renders inside itself. */
  classNames?: {
    clear?: string
    input?: string
    trigger?: string
  }
  /**
   * The color scale to use. `accent` follows the theme.
   * @default 'accent'
   */
  color?: Color
  /** How round the corners are. Follows the theme when not set. */
  radius?: Radius
  /**
   * Shows an x button that empties the input when it has a value.
   * @default true
   */
  showClear?: boolean
  /** Shows an arrow button that opens the list. */
  showTrigger?: boolean
  /**
   * @default 'md'
   */
  size?: ControlSize
  /**
   * @default 'surface'
   */
  variant?: FieldBoxVariants['variant']
}

type BaseInputProps = Omit<
  ComponentProps<typeof BaseCombobox.Input>,
  'children' | 'className' | 'color' | 'size'
>

type InputBoxProps = BaseInputProps &
  InputOwnProps & {
    // Combobox and Autocomplete have their own group and trigger parts
    parts: {
      InputGroup: ComponentType<{ children?: ReactNode; className?: string }>
      Trigger: ComponentType<{
        'aria-label'?: string
        children?: ReactNode
        className?: string
      }>
    }
  }

/** InputGroup + Input + Clear + Trigger. Shared by Combobox and Autocomplete. Not a public part. */
export function InputBox({
  children,
  className,
  classNames,
  color,
  parts,
  radius,
  showClear = true,
  showTrigger = true,
  size,
  variant,
  ...props
}: InputBoxProps) {
  const box = fieldBoxVariants({ size, variant })
  const styles = comboboxInputVariants({ size })

  return (
    <FieldBoxContext.Provider value={{ size, variant }}>
      <parts.InputGroup
        data-color={colorAttribute(color)}
        data-radius={radius}
        className={cn(box.root(), styles.root(), className)}
      >
        <BaseCombobox.Input
          {...props}
          className={cn(box.input(), styles.input(), classNames?.input)}
        />
        {children}
        {(showClear || showTrigger) && (
          <div className={box.slot()} data-side="right">
            {showClear && (
              <BaseCombobox.Clear
                aria-label="Clear"
                className={cn(styles.button(), classNames?.clear)}
              >
                <XIcon className={styles.clearIcon()} />
              </BaseCombobox.Clear>
            )}
            {showTrigger && (
              <parts.Trigger
                aria-label="Open list"
                className={cn(styles.button(), classNames?.trigger)}
              >
                <ChevronDownIcon className={styles.triggerIcon()} />
              </parts.Trigger>
            )}
          </div>
        )}
      </parts.InputGroup>
    </FieldBoxContext.Provider>
  )
}

export type ComboboxInputProps = BaseInputProps & InputOwnProps

/**
 * The text input. Includes Base UI's `InputGroup`, `Clear` and `Trigger`.
 * `className` styles the box, all other props go to the `<input>`.
 */
export function ComboboxInput(props: ComboboxInputProps) {
  return <InputBox {...props} parts={BaseCombobox} />
}

export type ComboboxChipsProps<Value = unknown> = Omit<BaseInputProps, 'children'> &
  Omit<InputOwnProps, 'children' | 'showClear' | 'showTrigger'> & {
    /** A function that gets the picked values and returns one `Chip` for each. */
    children: (value: Value[]) => ReactNode
  }

/**
 * The input of a `multiple` combobox: the picked values as chips, then the text input.
 * Use it in place of `Input`. Includes Base UI's `InputGroup`, `Chips`, `Value` and `Input`.
 */
export function ComboboxChips<Value = unknown>({
  children,
  className,
  classNames,
  color,
  placeholder,
  radius,
  size,
  variant,
  ...props
}: ComboboxChipsProps<Value>) {
  const box = fieldBoxVariants({ size, variant })
  const styles = comboboxInputVariants({ chips: true, size })

  return (
    <FieldBoxContext.Provider value={{ size, variant }}>
      <BaseCombobox.InputGroup
        data-color={colorAttribute(color)}
        data-radius={radius}
        className={cn(box.root(), styles.root(), className)}
      >
        <BaseCombobox.Chips className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
          <BaseCombobox.Value>
            {(value: Value[]) => (
              <>
                {children(value)}
                <BaseCombobox.Input
                  // The placeholder is only useful while nothing is picked
                  placeholder={value.length > 0 ? undefined : placeholder}
                  {...props}
                  className={cn(box.input(), styles.input(), classNames?.input)}
                />
              </>
            )}
          </BaseCombobox.Value>
        </BaseCombobox.Chips>
      </BaseCombobox.InputGroup>
    </FieldBoxContext.Provider>
  )
}

export type ComboboxChipProps = Omit<ComponentProps<typeof BaseCombobox.Chip>, 'className'> & {
  className?: string
  /** Classes for the parts that `Chip` renders inside itself. */
  classNames?: {
    remove?: string
  }
}

/**
 * One picked value. Includes Base UI's `ChipRemove` (the x button).
 * Looks like a soft Radix Themes Badge.
 */
export function ComboboxChip({ children, className, classNames, ...props }: ComboboxChipProps) {
  // The size of the `Chips` box around it
  const { size } = useContext(FieldBoxContext)

  return (
    <BaseCombobox.Chip {...props} className={cn(comboboxInputVariants({ size }).chip(), className)}>
      {children}
      <BaseCombobox.ChipRemove
        aria-label="Remove"
        className={cn(
          '-mr-0.5 flex size-3.5 items-center justify-center rounded-ui-xs opacity-80 hover:bg-accent-a4 hover:opacity-100',
          classNames?.remove,
        )}
      >
        <XIcon className="size-3" />
      </BaseCombobox.ChipRemove>
    </BaseCombobox.Chip>
  )
}

export type ComboboxContentProps = Omit<
  ComponentProps<typeof BaseCombobox.Popup>,
  'children' | 'className' | 'color'
> &
  PositionerProps<ComponentProps<typeof BaseCombobox.Positioner>> &
  Pick<ComponentProps<typeof BaseCombobox.Portal>, 'container' | 'keepMounted'> & {
    /** The rows, or a function `(item, index) => <Item />` when `Root` has `items`. */
    children?: ComponentProps<typeof BaseCombobox.List>['children']
    className?: string
    /** Classes for the parts that `Content` renders around and inside itself. */
    classNames?: {
      empty?: string
      list?: string
      positioner?: string
    }
    /**
     * The color of the highlighted row. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
    /**
     * Shown when no item matches.
     * @default 'No results'
     */
    empty?: ReactNode
    /**
     * With the `solid` variant: the highlighted row uses the darkest step of the color.
     * @default false
     */
    highContrast?: boolean
    /**
     * The height and the text size of the rows.
     * @default 'md'
     */
    size?: 'sm' | 'md'
    /**
     * The look of the highlighted row: a full color fill (`solid`) or a light tint (`soft`).
     * @default 'solid'
     */
    variant?: 'solid' | 'soft'
  }

/**
 * The list box. Base UI's `Portal`, `Positioner`, `Popup`, `Empty` and `List` in one.
 * Also used by Autocomplete.
 */
export function ComboboxContent({
  children,
  className,
  classNames,
  color,
  container,
  empty = 'No results',
  highContrast,
  keepMounted,
  sideOffset = 4,
  size = 'md',
  variant,
  ...props
}: ComboboxContentProps) {
  const themeProps = useThemeProps()
  const style = { highContrast, size, variant }
  const styles = listVariants(style)
  const [positionerProps, popupProps] = splitPositionerProps(props)

  return (
    <BaseCombobox.Portal {...themeProps} container={container} keepMounted={keepMounted}>
      <BaseCombobox.Positioner
        sideOffset={sideOffset}
        {...positionerProps}
        className={cn('outline-none', classNames?.positioner)}
      >
        <BaseCombobox.Popup
          data-color={colorAttribute(color)}
          {...popupProps}
          className={cn(styles.content(), 'w-(--anchor-width)', className)}
        >
          <ListStyleProvider value={style}>
            <BaseCombobox.Empty>
              <div className="p-(--list-p)">
                <div className={cn(styles.label(), classNames?.empty)}>{empty}</div>
              </div>
            </BaseCombobox.Empty>
            <BaseCombobox.List
              className={cn(
                styles.viewport(),
                'max-h-[min(22.5rem,var(--available-height))] outline-none data-empty:p-0',
                classNames?.list,
              )}
            >
              {children}
            </BaseCombobox.List>
          </ListStyleProvider>
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  )
}

export type ComboboxItemProps = Omit<ComponentProps<typeof BaseCombobox.Item>, 'className'> & {
  className?: string
  /** Classes for the parts that `Item` renders inside itself. */
  classNames?: {
    indicator?: string
  }
}

/** A row. Includes Base UI's `ItemIndicator`: a check icon on the left. */
export function ComboboxItem({ children, className, classNames, ...props }: ComboboxItemProps) {
  const styles = listVariants(useListStyle())

  return (
    // `data-inset` makes room on the left for the check mark
    <BaseCombobox.Item data-inset="" {...props} className={cn(styles.item(), className)}>
      <BaseCombobox.ItemIndicator className={cn(styles.indicator(), classNames?.indicator)}>
        <CheckIcon />
      </BaseCombobox.ItemIndicator>
      {children}
    </BaseCombobox.Item>
  )
}

export type ComboboxLabelProps = Omit<
  ComponentProps<typeof BaseCombobox.GroupLabel>,
  'className'
> & {
  className?: string
}

/** A small heading. Must be inside `Group`. */
export function ComboboxLabel({ className, ...props }: ComboboxLabelProps) {
  const styles = listVariants(useListStyle())

  return <BaseCombobox.GroupLabel {...props} className={cn(styles.label(), className)} />
}

export type ComboboxSeparatorProps = Omit<
  ComponentProps<typeof BaseCombobox.Separator>,
  'className'
> & {
  className?: string
}

export function ComboboxSeparator({ className, ...props }: ComboboxSeparatorProps) {
  return <BaseCombobox.Separator {...props} className={cn(listVariants().separator(), className)} />
}
