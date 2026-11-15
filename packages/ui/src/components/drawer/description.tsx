'use client'

import {
  Drawer as Component,
  type DrawerDescriptionProps as ComponentDescriptionProps,
} from '@base-ui/react/drawer'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { dialog } from '#lib/dialog.js'
import { merge } from '#lib/stylex.js'

export type DrawerDescriptionProps = ComponentDescriptionProps & {
  className?: string
  style?: CSSProperties
}

export function Description({
  className,
  style,
  ...props
}: DrawerDescriptionProps) {
  return (
    <Component.Description
      {...props}
      {...merge(stylex.props(dialog.description), className, style)}
    />
  )
}
