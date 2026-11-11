import { Menu as BaseMenu } from '@base-ui/react/menu'
import type { ComponentProps, ComponentType } from 'react'
import { tv } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { type PositionerProps, splitPositionerProps } from '../../lib/positioner'
import { listItem, listLabel, listPopup, listSeparator } from '../../lib/styles'
import { useThemeProps } from '../theme-provider'
import {
  CheckIcon,
  ChevronRightIcon,
  type DropdownMenuSize,
  DropdownMenuSizeProvider,
  useMenuSize,
} from './shared'

export const DropdownMenuRoot = BaseMenu.Root

export type DropdownMenuRootProps = ComponentProps<typeof BaseMenu.Root>

export const DropdownMenuTrigger = BaseMenu.Trigger

export type DropdownMenuTriggerProps = ComponentProps<typeof BaseMenu.Trigger>

export const DropdownMenuGroup = BaseMenu.Group

export type DropdownMenuGroupProps = ComponentProps<typeof BaseMenu.Group>

export const DropdownMenuRadioGroup = BaseMenu.RadioGroup

export type DropdownMenuRadioGroupProps = ComponentProps<typeof BaseMenu.RadioGroup>

export const DropdownMenuSub = BaseMenu.SubmenuRoot

export type DropdownMenuSubProps = ComponentProps<typeof BaseMenu.SubmenuRoot>

export const menuContentVariants = tv({
  // `group/menu` lets the rows see if the menu has checkbox or radio items
  base: [listPopup, 'group/menu max-h-(--available-height) overflow-y-auto overscroll-contain'],
})

export const menuItemVariants = tv({
  base: [
    listItem,
    'group/item data-popup-open:not-data-highlighted:bg-accent-a3',
    // A colored item, for example a red "Delete"
    'data-color:not-data-disabled:not-data-highlighted:text-accent-11',
  ],
  variants: {
    size: {
      // Rows move right when the menu has checkbox or radio items, so all text lines up
      sm: 'h-6 px-2 text-xs group-has-[[data-inset]]/menu:pl-6',
      md: 'group-has-[[data-inset]]/menu:pl-8',
    },
    /** Leaves room on the left for the check icon. */
    inset: {
      true: '',
    },
  },
  compoundVariants: [
    { inset: true, size: 'sm', class: 'pl-6' },
    { inset: true, size: 'md', class: 'pl-8' },
  ],
  defaultVariants: {
    size: 'md',
  },
})

