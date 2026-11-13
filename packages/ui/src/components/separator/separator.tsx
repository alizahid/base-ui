import {
  Separator as Component,
  type SeparatorProps as ComponentProps,
} from '@base-ui/react/separator'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { merge } from '../../lib/stylex.js'

export type SeparatorProps = Omit<ComponentProps, 'className' | 'style'> & {
  className?: string
  color?: ColorToken | 'gray'
  size?: '1' | '2' | '3' | 'full'
  style?: CSSProperties
}

// gray unless it is given a color. radix's size 4 is `full` here
export function Separator({
  className,
  color,
  orientation = 'horizontal',
  size = '1',
  style,
  ...props
}: SeparatorProps) {
  return (
    <Component
      data-accent={color}
      orientation={orientation}
      {...props}
      {...merge(
        stylex.props(styles.main, sizes[size], styles[orientation]),
        className,
        style,
      )}
    />
  )
}

// ported from radix themes' separator.css
const styles = stylex.create({
  horizontal: {
    height: 1,
    width: 'var(--separator-size)',
  },
  main: {
    backgroundColor: {
      ':is([data-accent])': 'var(--accent-a6)',
      default: 'var(--gray-a6)',
    },
    display: 'block',
    flexShrink: 0,
  },
  vertical: {
    height: 'var(--separator-size)',
    width: 1,
  },
})

const sizes = stylex.create({
  1: {
    '--separator-size': 'calc(var(--spacing) * 4)',
  },
  2: {
    '--separator-size': 'calc(var(--spacing) * 8)',
  },
  3: {
    '--separator-size': 'calc(var(--spacing) * 16)',
  },
  full: {
    '--separator-size': '100%',
  },
})
