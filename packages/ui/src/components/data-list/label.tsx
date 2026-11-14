import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { merge } from '../../lib/stylex.js'

export type DataListLabelProps = Omit<ComponentProps<'dt'>, 'color'> & {
  color?: ColorToken | 'gray'
  highContrast?: boolean
}

// names the value beside or below it
export function Label({
  className,
  color,
  highContrast,
  style,
  ...props
}: DataListLabelProps) {
  return (
    <dt
      data-accent={color}
      {...props}
      {...merge(
        stylex.props(
          styles.main,
          color ? styles.accent : styles.gray,
          highContrast && (color ? styles.accentContrast : styles.grayContrast),
        ),
        className,
        style,
      )}
    />
  )
}

const styles = stylex.create({
  accent: {
    color: 'var(--accent-a11)',
  },
  accentContrast: {
    color: 'var(--accent-12)',
  },
  gray: {
    color: 'var(--gray-a11)',
  },
  grayContrast: {
    color: 'var(--gray-12)',
  },
  main: {
    // a zero-width joiner gives the label a baseline to align on, even when
    // its content has no text of its own
    '::before': {
      content: '"\\200d"',
    },
    display: 'flex',
    minWidth: 'var(--data-list-label-min-width)',
  },
})
