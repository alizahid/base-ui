'use client'

import {
  Drawer as Component,
  type DrawerTitleProps as ComponentTitleProps,
} from '@base-ui/react/drawer'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'

export type DrawerTitleProps = ComponentTitleProps & {
  className?: string
  style?: CSSProperties
}

export function Title({ className, style, ...props }: DrawerTitleProps) {
  return (
    <Component.Title
      {...props}
      {...merge(stylex.props(styles.title), className, style)}
    />
  )
}

// ported from radix themes' base-dialog.css. radix animates with keyframes;
// here base ui's starting and ending styles drive transitions instead
const styles = stylex.create({
  title: {
    fontSize: 'var(--text-xl)',
    fontWeight: '700',
    lineHeight: 'var(--text-xl--line-height)',
    margin: 0,
    marginBlockEnd: 'calc(var(--spacing) * 3)',
  },
})
