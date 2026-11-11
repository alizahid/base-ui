import { Menu as BaseMenu } from '@base-ui/react/menu'
import { Menubar as BaseMenubar } from '@base-ui/react/menubar'
import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import type { Radius } from '../../lib/theme'
import { barTrigger } from '../dropdown-menu/shared'

// Everything inside a menu is the same as in Menu
export {
  DropdownMenuCheckboxItem as MenubarCheckboxItem,
  type DropdownMenuCheckboxItemProps as MenubarCheckboxItemProps,
  DropdownMenuContent as MenubarContent,
  type DropdownMenuContentProps as MenubarContentProps,
  DropdownMenuGroup as MenubarGroup,
  type DropdownMenuGroupProps as MenubarGroupProps,
  DropdownMenuItem as MenubarItem,
  type DropdownMenuItemProps as MenubarItemProps,
  DropdownMenuLabel as MenubarLabel,
  type DropdownMenuLabelProps as MenubarLabelProps,
  DropdownMenuRadioGroup as MenubarRadioGroup,
  type DropdownMenuRadioGroupProps as MenubarRadioGroupProps,
  DropdownMenuRadioItem as MenubarRadioItem,
  type DropdownMenuRadioItemProps as MenubarRadioItemProps,
  DropdownMenuRoot as MenubarMenu,
  type DropdownMenuRootProps as MenubarMenuProps,
  DropdownMenuSeparator as MenubarSeparator,
  type DropdownMenuSeparatorProps as MenubarSeparatorProps,
  DropdownMenuSub as MenubarSub,
  DropdownMenuSubContent as MenubarSubContent,
  type DropdownMenuSubContentProps as MenubarSubContentProps,
  type DropdownMenuSubProps as MenubarSubProps,
  DropdownMenuSubTrigger as MenubarSubTrigger,
  type DropdownMenuSubTriggerProps as MenubarSubTriggerProps,
} from '../dropdown-menu/dropdown-menu'

export type MenubarRootProps = Omit<ComponentProps<typeof BaseMenubar>, 'className' | 'color'> & {
  className?: string
  /**
   * The color scale to use. `accent` follows the theme.
   * @default 'accent'
   */
  color?: Color
  /** How round the corners are. Follows the theme when not set. */
  radius?: Radius
}

/** The bar that holds the menus. */
export function MenubarRoot({ className, color, radius, ...props }: MenubarRootProps) {
  return (
    <BaseMenubar
      data-color={colorAttribute(color)}
      data-radius={radius}
      {...props}
      // No box around the bar: only the triggers, like a Radix Themes `TabNav`
      className={cn(
        'inline-flex items-center gap-1 text-gray-12',
        'data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
        className,
      )}
    />
  )
}

export type MenubarTriggerProps = Omit<ComponentProps<typeof BaseMenu.Trigger>, 'className'> & {
  className?: string
}

/** The button in the bar that opens a menu. */
export function MenubarTrigger({ className, ...props }: MenubarTriggerProps) {
  return <BaseMenu.Trigger {...props} className={cn(barTrigger, className)} />
}
