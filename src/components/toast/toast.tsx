import { Toast as BaseToast } from '@base-ui/react/toast'
import type { ComponentProps } from 'react'
import { tv } from 'tailwind-variants/lite'
import { cn } from '../../lib/cn'
import type { ThemeColor } from '../../lib/colors'
import { focusRing, popupSurface } from '../../lib/styles'
import { Button } from '../button'
import { useThemeProps } from '../theme-provider'

/** Returns `{ toasts, add, close, update, promise }`. Use inside `Toast.Provider`. */
export const useToast = BaseToast.useToastManager

/** Makes a manager that can add toasts from outside React. Pass it to `Toast.Provider`. */
export const createToastManager = BaseToast.createToastManager

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

/** The toast `type`s that get a color. */
const typeColors: Record<string, ThemeColor> = {
  success: 'jade',
  error: 'red',
  warning: 'amber',
  info: 'blue',
}

// The stacking math comes from the Base UI docs. Base UI sets --toast-index,
// --toast-height, --toast-offset-y and --toast-swipe-movement-x/y on every toast.
// Collapsed: toasts sit behind the newest one, each a bit smaller and peeking out.
// Expanded (hover or focus): they are laid out as a list.
const stack = [
  '[--gap:0.75rem] [--peek:0.75rem]',
  '[--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]',
  '[--height:var(--toast-frontmost-height,var(--toast-height))]',
  'absolute z-[calc(1000-var(--toast-index))] h-(--height) w-full select-none',
  '[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]',
  // Fills the gap between toasts, so the pointer does not leave the stack
  "after:absolute after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
  'data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]',
  'data-ending-style:opacity-0 data-limited:opacity-0',
  // Leaving after a swipe: keep going in the direction of the swipe
  'data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]',
  'data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]',
  'data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
  'data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
].join(' ')

export const toastVariants = tv({
  slots: {
    viewport: 'fixed z-1 w-[calc(100vw-2rem)] sm:w-90',
    toast: [popupSurface, stack, 'focus-visible:ring-2 focus-visible:ring-accent-8'],
    content: [
      'flex items-start gap-3 overflow-hidden p-4 text-sm',
      'transition-opacity duration-250 data-behind:opacity-0 data-expanded:opacity-100',
    ],
    // Only shown for a toast with a known `type`
    dot: 'mt-1.5 size-2 shrink-0 rounded-full bg-accent-9',
    title: 'font-medium',
    description: 'text-gray-11',
    close: [
      '-mt-1 -mr-1 flex size-6 shrink-0 items-center justify-center rounded-ui-sm text-gray-a11',
      'hover:bg-gray-a3 active:bg-gray-a4',
      focusRing,
    ],
  },
  variants: {
    vertical: {
      top: {
        viewport: 'top-4 sm:top-8',
        toast: [
          'top-0 origin-top after:bottom-full',
          '[--offset-y:calc(var(--toast-offset-y)+(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))]',
          '[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))]',
          'data-starting-style:[transform:translateY(-150%)]',
          '[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(-150%)]',
        ],
      },
      bottom: {
        viewport: 'bottom-4 sm:bottom-8',
        toast: [
          'bottom-0 origin-bottom after:top-full',
          '[--offset-y:calc(var(--toast-offset-y)*-1+(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]',
          '[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]',
          'data-starting-style:[transform:translateY(150%)]',
          '[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]',
        ],
      },
    },
    horizontal: {
      left: { viewport: 'left-4 sm:left-8' },
      center: { viewport: 'inset-x-0 mx-auto' },
      right: { viewport: 'right-4 sm:right-8' },
    },
  },
})

type ToastClassNames = {
  /** The fixed area that holds the stack. */
  viewport?: string
  content?: string
  dot?: string
  title?: string
  description?: string
  action?: string
  close?: string
}

export type ToastProviderProps = ComponentProps<typeof BaseToast.Provider> &
  Pick<ComponentProps<typeof BaseToast.Portal>, 'container'> & {
    /** Class for the box of every toast. */
    className?: string
    /** Classes for the other parts of the toasts. */
    classNames?: ToastClassNames
    /**
     * The label of the close button, for screen readers.
     * @default 'Close'
     */
    closeLabel?: string
    /**
     * The corner or edge of the screen where the toasts show.
     * @default 'bottom-right'
     */
    position?: ToastPosition
  }

/**
 * Put this once around the app. It also renders the toasts, so there is nothing
 * else to mount. Add toasts with `useToast().add({ title, description, type })`.
 */
export function ToastProvider({
  children,
  className,
  classNames,
  closeLabel,
  container,
  position,
  ...props
}: ToastProviderProps) {
  return (
    <BaseToast.Provider {...props}>
      {children}
      <ToastList
        className={className}
        classNames={classNames}
        closeLabel={closeLabel}
        container={container}
        position={position}
      />
    </BaseToast.Provider>
  )
}

type ToastListProps = Pick<
  ToastProviderProps,
  'className' | 'classNames' | 'closeLabel' | 'container' | 'position'
>

function ToastList({
  className,
  classNames,
  closeLabel = 'Close',
  container,
  position = 'bottom-right',
}: ToastListProps) {
  const themeProps = useThemeProps()
  const { toasts } = BaseToast.useToastManager()

  const [vertical, horizontal] = position.split('-') as [
    'top' | 'bottom',
    'left' | 'center' | 'right',
  ]
  const styles = toastVariants({ horizontal, vertical })

  // Swipe away towards the closest screen edges
  const swipeDirection = [
    vertical === 'top' ? 'up' : 'down',
    ...(horizontal === 'center' ? [] : [horizontal]),
  ] as ('up' | 'down' | 'left' | 'right')[]

  return (
    <BaseToast.Portal {...themeProps} container={container}>
      <BaseToast.Viewport className={cn(styles.viewport(), classNames?.viewport)}>
        {toasts.map((toast) => {
          const color = toast.type ? typeColors[toast.type] : undefined

          return (
            <BaseToast.Root
              className={cn(styles.toast(), className)}
              data-color={color}
              key={toast.id}
              swipeDirection={swipeDirection}
              toast={toast}
            >
              <BaseToast.Content className={cn(styles.content(), classNames?.content)}>
                {color && <span aria-hidden="true" className={cn(styles.dot(), classNames?.dot)} />}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <BaseToast.Title className={cn(styles.title(), classNames?.title)} />
                  <BaseToast.Description
                    className={cn(styles.description(), classNames?.description)}
                  />
                </div>
                {toast.actionProps && (
                  <BaseToast.Action
                    render={<Button className={classNames?.action} size="xs" variant="soft" />}
                  />
                )}
                <BaseToast.Close
                  aria-label={closeLabel}
                  className={cn(styles.close(), classNames?.close)}
                >
                  <CloseIcon />
                </BaseToast.Close>
              </BaseToast.Content>
            </BaseToast.Root>
          )
        })}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="size-3.5" fill="none" viewBox="0 0 16 16">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}
