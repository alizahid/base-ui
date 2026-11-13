'use client'

import {
  Input as Component,
  type InputProps as ComponentProps,
} from '@base-ui/react/input'
import * as stylex from '@stylexjs/stylex'
import {
  type CSSProperties,
  type ComponentProps as ReactComponentProps,
} from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { type RadiusToken, radii } from '../../lib/radii.js'
import { merge } from '../../lib/stylex.js'

export type TextFieldRootProps = Omit<
  ComponentProps,
  'className' | 'color' | 'size' | 'style'
> & {
  className?: string
  color?: ColorToken
  radius?: RadiusToken
  size?: '1' | '2' | '3'
  style?: CSSProperties
  variant?: 'surface' | 'soft'
}

export function Root({
  children,
  className,
  color,
  radius,
  size = '2',
  style,
  variant = 'surface',
  ...props
}: TextFieldRootProps) {
  return (
    <label
      data-accent={color}
      {...merge(
        stylex.props(
          styles.main,
          variants[variant],
          sizes[size],
          radius && radii[radius],
        ),
        className,
        style,
      )}
    >
      <Component {...props} {...stylex.props(styles.input)} />

      {children}
    </label>
  )
}

export type TextFieldSlotProps = ReactComponentProps<'div'> & {
  side?: 'start' | 'end'
}

export function Slot({
  className,
  side = 'start',
  style,
  ...props
}: TextFieldSlotProps) {
  return (
    <div
      {...props}
      {...merge(
        stylex.props(styles.slot, side === 'start' && styles.start),
        className,
        style,
      )}
    />
  )
}

const styles = stylex.create({
  input: {
    '::placeholder': {
      color: 'var(--placeholder)',
      opacity: 1,
    },
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: 'inherit',
    cursor: {
      ':disabled': 'not-allowed',
      default: 'text',
    },
    flexGrow: 1,
    font: 'inherit',
    height: '100%',
    minWidth: 0,
    outline: 'none',
    padding: 0,
  },
  main: {
    alignItems: 'center',
    boxSizing: 'border-box',
    cursor: {
      ':has(input:disabled)': 'not-allowed',
      default: 'text',
    },
    display: 'flex',
    filter: {
      ':has(input:disabled)': 'grayscale(1)',
    },
    opacity: {
      ':has(input:disabled)': 0.6,
    },
    outline: {
      ':has(input:focus)': '2px solid var(--accent-8)',
      ':has(input[data-invalid]:focus)': '2px solid var(--red-8)',
      default: 'none',
    },
    outlineOffset: -1,
  },
  slot: {
    alignItems: 'center',
    color: 'var(--slot)',
    display: 'flex',
    flexShrink: 0,
    gap: 'inherit',
  },
  start: {
    order: -1,
  },
})

const variants = stylex.create({
  soft: {
    '--placeholder': 'color-mix(in oklab, var(--accent-11) 65%, transparent)',
    '--slot': 'var(--accent-11)',
    backgroundColor: {
      ':has(input[data-invalid])': 'var(--red-3)',
      default: 'var(--accent-3)',
    },
    color: 'var(--accent-12)',
  },
  surface: {
    '--placeholder': 'var(--gray-10)',
    '--slot': 'var(--gray-11)',
    backgroundColor: 'var(--gray-1)',
    boxShadow: {
      ':has(input[data-invalid])': 'inset 0 0 0 1px var(--red-8)',
      default: 'inset 0 0 0 1px var(--gray-7)',
    },
    color: 'var(--gray-12)',
  },
})

const sizes = stylex.create({
  1: {
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-xs)',
    gap: 'calc(var(--spacing) * 1.5)',
    height: 'calc(var(--spacing) * 6)',
    lineHeight: 'var(--text-xs--line-height)',
    paddingInline: 'calc(var(--spacing) * 1.5)',
  },
  2: {
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--text-sm)',
    gap: 'calc(var(--spacing) * 2)',
    height: 'calc(var(--spacing) * 8)',
    lineHeight: 'var(--text-sm--line-height)',
    paddingInline: 'calc(var(--spacing) * 2)',
  },
  3: {
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--text-base)',
    gap: 'calc(var(--spacing) * 3)',
    height: 'calc(var(--spacing) * 10)',
    lineHeight: 'var(--text-base--line-height)',
    paddingInline: 'calc(var(--spacing) * 3)',
  },
})
