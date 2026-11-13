import {
  Checkbox as Component,
  type CheckboxRootProps as ComponentProps,
} from '@base-ui/react/checkbox'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { type ControlProps, control, controlStyles } from '../../lib/control.js'
import { ThickCheckIcon, ThickDividerHorizontalIcon } from '../../lib/icons.js'
import { merge } from '../../lib/stylex.js'

export type CheckboxProps = ComponentProps &
  ControlProps & {
    className?: string
    color?: ColorToken | 'gray'
    style?: CSSProperties
  }

// size, variant and highContrast have no defaults here: left out, they come
// from a CheckboxGroup.Root above, or the fallbacks in lib/control
export function Checkbox({
  className,
  color,
  highContrast,
  size,
  style,
  variant,
  ...props
}: CheckboxProps) {
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
      <Component.Indicator {...stylex.props(styles.indicator)}>
        {props.indeterminate ? (
          <ThickDividerHorizontalIcon {...stylex.props(styles.icon)} />
        ) : (
          <ThickCheckIcon {...stylex.props(styles.icon)} />
        )}
      </Component.Indicator>
    </Component.Root>
  )
}

const styles = stylex.create({
  icon: {
    height: 'var(--control-indicator-size, 10px)',
    width: 'var(--control-indicator-size, 10px)',
  },
  indicator: {
    display: 'flex',
  },
  main: {
    borderRadius: 'var(--control-radius, var(--radius-sm))',
  },
})
