'use client'

import {
  Toolbar as Component,
  type ToolbarButtonProps as ComponentProps,
} from '@base-ui/react/toolbar'

import { Button, type ButtonProps } from '../button/button.js'

export type ToolbarButtonProps = ComponentProps &
  Pick<
    ButtonProps,
    'color' | 'highContrast' | 'loading' | 'radius' | 'size' | 'variant'
  >

// a quiet Button by default: gray and ghost. to make something else part of
// the toolbar, pass it as `render`: an IconButton, or the trigger of a Menu,
// Select, Dialog...
export function ToolbarButton({
  color = 'gray',
  highContrast,
  loading,
  radius,
  render,
  size,
  variant = 'ghost',
  ...props
}: ToolbarButtonProps) {
  return (
    <Component.Button
      {...props}
      render={
        render ?? (
          <Button
            color={color}
            highContrast={highContrast}
            loading={loading}
            radius={radius}
            size={size}
            variant={variant}
          />
        )
      }
    />
  )
}
