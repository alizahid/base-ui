'use client'

import {
  Toast as Component,
  type ToastProviderProps,
} from '@base-ui/react/toast'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, use } from 'react'

import { Cross2Icon } from '../../lib/icons.js'
import { merge } from '../../lib/stylex.js'
import { ThemeContext } from '../../lib/theme.js'
import { Button } from '../button/button.js'
import { IconButton } from '../icon-button/icon-button.js'
import { toast } from './manager.js'

export type ToastProps = Pick<ToastProviderProps, 'limit' | 'timeout'> & {
  className?: string
  closeLabel?: string
  position?:
    | 'top-left'
    | 'top'
    | 'top-right'
    | 'bottom-left'
    | 'bottom'
    | 'bottom-right'
  style?: CSSProperties
  // surface tints the title of a typed toast, solid fills its background
  variant?: 'surface' | 'solid'
}

// render once, inside the provider. it shows whatever is added through
// `toast`. className and style go to the viewport, to move or resize it
export function Toast({
  className,
  closeLabel = 'Close',
  limit,
  position = 'bottom-right',
  style,
  timeout,
  variant = 'surface',
}: ToastProps) {
  const theme = use(ThemeContext)

  return (
    <Component.Provider limit={limit} timeout={timeout} toastManager={toast}>
      <Component.Portal>
        {/* portaled out of the provider's element, so its colors are set
            again for everything inside */}
        <Component.Viewport
          data-accent={theme.accent}
          data-gray={theme.gray}
          {...merge(
            stylex.props(styles.viewport, positions[position]),
            className,
            style,
          )}
        >
          <List
            closeLabel={closeLabel}
            solid={variant === 'solid'}
            swipe={swipes[position]}
          />
        </Component.Viewport>
      </Component.Portal>
    </Component.Provider>
  )
}

type Swipe = 'up' | 'down' | 'left' | 'right'

// a toast is swiped away towards the edges it sits against
const swipes: Record<NonNullable<ToastProps['position']>, Array<Swipe>> = {
  bottom: ['down'],
  'bottom-left': ['down', 'left'],
  'bottom-right': ['down', 'right'],
  top: ['up'],
  'top-left': ['up', 'left'],
  'top-right': ['up', 'right'],
}

const colors: Record<string, string> = {
  error: 'red',
  info: 'blue',
  success: 'green',
  warning: 'amber',
}

type ListProps = {
  closeLabel: string
  solid: boolean
  swipe: Array<Swipe>
}

function List({ closeLabel, solid, swipe }: ListProps) {
  const { toasts } = Component.useToastManager()

  return toasts.map((item) => {
    const color = item.type ? colors[item.type] : undefined
    // a filled toast draws its own buttons, in its text color
    const filled = solid && Boolean(color)

    return (
      <Component.Root
        data-accent={color}
        key={item.id}
        swipeDirection={swipe}
        toast={item}
        {...stylex.props(styles.main, filled && styles.solid)}
      >
        <Component.Content {...stylex.props(styles.content)}>
          <div {...stylex.props(styles.text)}>
            <Component.Title {...stylex.props(styles.title)} />

            <Component.Description {...stylex.props(styles.description)} />
          </div>

          {item.actionProps ? (
            <Component.Action
              render={filled ? undefined : <Button size="1" variant="soft" />}
              {...stylex.props(
                filled && styles.button,
                filled && styles.action,
              )}
            />
          ) : null}

          <Component.Close
            aria-label={closeLabel}
            render={
              filled ? undefined : (
                <IconButton color="gray" size="1" variant="ghost" />
              )
            }
            {...stylex.props(filled && styles.button, filled && styles.close)}
          >
            <Cross2Icon {...stylex.props(styles.icon)} />
          </Component.Close>
        </Component.Content>
      </Component.Root>
    )
  })
}

// stylex doesn't order these against each other, so they must not overlap
const up = ':is([data-ending-style][data-swipe-direction="up"])'
const down = ':is([data-ending-style][data-swipe-direction="down"])'
const left = ':is([data-ending-style][data-swipe-direction="left"])'
const right = ':is([data-ending-style][data-swipe-direction="right"])'
const away =
  ':is([data-starting-style], [data-ending-style]:not([data-swipe-direction="up"], [data-swipe-direction="down"], [data-swipe-direction="left"], [data-swipe-direction="right"]))'
const expanded =
  ':is([data-expanded]:not([data-starting-style], [data-ending-style]))'
const still = '@media (prefers-reduced-motion: reduce)'

