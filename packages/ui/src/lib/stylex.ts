import type * as stylex from '@stylexjs/stylex'
import { cn } from 'cn'
import { type CSSProperties } from 'react'

type Style = ReturnType<typeof stylex.props>

export function merge(
  input: Style,
  className?: string,
  style?: CSSProperties,
): Style {
  return {
    ...input,
    className: cn(input.className, className),
    style: {
      ...input.style,
      ...style,
    },
  }
}
