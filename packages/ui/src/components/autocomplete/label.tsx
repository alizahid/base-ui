'use client'

import {
  type AutocompleteGroupLabelProps,
  Autocomplete as Component,
} from '@base-ui/react/autocomplete'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { listbox } from '#lib/listbox.js'
import { merge } from '#lib/stylex.js'

import { flush } from './styles.js'

export type AutocompleteLabelProps = AutocompleteGroupLabelProps & {
  className?: string
  style?: CSSProperties
}

// a group's heading; goes inside Autocomplete.Group
export function Label({ className, style, ...props }: AutocompleteLabelProps) {
  return (
    <Component.GroupLabel
      {...props}
      {...merge(stylex.props(listbox.label, flush.row), className, style)}
    />
  )
}
