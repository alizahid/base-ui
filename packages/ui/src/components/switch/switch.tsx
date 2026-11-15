import {
  Switch as Component,
  type SwitchRootProps as ComponentProps,
} from '@base-ui/react/switch'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { type RadiusToken, radii } from '../../lib/radii.js'
import { merge } from '../../lib/stylex.js'

export type SwitchProps = ComponentProps & {
  className?: string
  color?: ColorToken | 'gray'
  highContrast?: boolean
  radius?: RadiusToken
  size?: '1' | '2' | '3'
  style?: CSSProperties
  variant?: 'surface' | 'soft'
}

export function Switch({
  className,
  color,
  highContrast,
  radius,
  size = '2',
  style,
  variant = 'surface',
  ...props
}: SwitchProps) {
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
      <Component.Thumb {...stylex.props(styles.thumb)} />
    </Component.Root>
  )
}

// stylex doesn't order these against each other, so wherever one property
// uses more than one of them they must not overlap
const checked = ':is([data-checked])'
const disabled = ':is([data-disabled])'
const active = ':is(:active:not([data-checked], [data-disabled]))'
const checkedIdle = ':is([data-checked]:not(:active, [data-disabled]))'
const checkedActive = ':is([data-checked]:active:not([data-disabled]))'
const still = '@media (prefers-reduced-motion: reduce)'

// radix themes' switch, with its sliding gradient track, filters and stacked
// thumb shadows reduced to a colour fade and a thumb that moves on the
// compositor
const styles = stylex.create({
  main: {
    // the thumb travels the other way in rtl
    '--switch-dir': {
      ':dir(rtl)': '-1',
      default: '1',
    },
    alignItems: 'center',
    backgroundColor: {
      [active]: 'var(--switch-color-active)',
      [checkedActive]: 'var(--switch-color-checked-active)',
      [checkedIdle]: 'var(--switch-color-checked)',
      default: 'var(--gray-a3)',
    },
    borderRadius: 'calc(infinity * 1px)',
    boxShadow: {
      [disabled]: 'var(--switch-shadow-disabled, none)',
      default: 'var(--switch-shadow, none)',
    },
    cursor: {
      [disabled]: 'not-allowed',
      default: 'pointer',
    },
    display: 'inline-flex',
    flexShrink: 0,
    height: 'var(--switch-height)',
    outline: {
      ':focus-visible': '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: 2,
    transitionDuration: {
      [still]: '0s',
      default: '150ms',
    },
    transitionProperty: 'background-color',
    verticalAlign: 'top',
    width: 'var(--switch-width)',
  },
  thumb: {
    backgroundColor: {
      [disabled]: 'var(--gray-2)',
      default: 'white',
    },
    borderRadius: 'inherit',
    boxShadow: {
      [disabled]: '0 0 0 1px var(--gray-a2), 0 1px 3px var(--black-a1)',
      default: '0 0 0 1px var(--black-a2), 0 1px 3px var(--black-a2)',
    },
    height: 'calc(var(--switch-height) - 2px)',
    marginInlineStart: 1,
    transitionDuration: {
      [still]: '0s',
      default: '150ms',
    },
    transitionProperty: 'translate',
    translate: {
      [checked]:
        'calc((var(--switch-width) - var(--switch-height)) * var(--switch-dir)) 0',
    },
    width: 'calc(var(--switch-height) - 2px)',
  },
})

// variants only set variables, the main style decides where they apply
const variants = stylex.create({
  soft: {
    '--switch-color-active': 'var(--gray-a4)',
    '--switch-color-checked': 'var(--accent-a6)',
    '--switch-color-checked-active': 'var(--accent-a7)',
  },
  surface: {
    '--switch-color-active': 'var(--gray-a4)',
    '--switch-color-checked': 'var(--accent-track)',
    '--switch-color-checked-active':
      'color-mix(in oklab, var(--accent-track), var(--accent-12) 12%)',
    '--switch-shadow': 'inset 0 0 0 1px var(--gray-a5)',
    '--switch-shadow-disabled': 'inset 0 0 0 1px var(--gray-a3)',
  },
})

// a darker checked track; no change in dark mode
const contrast = stylex.create({
  soft: {
    '--switch-color-checked':
      'color-mix(in oklab, var(--accent-a8), black var(--high-contrast-shade))',
    '--switch-color-checked-active':
      'color-mix(in oklab, var(--accent-a9), black var(--high-contrast-shade))',
  },
  surface: {
    '--switch-color-checked':
      'color-mix(in oklab, var(--accent-track), black var(--high-contrast-shade))',
    '--switch-color-checked-active':
      'color-mix(in oklab, var(--accent-track), black var(--high-contrast-shade))',
  },
})

const sizes = stylex.create({
  1: {
    '--switch-height': 'calc(var(--spacing) * 4)',
    '--switch-width': 'calc(var(--spacing) * 7)',
  },
  2: {
    '--switch-height': 'calc(var(--spacing) * 5)',
    '--switch-width': 'calc(var(--spacing) * 9)',
  },
  3: {
    '--switch-height': 'calc(var(--spacing) * 6)',
    '--switch-width': 'calc(var(--spacing) * 10)',
  },
})
