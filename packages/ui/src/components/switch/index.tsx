import {
  Switch as Component,
  type SwitchRootProps as ComponentProps,
} from '@base-ui/react/switch'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { type RadiusToken } from '../../lib/radii.js'
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
const active = ':is(:active:not([data-disabled]))'
const checkedIdle = ':is([data-checked]:not(:active, [data-disabled]))'
const checkedActive = ':is([data-checked]:active:not([data-disabled]))'
const checkedEnabled = ':is([data-checked]:not([data-disabled]))'

// ported from radix themes' switch.css, with solid colors in place of alpha
// ones. the track is one wide gradient that slides behind the thumb
const styles = stylex.create({
  main: {
    '--switch-width': 'calc(var(--switch-height) * 1.75)',
    alignItems: 'center',
    backgroundColor: {
      [active]: 'var(--switch-color-active)',
      [checkedIdle]: 'var(--switch-color-checked)',
      [disabled]: 'var(--switch-color-disabled)',
      default: 'var(--switch-color)',
    },
    backgroundImage: {
      [disabled]: 'none',
      default: 'var(--switch-image)',
    },
    backgroundPositionX: {
      [checked]: '0%',
      default: '100%',
    },
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'calc(var(--switch-width) * 2 + var(--switch-height)) 100%',
    borderRadius: 'var(--switch-radius, calc(infinity * 1px))',
    boxShadow: {
      [disabled]: 'var(--switch-shadow-disabled)',
      default: 'var(--switch-shadow)',
    },
    cursor: {
      [disabled]: 'not-allowed',
      default: 'pointer',
    },
    display: 'inline-flex',
    filter: {
      [checkedActive]: 'var(--switch-filter-active)',
    },
    flexShrink: 0,
    height: 'var(--switch-height)',
    mixBlendMode: {
      [disabled]: 'var(--switch-disabled-blend-mode)',
    },
    outline: {
      ':focus-visible': '2px solid var(--accent-8)',
      default: 'none',
    },
    outlineOffset: 2,
    transitionDuration: {
      [active]: '30ms',
      [checkedIdle]: '160ms, 140ms, 140ms, 140ms',
      default: '120ms, 140ms, 140ms, 140ms',
    },
    transitionProperty:
      'background-position, background-color, box-shadow, filter',
    transitionTimingFunction: 'linear, ease-in-out, ease-in-out, ease-in-out',
    verticalAlign: 'top',
    width: 'var(--switch-width)',
  },
  // moved with a logical margin rather than a transform, so it travels the
  // right way in rtl
  thumb: {
    backgroundColor: {
      [disabled]: 'var(--gray-2)',
      default: 'white',
    },
    // the track's radius less the 1px inset, as in radix
    borderRadius:
      'max(0px, calc(var(--switch-radius, calc(infinity * 1px)) - 1px))',
    boxShadow: {
      [checkedEnabled]: 'var(--switch-thumb-shadow-checked)',
      [disabled]: '0 0 0 1px var(--gray-3), 0 1px 3px rgb(0 0 0 / 0.05)',
      default: 'var(--switch-thumb-shadow)',
    },
    height: 'calc(var(--switch-height) - 2px)',
    marginInlineStart: {
      [checked]: 'calc(var(--switch-width) - var(--switch-height) + 1px)',
      default: 1,
    },
    transitionDuration: {
      [disabled]: '0s',
      default: '140ms',
    },
    transitionProperty: 'margin-inline-start, box-shadow',
    transitionTimingFunction:
      'cubic-bezier(0.45, 0.05, 0.55, 0.95), ease-in-out',
    width: 'calc(var(--switch-height) - 2px)',
  },
})

// variants only set variables, the main and thumb styles decide where they apply
const variants = stylex.create({
  soft: {
    '--switch-color': 'var(--gray-3)',
    '--switch-color-active': 'var(--gray-4)',
    '--switch-color-checked': 'transparent',
    '--switch-color-disabled': 'var(--gray-4)',
    '--switch-filter-active': 'none',
    '--switch-image':
      'linear-gradient(to right, var(--accent-6) 40%, var(--gray-3) 60%)',
    '--switch-shadow': 'none',
    '--switch-shadow-disabled': 'none',
    '--switch-thumb-shadow':
      '0 0 0 1px rgb(0 0 0 / 0.05), 0 1px 3px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.05)',
    '--switch-thumb-shadow-checked':
      '0 0 0 1px rgb(0 0 0 / 0.05), 0 1px 3px rgb(0 0 0 / 0.1)',
  },
  surface: {
    '--switch-color': 'var(--gray-3)',
    '--switch-color-active': 'var(--gray-4)',
    '--switch-color-checked': 'var(--gray-3)',
    '--switch-color-disabled': 'var(--gray-3)',
    '--switch-filter-active': 'var(--switch-active-filter)',
    '--switch-image':
      'linear-gradient(to right, var(--accent-9) 40%, transparent 60%)',
    '--switch-shadow': 'inset 0 0 0 1px var(--gray-5)',
    '--switch-shadow-disabled': 'inset 0 0 0 1px var(--gray-3)',
    '--switch-thumb-shadow':
      '0 0 1px 1px rgb(0 0 0 / 0.1), 0 1px 1px rgb(0 0 0 / 0.05), 0 2px 4px -1px rgb(0 0 0 / 0.05)',
    '--switch-thumb-shadow-checked':
      '0 1px 3px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.05), 0 0 0 1px rgb(0 0 0 / 0.05), -1px 0 1px rgb(0 0 0 / 0.1)',
  },
})

// a dark overlay over the checked half of the track; transparent in dark mode
const contrast = stylex.create({
  soft: {
    '--switch-filter-active': 'var(--switch-high-contrast-active-filter)',
    '--switch-image':
      'linear-gradient(to right, var(--switch-high-contrast-overlay) 40%, transparent 60%), linear-gradient(to right, var(--accent-8) 40%, var(--gray-3) 60%)',
  },
  surface: {
    '--switch-filter-active': 'var(--switch-high-contrast-active-filter)',
    '--switch-image':
      'linear-gradient(to right, var(--switch-high-contrast-overlay) 40%, transparent 60%), linear-gradient(to right, var(--accent-9) 40%, transparent 60%)',
    '--switch-thumb-shadow-checked':
      '0 1px 3px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.05), 0 0 0 1px rgb(0 0 0 / 0.1), -1px 0 1px rgb(0 0 0 / 0.1)',
  },
})

const sizes = stylex.create({
  1: {
    '--switch-height': 'calc(var(--spacing) * 4)',
  },
  2: {
    '--switch-height': 'calc(var(--spacing) * 5)',
  },
  3: {
    '--switch-height': 'calc(var(--spacing) * 6)',
  },
})

// a variable rather than the shared radii, so the thumb can derive its own
// biome-ignore assist/source/useSortedKeys: go away
const radii = stylex.create({
  xs: {
    '--switch-radius': 'var(--radius-xs)',
  },
  sm: {
    '--switch-radius': 'var(--radius-sm)',
  },
  md: {
    '--switch-radius': 'var(--radius-md)',
  },
  lg: {
    '--switch-radius': 'var(--radius-lg)',
  },
  xl: {
    '--switch-radius': 'var(--radius-xl)',
  },
  '2xl': {
    '--switch-radius': 'var(--radius-2xl)',
  },
  '3xl': {
    '--switch-radius': 'var(--radius-3xl)',
  },
  '4xl': {
    '--switch-radius': 'var(--radius-4xl)',
  },
  none: {
    '--switch-radius': '0px',
  },
  full: {
    '--switch-radius': 'calc(infinity * 1px)',
  },
})
