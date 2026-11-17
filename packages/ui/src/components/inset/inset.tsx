import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '#lib/stylex.js'

export type InsetProps = ComponentProps<'div'> & {
  // stop inside the container's border, or cover it
  clip?: 'border-box' | 'padding-box'
  // one side, or several: ['x', 'top'] for the top of a card. written out
  // twice so the docs show the values
  side?:
    | 'all'
    | 'bottom'
    | 'end'
    | 'start'
    | 'top'
    | 'x'
    | 'y'
    | Array<'all' | 'bottom' | 'end' | 'start' | 'top' | 'x' | 'y'>
}

// lets its content reach the edges of the Card, Dialog, Popover or
// PreviewCard it is in: negative margins undo the container's padding on the
// chosen sides, and a corner follows the container's where both of its edges
// are reached. the container
// says what its padding, radius and border are with the --inset variables.
// for space after it, use a margin class: mb-4
export function Inset({
  className,
  clip = 'border-box',
  side = 'all',
  style,
  ...props
}: InsetProps) {
  const edges = new Set([side].flat().flatMap((item) => sides[item]))

  return (
    <div
      {...props}
      {...merge(
        stylex.props(
          styles.main,
          clips[clip],
          [...edges].map((edge) => margins[edge]),
          edges.has('top') && edges.has('start') && corners.topStart,
          edges.has('top') && edges.has('end') && corners.topEnd,
          edges.has('bottom') && edges.has('start') && corners.bottomStart,
          edges.has('bottom') && edges.has('end') && corners.bottomEnd,
        ),
        className,
        style,
      )}
    />
  )
}

// ported from radix themes' inset.css, without the margin props it composes
// with there. start and end rather than left and right, so it follows the
// direction. a side is one edge here and they combine: radix's `top` is
// ['x', 'top']

const styles = stylex.create({
  // --inset-start and --inset-end are how far it reaches past the
  // container's padding at those edges, for a Table inside. not inherited
  // from an Inset further up
  main: {
    '--inset-end': 'initial',
    '--inset-start': 'initial',
    overflow: 'hidden',
  },
})

// a border here is drawn inside the container's padding, not around it
const clips = stylex.create({
  'border-box': {
    '--inset-corner':
      'calc(var(--inset-radius, 0px) - var(--inset-border-width, 0px))',
    '--inset-margin':
      'calc(var(--inset-border-width, 0px) - var(--inset-padding, 0px))',
  },
  'padding-box': {
    '--inset-corner': 'var(--inset-radius, 0px)',
    '--inset-margin': 'calc(var(--inset-padding, 0px) * -1)',
  },
})

// the edges of the container each side reaches
const sides = {
  all: ['top', 'bottom', 'start', 'end'],
  bottom: ['bottom'],
  end: ['end'],
  start: ['start'],
  top: ['top'],
  x: ['start', 'end'],
  y: ['top', 'bottom'],
} as const

const margins = stylex.create({
  bottom: {
    marginBlockEnd: 'var(--inset-margin)',
  },
  end: {
    '--inset-end': 'calc(var(--inset-margin) * -1)',
    marginInlineEnd: 'var(--inset-margin)',
  },
  start: {
    '--inset-start': 'calc(var(--inset-margin) * -1)',
    marginInlineStart: 'var(--inset-margin)',
  },
  top: {
    marginBlockStart: 'var(--inset-margin)',
  },
})

const corners = stylex.create({
  bottomEnd: {
    borderEndEndRadius: 'var(--inset-corner)',
  },
  bottomStart: {
    borderEndStartRadius: 'var(--inset-corner)',
  },
  topEnd: {
    borderStartEndRadius: 'var(--inset-corner)',
  },
  topStart: {
    borderStartStartRadius: 'var(--inset-corner)',
  },
})
