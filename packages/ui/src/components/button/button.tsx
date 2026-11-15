'use client'

import {
  Button as Component,
  type ButtonProps as ComponentProps,
} from '@base-ui/react/button'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, type ReactNode } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { type RadiusToken, radii } from '../../lib/radii.js'
import { merge } from '../../lib/stylex.js'
import { Spinner } from '../spinner/spinner.js'

export type ButtonProps = ComponentProps & {
  className?: string
  color?: ColorToken | 'gray'
  disabled?: boolean
  highContrast?: boolean
  loading?: boolean
  radius?: RadiusToken
  size?: '1' | '2' | '3' | '4'
  style?: CSSProperties
  variant?: 'solid' | 'soft' | 'surface' | 'outline' | 'ghost'
}

// internal: Button plus `xstyle`, extra stylex styles for components built on
// it (IconButton). not exported from the package
export function ButtonBase({
  children,
  className,
  color,
  disabled,
  highContrast,
  loading,
  radius,
  size = '2',
  style,
  variant = 'solid',
  xstyle,
  ...props
}: ButtonProps & {
  xstyle?: stylex.StyleXStyles
}) {
  return (
    <Component
      data-accent={color}
      disabled={loading || disabled}
      {...props}
      {...merge(
        stylex.props(
          styles.main,
          variants[variant],
          highContrast && contrast[variant],
          sizes[size],
          radius && radii[radius],
          xstyle,
        ),
        className,
        style,
      )}
    >
      {/* keeps the button's width while the spinner shows */}
      <Spinner loading={Boolean(loading)} size={size}>
        {children}
      </Spinner>
    </Component>
  )
}

// the same component, typed without `xstyle`
export const Button: (props: ButtonProps) => ReactNode = ButtonBase

// stylex doesn't order these against each other, so they must not overlap.
// data-disabled rather than :disabled so links rendered as buttons match too.
// a button that has opened a popup keeps its hover look and ignores presses
const off = ':is([data-disabled])'
const open = ':is([data-popup-open]:not([data-disabled]))'
const hover = ':is(:hover:not(:active, [data-disabled], [data-popup-open]))'
const active = ':is(:active:not([data-disabled], [data-popup-open]))'

