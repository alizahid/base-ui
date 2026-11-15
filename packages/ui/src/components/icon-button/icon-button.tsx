import * as stylex from '@stylexjs/stylex'

import { ButtonBase, type ButtonProps } from '#components/button/button.js'

export type IconButtonProps = ButtonProps

// a Button made square. its styles go in through `xstyle` so they are merged
// in Button's own stylex.props call and reliably override its padding
export function IconButton({ size = '2', ...props }: IconButtonProps) {
  return <ButtonBase {...props} size={size} xstyle={styles.main} />
}

// square: as wide as Button is tall, no inline padding
const styles = stylex.create({
  main: {
    aspectRatio: '1',
    paddingInline: 0,
  },
})
