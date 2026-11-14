'use client'

import {
  Toolbar as Component,
  type ToolbarInputProps as ComponentProps,
} from '@base-ui/react/toolbar'
import { type CSSProperties } from 'react'

import { Root, type TextFieldRootProps } from '../text-field/root.js'

export type ToolbarInputProps = Omit<
  ComponentProps,
  'className' | 'color' | 'size' | 'style'
> &
  Pick<TextFieldRootProps, 'color' | 'radius' | 'size' | 'variant'> & {
    className?: string
    style?: CSSProperties
  }

// a ghost TextField by default: its slots go in as children. to use another
// input, such as NumberField's, pass it as `render`. arrow keys move the
// caret in an input as well as between controls, so use one at most, at the
// end
export function Input({
  children,
  className,
  color,
  radius,
  render,
  size,
  style,
  variant = 'ghost',
  ...props
}: ToolbarInputProps) {
  if (render) {
    return (
      <Component.Input
        {...props}
        className={className}
        render={render}
        style={style}
      >
        {children}
      </Component.Input>
    )
  }

  return (
    <Component.Input
      {...props}
      render={
        <Root
          className={className}
          color={color}
          radius={radius}
          size={size}
          style={style}
          variant={variant}
        >
          {children}
        </Root>
      }
    />
  )
}