// ported from radix themes' base-button.css, with a pointer cursor and
// without the classic variant. hover styles only apply where hovering is
// possible, so they don't stick after a tap
const styles = stylex.create({
  main: {
    // the spinner is fully opaque inside a disabled or loading button
    '--spinner-opacity': {
      [off]: '1',
    },
    alignItems: 'center',
    backgroundColor: {
      [active]: 'var(--button-background-active)',
      [hover]: {
        '@media (hover: hover)': 'var(--button-background-hover)',
        default: null,
      },
      [off]: 'var(--button-background-disabled)',
      [open]: 'var(--button-background-hover)',
      default: 'var(--button-background)',
    },
    boxShadow: {
      [active]: 'var(--button-shadow-hover, var(--button-shadow, none))',
      [hover]: {
        '@media (hover: hover)':
          'var(--button-shadow-hover, var(--button-shadow, none))',
        default: null,
      },
      [off]: 'var(--button-shadow-disabled, none)',
      [open]: 'var(--button-shadow-hover, var(--button-shadow, none))',
      default: 'var(--button-shadow, none)',
    },
    color: {
      [off]: 'var(--gray-a8)',
      default: 'var(--button-color)',
    },
    cursor: {
      [off]: 'not-allowed',
      default: 'pointer',
    },
    display: 'inline-flex',
    flexShrink: 0,
    fontWeight: '500',
    justifyContent: 'center',
    outline: {
      ':focus-visible': '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: 'var(--button-outline-offset, -1px)',
    textAlign: 'center',
    userSelect: 'none',
    verticalAlign: 'top',
  },
})

// variants only set variables, the main style decides where they apply
const variants = stylex.create({
  ghost: {
    '--button-background': 'transparent',
    '--button-background-active': 'var(--accent-a4)',
    '--button-background-disabled': 'transparent',
    '--button-background-hover': 'var(--accent-a3)',
    '--button-color': 'var(--accent-a11)',
  },
  outline: {
    '--button-background': 'transparent',
    '--button-background-active': 'var(--accent-a3)',
    '--button-background-disabled': 'transparent',
    '--button-background-hover': 'var(--accent-a2)',
    '--button-color': 'var(--accent-a11)',
    '--button-shadow': 'inset 0 0 0 1px var(--accent-a8)',
    '--button-shadow-disabled': 'inset 0 0 0 1px var(--gray-a7)',
  },
  soft: {
    '--button-background': 'var(--accent-a3)',
    '--button-background-active': 'var(--accent-a5)',
    '--button-background-disabled': 'var(--gray-a3)',
    '--button-background-hover': 'var(--accent-a4)',
    '--button-color': 'var(--accent-a11)',
  },
  solid: {
    '--button-background': 'var(--accent-9)',
    '--button-background-active':
      'color-mix(in oklab, var(--accent-10), var(--accent-12) 12%)',
    '--button-background-disabled': 'var(--gray-a3)',
    '--button-background-hover': 'var(--accent-10)',
    '--button-color': 'var(--accent-contrast)',
    '--button-outline-offset': '2px',
  },
  surface: {
    '--button-background': 'var(--accent-surface)',
    '--button-background-active': 'var(--accent-a3)',
    '--button-background-disabled': 'var(--gray-a2)',
    '--button-background-hover': 'var(--accent-surface)',
    '--button-color': 'var(--accent-a11)',
    '--button-shadow': 'inset 0 0 0 1px var(--accent-a7)',
    '--button-shadow-disabled': 'inset 0 0 0 1px var(--gray-a6)',
    '--button-shadow-hover': 'inset 0 0 0 1px var(--accent-a8)',
  },
})

// what highContrast changes for each variant
const contrast = stylex.create({
  ghost: {
    '--button-color': 'var(--accent-12)',
  },
  outline: {
    '--button-color': 'var(--accent-12)',
    '--button-shadow':
      'inset 0 0 0 1px var(--accent-a7), inset 0 0 0 1px var(--gray-a11)',
  },
  soft: {
    '--button-color': 'var(--accent-12)',
  },
  solid: {
    '--button-background': 'var(--accent-12)',
    '--button-background-active':
      'color-mix(in oklab, var(--accent-12), var(--gray-1) 18%)',
    '--button-background-hover':
      'color-mix(in oklab, var(--accent-12), var(--gray-1) 10%)',
    '--button-color': 'var(--gray-1)',
  },
  surface: {
    '--button-color': 'var(--accent-12)',
  },
})

const sizes = stylex.create({
  1: {
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-xs)',
    gap: 'var(--spacing)',
    height: 'calc(var(--spacing) * 6)',
    lineHeight: 'var(--text-xs--line-height)',
    paddingInline: 'calc(var(--spacing) * 2)',
  },
  2: {
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--text-sm)',
    gap: 'calc(var(--spacing) * 2)',
    height: 'calc(var(--spacing) * 8)',
    lineHeight: 'var(--text-sm--line-height)',
    paddingInline: 'calc(var(--spacing) * 3)',
  },
  3: {
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--text-base)',
    gap: 'calc(var(--spacing) * 3)',
    height: 'calc(var(--spacing) * 10)',
    lineHeight: 'var(--text-base--line-height)',
    paddingInline: 'calc(var(--spacing) * 4)',
  },
  4: {
    borderRadius: 'var(--radius-xl)',
    fontSize: 'var(--text-lg)',
    gap: 'calc(var(--spacing) * 3)',
    height: 'calc(var(--spacing) * 12)',
    lineHeight: 'var(--text-lg--line-height)',
    paddingInline: 'calc(var(--spacing) * 6)',
  },
})