// the stacking, swiping and motion follow base ui's own toast example; the
// surface is the popover's
const styles = stylex.create({
  // the buttons of a filled toast: tinted with its text color
  action: {
    backgroundColor: {
      ':hover': 'color-mix(in oklab, currentColor 25%, transparent)',
      default: 'color-mix(in oklab, currentColor 15%, transparent)',
    },
    fontSize: 'var(--text-xs)',
    fontWeight: '500',
    paddingInline: 'calc(var(--spacing) * 2)',
  },
  button: {
    alignItems: 'center',
    borderRadius: 'var(--radius-sm)',
    borderStyle: 'none',
    color: 'inherit',
    cursor: 'pointer',
    display: 'inline-flex',
    flexShrink: 0,
    font: 'inherit',
    height: 'calc(var(--spacing) * 6)',
    justifyContent: 'center',
    outline: {
      ':focus-visible': '2px solid currentColor',
      default: 'none',
    },
    outlineOffset: 2,
    padding: 0,
  },
  close: {
    backgroundColor: {
      ':hover': 'color-mix(in oklab, currentColor 15%, transparent)',
      default: 'transparent',
    },
    width: 'calc(var(--spacing) * 6)',
  },
  content: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    gap: 'calc(var(--spacing) * 3)',
    // a toast behind the front one hides its content until the stack opens
    opacity: {
      ':is([data-behind]:not([data-expanded]))': 0,
      default: 1,
    },
    overflow: 'hidden',
    padding: 'calc(var(--spacing) * 3)',
    paddingInlineStart: 'calc(var(--spacing) * 4)',
    transitionDuration: '250ms',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  description: {
    color: 'var(--toast-muted, var(--gray-a11))',
    margin: 0,
  },
  icon: {
    height: 15,
    width: 15,
  },
  main: {
    '--toast-gap': 'calc(var(--spacing) * 3)',
    // --toast-dir is 1 for a stack that grows upwards from the bottom, -1 for
    // one that grows downwards from the top
    '--toast-offset':
      'calc((var(--toast-offset-y) + var(--toast-index) * var(--toast-gap)) * var(--toast-dir) * -1 + var(--toast-swipe-movement-y))',
    '--toast-peek': 'calc(var(--spacing) * 3)',
    '--toast-scale': 'calc(max(0, 1 - (var(--toast-index) * 0.1)))',
    '--toast-shrink': 'calc(1 - var(--toast-scale))',
    '--toast-size': 'var(--toast-frontmost-height, var(--toast-height))',
    '--toast-title': {
      ':is([data-accent])': 'var(--accent-a11)',
      default: 'inherit',
    },
    // fills the gap to the next toast, so the stack stays open as the pointer
    // crosses it
    '::after': {
      bottom: 'var(--toast-after-bottom)',
      content: '""',
      height: 'calc(var(--toast-gap) + 1px)',
      insetInlineStart: 0,
      position: 'absolute',
      top: 'var(--toast-after-top)',
      width: '100%',
    },
    backgroundColor: 'var(--panel-background)',
    borderRadius: 'var(--radius-lg)',
    bottom: 'var(--toast-bottom)',
    boxShadow: 'var(--panel-shadow)',
    boxSizing: 'border-box',
    color: 'var(--gray-12)',
    cursor: 'default',
    fontSize: 'var(--text-sm)',
    height: {
      ':is([data-expanded])': 'var(--toast-height)',
      default: 'var(--toast-size)',
    },
    insetInlineStart: 0,
    lineHeight: 'var(--text-sm--line-height)',
    opacity: {
      ':is([data-limited], [data-ending-style])': 0,
      default: 1,
    },
    outline: {
      ':focus-visible': '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: -1,
    position: 'absolute',
    top: 'var(--toast-top)',
    transform: {
      [away]: 'translateY(calc(150% * var(--toast-dir)))',
      [down]: 'translateY(calc(var(--toast-swipe-movement-y) + 150%))',
      [expanded]:
        'translateX(var(--toast-swipe-movement-x)) translateY(var(--toast-offset))',
      [left]:
        'translateX(calc(var(--toast-swipe-movement-x) - 150%)) translateY(var(--toast-offset))',
      [right]:
        'translateX(calc(var(--toast-swipe-movement-x) + 150%)) translateY(var(--toast-offset))',
      [up]: 'translateY(calc(var(--toast-swipe-movement-y) - 150%))',
      // stacked: each toast behind the front one peeks out above it, smaller
      default:
        'translateX(var(--toast-swipe-movement-x)) translateY(calc(var(--toast-swipe-movement-y) - (var(--toast-index) * var(--toast-peek) + var(--toast-shrink) * var(--toast-size)) * var(--toast-dir))) scale(var(--toast-scale))',
    },
    transformOrigin: 'var(--toast-origin)',
    transitionDuration: '500ms, 500ms, 150ms',
    transitionProperty: {
      [still]: 'none',
      default: 'transform, opacity, height',
    },
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1), ease, ease',
    userSelect: 'none',
    width: '100%',
    zIndex: 'calc(1000 - var(--toast-index))',
  },
  // a typed toast filled with its color
  solid: {
    '--toast-muted': 'color-mix(in oklab, currentColor 80%, transparent)',
    '--toast-title': 'inherit',
    backgroundColor: 'var(--accent-9)',
    color: 'var(--accent-contrast)',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: 'calc(var(--spacing) * 0.5)',
    minWidth: 0,
  },
  title: {
    color: 'var(--toast-title)',
    fontWeight: '500',
    margin: 0,
  },
  // full width on a narrow screen
  viewport: {
    marginInline: 'auto',
    position: 'fixed',
    width: 'min(calc(var(--spacing) * 90), calc(100vw - var(--spacing) * 8))',
    zIndex: 1,
  },
})

const top = {
  '--toast-after-bottom': '100%',
  '--toast-after-top': 'auto',
  '--toast-bottom': 'auto',
  '--toast-dir': '-1',
  '--toast-origin': 'top center',
  '--toast-top': '0',
  top: 'calc(var(--spacing) * 4)',
}

const bottom = {
  '--toast-after-bottom': 'auto',
  '--toast-after-top': '100%',
  '--toast-bottom': '0',
  '--toast-dir': '1',
  '--toast-origin': 'bottom center',
  '--toast-top': 'auto',
  bottom: 'calc(var(--spacing) * 4)',
}

// where the viewport sits, and which way its stack grows
const positions = stylex.create({
  bottom: {
    ...bottom,
    insetInline: 0,
  },
  'bottom-left': {
    ...bottom,
    left: 'calc(var(--spacing) * 4)',
  },
  'bottom-right': {
    ...bottom,
    right: 'calc(var(--spacing) * 4)',
  },
  top: {
    ...top,
    insetInline: 0,
  },
  'top-left': {
    ...top,
    left: 'calc(var(--spacing) * 4)',
  },
  'top-right': {
    ...top,
    right: 'calc(var(--spacing) * 4)',
  },
})
