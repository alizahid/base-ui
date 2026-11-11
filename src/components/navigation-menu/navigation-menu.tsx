import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu'
import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'
import { type Color, colorAttribute } from '../../lib/colors'
import { type PositionerProps, splitPositionerProps } from '../../lib/positioner'
import { popupSurface } from '../../lib/styles'
import { barTrigger, ChevronDownIcon } from '../dropdown-menu/shared'
import { useThemeProps } from '../theme-provider'

// One speed and curve for everything that moves when the open item changes
const motion = 'duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]'

export type NavigationMenuRootProps = Omit<
  ComponentProps<typeof BaseNavigationMenu.Root>,
  'className' | 'color'
> &
  PositionerProps<ComponentProps<typeof BaseNavigationMenu.Positioner>> &
  Pick<ComponentProps<typeof BaseNavigationMenu.Portal>, 'container'> & {
    className?: string
    /** Classes for the popup parts that `Root` renders at its end. */
    classNames?: {
      popup?: string
      positioner?: string
      viewport?: string
    }
    /**
     * The color scale to use. `accent` follows the theme.
     * @default 'accent'
     */
    color?: Color
  }

/**
 * Holds the `List`. Also renders the one popup that all `Content` parts are
 * shown in: Base UI's `Portal`, `Positioner`, `Popup` and `Viewport`.
 * The placement props (`side`, `align`, `sideOffset`, ...) go here.
 */
export function NavigationMenuRoot({
  children,
  className,
  classNames,
  color,
  container,
  collisionPadding = 16,
  sideOffset = 8,
  ...props
}: NavigationMenuRootProps) {
  const themeProps = useThemeProps()
  const [positionerProps, rootProps] = splitPositionerProps(props)
  const colorValue = colorAttribute(color)

  return (
    <BaseNavigationMenu.Root
      data-color={colorValue}
      {...rootProps}
      className={cn('min-w-max text-gray-12', className)}
    >
      {children}
      <BaseNavigationMenu.Portal {...themeProps} container={container}>
        <BaseNavigationMenu.Positioner
          collisionPadding={collisionPadding}
          sideOffset={sideOffset}
          {...positionerProps}
          className={cn(
            'h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)',
            'transition-[top,left,right,bottom] data-instant:transition-none',
            motion,
            // An unseen strip over the gap, so the pointer can travel from the trigger to the popup
            "before:absolute before:content-['']",
            'data-[side=bottom]:before:inset-x-0 data-[side=bottom]:before:-top-2.5 data-[side=bottom]:before:h-2.5',
            'data-[side=top]:before:inset-x-0 data-[side=top]:before:-bottom-2.5 data-[side=top]:before:h-2.5',
            'data-[side=left]:before:inset-y-0 data-[side=left]:before:-right-2.5 data-[side=left]:before:w-2.5',
            'data-[side=right]:before:inset-y-0 data-[side=right]:before:-left-2.5 data-[side=right]:before:w-2.5',
            classNames?.positioner,
          )}
        >
          <BaseNavigationMenu.Popup
            data-color={colorValue}
            className={cn(
              popupSurface,
              'relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin)',
              'transition-[opacity,scale,width,height]',
              motion,
              // Opens and closes like the other popups (Radix Themes: from 97%, 100ms out)
              'data-starting-style:scale-[0.97] data-starting-style:opacity-0',
              'data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-ending-style:duration-100',
              classNames?.popup,
            )}
          >
            <BaseNavigationMenu.Viewport
              className={cn(
                'relative size-full overflow-hidden rounded-[inherit]',
                classNames?.viewport,
              )}
            />
          </BaseNavigationMenu.Popup>
        </BaseNavigationMenu.Positioner>
      </BaseNavigationMenu.Portal>
    </BaseNavigationMenu.Root>
  )
}

export type NavigationMenuListProps = Omit<
  ComponentProps<typeof BaseNavigationMenu.List>,
  'className'
> & {
  className?: string
}

/** The row of items. */
export function NavigationMenuList({ className, ...props }: NavigationMenuListProps) {
  return (
    <BaseNavigationMenu.List
      // A `Link` that sits in the bar looks for this, see `NavigationMenuLink`
      data-nav-list=""
      {...props}
      className={cn('relative inline-flex list-none items-center gap-1', className)}
    />
  )
}

export const NavigationMenuItem = BaseNavigationMenu.Item

export type NavigationMenuItemProps = ComponentProps<typeof BaseNavigationMenu.Item>

export type NavigationMenuTriggerProps = Omit<
  ComponentProps<typeof BaseNavigationMenu.Trigger>,
  'className'
> & {
  className?: string
  /** Classes for the parts that `Trigger` renders inside itself. */
  classNames?: {
    icon?: string
  }
}

/** Opens the `Content` next to it. Includes Base UI's `Icon`: an arrow that turns when open. */
export function NavigationMenuTrigger({
  children,
  className,
  classNames,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <BaseNavigationMenu.Trigger {...props} className={cn(barTrigger, className)}>
      {children}
      <BaseNavigationMenu.Icon
        className={cn(
          'opacity-90 transition-transform duration-200 data-popup-open:rotate-180',
          classNames?.icon,
        )}
      >
        <ChevronDownIcon />
      </BaseNavigationMenu.Icon>
    </BaseNavigationMenu.Trigger>
  )
}

export type NavigationMenuContentProps = Omit<
  ComponentProps<typeof BaseNavigationMenu.Content>,
  'className'
> & {
  className?: string
}

/** What the popup shows for one item. Slides in from the side the pointer came from. */
export function NavigationMenuContent({ className, ...props }: NavigationMenuContentProps) {
  return (
    <BaseNavigationMenu.Content
      {...props}
      className={cn(
        'h-full w-max max-w-[calc(100vw-2rem)] p-2',
        'transition-[opacity,translate]',
        motion,
        'data-ending-style:opacity-0 data-starting-style:opacity-0',
        'data-starting-style:data-[activation-direction=left]:-translate-x-1/2',
        'data-starting-style:data-[activation-direction=right]:translate-x-1/2',
        'data-ending-style:data-[activation-direction=left]:translate-x-1/2',
        'data-ending-style:data-[activation-direction=right]:-translate-x-1/2',
        className,
      )}
    />
  )
}

export type NavigationMenuLinkProps = Omit<
  ComponentProps<typeof BaseNavigationMenu.Link>,
  'className'
> & {
  className?: string
}

/** A link, inside `Content` or straight inside an `Item`. Set `active` for the current page. */
export function NavigationMenuLink({ className, ...props }: NavigationMenuLinkProps) {
  return (
    <BaseNavigationMenu.Link
      {...props}
      className={cn(
        // In the popup: a row like a menu item, but it can be taller than one line
        'block rounded-panel-sm px-3 py-1.5 text-gray-12 text-sm no-underline',
        'outline-accent-8 -outline-offset-1 focus-visible:outline-2',
        'hover:bg-gray-a3 data-active:bg-accent-a3 data-active:text-accent-12',
        // In the bar, next to the triggers: the same look as a trigger
        'in-data-nav-list:inline-flex in-data-nav-list:h-7 in-data-nav-list:items-center in-data-nav-list:rounded-ui-sm in-data-nav-list:px-2 in-data-nav-list:py-0',
        'in-data-nav-list:not-data-active:text-gray-a11 in-data-nav-list:hover:text-gray-12',
        'in-data-nav-list:data-active:bg-transparent in-data-nav-list:data-active:font-medium in-data-nav-list:data-active:text-gray-12',
        className,
      )}
    />
  )
}
