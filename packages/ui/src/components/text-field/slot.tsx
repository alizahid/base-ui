'use client'

import * as stylex from '@stylexjs/stylex'
import { type ComponentProps as ReactComponentProps } from 'react'

import { merge } from '../../lib/stylex.js'

export type TextFieldSlotProps = ReactComponentProps<'div'> & {
  side?: 'start' | 'end'
}

// rendered after the input whichever side it is on; `side` only orders it.
// data-side lets the input drop its indent on an edge that has a slot
export function Slot({
  className,
  side = 'start',
  style,
  ...props
}: TextFieldSlotProps) {
  return (
    <div
      {...props}
      data-side={side}
      {...merge(
        stylex.props(styles.slot, side === 'start' ? styles.start : styles.end),
        className,
        style,
      )}
    />
  )
}

// ported from radix themes' text-field.css, with solid colors in place of
// alpha ones. the invalid state is ours, for Field
const styles = stylex.create({
  // the edge-side padding gives up the border's width. radix uses a negative
  // margin for this; padding leaves margin free for a consumer's className
  end: {
    paddingInlineEnd:
      'calc(var(--text-field-slot-padding) - var(--text-field-border-width))',
    paddingInlineStart: 'var(--text-field-slot-padding)',
  },
  slot: {
    alignItems: 'center',
    boxSizing: 'border-box',
    color: 'var(--text-field-slot)',
    cursor: 'text',
    display: 'flex',
    flexShrink: 0,
    gap: 'var(--text-field-slot-gap)',
  },
  start: {
    order: -1,
    paddingInlineEnd: 'var(--text-field-slot-padding)',
    paddingInlineStart:
      'calc(var(--text-field-slot-padding) - var(--text-field-border-width))',
  },
})
