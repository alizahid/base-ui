'use client'

import {
  Select as Component,
  type SelectItemProps as ComponentItemProps,
} from '@base-ui/react/select'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { ThickCheckIcon } from '../../lib/icons.js'
import { merge } from '../../lib/stylex.js'

export type SelectItemProps = ComponentItemProps & {
  className?: string
  style?: CSSProperties
}

export function Item({
  children,
  className,
  style,
  ...props
}: SelectItemProps) {
  return (
    <Component.Item
      {...props}
      {...merge(stylex.props(styles.item), className, style)}
    >
      <Component.ItemIndicator {...stylex.props(styles.indicator)}>
        <ThickCheckIcon {...stylex.props(styles.check)} />
      </Component.ItemIndicator>

      <Component.ItemText {...stylex.props(styles.text)}>
        {children}
      </Component.ItemText>
    </Component.Item>
  )
}

// ported from radix themes' select.css, with solid colors in place of alpha
// ones. the invalid state is ours, for Field. a ghost trigger is a standard
// one with a transparent background, without radix's negative margins
const styles = stylex.create({
  check: {
    height: 'var(--select-check-size)',
    width: 'var(--select-check-size)',
  },
  indicator: {
    alignItems: 'center',
    display: 'inline-flex',
    insetInlineStart: 0,
    justifyContent: 'center',
    position: 'absolute',
    width: 'var(--select-indicator-width)',
  },
  item: {
    alignItems: 'center',
    backgroundColor: {
      ':is([data-highlighted]:not([data-disabled]))': 'var(--select-highlight)',
    },
    borderRadius: 'var(--select-item-radius)',
    boxSizing: 'border-box',
    color: {
      ':is([data-disabled])': 'var(--gray-8)',
      ':is([data-highlighted]:not([data-disabled]))':
        'var(--select-highlight-color)',
    },
    cursor: 'default',
    display: 'flex',
    height: 'var(--select-item-height)',
    outline: 'none',
    // radix pads both sides by the indicator's width; the end only needs the
    // same margin as the separator
    paddingInlineEnd: 'var(--select-separator-margin)',
    paddingInlineStart: 'var(--select-indicator-width)',
    position: 'relative',
    scrollMarginBlock: 'var(--select-content-padding)',
    userSelect: 'none',
  },
  // fills the row, so custom item content can lay itself out across it
  text: {
    flexGrow: 1,
    minWidth: 0,
  },
})
