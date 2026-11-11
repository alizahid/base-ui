import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import type { Menu as BaseMenu } from '@base-ui/react/menu'
import type { ComponentProps, ComponentType } from 'react'
import {
  DropdownMenuContentImpl,
  type DropdownMenuContentProps,
} from '../dropdown-menu/dropdown-menu'

// Base UI's ContextMenu uses the Menu parts for everything inside the popup,
// so the rows are the same components as in our Menu.
export {
  DropdownMenuCheckboxItem as ContextMenuCheckboxItem,
  type DropdownMenuCheckboxItemProps as ContextMenuCheckboxItemProps,
  DropdownMenuGroup as ContextMenuGroup,
  type DropdownMenuGroupProps as ContextMenuGroupProps,
  DropdownMenuItem as ContextMenuItem,
  type DropdownMenuItemProps as ContextMenuItemProps,
  DropdownMenuLabel as ContextMenuLabel,
  type DropdownMenuLabelProps as ContextMenuLabelProps,
  DropdownMenuRadioGroup as ContextMenuRadioGroup,
  type DropdownMenuRadioGroupProps as ContextMenuRadioGroupProps,
  DropdownMenuRadioItem as ContextMenuRadioItem,
  type DropdownMenuRadioItemProps as ContextMenuRadioItemProps,
  DropdownMenuSeparator as ContextMenuSeparator,
  type DropdownMenuSeparatorProps as ContextMenuSeparatorProps,
  DropdownMenuSub as ContextMenuSub,
  DropdownMenuSubContent as ContextMenuSubContent,
  type DropdownMenuSubContentProps as ContextMenuSubContentProps,
  type DropdownMenuSubProps as ContextMenuSubProps,
  DropdownMenuSubTrigger as ContextMenuSubTrigger,
  type DropdownMenuSubTriggerProps as ContextMenuSubTriggerProps,
} from '../dropdown-menu/dropdown-menu'

export const ContextMenuRoot = BaseContextMenu.Root

export type ContextMenuRootProps = ComponentProps<typeof BaseContextMenu.Root>

/** The area that opens the menu on right click or long press. */
export const ContextMenuTrigger = BaseContextMenu.Trigger

export type ContextMenuTriggerProps = ComponentProps<typeof BaseContextMenu.Trigger>

export type ContextMenuContentProps = DropdownMenuContentProps

/** The menu box, placed at the pointer. Base UI's `Portal`, `Positioner` and `Popup` in one. */
export function ContextMenuContent(props: ContextMenuContentProps) {
  return (
    <DropdownMenuContentImpl
      {...props}
      positioner={
        BaseContextMenu.Positioner as ComponentType<ComponentProps<typeof BaseMenu.Positioner>>
      }
    />
  )
}
