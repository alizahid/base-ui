'use client'

import { useRender } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'

import { type ColorToken } from '#lib/colors.js'
import { merge } from '#lib/stylex.js'

export type LinkProps = Omit<useRender.ComponentProps<'a'>, 'color'> & {
  color?: ColorToken | 'gray'
  highContrast?: boolean
  // auto underlines on hover, or always when high contrast
  underline?: 'always' | 'auto' | 'hover' | 'none'
}

// an anchor by default; `render` swaps in a framework's link, or a button. it
// takes the size and weight of the text around it, so there are no props for
// those as in radix: use a className
export function Link({
  className,
  color,
  highContrast,
  render,
  style,
  underline = 'auto',
  ...props
}: LinkProps) {
  return useRender({
    defaultTagName: 'a',
    props: {
      'data-accent': color,
      ...props,
      ...merge(
        stylex.props(
          styles.main,
          // auto is hover, plus the underline high contrast adds below
          underlines[underline === 'auto' ? 'hover' : underline],
          highContrast && styles.contrast,
          highContrast && underline === 'auto' && styles.underlined,
        ),
        typeof className === 'string' ? className : undefined,
        typeof style === 'object' ? style : undefined,
      ),
    },
    render,
  })
}

// stylex doesn't order these against each other, so they must not overlap
const focus = ':is(:focus-visible)'
const hover = ':is(:hover:not(:focus-visible))'

// ported from radix themes' link.css
const styles = stylex.create({
  contrast: {
    '--link-color': 'var(--accent-12)',
  },
  main: {
    borderRadius: 'var(--ui-radius-sm)',
    color: 'var(--link-color, var(--accent-a11))',
    cursor: {
      ':is(:disabled, [data-disabled])': 'default',
      default: 'pointer',
    },
    outline: {
      [focus]: '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: 2,
    textDecorationColor:
      'var(--link-decoration, color-mix(in oklab, var(--accent-a5), var(--gray-a6)))',
    // the focus ring stands in for the underline
    textDecorationLine: {
      [focus]: 'none',
      [hover]: {
        '@media (hover: hover)': 'var(--link-hover)',
        default: null,
      },
      default: 'var(--link-rest)',
    },
    textDecorationThickness: 1,
    textUnderlineOffset: 2,
  },
  // a high contrast link is the color of the text around it, so auto keeps
  // it underlined
  underlined: {
    '--link-decoration':
      'color-mix(in oklab, var(--accent-a6), var(--gray-a6))',
    '--link-rest': 'underline',
  },
})

const underlines = stylex.create({
  always: {
    '--link-hover': 'underline',
    '--link-rest': 'underline',
  },
  hover: {
    '--link-hover': 'underline',
    '--link-rest': 'none',
  },
  none: {
    '--link-hover': 'none',
    '--link-rest': 'none',
  },
})
