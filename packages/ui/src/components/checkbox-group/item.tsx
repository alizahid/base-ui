import * as stylex from '@stylexjs/stylex'

import { controlStyles, group } from '../../lib/control.js'
import { merge } from '../../lib/stylex.js'
import { Checkbox, type CheckboxProps } from '../checkbox/checkbox.js'

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

      {children}
    </label>
  )
}
