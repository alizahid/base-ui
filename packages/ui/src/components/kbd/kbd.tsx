import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '#lib/stylex.js'

export type KbdProps = ComponentProps<'kbd'> & {
  size?: '1' | '2' | '3'
}

// one key: <Kbd>⌘</Kbd>. for a combination, wrap several in a KbdGroup.
// radix's raised keycap is not used: this is a flat gray square in the
// monospace font tailwind's preflight gives a kbd. one look, so no variant or
// color props
export function Kbd({ className, size = '2', style, ...props }: KbdProps) {
  return (
    <kbd
      {...props}
      {...merge(stylex.props(styles.main, sizes[size]), className, style)}
    />
  )
}

const styles = stylex.create({
  main: {
    alignItems: 'center',
    backgroundColor: 'var(--gray-a3)',
    borderRadius: 'var(--ui-radius-sm)',
    display: 'inline-flex',
    height: 'var(--kbd-size)',
    justifyContent: 'center',
    // square for a single character, wider for whatever is longer
    minWidth: 'var(--kbd-size)',
    paddingInline: 'var(--ui-spacing)',
  },
})

const sizes = stylex.create({
  1: {
    '--kbd-size': 'calc(var(--ui-spacing) * 5)',
    fontSize: 'var(--ui-text-xs)',
    lineHeight: 'var(--ui-text-xs--line-height)',
  },
  2: {
    '--kbd-size': 'calc(var(--ui-spacing) * 6)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
  3: {
    '--kbd-size': 'calc(var(--ui-spacing) * 7)',
    fontSize: 'var(--ui-text-base)',
    lineHeight: 'var(--ui-text-base--line-height)',
  },
})
