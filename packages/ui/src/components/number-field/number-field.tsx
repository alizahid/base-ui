import {
  NumberField as Component,
  type NumberFieldRootProps as ComponentProps,
} from '@base-ui/react/number-field'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { icon, MinusIcon, PlusIcon } from '../../lib/icons.js'
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
          <MinusIcon {...stylex.props(icon.line)} />
        </Component.Decrement>

        <Component.Input
          aria-label={label}
          aria-labelledby={labelledBy}
          placeholder={placeholder}
          {...stylex.props(input.input, styles.input)}
        />

        <Component.Increment {...stylex.props(styles.button, styles.end)}>
          <PlusIcon {...stylex.props(icon.line)} />
        </Component.Increment>
      </Component.Group>
    </Component.Root>
  )
}

const hover = ':is(:hover:not(:active, :disabled))'
const active = ':is(:active:not(:disabled))'

const styles = stylex.create({
  // a square at each end, as tall as the field. it reaches under the field's
  // border on its three outer sides and takes the field's corners, with a
  // transparent border of the same width that its fill stops at. that puts
  // the fill's corners exactly on the inside of the field's border
  button: {
    alignItems: 'center',
    aspectRatio: '1',
    backgroundClip: 'padding-box',
    backgroundColor: {
      [active]: 'var(--gray-a4)',
      [hover]: {
        '@media (hover: hover)': 'var(--gray-a3)',
        default: null,
      },
      default: null,
    },
    borderBlockWidth: 'var(--text-field-border-width)',
    borderColor: 'transparent',
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
    marginBlock: 'calc(var(--text-field-border-width) * -1)',
    outline: 'none',
  },
  end: {
    borderEndEndRadius: 'inherit',
    borderInlineEndWidth: 'var(--text-field-border-width)',
    borderStartEndRadius: 'inherit',
    marginInlineEnd: 'calc(var(--text-field-border-width) * -1)',
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
    borderInlineStartWidth: 'var(--text-field-border-width)',
    borderStartStartRadius: 'inherit',
    marginInlineStart: 'calc(var(--text-field-border-width) * -1)',
  },
})
