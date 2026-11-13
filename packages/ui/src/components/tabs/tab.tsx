'use client'

import {
  Tabs as Component,
  type TabsTabProps as ComponentProps,
} from '@base-ui/react/tabs'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'

export type TabsTabProps = ComponentProps & {
  className?: string
  style?: CSSProperties
}

// its children stack, so an icon sits above the label
export function Tab({ className, style, ...props }: TabsTabProps) {
  return (
    <Component.Tab
      {...props}
      {...merge(stylex.props(styles.main), className, style)}
    />
  )
}

// stylex doesn't order these against each other, so they must not overlap
const active = ':is([data-active]:not([data-disabled]))'
const disabled = ':is([data-disabled])'
const hover = ':is(:hover:not([data-active], [data-disabled]))'

const styles = stylex.create({
  main: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 'var(--radius-sm)',
    borderStyle: 'none',
    color: {
      [active]: 'var(--gray-12)',
      [disabled]: 'var(--gray-a8)',
      [hover]: {
        '@media (hover: hover)': 'var(--gray-12)',
        default: null,
      },
      default: 'var(--gray-a11)',
    },
    cursor: {
      [disabled]: 'not-allowed',
      default: 'pointer',
    },
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    font: 'inherit',
    gap: 'var(--tabs-tab-gap)',
    outline: {
      ':focus-visible': '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: -2,
    paddingBlock: 'var(--tabs-padding)',
    paddingInline: 0,
    // for a tab rendered as a link
    textDecoration: 'none',
    userSelect: 'none',
    // heavier text for the active tab without changing its width, which
    // would move the tabs after it
    WebkitTextStrokeColor: 'currentColor',
    WebkitTextStrokeWidth: {
      [active]: '0.35px',
      default: 0,
    },
    whiteSpace: 'nowrap',
  },
})
