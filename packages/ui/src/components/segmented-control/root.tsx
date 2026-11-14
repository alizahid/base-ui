import {
  RadioGroup as Component,
  type RadioGroupProps as ComponentProps,
} from '@base-ui/react/radio-group'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type RadiusToken, radii } from '../../lib/radii.js'
import { merge } from '../../lib/stylex.js'

export type SegmentedControlRootProps = Omit<
  ComponentProps,
  'className' | 'style'
> & {
  className?: string
  radius?: RadiusToken
  size?: '1' | '2' | '3'
  style?: CSSProperties
}

// a radio group underneath: exactly one item is selected, the arrow keys
// move the selection, and `name` submits it with a form. the indicator comes
// after the items and slides to the selected one
export function Root({
  children,
  className,
  radius,
  size = '2',
  style,
  ...props
}: SegmentedControlRootProps) {
  return (
    <Component
      {...props}
      {...merge(
        stylex.props(styles.main, sizes[size], radius && radii[radius]),
        className,
        style,
      )}
    >
      {children}

      <div {...stylex.props(styles.indicator)} />
    </Component>
  )
}

const disabled = ':is([data-disabled])'
const still = '@media (prefers-reduced-motion: reduce)'

// ported from radix themes' segmented-control.css. the items share the width
// equally, so the indicator is one share wide and sits at the selected
// item's share. both numbers come from css alone: the items are the only
// spans in the root (up to ten), so :nth-of-type counts them
const styles = stylex.create({
  indicator: {
    '--segmented-control-count': {
      ':is(span:nth-of-type(1):last-of-type ~ *)': '1',
      ':is(span:nth-of-type(2):last-of-type ~ *)': '2',
      ':is(span:nth-of-type(3):last-of-type ~ *)': '3',
      ':is(span:nth-of-type(4):last-of-type ~ *)': '4',
      ':is(span:nth-of-type(5):last-of-type ~ *)': '5',
      ':is(span:nth-of-type(6):last-of-type ~ *)': '6',
      ':is(span:nth-of-type(7):last-of-type ~ *)': '7',
      ':is(span:nth-of-type(8):last-of-type ~ *)': '8',
      ':is(span:nth-of-type(9):last-of-type ~ *)': '9',
      ':is(span:nth-of-type(10):last-of-type ~ *)': '10',
    },
    '--segmented-control-index': {
      ':is(span[data-checked]:nth-of-type(1) ~ *)': '0',
      ':is(span[data-checked]:nth-of-type(2) ~ *)': '1',
      ':is(span[data-checked]:nth-of-type(3) ~ *)': '2',
      ':is(span[data-checked]:nth-of-type(4) ~ *)': '3',
      ':is(span[data-checked]:nth-of-type(5) ~ *)': '4',
      ':is(span[data-checked]:nth-of-type(6) ~ *)': '5',
      ':is(span[data-checked]:nth-of-type(7) ~ *)': '6',
      ':is(span[data-checked]:nth-of-type(8) ~ *)': '7',
      ':is(span[data-checked]:nth-of-type(9) ~ *)': '8',
      ':is(span[data-checked]:nth-of-type(10) ~ *)': '9',
    },
    '::before': {
      backgroundColor: 'var(--segmented-control-fill)',
      borderRadius: 'inherit',
      boxShadow: 'var(--segmented-control-ring)',
      content: '""',
      inset: 'var(--segmented-control-inset)',
      position: 'absolute',
    },
    borderRadius: 'inherit',
    // only once an item is selected
    display: {
      ':is([data-checked] ~ *)': 'block',
      default: 'none',
    },
    height: '100%',
    insetInlineStart:
      'calc(100% / var(--segmented-control-count) * var(--segmented-control-index))',
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    transitionDuration: '100ms',
    transitionProperty: {
      [still]: 'none',
      default: 'inset-inline-start',
    },
    transitionTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
    width: 'calc(100% / var(--segmented-control-count))',
    zIndex: -1,
  },
  main: {
    '--segmented-control-fill': {
      [disabled]: 'var(--gray-a3)',
      default: 'var(--segmented-control-indicator)',
    },
    '--segmented-control-inset': {
      [disabled]: '0px',
      default: '1px',
    },
    '--segmented-control-ring': {
      [disabled]: 'none',
      default: '0 0 0 1px var(--gray-a4)',
    },
    alignItems: 'stretch',
    backgroundColor: {
      [disabled]: 'var(--gray-3)',
      default: 'var(--surface)',
    },
    backgroundImage: 'linear-gradient(var(--gray-a3), var(--gray-a3))',
    color: {
      [disabled]: 'var(--gray-a8)',
      default: 'var(--gray-12)',
    },
    display: 'inline-grid',
    gridAutoColumns: '1fr',
    gridAutoFlow: 'column',
    // a stacking context, so the indicator sits behind the items but above
    // the background
    isolation: 'isolate',
    minWidth: 'max-content',
    position: 'relative',
    textAlign: 'center',
    verticalAlign: 'top',
  },
})

const sizes = stylex.create({
  1: {
    '--segmented-control-gap': 'var(--spacing)',
    '--segmented-control-padding': 'calc(var(--spacing) * 3)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-xs)',
    height: 'calc(var(--spacing) * 6)',
    lineHeight: 'var(--text-xs--line-height)',
  },
  2: {
    '--segmented-control-gap': 'calc(var(--spacing) * 2)',
    '--segmented-control-padding': 'calc(var(--spacing) * 4)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--text-sm)',
    height: 'calc(var(--spacing) * 8)',
    lineHeight: 'var(--text-sm--line-height)',
  },
  3: {
    '--segmented-control-gap': 'calc(var(--spacing) * 3)',
    '--segmented-control-padding': 'calc(var(--spacing) * 4)',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--text-base)',
    height: 'calc(var(--spacing) * 10)',
    lineHeight: 'var(--text-base--line-height)',
  },
})
