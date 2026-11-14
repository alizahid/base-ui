import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '../../lib/stylex.js'

export type KbdGroupProps = ComponentProps<'kbd'>

// keys pressed together or one after another, each its own Kbd:
// <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>. a kbd around kbds is how
// html marks up a combination
export function KbdGroup({ className, style, ...props }: KbdGroupProps) {
  return (
    <kbd {...props} {...merge(stylex.props(styles.main), className, style)} />
  )
}

const styles = stylex.create({
  main: {
    alignItems: 'center',
    // keys are read in the same order everywhere: without this, ⇧ ⌘ A is
    // reversed where text runs right to left
    direction: 'ltr',
    display: 'inline-flex',
    font: 'inherit',
    gap: 'var(--spacing)',
  },
})
