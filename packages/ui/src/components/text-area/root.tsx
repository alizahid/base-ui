'use client'

import {
  Input as Component,
  type InputProps as ComponentProps,
} from '@base-ui/react/input'
import * as stylex from '@stylexjs/stylex'
import {
  type CSSProperties,
  type ComponentProps as ReactComponentProps,
} from 'react'

import { type ColorToken } from '../../lib/colors.js'
import {
  input,
  inputVariants,
  textArea,
  textAreaSizes,
} from '../../lib/input.js'
import { type RadiusToken, radii } from '../../lib/radii.js'
import { merge } from '../../lib/stylex.js'

export type TextAreaRootProps = Omit<
  ReactComponentProps<'textarea'>,
  'className' | 'color' | 'defaultValue' | 'style' | 'value'
> &
  Pick<ComponentProps, 'defaultValue' | 'onValueChange' | 'value'> & {
    autoResize?: boolean
    className?: string
    color?: ColorToken | 'gray'
    radius?: RadiusToken
    size?: '1' | '2' | '3'
    style?: CSSProperties
    variant?: 'surface' | 'soft' | 'ghost'
  }

// base ui has no textarea of its own, so its Input renders one and keeps the
// Field integration. className and style go to the wrapper, as in TextField,
// and the wrapper is a label, so clicking a slot focuses the textarea
export function Root({
  autoResize,
  children,
  className,
  color,
  radius,
  size = '2',
  style,
  variant = 'surface',
  ...props
}: TextAreaRootProps) {
  return (
    <label
      data-accent={color}
      {...merge(
        stylex.props(
          input.main,
          inputVariants[variant],
          textAreaSizes[size],
          radius && radii[radius],
        ),
        className,
        style,
      )}
    >
      <Component
        {...(props as ComponentProps)}
        render={<textarea />}
        {...stylex.props(textArea.main, autoResize && textArea.autoResize)}
      />

      {children}
    </label>
  )
}
