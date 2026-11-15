'use client'

import {
  Autocomplete as Component,
  type AutocompleteItemProps as ComponentItemProps,
} from '@base-ui/react/autocomplete'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { listbox } from '#lib/listbox.js'
import { merge } from '#lib/stylex.js'

import { flush } from './styles.js'

export type AutocompleteItemProps = ComponentItemProps & {
  className?: string
  style?: CSSProperties
}

export function Item({ className, style, ...props }: AutocompleteItemProps) {
  return (
    <Component.Item
      {...props}
      {...merge(stylex.props(listbox.item, flush.row), className, style)}
    />
  )
}
