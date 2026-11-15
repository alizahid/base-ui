'use client'

import {
  Autocomplete as Component,
  type AutocompleteGroupProps as ComponentGroupProps,
} from '@base-ui/react/autocomplete'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '#lib/stylex.js'

import { flush } from './styles.js'

export type AutocompleteGroupProps = ComponentGroupProps & {
  className?: string
  style?: CSSProperties
}

export function Group({ className, style, ...props }: AutocompleteGroupProps) {
  return (
    <Component.Group
      {...props}
      {...merge(stylex.props(flush.group), className, style)}
    />
  )
}
