import * as stylex from '@stylexjs/stylex'

import { ButtonBase, type ButtonProps } from '../button/button.js'

export type IconButtonProps = ButtonProps

// a Button made square. its styles go in through `xstyle` so they are merged
// in Button's own stylex.props call and reliably override its padding
export function IconButton({ size = '2', ...props }: IconButtonProps) {
  return <ButtonBase {...props} size={size} xstyle={sizes[size]} />
}

// square: same height as Button, no inline padding
const sizes = stylex.create({
  1: {
    paddingInline: 0,
    width: 'calc(var(--spacing) * 6)',
  },
  2: {
    paddingInline: 0,
    width: 'calc(var(--spacing) * 8)',
  },
  3: {
    paddingInline: 0,
    width: 'calc(var(--spacing) * 10)',
  },
  4: {
    paddingInline: 0,
    width: 'calc(var(--spacing) * 12)',
  },
})
