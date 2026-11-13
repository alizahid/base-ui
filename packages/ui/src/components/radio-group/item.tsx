import * as stylex from '@stylexjs/stylex'

import { controlStyles, group } from '../../lib/control.js'
import { merge } from '../../lib/stylex.js'
import { Radio, type RadioProps } from '../radio/radio.js'

export type RadioGroupItemProps = RadioProps

// a Radio with its label. size goes on the label, so both the text and the
// Radio pick it up
export function Item({
  children,
  className,
  size,
  style,
  ...props
}: RadioGroupItemProps) {
  return (
    <label
      {...merge(
        stylex.props(
          group.item,
          ...controlStyles({
            size,
          }),
        ),
        className,
        style,
      )}
    >
      <Radio {...props} />

      {children}
    </label>
  )
}
