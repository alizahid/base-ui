import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { type ColorToken } from '#lib/colors.js'
import { type RadiusToken, radii } from '#lib/radii.js'
import { merge } from '#lib/stylex.js'

export type BadgeProps = Omit<ComponentProps<'span'>, 'color'> & {
  color?: ColorToken | 'gray'
  highContrast?: boolean
  radius?: RadiusToken
  size?: '1' | '2' | '3'
  variant?: 'solid' | 'soft' | 'surface' | 'outline'
}

export function Badge({
  className,
  color,
  highContrast,
  radius,
  size = '1',
  style,
  variant = 'soft',
  ...props
}: BadgeProps) {
  return (
    <span
      data-accent={color}
      {...props}
      {...merge(
        stylex.props(
          styles.main,
          variants[variant],
          highContrast && contrast[variant],
          sizes[size],
          radius && radii[radius],
          radius === 'full' && styles.full,
        ),
        className,
        style,
      )}
    />
  )
}

// ported from radix themes' badge.css, with a tighter gap and extra inline
// padding on a pill. trimming the padding beside an icon is left to the
// consumer's className
const styles = stylex.create({
  // rounded ends cut into the corners, so a pill gets a little more room
  full: {
    paddingInline: 'calc(var(--badge-padding) + 2px)',
  },
  main: {
    alignItems: 'center',
    backgroundColor: 'var(--badge-background)',
    boxShadow: 'var(--badge-shadow)',
    color: 'var(--badge-color)',
    display: 'inline-flex',
    flexShrink: 0,
    fontWeight: '500',
    // not stretched by a flex or grid parent
    height: 'fit-content',
    paddingInline: 'var(--badge-padding)',
    whiteSpace: 'nowrap',
  },
})

// variants only set variables, the main style decides where they apply
const variants = stylex.create({
  outline: {
    '--badge-background': 'transparent',
    '--badge-color': 'var(--accent-a11)',
    '--badge-shadow': 'inset 0 0 0 1px var(--accent-a8)',
  },
  soft: {
    '--badge-background': 'var(--accent-a3)',
    '--badge-color': 'var(--accent-a11)',
    '--badge-shadow': 'none',
  },
  solid: {
    '--badge-background': 'var(--accent-9)',
    '--badge-color': 'var(--accent-contrast)',
    '--badge-shadow': 'none',
  },
  surface: {
    '--badge-background': 'var(--accent-surface)',
    '--badge-color': 'var(--accent-a11)',
    '--badge-shadow': 'inset 0 0 0 1px var(--accent-a6)',
  },
})

const contrast = stylex.create({
  outline: {
    '--badge-color': 'var(--accent-12)',
    '--badge-shadow':
      'inset 0 0 0 1px var(--accent-a7), inset 0 0 0 1px var(--gray-a11)',
  },
  soft: {
    '--badge-color': 'var(--accent-12)',
  },
  solid: {
    '--badge-background': 'var(--accent-12)',
    '--badge-color': 'var(--accent-1)',
  },
  surface: {
    '--badge-color': 'var(--accent-12)',
  },
})

const sizes = stylex.create({
  1: {
    '--badge-padding': 'calc(var(--ui-spacing) * 1.5)',
    borderRadius: 'var(--ui-radius-xs)',
    fontSize: 'var(--ui-text-xs)',
    gap: 'var(--ui-spacing)',
    lineHeight: 'var(--ui-text-xs--line-height)',
    paddingBlock: 'calc(var(--ui-spacing) * 0.5)',
  },
  2: {
    '--badge-padding': 'calc(var(--ui-spacing) * 2)',
    borderRadius: 'var(--ui-radius-sm)',
    fontSize: 'var(--ui-text-xs)',
    gap: 'var(--ui-spacing)',
    lineHeight: 'var(--ui-text-xs--line-height)',
    paddingBlock: 'var(--ui-spacing)',
  },
  3: {
    '--badge-padding': 'calc(var(--ui-spacing) * 2.5)',
    borderRadius: 'var(--ui-radius-sm)',
    fontSize: 'var(--ui-text-sm)',
    gap: 'calc(var(--ui-spacing) * 1.5)',
    lineHeight: 'var(--ui-text-sm--line-height)',
    paddingBlock: 'var(--ui-spacing)',
  },
})
