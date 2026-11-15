import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { type RadiusToken, radii } from '../../lib/radii.js'
import { merge } from '../../lib/stylex.js'

export type CalloutRootProps = Omit<ComponentProps<'div'>, 'color'> & {
  color?: ColorToken | 'gray'
  highContrast?: boolean
  radius?: RadiusToken
  size?: '1' | '2' | '3'
  variant?: 'soft' | 'surface' | 'outline'
}

// an icon in the first column, everything else in the second. that placement
// is a rule in theme.css, as stylex can't target children
export function Root({
  className,
  color,
  highContrast,
  radius,
  size = '2',
  style,
  variant = 'soft',
  ...props
}: CalloutRootProps) {
  return (
    <div
      data-accent={color}
      data-callout=""
      {...props}
      {...merge(
        stylex.props(
          styles.main,
          variants[variant],
          highContrast && styles.contrast,
          sizes[size],
          radius && radii[radius],
        ),
        className,
        style,
      )}
    />
  )
}

// ported from radix themes' callout.css
const styles = stylex.create({
  contrast: {
    color: 'var(--accent-12)',
  },
  main: {
    alignItems: 'flex-start',
    color: 'var(--accent-a11)',
    display: 'grid',
    justifyContent: 'flex-start',
    textAlign: 'start',
  },
})

const variants = stylex.create({
  outline: {
    boxShadow: 'inset 0 0 0 1px var(--accent-a7)',
  },
  soft: {
    backgroundColor: 'var(--accent-a3)',
  },
  surface: {
    backgroundColor: 'var(--accent-a2)',
    boxShadow: 'inset 0 0 0 1px var(--accent-a6)',
  },
})

const sizes = stylex.create({
  1: {
    borderRadius: 'var(--radius-md)',
    columnGap: 'calc(var(--spacing) * 2)',
    fontSize: 'var(--text-sm)',
    lineHeight: 'var(--text-sm--line-height)',
    padding: 'calc(var(--spacing) * 3)',
    rowGap: 'calc(var(--spacing) * 2)',
  },
  2: {
    borderRadius: 'var(--radius-lg)',
    columnGap: 'calc(var(--spacing) * 3)',
    fontSize: 'var(--text-sm)',
    lineHeight: 'var(--text-sm--line-height)',
    padding: 'calc(var(--spacing) * 4)',
    rowGap: 'calc(var(--spacing) * 2)',
  },
  3: {
    borderRadius: 'var(--radius-xl)',
    columnGap: 'calc(var(--spacing) * 4)',
    fontSize: 'var(--text-base)',
    lineHeight: 'var(--text-base--line-height)',
    padding: 'calc(var(--spacing) * 6)',
    rowGap: 'calc(var(--spacing) * 3)',
  },
})
