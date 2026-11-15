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
    '--data-list-label-min-width': 'calc(var(--ui-spacing) * 32)',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
  },
  vertical: {
    '--data-list-item-align': 'stretch',
    '--data-list-item-display': 'flex',
    '--data-list-item-gap': 'var(--ui-spacing)',
    '--data-list-label-min-width': '0px',
    display: 'flex',
    flexDirection: 'column',
  },
})

const sizes = stylex.create({
  1: {
    '--data-list-gap': 'calc(var(--ui-spacing) * 3)',
    fontSize: 'var(--ui-text-xs)',
    lineHeight: 'var(--ui-text-xs--line-height)',
  },
  2: {
    '--data-list-gap': 'calc(var(--ui-spacing) * 4)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
  3: {
    '--data-list-gap': 'calc(var(--ui-spacing) * 5)',
    fontSize: 'var(--ui-text-base)',
    lineHeight: 'var(--ui-text-base--line-height)',
  },
})
