'use client'

import { useRender } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'

import { merge } from '../../lib/stylex.js'

export type CardProps = useRender.ComponentProps<'div'> & {
  size?: '1' | '2' | '3' | '4' | '5'
  variant?: 'surface' | 'ghost'
}

// a div by default. `render` makes it a link, button or label, which also
// gives it hover and pressed states
export function Card({
  className,
  render,
  size = '1',
  style,
  variant = 'surface',
  ...props
}: CardProps) {
  return useRender({
    defaultTagName: 'div',
    props: {
      ...props,
      ...merge(
        stylex.props(styles.main, variants[variant], sizes[size]),
        typeof className === 'string' ? className : undefined,
        typeof style === 'object' ? style : undefined,
      ),
    },
    render,
  })
}

// stylex doesn't order these against each other, so they must not overlap
const hover = ':is(:any-link, button, label):hover:not(:active)'
const active = ':is(:any-link, button, label):active'

// ported from radix themes' card.css. a ghost card keeps its padding and has
// no negative margins, like the ghost buttons here
const styles = stylex.create({
  main: {
    '--card-border': {
      [active]: 'var(--card-border-active)',
      [hover]: {
        '@media (hover: hover)': 'var(--card-border-hover)',
        default: null,
      },
      default: 'var(--card-border-idle)',
    },
    '--card-fill': {
      [active]: 'var(--card-background-active)',
      [hover]: {
        '@media (hover: hover)': 'var(--card-background-hover)',
        default: null,
      },
      default: 'var(--card-background)',
    },
    backdropFilter: 'var(--card-backdrop)',
    backgroundColor: 'var(--card-fill)',
    borderRadius: 'var(--card-radius)',
    boxShadow: 'var(--card-border)',
    cursor: {
      ':is(:any-link, button, label)': 'pointer',
    },
    display: 'block',
    outline: {
      ':focus-visible': '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: -1,
    overflow: 'hidden',
    padding: 'var(--card-padding)',
    position: 'relative',
    textAlign: 'start',
  },
})

// variants only set variables, the main style decides where they apply
const variants = stylex.create({
  ghost: {
    '--card-backdrop': 'none',
    '--card-background': 'transparent',
    '--card-background-active': 'var(--gray-a4)',
    '--card-background-hover': 'var(--gray-a3)',
    '--card-border-active': 'none',
    '--card-border-hover': 'none',
    '--card-border-idle': 'none',
  },
  // the provider's panelBackground decides between see-through and opaque
  surface: {
    '--card-backdrop': 'var(--panel-backdrop, none)',
    '--card-background': 'var(--panel, var(--panel-background))',
    '--card-background-active': 'var(--panel, var(--panel-background))',
    '--card-background-hover': 'var(--panel, var(--panel-background))',
    '--card-border-active':
      'inset 0 0 0 1px color-mix(in oklab, var(--gray-a6), var(--gray-6) 25%)',
    '--card-border-hover':
      'inset 0 0 0 1px color-mix(in oklab, var(--gray-a7), var(--gray-7) 25%)',
    '--card-border-idle':
      'inset 0 0 0 1px color-mix(in oklab, var(--gray-a5), var(--gray-5) 25%)',
  },
})

const sizes = stylex.create({
  1: {
    '--card-padding': 'calc(var(--spacing) * 3)',
    '--card-radius': 'var(--radius-lg)',
  },
  2: {
    '--card-padding': 'calc(var(--spacing) * 4)',
    '--card-radius': 'var(--radius-lg)',
  },
  3: {
    '--card-padding': 'calc(var(--spacing) * 6)',
    '--card-radius': 'var(--radius-xl)',
  },
  4: {
    '--card-padding': 'calc(var(--spacing) * 8)',
    '--card-radius': 'var(--radius-xl)',
  },
  5: {
    '--card-padding': 'calc(var(--spacing) * 12)',
    '--card-radius': 'var(--radius-2xl)',
  },
})
