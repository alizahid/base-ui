'use client'

import * as stylex from '@stylexjs/stylex'
import { type ComponentProps as ReactComponentProps } from 'react'

import { type ColorToken } from '#lib/colors.js'
import { input, textArea } from '#lib/input.js'
import { merge } from '#lib/stylex.js'

export type TextAreaSlotProps = Omit<ReactComponentProps<'div'>, 'color'> & {
  color?: ColorToken | 'gray'
  side?: 'start' | 'end'
}

// TextField's slot, pinned beside the first line. rendered after the textarea
// whichever side it is on; `side` only orders it
export function Slot({
  className,
  color,
  side = 'start',
  style,
  ...props
}: TextAreaSlotProps) {
  return (
    <div
      {...props}
      data-accent={color}
      data-side={side}
      {...merge(
        stylex.props(
          input.slot,
          side === 'start' ? input.start : input.end,
          textArea.slot,
        ),
        className,
        style,
      )}
    />
  )
}
