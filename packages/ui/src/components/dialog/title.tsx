'use client'

import {
  Dialog as Component,
  type DialogTitleProps as ComponentTitleProps,
} from '@base-ui/react/dialog'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { dialog } from '#lib/dialog.js'
import { merge } from '#lib/stylex.js'

export type DialogTitleProps = ComponentTitleProps & {
  className?: string
  style?: CSSProperties
}

export function Title({ className, style, ...props }: DialogTitleProps) {
  return (
    <Component.Title
      {...props}
      {...merge(stylex.props(dialog.title), className, style)}
    />
  )
}
