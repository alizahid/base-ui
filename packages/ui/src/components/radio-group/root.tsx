import {
  RadioGroup as Component,
  type RadioGroupProps as ComponentProps,
} from '@base-ui/react/radio-group'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { type ControlProps, controlStyles, group } from '../../lib/control.js'
import { merge } from '../../lib/stylex.js'

export type RadioGroupRootProps = ComponentProps &
  ControlProps & {
    className?: string
    color?: ColorToken | 'gray'
    style?: CSSProperties
  }

// size, variant and highContrast become css variables here, which every
// Radio inside inherits
export function Root({
  className,
  color,
  highContrast,
  size,
  style,
  variant,
  ...props
}: RadioGroupRootProps) {
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
