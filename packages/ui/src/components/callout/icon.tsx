import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '#lib/stylex.js'

export type CalloutIconProps = ComponentProps<'div'>

// as tall as one line of the text, so the icon lines up with the first line
export function Icon({ className, style, ...props }: CalloutIconProps) {
  return (
    <div
      data-callout-icon=""
      {...props}
      {...merge(stylex.props(styles.main), className, style)}
    />
  )
}

const styles = stylex.create({
  main: {
    alignItems: 'center',
    display: 'flex',
    gridColumnStart: -2,
    height: '1lh',
  },
})
