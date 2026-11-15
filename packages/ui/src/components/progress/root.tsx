import {
  Progress as Component,
  type ProgressRootProps as ComponentProps,
} from '@base-ui/react/progress'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '#lib/colors.js'
import { type RadiusToken, radii } from '#lib/radii.js'
import { merge } from '#lib/stylex.js'

export type ProgressRootProps = Omit<
  ComponentProps,
  'className' | 'color' | 'style' | 'value'
> & {
  className?: string
  color?: ColorToken | 'gray'
  highContrast?: boolean
  radius?: RadiusToken
  size?: '1' | '2' | '3'
  style?: CSSProperties
  // leave it out, or pass null, for an indeterminate bar
  value?: number | null
  variant?: 'surface' | 'soft'
}

// the bar comes after the children, so a Label and a Value sit above it
export function Root({
  children,
  className,
  color,
  highContrast,
  radius,
  size = '2',
  style,
  value = null,
  variant = 'surface',
  ...props
}: ProgressRootProps) {
  return (
    <Component.Root
      data-accent={color}
      value={value}
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
    >
      {children}

      <Component.Track {...stylex.props(styles.track)}>
        <Component.Indicator {...stylex.props(styles.indicator)} />
      </Component.Track>
    </Component.Root>
  )
}

const indeterminate = ':is([data-indeterminate])'
const still = '@media (prefers-reduced-motion: reduce)'

// the indeterminate bar creeps towards full over --progress-duration, then
// pulses until it is given a value
const grow = stylex.keyframes({
  '0%': {
    transform: 'scaleX(0.01)',
  },
  '20%': {
    transform: 'scaleX(0.1)',
  },
  '30%': {
    transform: 'scaleX(0.6)',
  },
  '40%, 50%': {
    transform: 'scaleX(0.9)',
  },
  '100%': {
    transform: 'scaleX(1)',
  },
})

// opacity rather than colour, so the pulse doesn't repaint
const fade = stylex.keyframes({
  '100%': {
    opacity: 'var(--progress-pulse)',
  },
})

const pulse = stylex.keyframes({
  '0%': {
    opacity: 'var(--progress-pulse)',
  },
  '100%': {
    opacity: 'var(--progress-pulse-end)',
  },
})

// ported from radix themes' progress.css
const styles = stylex.create({
  contrast: {
    '--progress-color': 'var(--accent-12)',
    '--progress-pulse': '0.8',
    '--progress-pulse-end': '1',
  },
  // base ui sets the width for a known value
  indicator: {
    animationDelay: {
      [indeterminate]:
        '0s, calc(var(--progress-duration) + 5s), calc(var(--progress-duration) + 7.5s)',
    },
    animationDirection: {
      [indeterminate]: 'normal, normal, alternate',
    },
    animationDuration: {
      [indeterminate]: 'var(--progress-duration), 2.5s, 5s',
    },
    animationFillMode: {
      [indeterminate]: 'both, none, none',
    },
    animationIterationCount: {
      [indeterminate]: '1, 1, infinite',
    },
    animationName: {
      [indeterminate]: {
        [still]: 'none',
        default: `${grow}, ${fade}, ${pulse}`,
      },
    },
    backgroundColor: 'var(--progress-color)',
    transformOrigin: {
      ':dir(rtl)': 'right center',
      default: 'left center',
    },
    transitionDuration: '150ms',
    transitionProperty: 'width',
    width: {
      [indeterminate]: '100%',
    },
  },
  main: {
    '--progress-duration': '5s',
    borderRadius: 'calc(infinity * 1px)',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    // the bar takes whatever height is left, so a height on the root makes
    // it taller
    gridTemplateRows: 'auto 1fr',
    width: '100%',
  },
  track: {
    // the border sits over the indicator
    '::after': {
      borderRadius: 'inherit',
      boxShadow: 'var(--progress-shadow, none)',
      content: '""',
      inset: 0,
      position: 'absolute',
    },
    backgroundColor: 'var(--progress-track)',
    borderRadius: 'inherit',
    // a flex row, so the indicator stretches to the track's height
    display: 'flex',
    gridColumn: '1 / -1',
    gridRow: 2,
    minHeight: 'var(--progress-height)',
    overflow: 'hidden',
    position: 'relative',
  },
})

// variants only set variables, the styles above decide where they apply
const variants = stylex.create({
  soft: {
    '--progress-color': 'var(--accent-8)',
    '--progress-pulse': '0.4',
    '--progress-pulse-end': '0.7',
    '--progress-track': 'var(--gray-a4)',
  },
  surface: {
    '--progress-color': 'var(--accent-track)',
    '--progress-pulse': '0.5',
    '--progress-pulse-end': '1',
    '--progress-shadow': 'inset 0 0 0 1px var(--gray-a4)',
    '--progress-track': 'var(--gray-a3)',
  },
})

const sizes = stylex.create({
  1: {
    '--progress-height': 'var(--ui-spacing)',
    fontSize: 'var(--ui-text-xs)',
    lineHeight: 'var(--ui-text-xs--line-height)',
  },
  2: {
    '--progress-height': 'calc(var(--ui-spacing) * 1.5)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
  3: {
    '--progress-height': 'calc(var(--ui-spacing) * 2)',
    fontSize: 'var(--ui-text-base)',
    lineHeight: 'var(--ui-text-base--line-height)',
  },
})
