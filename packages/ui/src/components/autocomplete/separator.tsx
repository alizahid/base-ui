'use client'

import {
  Autocomplete as Component,
  type AutocompleteSeparatorProps as ComponentSeparatorProps,
} from '@base-ui/react/autocomplete'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { listbox } from '../../lib/listbox.js'
import { merge } from '../../lib/stylex.js'
import { flush } from './styles.js'

export type AutocompleteSeparatorProps = ComponentSeparatorProps & {
  className?: string
  style?: CSSProperties
}

export function Separator({
  className,
  style,
  ...props
}: AutocompleteSeparatorProps) {
  return (
    <Component.Separator
      {...props}
      {...merge(
        stylex.props(listbox.separator, flush.separator),
        className,
        style,
      )}
    />
  )
}
