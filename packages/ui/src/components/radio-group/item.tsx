import * as stylex from '@stylexjs/stylex'

import { Radio, type RadioProps } from '#components/radio/radio.js'
import { controlStyles, group } from '#lib/control.js'
import { merge } from '#lib/stylex.js'

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
  // on its own, with no label text, it is just the Radio
  if (!children) {
    return <Radio className={className} size={size} style={style} {...props} />
  }

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

      <span {...stylex.props(group.text)}>{children}</span>
    </label>
  )
}
