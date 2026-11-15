import {
  Radio as Component,
  type RadioRootProps as ComponentProps,
} from '@base-ui/react/radio'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { type ControlProps, control, controlStyles } from '../../lib/control.js'
import { merge } from '../../lib/stylex.js'

export type RadioProps = ComponentProps &
  ControlProps & {
    className?: string
    color?: ColorToken | 'gray'
    style?: CSSProperties
  }

// only works inside RadioGroup.Root, which holds the selected value. use
// RadioGroup.Item for a radio with a label
export function Radio({
  className,
  color,
  highContrast,
  size,
  style,
  variant,
  ...props
}: RadioProps) {
  return (
    <Component.Root
      data-accent={color}
      {...props}
      {...merge(
        stylex.props(
          control.main,
          styles.main,
          ...controlStyles({
            highContrast,
            size,
            variant,
          }),
        ),
        className,
        style,
      )}
    >
      <Component.Indicator {...stylex.props(styles.indicator)} />
    </Component.Root>
  )
}

const styles = stylex.create({
  indicator: {
    backgroundColor: 'currentColor',
    borderRadius: 'calc(infinity * 1px)',
    height: '40%',
    width: '40%',
  },
  main: {
    borderRadius: 'calc(infinity * 1px)',
  },
})