export const menuLabelVariants = tv({
  base: listLabel,
  variants: {
    size: {
      sm: 'h-6 px-2 group-has-[[data-inset]]/menu:pl-6',
      md: 'group-has-[[data-inset]]/menu:pl-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const indicatorVariants = tv({
  base: 'absolute inline-flex items-center justify-center',
  variants: {
    size: {
      sm: 'left-1 [&>svg]:size-3.5',
      md: 'left-2',
    },
  },
})

type ContentOwnProps = Pick<ComponentProps<typeof BaseMenu.Portal>, 'container' | 'keepMounted'> & {
  className?: string
  /** Classes for the parts that `Content` renders around itself. */
  classNames?: {
    positioner?: string
  }
  /**
   * The color of the highlighted row. `accent` follows the theme.
   * @default 'accent'
   */
  color?: Color
  /**
   * The height and the text size of the rows.
   * @default 'md'
   */
  size?: DropdownMenuSize
}

type PopupProps = Omit<ComponentProps<typeof BaseMenu.Popup>, 'className' | 'color'>

type ContentImplProps = PopupProps &
  ContentOwnProps &
  PositionerProps<ComponentProps<typeof BaseMenu.Positioner>> & {
    // Menu and ContextMenu have their own positioner
    positioner: ComponentType<ComponentProps<typeof BaseMenu.Positioner>>
  }

/** Portal + Positioner + Popup. Shared by Menu and ContextMenu. Not a public part. */
export function DropdownMenuContentImpl({
  className,
  classNames,
  color,
  container,
  keepMounted,
  positioner: Positioner,
  size: sizeProp,
  ...props
}: ContentImplProps) {
  const themeProps = useThemeProps()
  // A submenu keeps the size of its parent menu
  const parentSize = useMenuSize()
  const size = sizeProp ?? parentSize
  const [positionerProps, popupProps] = splitPositionerProps(props)

  return (
    <BaseMenu.Portal {...themeProps} container={container} keepMounted={keepMounted}>
      <Positioner {...positionerProps} className={cn('outline-none', classNames?.positioner)}>
        <DropdownMenuSizeProvider value={size}>
          <BaseMenu.Popup
            data-color={colorAttribute(color)}
            {...popupProps}
            className={cn(menuContentVariants(), className)}
          />
        </DropdownMenuSizeProvider>
      </Positioner>
    </BaseMenu.Portal>
  )
}

export type DropdownMenuContentProps = PopupProps &
  ContentOwnProps &
  PositionerProps<ComponentProps<typeof BaseMenu.Positioner>>

/** The menu box. Base UI's `Portal`, `Positioner` and `Popup` in one. */
export function DropdownMenuContent({ sideOffset = 4, ...props }: DropdownMenuContentProps) {
  return (
    <DropdownMenuContentImpl {...props} positioner={BaseMenu.Positioner} sideOffset={sideOffset} />
  )
}

export type DropdownMenuSubContentProps = DropdownMenuContentProps

/** The box of a submenu. Goes inside `Sub`, next to `SubTrigger`. */
export function DropdownMenuSubContent({
  alignOffset = -4,
  sideOffset = 2,
  ...props
}: DropdownMenuSubContentProps) {
  return (
    <DropdownMenuContentImpl
      {...props}
      alignOffset={alignOffset}
      positioner={BaseMenu.Positioner}
      sideOffset={sideOffset}
    />
  )
}

type ItemOwnProps = {
  className?: string
  /** A color for this row only, for example `red` for a delete action. */
  color?: Color
  /** Keyboard shortcut text shown on the right. It is only a hint. */
  shortcut?: string
}

function Shortcut({ children }: { children: string }) {
  return (
    <span className="ml-auto pl-4 text-gray-a10 text-xs group-data-disabled/item:text-gray-a8 group-data-highlighted/item:text-accent-contrast">
      {children}
    </span>
  )
}

export type DropdownMenuItemProps = Omit<
  ComponentProps<typeof BaseMenu.Item>,
  'className' | 'color'
> &
  ItemOwnProps

export function DropdownMenuItem({
  children,
  className,
  color,
  shortcut,
  ...props
}: DropdownMenuItemProps) {
  const size = useMenuSize()

  return (
    <BaseMenu.Item
      data-color={colorAttribute(color)}
      {...props}
      className={cn(menuItemVariants({ size }), className)}
    >
      {children}
      {shortcut && <Shortcut>{shortcut}</Shortcut>}
    </BaseMenu.Item>
  )
}

export type DropdownMenuCheckboxItemProps = Omit<
  ComponentProps<typeof BaseMenu.CheckboxItem>,
  'className' | 'color'
> &
  ItemOwnProps & {
    /** Classes for the parts that the item renders inside itself. */
    classNames?: {
      indicator?: string
    }
  }

/** Includes Base UI's `CheckboxItemIndicator`: a check icon on the left. */
export function DropdownMenuCheckboxItem({
  children,
  className,
  classNames,
  color,
  shortcut,
  ...props
}: DropdownMenuCheckboxItemProps) {
  const size = useMenuSize()

  return (
    <BaseMenu.CheckboxItem
      data-color={colorAttribute(color)}
      data-inset=""
      {...props}
      className={cn(menuItemVariants({ inset: true, size }), className)}
    >
      <BaseMenu.CheckboxItemIndicator
        className={cn(indicatorVariants({ size }), classNames?.indicator)}
      >
        <CheckIcon />
      </BaseMenu.CheckboxItemIndicator>
      {children}
      {shortcut && <Shortcut>{shortcut}</Shortcut>}
    </BaseMenu.CheckboxItem>
  )
}

export type DropdownMenuRadioItemProps = Omit<
  ComponentProps<typeof BaseMenu.RadioItem>,
  'className' | 'color'
> &
  ItemOwnProps & {
    /** Classes for the parts that the item renders inside itself. */
    classNames?: {
      indicator?: string
    }
  }

/** Includes Base UI's `RadioItemIndicator`: a check icon on the left. */
export function DropdownMenuRadioItem({
  children,
  className,
  classNames,
  color,
  shortcut,
  ...props
}: DropdownMenuRadioItemProps) {
  const size = useMenuSize()

  return (
    <BaseMenu.RadioItem
      data-color={colorAttribute(color)}
      data-inset=""
      {...props}
      className={cn(menuItemVariants({ inset: true, size }), className)}
    >
      <BaseMenu.RadioItemIndicator
        className={cn(indicatorVariants({ size }), classNames?.indicator)}
      >
        <CheckIcon />
      </BaseMenu.RadioItemIndicator>
      {children}
      {shortcut && <Shortcut>{shortcut}</Shortcut>}
    </BaseMenu.RadioItem>
  )
}

export type DropdownMenuSubTriggerProps = Omit<
  ComponentProps<typeof BaseMenu.SubmenuTrigger>,
  'className' | 'color'
> &
  Omit<ItemOwnProps, 'shortcut'>

/** The row that opens a submenu. Has an arrow on the right. */
export function DropdownMenuSubTrigger({
  children,
  className,
  color,
  ...props
}: DropdownMenuSubTriggerProps) {
  const size = useMenuSize()

  return (
    <BaseMenu.SubmenuTrigger
      data-color={colorAttribute(color)}
      {...props}
      className={cn(menuItemVariants({ size }), className)}
    >
      {children}
      <ChevronRightIcon
        className={cn(
          '-mr-1 ml-auto text-gray-a10 group-data-disabled/item:text-gray-a8 group-data-highlighted/item:text-accent-contrast',
          size === 'sm' && 'size-3.5',
        )}
      />
    </BaseMenu.SubmenuTrigger>
  )
}

export type DropdownMenuLabelProps = Omit<
  ComponentProps<typeof BaseMenu.GroupLabel>,
  'className'
> & {
  className?: string
}

/** A small heading. Must be inside `Group` or `RadioGroup`. */
export function DropdownMenuLabel({ className, ...props }: DropdownMenuLabelProps) {
  const size = useMenuSize()

  return <BaseMenu.GroupLabel {...props} className={cn(menuLabelVariants({ size }), className)} />
}

export type DropdownMenuSeparatorProps = Omit<
  ComponentProps<typeof BaseMenu.Separator>,
  'className'
> & {
  className?: string
}

export function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
  return <BaseMenu.Separator {...props} className={cn(listSeparator, className)} />
}
