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
import { Spinner } from '../spinner/index.js'

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
      {loading ? (
        <>
          {/* keeps the button's width while the spinner shows */}
          <span {...stylex.props(styles.hidden)}>{children}</span>

          <span {...stylex.props(styles.loading)}>
            <Spinner size={size} />
          </span>
        </>
      ) : (
        children
      )}
    </Component>
  )
}

// the same component, typed without `xstyle`
export const Button: (props: ButtonProps) => ReactNode = ButtonBase

// stylex doesn't order these against each other, so they must not overlap.
// data-disabled rather than :disabled so links rendered as buttons match too
const off = ':is([data-disabled])'
const hover = ':is(:hover:not(:active, [data-disabled]))'
const active = ':is(:active:not([data-disabled]))'
const pressed = ':is(:is(:hover, :active):not([data-disabled]))'

// ported from radix themes' base-button.css, with solid colors in place of
// alpha ones
const styles = stylex.create({
  hidden: {
    display: 'contents',
    visibility: 'hidden',
  },
  loading: {
    alignItems: 'center',
    display: 'flex',
    inset: 0,
    justifyContent: 'center',
    position: 'absolute',
  },
  main: {
    alignItems: 'center',
    backgroundColor: {
      [active]: 'var(--button-background-active)',
      [off]: 'var(--button-background-disabled)',
      [hover]: 'var(--button-background-hover)',
      default: 'var(--button-background)',
    },
    boxShadow: {
      [off]: 'var(--button-shadow-disabled, none)',
      [pressed]: 'var(--button-shadow-hover, var(--button-shadow, none))',
      default: 'var(--button-shadow, none)',
    },
    color: {
      [off]: 'var(--gray-8)',
      default: 'var(--button-color)',
    },
    cursor: {
      [off]: 'not-allowed',
      default: 'pointer',
    },
    display: 'inline-flex',
    filter: {
      [active]: 'var(--button-filter-active, none)',
      [hover]: 'var(--button-filter-hover, none)',
    },
    flexShrink: 0,
    fontWeight: '500',
    justifyContent: 'center',
    outline: {
      ':focus-visible': '2px solid var(--accent-8)',
      default: 'none',
    },
    outlineOffset: 'var(--button-outline-offset, -1px)',
    position: 'relative',
    textAlign: 'center',
    userSelect: 'none',
    verticalAlign: 'top',
  },
})

// variants only set variables, the main style decides where they apply
const variants = stylex.create({
  ghost: {
    '--button-background': 'transparent',
    '--button-background-active': 'var(--accent-4)',
    '--button-background-disabled': 'transparent',
    '--button-background-hover': 'var(--accent-3)',
    '--button-color': 'var(--accent-11)',
  },
  outline: {
    '--button-background': 'transparent',
    '--button-background-active': 'var(--accent-3)',
    '--button-background-disabled': 'transparent',
    '--button-background-hover': 'var(--accent-2)',
    '--button-color': 'var(--accent-11)',
    '--button-shadow': 'inset 0 0 0 1px var(--accent-8)',
    '--button-shadow-disabled': 'inset 0 0 0 1px var(--gray-7)',
  },
  soft: {
    '--button-background': 'var(--accent-3)',
    '--button-background-active': 'var(--accent-5)',
    '--button-background-disabled': 'var(--gray-3)',
    '--button-background-hover': 'var(--accent-4)',
    '--button-color': 'var(--accent-11)',
  },
  solid: {
    '--button-background': 'var(--accent-9)',
    '--button-background-active': 'var(--accent-10)',
    '--button-background-disabled': 'var(--gray-3)',
    '--button-background-hover': 'var(--accent-10)',
    '--button-color': 'var(--accent-contrast)',
    '--button-filter-active': 'var(--button-solid-active-filter)',
    '--button-outline-offset': '2px',
  },
  surface: {
    '--button-background': 'var(--accent-2)',
    '--button-background-active': 'var(--accent-3)',
    '--button-background-disabled': 'var(--gray-2)',
    '--button-background-hover': 'var(--accent-2)',
    '--button-color': 'var(--accent-11)',
    '--button-shadow': 'inset 0 0 0 1px var(--accent-7)',
    '--button-shadow-disabled': 'inset 0 0 0 1px var(--gray-6)',
    '--button-shadow-hover': 'inset 0 0 0 1px var(--accent-8)',
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
      'inset 0 0 0 1px var(--accent-7), inset 0 0 0 1px var(--gray-11)',
  },
  soft: {
    '--button-color': 'var(--accent-12)',
  },
  solid: {
    '--button-background': 'var(--accent-12)',
    '--button-background-active': 'var(--accent-12)',
    '--button-background-hover': 'var(--accent-12)',
    '--button-color': 'var(--gray-1)',
    '--button-filter-active': 'var(--button-high-contrast-active-filter)',
    '--button-filter-hover': 'var(--button-high-contrast-hover-filter)',
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
