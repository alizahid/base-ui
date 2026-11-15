import {
  CheckboxGroup as Component,
  type CheckboxGroupProps as ComponentProps,
} from '@base-ui/react/checkbox-group'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '#lib/colors.js'
import { type ControlProps, controlStyles, group } from '#lib/control.js'
import { merge } from '#lib/stylex.js'

export type CheckboxGroupRootProps = ComponentProps &
  ControlProps & {
    className?: string
    color?: ColorToken | 'gray'
    style?: CSSProperties
  }

// size, variant and highContrast become css variables here, which every
// Checkbox inside inherits
export function Root({
  className,
  color,
  highContrast,
  size,
  style,
  variant,
  ...props
}: CheckboxGroupRootProps) {
  return (
    <Component
      data-accent={color}
      {...props}
      {...merge(
        stylex.props(
          group.main,
          ...controlStyles({
            highContrast,
            size,
            variant,
          }),
        ),
        className,
        style,
      )}
    />
  )
}
