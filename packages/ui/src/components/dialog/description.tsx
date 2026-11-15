'use client'

import {
  Dialog as Component,
  type DialogDescriptionProps as ComponentDescriptionProps,
} from '@base-ui/react/dialog'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { dialog } from '../../lib/dialog.js'
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
      {...merge(stylex.props(dialog.description), className, style)}
    />
  )
}
