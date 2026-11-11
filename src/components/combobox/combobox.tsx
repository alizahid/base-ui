import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import type { ComponentProps, ComponentType, ReactNode } from 'react'
import { tv } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
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
import { CheckIcon, ChevronDownIcon, XIcon } from '../dropdown-menu/shared'
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

/** The input box. Also used by Autocomplete. */
export const comboboxInputVariants = tv({
  slots: {
    root: [
      'flex w-full min-w-0 items-center gap-1',
      inputSurface,
      // The focus ring goes on the box, not on the bare input inside
      'has-[input:focus-visible]:outline-2',
    ],
    input:
      'h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-gray-a10 disabled:cursor-not-allowed',
    button: [
      'flex size-5 shrink-0 items-center justify-center rounded-ui-sm text-gray-a11 outline-none',
      'hover:bg-gray-a3 hover:text-gray-12',
      'data-disabled:pointer-events-none data-disabled:text-gray-a8',
    ],
  },
  variants: {
    size: {
      xs: { root: [controlSize.xs, 'pr-1'], button: 'size-4 [&>svg]:size-3.5' },
      sm: { root: [controlSize.sm, 'pr-1.5'] },
      md: { root: [controlSize.md, 'pr-2.5'] },
      lg: { root: [controlSize.lg, 'pr-3.5'], button: 'size-6' },
    },
    /** The box grows with the chips inside it. */
    chips: {
      true: { root: 'h-auto flex-wrap py-1', input: 'h-6 min-w-12' },
    },
  },
  compoundVariants: [
    { chips: true, size: 'xs', class: { root: 'min-h-6 px-1 py-0.5', input: 'h-5' } },
    { chips: true, size: 'sm', class: { root: 'min-h-8 px-1' } },
    { chips: true, size: 'md', class: { root: 'min-h-10 px-2' } },
    { chips: true, size: 'lg', class: { root: 'min-h-12 px-3' } },
  ],
  defaultVariants: {
    size: 'md',
  },
})

type InputOwnProps = {
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
}

type BaseInputProps = Omit<
  ComponentProps<typeof BaseCombobox.Input>,
  'className' | 'color' | 'size'
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
  className,
  classNames,
  color,
  parts,
  radius,
  showClear = true,
  showTrigger = true,
  size,
  ...props
}: InputBoxProps) {
  const styles = comboboxInputVariants({ size })

  return (
    <parts.InputGroup
      data-color={colorAttribute(color)}
      data-radius={radius}
      className={cn(styles.root(), className)}
    >
      <BaseCombobox.Input {...props} className={cn(styles.input(), classNames?.input)} />
      {showClear && (
        <BaseCombobox.Clear aria-label="Clear" className={cn(styles.button(), classNames?.clear)}>
          <XIcon />
        </BaseCombobox.Clear>
      )}
      {showTrigger && (
        <parts.Trigger aria-label="Open list" className={cn(styles.button(), classNames?.trigger)}>
          <ChevronDownIcon />
        </parts.Trigger>
      )}
    </parts.InputGroup>
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
  Omit<InputOwnProps, 'showClear' | 'showTrigger'> & {
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
  ...props
}: ComboboxChipsProps<Value>) {
  const styles = comboboxInputVariants({ chips: true, size })

  return (
    <BaseCombobox.InputGroup
      data-color={colorAttribute(color)}
      data-radius={radius}
      className={cn(styles.root(), className)}
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
                className={cn(styles.input(), classNames?.input)}
              />
            </>
          )}
        </BaseCombobox.Value>
      </BaseCombobox.Chips>
    </BaseCombobox.InputGroup>
  )
}

export type ComboboxChipProps = Omit<ComponentProps<typeof BaseCombobox.Chip>, 'className'> & {
  className?: string
  /** Classes for the parts that `Chip` renders inside itself. */
  classNames?: {
    remove?: string
  }
}

/** One picked value. Includes Base UI's `ChipRemove` (the x button). */
export function ComboboxChip({ children, className, classNames, ...props }: ComboboxChipProps) {
  return (
    <BaseCombobox.Chip
      {...props}
      className={cn(
        'inline-flex h-6 cursor-default items-center gap-0.5 rounded-ui-sm bg-accent-a3 pr-1 pl-2 font-medium text-accent-a11 text-xs outline-none',
        'data-highlighted:bg-accent-9 data-highlighted:text-accent-contrast',
        className,
      )}
    >
      {children}
      <BaseCombobox.ChipRemove
        aria-label="Remove"
        className={cn(
          'flex size-4 items-center justify-center rounded-ui-xs hover:bg-accent-a4 [&>svg]:size-3',
          classNames?.remove,
        )}
      >
        <XIcon />
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
  keepMounted,
  sideOffset = 4,
  ...props
}: ComboboxContentProps) {
  const themeProps = useThemeProps()
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
          className={cn(listPopup, 'w-(--anchor-width) p-0', className)}
        >
          <BaseCombobox.Empty>
            <div className={cn('px-4 py-3 text-gray-a10 text-sm', classNames?.empty)}>{empty}</div>
          </BaseCombobox.Empty>
          <BaseCombobox.List
            className={cn(
              'max-h-[min(22.5rem,var(--available-height))] scroll-py-1 overflow-y-auto overscroll-contain p-1 outline-none data-empty:p-0',
              classNames?.list,
            )}
          >
            {children}
          </BaseCombobox.List>
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  )
}

/** Row with room on the left for the check icon. */
export const comboboxItem = `${listItem} pl-8`

export type ComboboxItemProps = Omit<ComponentProps<typeof BaseCombobox.Item>, 'className'> & {
  className?: string
  /** Classes for the parts that `Item` renders inside itself. */
  classNames?: {
    indicator?: string
  }
}

/** A row. Includes Base UI's `ItemIndicator`: a check icon on the left. */
export function ComboboxItem({ children, className, classNames, ...props }: ComboboxItemProps) {
  return (
    <BaseCombobox.Item {...props} className={cn(comboboxItem, className)}>
      <BaseCombobox.ItemIndicator
        className={cn(
          'absolute left-2 inline-flex items-center justify-center',
          classNames?.indicator,
        )}
      >
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
  return <BaseCombobox.GroupLabel {...props} className={cn(listLabel, 'pl-8', className)} />
}

export type ComboboxSeparatorProps = Omit<
  ComponentProps<typeof BaseCombobox.Separator>,
  'className'
> & {
  className?: string
}

export function ComboboxSeparator({ className, ...props }: ComboboxSeparatorProps) {
  return <BaseCombobox.Separator {...props} className={cn(listSeparator, className)} />
}
