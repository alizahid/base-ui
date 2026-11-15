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

// the root is a size container, so the fallback's font size (in cqmin) scales
// with whatever size the avatar is
const styles = stylex.create({
  double: {
    fontSize: '40cqmin',
  },
  // the variant's fill is on the fallback, not the root, so it never shows
  // behind an image with transparency
  fallback: {
    alignItems: 'center',
    backgroundColor: 'var(--avatar-background)',
    color: 'var(--avatar-color)',
    display: 'flex',
    fontStyle: 'normal',
    inset: 0,
    justifyContent: 'center',
    position: 'absolute',
  },
  image: {
    height: '100%',
    inset: 0,
    objectFit: 'cover',
    position: 'absolute',
    width: '100%',
  },
  main: {
    aspectRatio: '1',
    containerType: 'size',
    display: 'inline-block',
    // keeps its square in a flex row, as in radix
    flexShrink: 0,
    fontWeight: '500',
    overflow: 'hidden',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'middle',
  },
  single: {
    fontSize: '60cqmin',
  },
  // trims the line box down to the letters, so they sit dead centre
  text: {
    textBoxEdge: 'cap alphabetic',
    textBoxTrim: 'trim-both',
  },
})

// variants only set variables, the main style decides where they apply
const variants = stylex.create({
  soft: {
    '--avatar-background': 'var(--accent-a3)',
    '--avatar-color': 'var(--accent-a11)',
  },
  solid: {
    '--avatar-background': 'var(--accent-9)',
    '--avatar-color': 'var(--accent-contrast)',
  },
})

const contrast = stylex.create({
  soft: {
    '--avatar-color': 'var(--accent-12)',
  },
  solid: {
    '--avatar-background': 'var(--accent-12)',
    '--avatar-color': 'var(--accent-1)',
  },
})

const sizes = stylex.create({
  1: {
    borderRadius: 'var(--ui-radius-xs)',
    width: 'calc(var(--ui-spacing) * 6)',
  },
  2: {
    borderRadius: 'var(--ui-radius-sm)',
    width: 'calc(var(--ui-spacing) * 8)',
  },
  3: {
    borderRadius: 'var(--ui-radius-md)',
    width: 'calc(var(--ui-spacing) * 10)',
  },
  4: {
    borderRadius: 'var(--ui-radius-lg)',
    width: 'calc(var(--ui-spacing) * 12)',
  },
  5: {
    borderRadius: 'var(--ui-radius-xl)',
    width: 'calc(var(--ui-spacing) * 16)',
  },
  6: {
    borderRadius: 'var(--ui-radius-2xl)',
    width: 'calc(var(--ui-spacing) * 20)',
  },
  7: {
    borderRadius: 'var(--ui-radius-3xl)',
    width: 'calc(var(--ui-spacing) * 24)',
  },
  8: {
    borderRadius: 'var(--ui-radius-4xl)',
    width: 'calc(var(--ui-spacing) * 32)',
  },
  9: {
    borderRadius: 'calc(infinity * 1px)',
    width: 'calc(var(--ui-spacing) * 40)',
  },
})
