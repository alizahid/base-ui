'use client'

import {
  Dialog as Component,
  type DialogDescriptionProps as ComponentDescriptionProps,
} from '@base-ui/react/dialog'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'

export type DialogDescriptionProps = ComponentDescriptionProps & {
  className?: string
  style?: CSSProperties
}

export function Description({
  className,
  style,
  ...props
}: DialogDescriptionProps) {
  return (
    <Component.Description
      {...props}
      {...merge(stylex.props(styles.description), className, style)}
    />
  )
}

// ported from radix themes' base-dialog.css. radix animates with keyframes;
// here base ui's starting and ending styles drive transitions instead
const styles = stylex.create({
  description: {
    fontSize: 'var(--text-base)',
    lineHeight: 'var(--text-base--line-height)',
    margin: 0,
  },
})
