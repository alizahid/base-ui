'use client'

import {
  Input as Component,
  type InputProps as ComponentProps,
} from '@base-ui/react/input'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { input, inputSizes, inputVariants } from '../../lib/input.js'
import { type RadiusToken, radii } from '../../lib/radii.js'
import { merge } from '../../lib/stylex.js'

export type TextFieldRootProps = Omit<
  ComponentProps,
  'className' | 'color' | 'size' | 'style'
> & {
  className?: string
  color?: ColorToken | 'gray'
  radius?: RadiusToken
  size?: '1' | '2' | '3'
  style?: CSSProperties
  variant?: 'ghost' | 'soft' | 'surface'
}

// className and style go to the wrapper, everything else to the input. the
// wrapper is a label, so clicking its padding or a slot focuses the input
export function Root({
  children,
  className,
  color,
  radius,
  size = '2',
  style,
  variant = 'surface',
  ...props
}: TextFieldRootProps) {
  return (
    <label
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
      <Component {...props} {...stylex.props(input.input)} />

      {children}
    </label>
  )
}
