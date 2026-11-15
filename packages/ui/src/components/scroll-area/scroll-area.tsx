'use client'

import {
  ScrollArea as Component,
  type ScrollAreaRootProps as ComponentProps,
} from '@base-ui/react/scroll-area'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'

export type ScrollAreaProps = ComponentProps & {
  // the directions it scrolls in, and has scrollbars for
  axis?: 'both' | 'x' | 'y'
  className?: string
  size?: '1' | '2' | '3'
  style?: CSSProperties
  // when the scrollbars show: while the pointer is over the area or it is
  // scrolling, only while scrolling, always, or never. radix calls this
  // `type`
  visibility?: 'always' | 'hover' | 'never' | 'scroll'
}

// give it a height (or a max-height) with a className; the children scroll
// inside. a scrollbar only exists while there is something to scroll
export function ScrollArea({
  axis = 'both',
  children,
  className,
  size = '1',
  style,
  visibility = 'hover',
  ...props
}: ScrollAreaProps) {
  const bar = stylex.props(
    styles.scrollbar,
    sizes[size],
    visibility !== 'never' && visibilities[visibility],
  )
  const thumb = stylex.props(styles.thumb)

  return (
    <Component.Root
      {...props}
      {...merge(stylex.props(styles.main), className, style)}
    >
      <Component.Viewport
        {...stylex.props(styles.viewport, axis !== 'both' && axes[axis])}
      >
        {children}
      </Component.Viewport>

      {axis === 'x' || visibility === 'never' ? null : (
        <Component.Scrollbar {...bar}>
          <Component.Thumb {...thumb} />
        </Component.Scrollbar>
      )}

      {axis === 'y' || visibility === 'never' ? null : (
        <Component.Scrollbar orientation="horizontal" {...bar}>
          <Component.Thumb {...thumb} />
        </Component.Scrollbar>
      )}

      {axis === 'both' && visibility !== 'never' ? <Component.Corner /> : null}
    </Component.Root>
  )
}

const vertical = ':is([data-orientation="vertical"])'
const horizontal = ':is([data-orientation="horizontal"])'
const still = '@media (prefers-reduced-motion: reduce)'

// ported from radix themes' scroll-area.css
const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    // the ring for the scrolling box is drawn here, so it takes this
    // element's own corners and sits over its border, as on a TextField
    outline: {
      ':has(> :focus-visible)': '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: -1,
    overflow: 'hidden',
  },
  scrollbar: {
    backgroundColor: 'var(--gray-a3)',
    borderRadius: 'calc(infinity * 1px)',
    display: 'flex',
    flexDirection: {
      [vertical]: 'column',
    },
    height: {
      [horizontal]: 'var(--scroll-area-size)',
    },
    margin: 'var(--ui-spacing)',
    opacity: 'var(--scroll-area-opacity)',
    transitionDuration: '100ms',
    transitionProperty: {
      [still]: 'none',
      default: 'opacity',
    },
    transitionTimingFunction: 'ease-out',
    width: {
      [vertical]: 'var(--scroll-area-size)',
    },
  },
  thumb: {
    // a larger hit area than the thin bar
    '::before': {
      content: '""',
      height: '100%',
      left: '50%',
      minHeight: 'calc(var(--ui-spacing) * 4)',
      minWidth: 'calc(var(--ui-spacing) * 4)',
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
    },
    backgroundColor: {
      ':hover': {
        '@media (hover: hover)': 'var(--gray-a9)',
        default: null,
      },
      default: 'var(--gray-a8)',
    },
    borderRadius: 'inherit',
    position: 'relative',
    transitionDuration: '100ms',
    transitionProperty: 'background-color',
  },
  viewport: {
    flexGrow: 1,
    minHeight: 0,
    outline: 'none',
    // stops the browser's back and forward swipe while scrolling sideways
    overscrollBehaviorX: 'contain',
  },
})

// base ui sets overflow on the viewport's own style, so these have to win
// over it
const axes = stylex.create({
  x: {
    overflowY: 'hidden !important',
  },
  y: {
    overflowX: 'hidden !important',
  },
})

const visibilities = stylex.create({
  always: {
    '--scroll-area-opacity': '1',
  },
  hover: {
    '--scroll-area-opacity': {
      ':is([data-hovering], [data-scrolling])': '1',
      default: '0',
    },
  },
  scroll: {
    '--scroll-area-opacity': {
      ':is([data-scrolling])': '1',
      default: '0',
    },
  },
})

const sizes = stylex.create({
  1: {
    '--scroll-area-size': 'var(--ui-spacing)',
  },
  2: {
    '--scroll-area-size': 'calc(var(--ui-spacing) * 2)',
  },
  3: {
    '--scroll-area-size': 'calc(var(--ui-spacing) * 3)',
  },
})
