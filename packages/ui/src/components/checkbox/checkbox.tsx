import {
  Checkbox as Component,
  type CheckboxRootProps as ComponentProps,
} from '@base-ui/react/checkbox'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { type ControlProps, control, controlStyles } from '../../lib/control.js'
import { CheckIcon, MinusIcon } from '../../lib/icons.js'
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
        {/* both are rendered and css shows one, so a parent checkbox, whose
            indeterminate state base ui works out, gets the right icon too */}
        <CheckIcon {...stylex.props(styles.icon, styles.check)} />

        <MinusIcon {...stylex.props(styles.icon, styles.minus)} />
      </Component.Indicator>
    </Component.Root>
  )
}

const indeterminate = ':is([data-indeterminate] *)'

const styles = stylex.create({
  check: {
    display: {
      [indeterminate]: 'none',
      default: 'block',
    },
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  indicator: {
    display: 'flex',
  },
  main: {
    borderRadius: 'var(--control-radius, var(--radius-sm))',
  },
  minus: {
    display: {
      [indeterminate]: 'block',
      default: 'none',
    },
  },
})
