import {
  OTPField as Component,
  type OTPFieldRootProps as ComponentProps,
} from '@base-ui/react/otp-field'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { inputVariants } from '../../lib/input.js'
import { type RadiusToken, radii } from '../../lib/radii.js'
import { merge } from '../../lib/stylex.js'

export type OTPFieldProps = Omit<
  ComponentProps,
  'className' | 'color' | 'style'
> & {
  className?: string
  color?: ColorToken | 'gray'
  radius?: RadiusToken
  size?: '1' | '2' | '3'
  style?: CSSProperties
  variant?: 'surface' | 'soft'
}

// one box per character. label it with a Field or a <label>; base ui names
// the boxes from that
export function OTPField({
  className,
  color,
  radius,
  size = '2',
  style,
  variant = 'surface',
  ...props
}: OTPFieldProps) {
  return (
    <Component.Root
      data-accent={color}
      {...props}
      {...merge(
        stylex.props(
          styles.main,
          inputVariants[variant],
          sizes[size],
          radius && radii[radius],
        ),
        className,
        style,
      )}
    >
      {Array.from({ length: props.length }, (_, index) => (
        <Component.Input
          // biome-ignore lint/suspicious/noArrayIndexKey: boxes are identified by their index
          key={index}
          {...stylex.props(styles.input)}
        />
      ))}
    </Component.Root>
  )
}

// stylex doesn't order these against each other, so they must not overlap
const invalid = ':is([data-invalid]:not(:disabled))'
const disabled = ':is(:disabled)'

// each box is a small TextField: it reads the same variables, set on the root
// by the shared input variants
const styles = stylex.create({
  input: {
    backgroundClip: 'var(--text-field-clip, border-box)',
    backgroundColor: {
      [disabled]: 'var(--text-field-background-disabled)',
      [invalid]: 'var(--text-field-background-invalid)',
      default: 'var(--text-field-background)',
    },
    backgroundImage: {
      [disabled]: 'var(--text-field-image-disabled, none)',
    },
    borderRadius: 'inherit',
    boxShadow: {
      [disabled]: 'var(--text-field-shadow-disabled)',
      [invalid]: 'var(--text-field-shadow-invalid)',
      default: 'var(--text-field-shadow)',
    },
    color: {
      [disabled]: 'var(--gray-a11)',
      default: 'var(--text-field-color)',
    },
    cursor: {
      [disabled]: 'not-allowed',
      default: 'text',
    },
    fontVariantNumeric: 'tabular-nums',
    height: 'var(--otp-field-size)',
    outline: {
      ':focus:not([data-invalid])': '2px solid var(--text-field-focus-color)',
      ':is([data-invalid]:focus)': '2px solid var(--red-8)',
      default: 'none',
    },
    outlineOffset: -1,
    // the surface background stops short of the inset border, as in TextField
    padding: 'var(--text-field-border-width)',
    textAlign: 'center',
    width: 'var(--otp-field-size)',
  },
  main: {
    display: 'flex',
    fontWeight: '400',
    gap: 'calc(var(--ui-spacing) * 2)',
  },
})

const sizes = stylex.create({
  1: {
    '--otp-field-size': 'calc(var(--ui-spacing) * 6)',
    borderRadius: 'var(--ui-radius-sm)',
    fontSize: 'var(--ui-text-xs)',
    lineHeight: 'var(--ui-text-xs--line-height)',
  },
  2: {
    '--otp-field-size': 'calc(var(--ui-spacing) * 8)',
    borderRadius: 'var(--ui-radius-md)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
  3: {
    '--otp-field-size': 'calc(var(--ui-spacing) * 10)',
    borderRadius: 'var(--ui-radius-lg)',
    fontSize: 'var(--ui-text-base)',
    lineHeight: 'var(--ui-text-base--line-height)',
  },
})
