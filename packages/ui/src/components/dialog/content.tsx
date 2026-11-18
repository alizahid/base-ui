'use client'

import {
  Dialog as Component,
  type DialogPopupProps,
} from '@base-ui/react/dialog'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, use } from 'react'

import { merge } from '#lib/stylex.js'
import { ThemeContext } from '#lib/theme.js'

export type DialogContentProps = DialogPopupProps & {
  align?: 'start' | 'center'
  className?: string
  size?: '1' | '2' | '3' | '4'
  style?: CSSProperties
}

// also used by AlertDialog, whose backdrop, viewport and popup are the same
// base ui parts
export function Content({
  align = 'center',
  className,
  size = '3',
  style,
  ...props
}: DialogContentProps) {
  const theme = use(ThemeContext)

  return (
    <Component.Portal>
      <Component.Backdrop {...stylex.props(dialog.backdrop)} />

      <Component.Viewport {...stylex.props(dialog.viewport)}>
        <div
          {...stylex.props(dialog.padding, align === 'start' && dialog.start)}
        >
          {/* portaled out of the provider's element, so its colors are set
              again for everything inside */}
          <Component.Popup
            data-accent={theme.accent}
            data-gray={theme.gray}
            {...props}
            {...merge(
              stylex.props(dialog.content, sizes[size]),
              className,
              style,
            )}
          />
        </div>
      </Component.Viewport>
    </Component.Portal>
  )
}

const hidden = ':is([data-starting-style], [data-ending-style])'

const still = '@media (prefers-reduced-motion: reduce)'

// ios 26 and later, where safari's status bar and toolbar float over the page
const bars = '@supports (-webkit-touch-callout: none) and (anchor-name: --a)'

// ported from radix themes' base-dialog.css. radix animates with keyframes;
// here base ui's starting and ending styles drive transitions instead.
// exported for CommandBar, which is a dialog with its own contents
export const dialog = stylex.create({
  backdrop: {
    ':is([data-ending-style])::after': {
      backgroundColor: 'var(--overlay)',
      content: '""',
      inset: 0,
      position: 'fixed',
      visibility: 'visible',
    },
    backgroundColor: 'var(--overlay)',
    inset: 0,
    opacity: {
      [hidden]: 0,
      default: null,
    },
    position: 'fixed',
    transitionDuration: {
      ':is([data-ending-style])': '100ms',
      [still]: '0s',
      default: '150ms',
    },
    transitionProperty: 'opacity',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    // ios: nothing fixed can draw under safari's status bar and toolbar.
    // safari fills them itself, dimmed to match a fixed backdrop like this
    // one, for as long as it is visible. so it hides as it starts to close,
    // for the bars to fade with it, and this fades in its place
    visibility: {
      ':is([data-ending-style])': 'hidden',
      default: null,
    },
  },
  content: {
    backgroundColor: 'var(--panel-background)',
    borderRadius: 'var(--inset-radius)',
    boxShadow: 'var(--dialog-shadow)',
    color: 'var(--gray-12)',
    margin: 'auto',
    maxWidth: 'calc(var(--ui-spacing) * 144)',
    opacity: {
      [hidden]: 0,
      default: null,
    },
    outline: 'none',
    overflow: 'auto',
    padding: 'var(--inset-padding)',
    position: 'relative',
    transform: {
      ':is([data-ending-style])': 'translateY(var(--ui-spacing)) scale(0.99)',
      ':is([data-starting-style])': 'translateY(var(--ui-spacing)) scale(0.97)',
      default: null,
    },
    transitionDuration: {
      ':is([data-ending-style])': '100ms',
      [still]: '0s',
      default: '150ms',
    },
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    // the viewport is hidden
    visibility: 'visible',
    width: '100%',
    zIndex: 1,
  },
  // keeps the dialog off the edges of the screen, and scrolls with it when
  // the dialog is taller than the screen
  padding: {
    flexGrow: 1,
    margin: 'auto',
    paddingBlockEnd: 'max(calc(var(--ui-spacing) * 8), 6vh)',
    paddingBlockStart: 'calc(var(--ui-spacing) * 8)',
    paddingInline: 'calc(var(--ui-spacing) * 4)',
  },
  start: {
    marginBlockStart: 0,
  },
  viewport: {
    display: 'flex',
    inset: 0,
    overflow: 'auto',
    position: 'fixed',
    // ios: hidden, with only the dialog showing, so the backdrop is what
    // safari finds at the edges of the screen
    visibility: {
      [bars]: 'hidden',
      default: null,
    },
  },
})

// the padding and radius, named for Inset, which reads them
const sizes = stylex.create({
  1: {
    '--inset-padding': 'calc(var(--ui-spacing) * 3)',
    '--inset-radius': 'var(--ui-radius-lg)',
  },
  2: {
    '--inset-padding': 'calc(var(--ui-spacing) * 4)',
    '--inset-radius': 'var(--ui-radius-lg)',
  },
  3: {
    '--inset-padding': 'calc(var(--ui-spacing) * 6)',
    '--inset-radius': 'var(--ui-radius-xl)',
  },
  4: {
    '--inset-padding': 'calc(var(--ui-spacing) * 8)',
    '--inset-radius': 'var(--ui-radius-xl)',
  },
})
