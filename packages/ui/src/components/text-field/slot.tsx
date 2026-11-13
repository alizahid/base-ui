'use client'

import * as stylex from '@stylexjs/stylex'
import { type ComponentProps as ReactComponentProps } from 'react'

import { input } from '../../lib/input.js'
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
        stylex.props(input.slot, side === 'start' ? input.start : input.end),
        className,
        style,
      )}
    />
  )
}
