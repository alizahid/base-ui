import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '#lib/stylex.js'

export type KbdProps = ComponentProps<'kbd'>

// one key: <Kbd>⌘</Kbd>. for a combination, wrap several in a KbdGroup.
// radix's raised keycap is not used: this is a flat gray square, a line of
// small text tall, in the monospace font tailwind's preflight gives a kbd, at
// the size of the text around it. one look, so no variant, size or color props
export function Kbd({ className, style, ...props }: KbdProps) {
  return (
    <kbd {...props} {...merge(stylex.props(styles.main), className, style)} />
  )
}

const styles = stylex.create({
  main: {
    alignItems: 'center',
    backgroundColor: 'var(--gray-a3)',
    borderRadius: 'var(--ui-radius-sm)',
    display: 'inline-flex',
    height: 'calc(var(--ui-spacing) * 6)',
    justifyContent: 'center',
    // square for a single character, wider for whatever is longer
    minWidth: 'calc(var(--ui-spacing) * 6)',
    paddingInline: 'var(--ui-spacing)',
  },
})
