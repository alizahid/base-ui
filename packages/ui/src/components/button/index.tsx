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
  color?: ColorToken
  disabled?: boolean
  loading?: boolean
  radius?: RadiusToken
  size?: '1' | '2' | '3' | '4'
  style?: CSSProperties
  variant?: 'solid' | 'soft' | 'surface' | 'outline' | 'ghost'
}

export function ButtonBase({
  children,
  className,
  color,
  disabled,
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
          sizes[size],
          radius && radii[radius],
          xstyle,
        ),
        className,
        style,
      )}
    >
      {children}

      {loading ? (
        <div {...stylex.props(styles.loading)}>
          <Spinner size={size} />
        </div>
      ) : null}
    </Component>
  )
}

export const Button: (props: ButtonProps) => ReactNode = ButtonBase

const styles = stylex.create({
  loading: {
    alignItems: 'center',
    backgroundColor: 'var(--accent-5)',
    cursor: 'wait',
    display: 'flex',
    inset: 0,
    justifyContent: 'center',
    position: 'absolute',
  },
  main: {
    alignItems: 'center',
    backgroundColor: {
      ':not(:disabled):active': 'var(--background-active)',
      ':not(:disabled):hover:not(:active)': 'var(--background-hover)',
      default: 'var(--background)',
    },
    boxShadow: 'inset 0 0 0 1px var(--border)',
    color: 'var(--color)',
    cursor: {
      ':disabled': 'not-allowed',
      default: 'pointer',
    },
    display: 'flex',
    filter: {
      ':disabled': 'grayscale(1)',
    },
    flexDirection: 'row',
    fontWeight: '500',
    justifyContent: 'center',
    outline: {
      ':focus-visible': '2px solid var(--accent-8)',
      default: 'none',
    },
    outlineOffset: -1,
    overflow: 'hidden',
    position: 'relative',
  },
})

const variants = stylex.create({
  ghost: {
    '--background': 'transparent',
    '--background-active': 'var(--accent-4)',
    '--background-hover': 'var(--accent-3)',
    '--border': 'transparent',
    '--color': 'var(--accent-11)',
  },
  outline: {
    '--background': 'transparent',
    '--background-active': 'var(--accent-3)',
    '--background-hover': 'var(--accent-2)',
    '--border': 'var(--accent-7)',
    '--color': 'var(--accent-11)',
  },
  soft: {
    '--background': 'var(--accent-3)',
    '--background-active': 'var(--accent-5)',
    '--background-hover': 'var(--accent-4)',
    '--border': 'transparent',
    '--color': 'var(--accent-11)',
  },
  solid: {
    '--background': 'var(--accent-9)',
    '--background-active': 'var(--accent-10)',
    '--background-hover': 'var(--accent-10)',
    '--border': 'transparent',
    '--color': 'var(--accent-contrast)',
    filter: {
      ':disabled': 'grayscale(1)',
      ':not(:disabled):active': 'brightness(0.92) saturate(1.1)',
    },
    outlineOffset: 2,
  },
  surface: {
    '--background': 'var(--accent-2)',
    '--background-active': 'var(--accent-4)',
    '--background-hover': 'var(--accent-3)',
    '--border': 'var(--accent-7)',
    '--color': 'var(--accent-11)',
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
