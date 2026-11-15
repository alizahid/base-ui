import * as stylex from '@stylexjs/stylex'

import { Checkbox, type CheckboxProps } from '#components/checkbox/checkbox.js'
import { controlStyles, group } from '#lib/control.js'
import { merge } from '#lib/stylex.js'

export type CheckboxGroupItemProps = CheckboxProps

// a Checkbox with its label. size goes on the label, so both the text and the
// Checkbox pick it up
export function Item({
  children,
  className,
  size,
  style,
  ...props
}: CheckboxGroupItemProps) {
  // on its own, with no label text, it is just the Checkbox
  if (!children) {
    return (
      <Checkbox className={className} size={size} style={style} {...props} />
    )
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
      <Checkbox {...props} />

      <span {...stylex.props(group.text)}>{children}</span>
    </label>
  )
}
