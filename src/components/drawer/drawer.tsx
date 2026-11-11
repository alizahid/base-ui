import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { type ComponentProps, createContext, useContext } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import { dialogDescription, dialogTitle } from '../dialog/dialog'
import { useThemeProps } from '../theme-provider'

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'

// The swipe that closes a drawer goes back towards the edge it came from
const swipeDirections = {
  left: 'left',
  right: 'right',
  top: 'up',
  bottom: 'down',
} as const

const DrawerSideContext = createContext<DrawerSide>('right')

export type DrawerRootProps<Payload = unknown> = BaseDrawer.Root.Props<Payload> & {
  /**
   * The screen edge the drawer is attached to. It slides in from there, and
   * swiping back towards that edge closes it. Set it here and not on `Content`,
   * because Base UI needs the swipe direction on the root.
   * `swipeDirection` can still be set to use another direction.
   * @default 'right'
   */
  side?: DrawerSide
}

export function DrawerRoot<Payload = unknown>({
  side = 'right',
  swipeDirection,
  ...props
}: DrawerRootProps<Payload>) {
  return (
    <DrawerSideContext.Provider value={side}>
      <BaseDrawer.Root {...props} swipeDirection={swipeDirection ?? swipeDirections[side]} />
    </DrawerSideContext.Provider>
  )
}

export const DrawerTrigger = BaseDrawer.Trigger

export type DrawerTriggerProps = ComponentProps<typeof BaseDrawer.Trigger>

export const DrawerClose = BaseDrawer.Close

export type DrawerCloseProps = ComponentProps<typeof BaseDrawer.Close>

// The look is Radix Themes' Dialog (solid panel, shadow 6, same paddings and
// corners per size), attached to a screen edge. Radix Themes has no drawer.
export const drawerContentVariants = tv({
  slots: {
    // Fades with the swipe: --drawer-swipe-progress goes from 0 to 1 while dragging
    backdrop: [
      'fixed inset-0 bg-overlay opacity-[calc(1-var(--drawer-swipe-progress))]',
      'transition-opacity duration-300 ease-out data-swiping:duration-0',
      'data-ending-style:opacity-0 data-starting-style:opacity-0',
      'data-ending-style:duration-[calc(var(--drawer-swipe-strength)*300ms)]',
    ],
    // The padding keeps a strip of the page visible on small screens
    viewport: 'fixed inset-0 flex',
    // The panel follows the finger through --drawer-swipe-movement-x/y.
    // A fast swipe makes --drawer-swipe-strength smaller, so it closes faster.
    // --tw-ring-shadow paints a strip in the panel color past the screen edge,
    // so no gap shows when the panel is pulled a little away from its edge.
    popup: [
      'max-h-full w-full overflow-y-auto overscroll-contain bg-panel-solid text-gray-12 shadow-ui-6 outline-none',
      'transition-[translate] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
      'data-swiping:select-none data-swiping:duration-0',
      'data-ending-style:duration-[calc(var(--drawer-swipe-strength)*300ms)]',
    ],
  },
  variants: {
    side: {
      left: {
        viewport: 'justify-start pr-12',
        popup: [
          'rounded-l-none [--tw-ring-shadow:-3rem_0_0_var(--panel-solid)] translate-x-(--drawer-swipe-movement-x)',
          'data-ending-style:-translate-x-full data-starting-style:-translate-x-full',
        ],
      },
      right: {
        viewport: 'justify-end pl-12',
        popup: [
          'rounded-r-none [--tw-ring-shadow:3rem_0_0_var(--panel-solid)] translate-x-(--drawer-swipe-movement-x)',
          'data-ending-style:translate-x-full data-starting-style:translate-x-full',
        ],
      },
      top: {
        viewport: 'items-start pb-12',
        popup: [
          'rounded-t-none [--tw-ring-shadow:0_-3rem_0_var(--panel-solid)] translate-y-(--drawer-swipe-movement-y)',
          'data-ending-style:-translate-y-full data-starting-style:-translate-y-full',
        ],
      },
      bottom: {
        viewport: 'items-end pt-12',
        popup: [
          'rounded-b-none [--tw-ring-shadow:0_3rem_0_var(--panel-solid)] translate-y-(--drawer-swipe-movement-y)',
          'data-ending-style:translate-y-full data-starting-style:translate-y-full',
        ],
      },
    },
    size: {
      sm: { popup: 'rounded-panel-lg p-3' },
      md: { popup: 'rounded-panel-lg p-4' },
      lg: { popup: 'rounded-panel-xl p-6' },
      xl: { popup: 'rounded-panel-xl p-8' },
    },
  },
  defaultVariants: {
    side: 'right',
    size: 'lg',
  },
})

// Width of a left or right drawer. Top and bottom drawers are as wide as the screen.
const sideWidths = {
  sm: 'max-w-xs',
  md: 'max-w-sm',
  lg: 'max-w-md',
  xl: 'max-w-xl',
}

export type DrawerContentProps = Omit<ComponentProps<typeof BaseDrawer.Popup>, 'className'> &
  Pick<VariantProps<typeof drawerContentVariants>, 'size'> &
  Pick<ComponentProps<typeof BaseDrawer.Portal>, 'container' | 'keepMounted'> & {
    className?: string
    /** Classes for the parts that `Content` renders around and inside itself. */
    classNames?: {
      backdrop?: string
      /** The wrapper around the children. Text in it can be selected with the mouse. */
      content?: string
      viewport?: string
    }
  }

/**
 * The drawer panel. Base UI's `Portal`, `Backdrop`, `Viewport`, `Popup` and `Content` in one.
 * The edge it sits on comes from `side` on `Drawer.Root`.
 */
export function DrawerContent({
  children,
  className,
  classNames,
  container,
  keepMounted,
  size = 'lg',
  ...props
}: DrawerContentProps) {
  const themeProps = useThemeProps()
  const side = useContext(DrawerSideContext)
  const styles = drawerContentVariants({ side, size })
  const horizontal = side === 'left' || side === 'right'

  return (
    <BaseDrawer.Portal {...themeProps} container={container} keepMounted={keepMounted}>
      <BaseDrawer.Backdrop className={cn(styles.backdrop(), classNames?.backdrop)} />
      <BaseDrawer.Viewport className={cn(styles.viewport(), classNames?.viewport)}>
        <BaseDrawer.Popup
          data-side={side}
          {...props}
          className={cn(styles.popup(), horizontal && sideWidths[size], className)}
        >
          <BaseDrawer.Content className={classNames?.content}>{children}</BaseDrawer.Content>
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  )
}

export type DrawerTitleProps = Omit<ComponentProps<typeof BaseDrawer.Title>, 'className'> & {
  className?: string
}

export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return <BaseDrawer.Title {...props} className={cn(dialogTitle, className)} />
}

export type DrawerDescriptionProps = Omit<
  ComponentProps<typeof BaseDrawer.Description>,
  'className'
> & {
  className?: string
}

export function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return <BaseDrawer.Description {...props} className={cn(dialogDescription, className)} />
}
