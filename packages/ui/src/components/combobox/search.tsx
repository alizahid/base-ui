'use client'

import {
  Combobox as Component,
  type ComboboxInputProps as ComponentInputProps,
} from '@base-ui/react/combobox'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'

export type ComboboxSearchProps = Omit<
  ComponentInputProps,
  'className' | 'style'
> & {
  className?: string
  style?: CSSProperties
}

// the filter input for inside the popup, used with Combobox.Trigger. pass it
// to the content's `search`. unlike Combobox.Input it is not the anchor
export function Search({ className, style, ...props }: ComboboxSearchProps) {
  return (
    <div {...stylex.props(styles.main)}>
      <Component.Input
        {...props}
        {...merge(stylex.props(styles.input), className, style)}
      />
    </div>
  )
}

const styles = stylex.create({
  input: {
    '::placeholder': {
      color: 'var(--gray-a10)',
      opacity: 1,
    },
    backgroundColor: 'transparent',
    borderStyle: 'none',
    boxSizing: 'border-box',
    color: 'inherit',
    font: 'inherit',
    height: 'var(--menu-item-height)',
    outline: 'none',
    padding: 0,
    paddingInline: 'calc(var(--spacing) * 2)',
    width: '100%',
  },
  // a row at the top of the popup, divided from the list
  main: {
    boxShadow: 'inset 0 -1px var(--gray-a6)',
    padding: 'var(--menu-content-padding)',
  },
})
