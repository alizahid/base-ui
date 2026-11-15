import * as stylex from '@stylexjs/stylex'
import { type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react'

import { merge } from '../../lib/stylex.js'

export type SpinnerProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  // with children: true shows the spinner over their space, false shows them
  loading?: boolean
  size?: '1' | '2' | '3' | '4'
}

export function Spinner({
  children,
  className,
  disabled,
  loading = true,
  size = '2',
  style,
  ...props
}: SpinnerProps) {
  if (!loading) {
    return children
  }

  const spinner = (
    <span
      {...props}
      {...merge(stylex.props(styles.main, sizes[size]), className, style)}
    >
      <span {...stylex.props(styles.leaf)} />
      <span {...stylex.props(styles.leaf)} />
      <span {...stylex.props(styles.leaf)} />
      <span {...stylex.props(styles.leaf)} />
      <span {...stylex.props(styles.leaf)} />
      <span {...stylex.props(styles.leaf)} />
      <span {...stylex.props(styles.leaf)} />
      <span {...stylex.props(styles.leaf)} />
    </span>
  )

  if (children === undefined) {
    return spinner
  }

  // the children keep their space, hidden, with the spinner centred over it,
  // so nothing moves when loading ends
  return (
    <span {...stylex.props(styles.wrapper)}>
      <span aria-hidden {...stylex.props(styles.hidden)}>
        {children}
      </span>

      <span {...stylex.props(styles.overlay)}>{spinner}</span>
    </span>
  )
}

const spinner = stylex.keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0.25,
  },
})

const styles = stylex.create({
  // display: contents drops it from the accessibility tree in some browsers,
  // so it is aria-hidden as well
  hidden: {
    display: 'contents',
    visibility: 'hidden',
  },
  leaf: {
    '::before': {
      backgroundColor: 'var(--gray-12)',
      borderRadius: 'var(--ui-radius-xs)',
      content: '',
      display: 'block',
      height: '30%',
      width: '100%',
    },
    ':nth-child(1)': {
      animationDelay: 'calc(-8 / 8 * var(--duration))',
      transform: 'rotate(0deg)',
    },
    ':nth-child(2)': {
      animationDelay: 'calc(-7 / 8 * var(--duration))',
      transform: 'rotate(45deg)',
    },
    ':nth-child(3)': {
      animationDelay: 'calc(-6 / 8 * var(--duration))',
      transform: 'rotate(90deg)',
    },
    ':nth-child(4)': {
      animationDelay: 'calc(-5 / 8 * var(--duration))',
      transform: 'rotate(135deg)',
    },
    ':nth-child(5)': {
      animationDelay: 'calc(-4 / 8 * var(--duration))',
      transform: 'rotate(180deg)',
    },
    ':nth-child(6)': {
      animationDelay: 'calc(-3 / 8 * var(--duration))',
      transform: 'rotate(225deg)',
    },
    ':nth-child(7)': {
      animationDelay: 'calc(-2 / 8 * var(--duration))',
      transform: 'rotate(270deg)',
    },
    ':nth-child(8)': {
      animationDelay: 'calc(-1 / 8 * var(--duration))',
      transform: 'rotate(315deg)',
    },
    animationDuration: 'var(--duration)',
    animationIterationCount: 'infinite',
    animationName: spinner,
    animationTimingFunction: 'linear',
    height: '100%',
    left: 'calc(50% - 12.5% / 2)',
    position: 'absolute',
    top: 0,
    width: '12.5%',
  },
  main: {
    '--duration': '800ms',
    display: 'block',
    opacity: 'var(--spinner-opacity, 0.65)',
    position: 'relative',
  },
  overlay: {
    alignItems: 'center',
    display: 'flex',
    inset: 0,
    justifyContent: 'center',
    position: 'absolute',
  },
  wrapper: {
    alignItems: 'center',
    display: 'inline-flex',
    // the hidden children are laid out as they would be in the parent, so
    // the space they hold is the same size
    gap: 'inherit',
    justifyContent: 'center',
    position: 'relative',
  },
})

const sizes = stylex.create({
  1: {
    height: 'calc(var(--ui-spacing) * 3)',
    width: 'calc(var(--ui-spacing) * 3)',
  },
  2: {
    height: 'calc(var(--ui-spacing) * 4)',
    width: 'calc(var(--ui-spacing) * 4)',
  },
  3: {
    height: 'calc(var(--ui-spacing) * 5)',
    width: 'calc(var(--ui-spacing) * 5)',
  },
  4: {
    height: 'calc(var(--ui-spacing) * 6)',
    width: 'calc(var(--ui-spacing) * 6)',
  },
})
