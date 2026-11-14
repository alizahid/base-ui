import {
  NumberField as Component,
  type NumberFieldRootProps as ComponentProps,
} from '@base-ui/react/number-field'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { MinusIcon, PlusIcon } from '../../lib/icons.js'
import { input, inputSizes, inputVariants } from '../../lib/input.js'
import { type RadiusToken, radii } from '../../lib/radii.js'
import { merge } from '../../lib/stylex.js'

export type NumberFieldProps = Omit<
  ComponentProps,
  'className' | 'color' | 'style'
> & {
  className?: string
  color?: ColorToken | 'gray'
  placeholder?: string
  radius?: RadiusToken
  size?: '1' | '2' | '3'
  style?: CSSProperties
  variant?: 'surface' | 'soft'
}

// the TextField look around base ui's number field. className and style go to
// the visible wrapper, the label and placeholder to the input
export function NumberField({
  'aria-label': label,
  'aria-labelledby': labelledBy,
  className,
  color,
  placeholder,
  radius,
  size = '2',
  style,
  variant = 'surface',
  ...props
}: NumberFieldProps) {
  return (
    <Component.Root {...props} {...stylex.props(styles.root)}>
      <Component.Group
        data-accent={color}
        {...merge(
          stylex.props(
            input.main,
            inputVariants[variant],
            inputSizes[size],
            radius && radii[radius],
          ),
          className,
          style,
        )}
      >
        <Component.Decrement {...stylex.props(styles.button, styles.start)}>
          <MinusIcon {...stylex.props(styles.icon)} />
        </Component.Decrement>

        <Component.Input
          aria-label={label}
          aria-labelledby={labelledBy}
          placeholder={placeholder}
          {...stylex.props(input.input, styles.input)}
        />

        <Component.Increment {...stylex.props(styles.button, styles.end)}>
          <PlusIcon {...stylex.props(styles.icon)} />
        </Component.Increment>
      </Component.Group>
    </Component.Root>
  )
}

const hover = ':is(:hover:not(:active, :disabled))'
const active = ':is(:active:not(:disabled))'

const styles = stylex.create({
  // a square at each end, as tall as the field
  button: {
    alignItems: 'center',
    aspectRatio: '1',
    backgroundColor: {
      [active]: 'var(--gray-a4)',
      [hover]: {
        '@media (hover: hover)': 'var(--gray-a3)',
        default: null,
      },
      default: 'transparent',
    },
    borderStyle: 'none',
    color: {
      ':disabled': 'var(--gray-a8)',
      default: 'var(--text-field-slot)',
    },
    cursor: {
      ':disabled': 'not-allowed',
      default: 'pointer',
    },
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    outline: 'none',
    padding: 0,
  },
  end: {
    borderEndEndRadius: 'inherit',
    borderStartEndRadius: 'inherit',
  },
  icon: {
    height: '1lh',
    width: '1lh',
  },
  input: {
    fontVariantNumeric: 'tabular-nums',
    textAlign: 'center',
    textIndent: 0,
  },
  // the root only carries state; the group is the box
  root: {
    display: 'contents',
  },
  start: {
    borderEndStartRadius: 'inherit',
    borderStartStartRadius: 'inherit',
  },
})
