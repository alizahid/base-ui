'use client'

import {
  Avatar as Component,
  type AvatarRootProps as ComponentProps,
} from '@base-ui/react/avatar'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { type RadiusToken, radii } from '../../lib/radii.js'
import { merge } from '../../lib/stylex.js'

export type AvatarProps = ComponentProps & {
  className?: string
  color?: ColorToken | 'gray'
  delay?: number
  fallback: string
  highContrast?: boolean
  radius?: RadiusToken
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  src?: string
  style?: CSSProperties
  variant?: 'solid' | 'soft'
}

export function Avatar({
  className,
  color,
  delay,
  fallback,
  highContrast,
  radius,
  size = '2',
  src,
  style,
  variant = 'solid',
  ...props
}: AvatarProps) {
  return (
    <Component.Root
      data-accent={color}
      {...props}
      {...merge(
        stylex.props(
          styles.main,
          variants[variant],
          highContrast && contrast[variant],
          sizes[size],
          radius && radii[radius],
        ),
        className,
        style,
      )}
    >
      <Component.Image {...stylex.props(styles.image)} src={src} />

      <Component.Fallback {...stylex.props(styles.fallback)} delay={delay}>
        <span
          {...stylex.props(
            fallback.length > 1 ? styles.double : styles.single,
            styles.text,
          )}
        >
          {fallback.toUpperCase()}
        </span>
      </Component.Fallback>
    </Component.Root>
  )
}

const styles = stylex.create({
  double: {
    fontSize: '40cqmin',
  },
  fallback: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    inset: 0,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  image: {
    height: '100%',
    inset: 0,
    objectFit: 'cover',
    position: 'absolute',
    width: '100%',
  },
  main: {
    backgroundColor: 'var(--background)',
    color: 'var(--color)',
    containerType: 'size',
    fontWeight: '500',
    overflow: 'hidden',
    position: 'relative',
  },
  single: {
    fontSize: '60cqmin',
  },
  text: {
    textBoxEdge: 'cap alphabetic',
    textBoxTrim: 'trim-both',
  },
})

const variants = stylex.create({
  soft: {
    '--background': 'var(--accent-3)',
    '--color': 'var(--accent-11)',
  },
  solid: {
    '--background': 'var(--accent-9)',
    '--color': 'var(--accent-contrast)',
  },
})

const contrast = stylex.create({
  soft: {
    '--color': 'var(--accent-12)',
  },
  solid: {
    '--background': 'var(--accent-12)',
    '--color': 'var(--gray-1)',
  },
})

const sizes = stylex.create({
  1: {
    borderRadius: 'var(--radius-xs)',
    height: 'calc(var(--spacing) * 6)',
    width: 'calc(var(--spacing) * 6)',
  },
  2: {
    borderRadius: 'var(--radius-sm)',
    height: 'calc(var(--spacing) * 8)',
    width: 'calc(var(--spacing) * 8)',
  },
  3: {
    borderRadius: 'var(--radius-md)',
    height: 'calc(var(--spacing) * 10)',
    width: 'calc(var(--spacing) * 10)',
  },
  4: {
    borderRadius: 'var(--radius-lg)',
    height: 'calc(var(--spacing) * 12)',
    width: 'calc(var(--spacing) * 12)',
  },
  5: {
    borderRadius: 'var(--radius-xl)',
    height: 'calc(var(--spacing) * 16)',
    width: 'calc(var(--spacing) * 16)',
  },
  6: {
    borderRadius: 'var(--radius-2xl)',
    height: 'calc(var(--spacing) * 20)',
    width: 'calc(var(--spacing) * 20)',
  },
  7: {
    borderRadius: 'var(--radius-3xl)',
    height: 'calc(var(--spacing) * 24)',
    width: 'calc(var(--spacing) * 24)',
  },
  8: {
    borderRadius: 'var(--radius-4xl)',
    height: 'calc(var(--spacing) * 32)',
    width: 'calc(var(--spacing) * 32)',
  },
  9: {
    borderRadius: 'calc(infinity * 1px)',
    height: 'calc(var(--spacing) * 40)',
    width: 'calc(var(--spacing) * 40)',
  },
})
