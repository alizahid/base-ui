import { Menu as BaseMenu } from '@base-ui/react/menu'
import type { ComponentProps, ComponentType } from 'react'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { type PositionerProps, splitPositionerProps } from '../../lib/positioner'
import { listVariants } from '../../lib/styles'
import { useThemeProps } from '../theme-provider'
import {
  CheckIcon,
  ChevronRightIcon,
  type ListStyle,
  ListStyleProvider,
  useListStyle,
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

type PopupProps = Omit<ComponentProps<typeof BaseMenu.Popup>, 'className' | 'color'>

type ContentImplProps = PopupProps &
  ContentOwnProps &
  PositionerProps<ComponentProps<typeof BaseMenu.Positioner>> & {
    // Menu and ContextMenu have their own positioner
    positioner: ComponentType<ComponentProps<typeof BaseMenu.Positioner>>
    /** A submenu: it sits a bit higher, so its first row is level with the row that opened it. */
    sub?: boolean
  }

/** Portal + Positioner + Popup. Shared by Menu and ContextMenu. Not a public part. */
export function DropdownMenuContentImpl({
  className,
  classNames,
  collisionPadding = 10,
  color,
  container,
  highContrast,
  keepMounted,
  positioner: Positioner,
  size,
  sub,
  variant,
  ...props
}: ContentImplProps) {
  const themeProps = useThemeProps()
  // A submenu keeps the look of its parent menu
  const parent = useListStyle()
  const style: ListStyle = {
    highContrast: highContrast ?? parent.highContrast,
    size: size ?? parent.size ?? 'md',
    variant: variant ?? parent.variant,
  }
  const styles = listVariants(style)
  const [{ alignOffset, ...positionerProps }, popupProps] = splitPositionerProps(props)
  // Radix Themes moves a submenu up by the padding of the menu box (4px or 8px)
  const subAlignOffset = style.size === 'sm' ? -4 : -8

  return (
    <BaseMenu.Portal {...themeProps} container={container} keepMounted={keepMounted}>
      <Positioner
        {...positionerProps}
        alignOffset={alignOffset ?? (sub ? subAlignOffset : undefined)}
        collisionPadding={collisionPadding}
        className={cn('outline-none', classNames?.positioner)}
      >
        <ListStyleProvider value={style}>
          <BaseMenu.Popup
            data-color={colorAttribute(color)}
            {...popupProps}
            className={cn(
              styles.content(),
              styles.viewport(),
              'flex max-h-(--available-height) flex-col',
              className,
            )}
          />
        </ListStyleProvider>
      </Positioner>
    </BaseMenu.Portal>
  )
}

export type DropdownMenuContentProps = PopupProps &
  ContentOwnProps &
  PositionerProps<ComponentProps<typeof BaseMenu.Positioner>>

/**
 * The menu box. Base UI's `Portal`, `Positioner` and `Popup` in one.
 * Like in Radix Themes it opens 4px below the trigger, lined up with its start.
 */
export function DropdownMenuContent({
  align = 'start',
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuContentImpl
      {...props}
      align={align}
      positioner={BaseMenu.Positioner}
      sideOffset={sideOffset}
    />
  )
}

export type DropdownMenuSubContentProps = DropdownMenuContentProps

/** The box of a submenu. Goes inside `Sub`, next to `SubTrigger`. */
export function DropdownMenuSubContent({ sideOffset = 1, ...props }: DropdownMenuSubContentProps) {
  return (
    <DropdownMenuContentImpl
      {...props}
      positioner={BaseMenu.Positioner}
      sideOffset={sideOffset}
      sub
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
  return <span className={listVariants().shortcut()}>{children}</span>
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
  const styles = listVariants(useListStyle())

  return (
    <BaseMenu.Item
      data-color={colorAttribute(color)}
      {...props}
      className={cn(styles.item({ colored: color !== undefined }), className)}
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
  const styles = listVariants(useListStyle())

  return (
    <BaseMenu.CheckboxItem
      data-color={colorAttribute(color)}
      data-inset=""
      {...props}
      className={cn(styles.item({ colored: color !== undefined }), className)}
    >
      <BaseMenu.CheckboxItemIndicator className={cn(styles.indicator(), classNames?.indicator)}>
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
  const styles = listVariants(useListStyle())

  return (
    <BaseMenu.RadioItem
      data-color={colorAttribute(color)}
      data-inset=""
      {...props}
      className={cn(styles.item({ colored: color !== undefined }), className)}
    >
      <BaseMenu.RadioItemIndicator className={cn(styles.indicator(), classNames?.indicator)}>
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
  const { size, ...style } = useListStyle()
  const styles = listVariants({ size, ...style })

  return (
    <BaseMenu.SubmenuTrigger
      data-color={colorAttribute(color)}
      {...props}
      className={cn(styles.item({ colored: color !== undefined }), className)}
    >
      {children}
      {/* Radix Themes: the arrow is gray-12 and 2px closer to the edge than the text */}
      <span
        className={cn(
          styles.shortcut(),
          '-mr-0.5 not-group-data-highlighted/item:not-group-data-disabled/item:text-gray-12',
        )}
      >
        <ChevronRightIcon className={size === 'sm' ? 'size-2' : undefined} />
      </span>
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
  const styles = listVariants(useListStyle())

  return <BaseMenu.GroupLabel {...props} className={cn(styles.label(), className)} />
}

export type DropdownMenuSeparatorProps = Omit<
  ComponentProps<typeof BaseMenu.Separator>,
  'className'
> & {
  className?: string
}

export function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
  return <BaseMenu.Separator {...props} className={cn(listVariants().separator(), className)} />
}
