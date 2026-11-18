'use client'

import { useRender } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'

import { merge } from '#lib/stylex.js'

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
    // the focus ring of a card that is a link or a button, on a box laid over
    // it instead of an outline: an outline is painted under an image inside,
    // and one against the edge would cover it. this is painted last. the card
    // clips what is inside it, so the ring sits within its edge
    '::after': {
      borderRadius: 'inherit',
      boxShadow: 'inset 0 0 0 2px var(--focus-8)',
      content: {
        ':focus-visible': '""',
        default: 'none',
      },
      inset: 0,
      pointerEvents: 'none',
      position: 'absolute',
    },
    backdropFilter: 'var(--card-backdrop)',
    backgroundColor: 'var(--card-fill)',
    borderRadius: 'var(--inset-radius)',
    boxShadow: 'var(--card-border)',
    cursor: {
      ':is(:any-link, button, label)': 'pointer',
    },
    display: 'block',
    // forced colors mode drops the ring's shadow and shows this instead
    outline: {
      ':focus-visible': '2px solid transparent',
      default: 'none',
    },
    outlineOffset: -1,
    overflow: 'hidden',
    padding: 'var(--inset-padding)',
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
    '--inset-border-width': '0px',
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
    '--inset-border-width': '1px',
  },
})

// the padding and radius, named for Inset, which reads them
const sizes = stylex.create({
  1: {
    '--inset-padding': 'calc(var(--ui-spacing) * 3)',
    '--inset-radius': 'var(--ui-radius-lg)',
  },
  2: {
    '--inset-padding': 'calc(var(--ui-spacing) * 4)',
    '--inset-radius': 'var(--ui-radius-lg)',
  },
  3: {
    '--inset-padding': 'calc(var(--ui-spacing) * 6)',
    '--inset-radius': 'var(--ui-radius-xl)',
  },
  4: {
    '--inset-padding': 'calc(var(--ui-spacing) * 8)',
    '--inset-radius': 'var(--ui-radius-xl)',
  },
  5: {
    '--inset-padding': 'calc(var(--ui-spacing) * 12)',
    '--inset-radius': 'var(--ui-radius-2xl)',
  },
})
