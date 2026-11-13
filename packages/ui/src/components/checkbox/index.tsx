import {
  Checkbox as Component,
  type CheckboxRootProps as ComponentProps,
} from '@base-ui/react/checkbox'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { type ControlProps, control, controlStyles } from '../../lib/control.js'
import { merge } from '../../lib/stylex.js'

export type CheckboxProps = ComponentProps &
  ControlProps & {
    className?: string
    color?: ColorToken | 'gray'
    style?: CSSProperties
  }

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
        <svg
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 16 16"
          {...stylex.props(styles.icon)}
        >
          <path d={props.indeterminate ? 'M4 8h8' : 'M3.5 8.5l3 3 6-7'} />
        </svg>
      </Component.Indicator>
    </Component.Root>
  )
}

const styles = stylex.create({
  icon: {
    height: '100%',
    width: '100%',
  },
  indicator: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  main: {
    borderRadius: 'var(--control-radius, var(--radius-sm))',
  },
})
