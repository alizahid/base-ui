'use client'

import {
  Dialog as Component,
  type DialogCloseProps as ComponentCloseProps,
  type DialogDescriptionProps as ComponentDescriptionProps,
  type DialogRootProps as ComponentRootProps,
  type DialogTitleProps as ComponentTitleProps,
  type DialogTriggerProps as ComponentTriggerProps,
  type DialogPopupProps,
} from '@base-ui/react/dialog'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, use } from 'react'

import { merge } from '../../lib/stylex.js'
import { ThemeContext } from '../../lib/theme.js'

export type DialogRootProps = ComponentRootProps

export function Root(props: DialogRootProps) {
  return <Component.Root {...props} />
}

export type DialogTriggerProps = ComponentTriggerProps

// unstyled: pass the element to open the dialog with as `render`, e.g.
// render={<Button />}
export function Trigger(props: DialogTriggerProps) {
  return <Component.Trigger {...props} />
}

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
      <Component.Backdrop {...stylex.props(styles.backdrop)} />

      <Component.Viewport {...stylex.props(styles.viewport)}>
        <div
          {...stylex.props(styles.padding, align === 'start' && styles.start)}
        >
          {/* portaled out of the provider's element, so its colors are set
              again for everything inside */}
          <Component.Popup
            data-accent={theme.accent}
            data-gray={theme.gray}
            {...props}
            {...merge(
              stylex.props(styles.content, sizes[size]),
              className,
              style,
            )}
          />
        </div>
      </Component.Viewport>
    </Component.Portal>
  )
}

export type DialogTitleProps = ComponentTitleProps & {
  className?: string
  style?: CSSProperties
}

export function Title({ className, style, ...props }: DialogTitleProps) {
  return (
    <Component.Title
      {...props}
      {...merge(stylex.props(styles.title), className, style)}
    />
  )
}

export type DialogDescriptionProps = ComponentDescriptionProps & {
  className?: string
  style?: CSSProperties
}

export function Description({
  className,
  style,
  ...props
}: DialogDescriptionProps) {
  return (
    <Component.Description
      {...props}
      {...merge(stylex.props(styles.description), className, style)}
    />
  )
}

export type DialogCloseProps = ComponentCloseProps

// unstyled, like Trigger: render={<Button />}
export function Close(props: DialogCloseProps) {
  return <Component.Close {...props} />
}

const hidden = ':is([data-starting-style], [data-ending-style])'
const still = '@media (prefers-reduced-motion: reduce)'

// ported from radix themes' base-dialog.css. radix animates with keyframes;
// here base ui's starting and ending styles drive transitions instead
const styles = stylex.create({
  backdrop: {
    backgroundColor: 'var(--overlay)',
    inset: 0,
    opacity: {
      [hidden]: 0,
      default: 1,
    },
    position: 'fixed',
    transitionDuration: {
      ':is([data-ending-style])': '160ms',
      [still]: '0s',
      default: '200ms',
    },
    transitionProperty: 'opacity',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  content: {
    backgroundColor: 'var(--panel-background)',
    boxShadow: 'var(--dialog-shadow)',
    boxSizing: 'border-box',
    color: 'var(--gray-12)',
    margin: 'auto',
    maxWidth: 600,
    opacity: {
      [hidden]: 0,
      default: 1,
    },
    outline: 'none',
    overflow: 'auto',
    padding: 'var(--dialog-content-padding)',
    position: 'relative',
    transform: {
      ':is([data-ending-style])': 'translateY(5px) scale(0.99)',
      ':is([data-starting-style])': 'translateY(5px) scale(0.97)',
      default: 'none',
    },
    transitionDuration: {
      ':is([data-ending-style])': '100ms',
      [still]: '0s',
      default: '200ms',
    },
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    width: '100%',
    zIndex: 1,
  },
  description: {
    fontSize: 'var(--text-base)',
    lineHeight: 'var(--text-base--line-height)',
    margin: 0,
  },
  // keeps the dialog off the edges of the screen, and scrolls with it when
  // the dialog is taller than the screen
  padding: {
    flexGrow: 1,
    margin: 'auto',
    paddingBlockEnd: 'max(calc(var(--spacing) * 8), 6vh)',
    paddingBlockStart: 'calc(var(--spacing) * 8)',
    paddingInline: 'calc(var(--spacing) * 4)',
  },
  start: {
    marginBlockStart: 0,
  },
  title: {
    fontSize: 'var(--text-xl)',
    fontWeight: '700',
    lineHeight: 'var(--text-xl--line-height)',
    margin: 0,
    marginBlockEnd: 'calc(var(--spacing) * 3)',
  },
  viewport: {
    display: 'flex',
    inset: 0,
    overflow: 'auto',
    position: 'fixed',
  },
})

const sizes = stylex.create({
  1: {
    '--dialog-content-padding': 'calc(var(--spacing) * 3)',
    borderRadius: 'var(--radius-xl)',
  },
  2: {
    '--dialog-content-padding': 'calc(var(--spacing) * 4)',
    borderRadius: 'var(--radius-xl)',
  },
  3: {
    '--dialog-content-padding': 'calc(var(--spacing) * 6)',
    borderRadius: 'var(--radius-2xl)',
  },
  4: {
    '--dialog-content-padding': 'calc(var(--spacing) * 8)',
    borderRadius: 'var(--radius-2xl)',
  },
})
