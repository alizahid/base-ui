import * as stylex from '@stylexjs/stylex'

import { ButtonBase, type ButtonProps } from '../button/index.js'

export type IconButtonProps = ButtonProps

export function IconButton({ size = '2', ...props }: IconButtonProps) {
  return <ButtonBase {...props} size={size} xstyle={sizes[size]} />
}

const sizes = stylex.create({
  1: {
    flexShrink: 0,
    paddingInline: 0,
    width: 'calc(var(--spacing) * 6)',
  },
  2: {
    flexShrink: 0,
    paddingInline: 0,
    width: 'calc(var(--spacing) * 8)',
  },
  3: {
    flexShrink: 0,
    paddingInline: 0,
    width: 'calc(var(--spacing) * 10)',
  },
  4: {
    flexShrink: 0,
    paddingInline: 0,
    width: 'calc(var(--spacing) * 12)',
  },
})
