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
        {/* radix themes' ThickCheckIcon and ThickDividerHorizontalIcon */}
        <svg
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 9 9"
          {...stylex.props(styles.icon)}
        >
          <path
            clipRule="evenodd"
            d={
              props.indeterminate
                ? 'M0.75 4.5C0.75 4.08579 1.08579 3.75 1.5 3.75H7.5C7.91421 3.75 8.25 4.08579 8.25 4.5C8.25 4.91421 7.91421 5.25 7.5 5.25H1.5C1.08579 5.25 0.75 4.91421 0.75 4.5Z'
                : 'M8.53547 0.62293C8.88226 0.849446 8.97976 1.3142 8.75325 1.66099L4.5083 8.1599C4.38833 8.34356 4.19397 8.4655 3.9764 8.49358C3.75883 8.52167 3.53987 8.45309 3.3772 8.30591L0.616113 5.80777C0.308959 5.52987 0.285246 5.05559 0.563148 4.74844C0.84105 4.44128 1.31533 4.41757 1.62249 4.69547L3.73256 6.60459L7.49741 0.840706C7.72393 0.493916 8.18868 0.396414 8.53547 0.62293Z'
            }
            fillRule="evenodd"
          />
        </svg>
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
