import * as stylex from '@stylexjs/stylex'
import {
  type ComponentProps,
  cloneElement,
  isValidElement,
  type ReactElement,
} from 'react'

import { merge } from '#lib/stylex.js'

export type SkeletonProps = ComponentProps<'span'> & {
  loading?: boolean
}

// while loading, a gray pulsing block in place of its children. around an
// element it takes that element's shape; around text it covers the text;
// empty, it is a block to size with a className
export function Skeleton({
  children,
  className,
  loading = true,
  style,
  ...props
}: SkeletonProps) {
  if (!loading) {
    return children
  }

  const shared = {
    'aria-hidden': true,
    'data-skeleton': '',
    inert: true,
    tabIndex: -1,
  }

  // the look goes onto the element itself, so the skeleton has its size,
  // radius and place in the layout
  if (isValidElement(children)) {
    const child = children as ReactElement<ComponentProps<'span'>>

    return cloneElement(child, {
      ...shared,
      ...merge(
        merge(stylex.props(styles.main), child.props.className),
        className,
        style,
      ),
    })
  }

  return (
    <span
      {...shared}
      {...props}
      {...merge(stylex.props(styles.main, styles.inline), className, style)}
    >
      {children}
    </span>
  )
}

// opacity rather than colour, so the pulse doesn't repaint
const pulse = stylex.keyframes({
  from: {
    opacity: 0.7,
  },
  to: {
    opacity: 1,
  },
})

// ported from radix themes' skeleton.css. the !importants are radix's: this
// has to win over the styles of whatever it is put on. the rule that hides
// the children is in theme.css, as stylex can't target them
const styles = stylex.create({
  // the span form, around text or empty. it has its own corners, where a
  // skeleton on an element keeps that element's
  inline: {
    borderRadius: 'var(--ui-radius-xs)',
  },
  main: {
    animationDirection: 'alternate-reverse',
    animationDuration: '1000ms',
    animationIterationCount: 'infinite',
    animationName: pulse,
    backgroundClip: 'border-box !important',
    backgroundColor: 'var(--gray-a4) !important',
    backgroundImage: 'none !important',
    borderStyle: 'none !important',
    boxDecorationBreak: 'clone',
    boxShadow: 'none !important',
    color: 'transparent !important',
    cursor: 'default !important',
    display: {
      ':empty': 'block',
    },
    height: {
      ':empty': 'calc(var(--ui-spacing) * 3)',
    },
    outline: 'none !important',
    pointerEvents: 'none',
    userSelect: 'none',
  },
})
