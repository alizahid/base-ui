'use client'

import {
  Drawer as Component,
  type DrawerTitleProps as ComponentTitleProps,
} from '@base-ui/react/drawer'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { dialog } from '#lib/dialog.js'
import { merge } from '#lib/stylex.js'

export type DrawerTitleProps = ComponentTitleProps & {
  className?: string
  style?: CSSProperties
}

export function Title({ className, style, ...props }: DrawerTitleProps) {
  return (
    <Component.Title
      {...props}
      {...merge(stylex.props(dialog.title), className, style)}
    />
  )
}
