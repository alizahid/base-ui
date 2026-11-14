import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '../../lib/stylex.js'

export type DataListRootProps = ComponentProps<'dl'> & {
  orientation?: 'horizontal' | 'vertical'
  size?: '1' | '2' | '3'
}

// a list of label and value pairs. the options only set variables; the
// items, labels and values read them
export function Root({
  className,
  orientation = 'horizontal',
  size = '2',
  style,
  ...props
}: DataListRootProps) {
  return (
    <dl
      {...props}
      {...merge(
        stylex.props(styles.main, orientations[orientation], sizes[size]),
        className,
        style,
      )}
    />
  )
}

// ported from radix themes' data-list.css, without the leading trim
const styles = stylex.create({
  main: {
    fontStyle: 'normal',
    fontWeight: '400',
    gap: 'var(--data-list-gap)',
    margin: 0,
    overflowWrap: 'anywhere',
    textAlign: 'start',
  },
})

const orientations = stylex.create({
  // labels share one column, which is as wide as the widest label
  horizontal: {
    '--data-list-item-align': 'baseline',
    '--data-list-item-display': 'grid',
    '--data-list-item-gap': 'var(--data-list-gap)',
    '--data-list-label-min-width': '120px',
    // how far a value taller than its row can poke out of it
    '--data-list-trim': '-0.25em',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
  },
  vertical: {
    '--data-list-item-align': 'stretch',
    '--data-list-item-display': 'flex',
    '--data-list-item-gap': 'var(--spacing)',
    '--data-list-label-min-width': '0px',
    '--data-list-trim': '0px',
    display: 'flex',
    flexDirection: 'column',
  },
})

const sizes = stylex.create({
  1: {
    '--data-list-gap': 'calc(var(--spacing) * 3)',
    fontSize: 'var(--text-xs)',
    lineHeight: 'var(--text-xs--line-height)',
  },
  2: {
    '--data-list-gap': 'calc(var(--spacing) * 4)',
    fontSize: 'var(--text-sm)',
    lineHeight: 'var(--text-sm--line-height)',
  },
  3: {
    '--data-list-gap': 'calc(var(--spacing) * 5)',
    fontSize: 'var(--text-base)',
    lineHeight: 'var(--text-base--line-height)',
  },
})
