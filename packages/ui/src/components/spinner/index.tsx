import * as stylex from '@stylexjs/stylex'
import { type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react'

import { merge } from '../../lib/stylex.js'

export type Spinner = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  size?: '1' | '2' | '3' | '4'
}

export function Spinner({
  children,
  className,
  disabled,
  size = '2',
  style,
  ...props
}: Spinner) {
  return (
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
  leaf: {
    '::before': {
      backgroundColor: 'var(--gray-12)',
      borderRadius: 'var(--radius-xs)',
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
    opacity: 0.65,
    position: 'relative',
  },
})

const sizes = stylex.create({
  1: {
    height: 'calc(var(--spacing) * 3)',
    width: 'calc(var(--spacing) * 3)',
  },
  2: {
    height: 'calc(var(--spacing) * 4)',
    width: 'calc(var(--spacing) * 4)',
  },
  3: {
    height: 'calc(var(--spacing) * 5)',
    width: 'calc(var(--spacing) * 5)',
  },
  4: {
    height: 'calc(var(--spacing) * 6)',
    width: 'calc(var(--spacing) * 6)',
  },
})
