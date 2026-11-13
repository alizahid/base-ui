'use client'

import {
  Select as Component,
  type SelectPopupProps,
} from '@base-ui/react/select'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, use } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { ChevronDownIcon } from '../../lib/icons.js'
import { merge } from '../../lib/stylex.js'
import { ThemeContext } from '../../lib/theme.js'
import { SizeContext } from './context.js'

export type SelectContentProps = SelectPopupProps & {
  className?: string
  color?: ColorToken | 'gray'
  highContrast?: boolean
  style?: CSSProperties
  variant?: 'solid' | 'soft'
}

export function Content({
  children,
  className,
  color,
  highContrast,
  style,
  variant = 'solid',
  ...props
}: SelectContentProps) {
  const size = use(SizeContext)
  const theme = use(ThemeContext)

  return (
    <Component.Portal>
      <Component.Positioner sideOffset={4} {...stylex.props(styles.positioner)}>
        {/* portaled out of the provider's element, so its colors are set again */}
        <Component.Popup
          data-accent={color ?? theme.accent}
          data-gray={theme.gray}
          {...props}
          {...merge(
            stylex.props(
              styles.content,
              contentVariants[variant],
              highContrast && variant === 'solid' && styles.contrast,
              contentSizes[size],
            ),
            className,
            style,
          )}
        >
          {/* as in base ui's own select: the list scrolls, with arrows that
              appear at either end while there is more to scroll to */}
          <Component.ScrollUpArrow
            {...stylex.props(styles.arrow, styles.arrowUp)}
          >
            <ChevronDownIcon {...stylex.props(styles.chevron, styles.flip)} />
          </Component.ScrollUpArrow>

          <Component.List {...stylex.props(styles.list)}>
            {children}
          </Component.List>

          <Component.ScrollDownArrow
            {...stylex.props(styles.arrow, styles.arrowDown)}
          >
            <ChevronDownIcon {...stylex.props(styles.chevron)} />
          </Component.ScrollDownArrow>
        </Component.Popup>
      </Component.Positioner>
    </Component.Portal>
  )
}

// ported from radix themes' select.css, with solid colors in place of alpha
// ones. the invalid state is ours, for Field. a ghost trigger is a standard
// one with a transparent background, without radix's negative margins
const styles = stylex.create({
  // the ::before stretches the hover area past the popup's edge when the popup
  // is aligned over the trigger, as in base ui's example
  arrow: {
    '--select-arrow-reach': {
      ':is([data-side="none"])': '-100%',
      default: '0',
    },
    '::before': {
      content: '',
      height: '100%',
      insetInlineStart: 0,
      position: 'absolute',
      width: '100%',
    },
    alignItems: 'center',
    backgroundColor: 'var(--panel-background)',
    color: 'var(--gray-11)',
    cursor: 'default',
    display: 'flex',
    height: 'calc(var(--spacing) * 5)',
    justifyContent: 'center',
    width: '100%',
    zIndex: 1,
  },
  arrowDown: {
    '::before': {
      bottom: 'var(--select-arrow-reach)',
    },
    borderEndEndRadius: 'inherit',
    borderEndStartRadius: 'inherit',
    bottom: 0,
  },
  arrowUp: {
    '::before': {
      top: 'var(--select-arrow-reach)',
    },
    borderStartEndRadius: 'inherit',
    borderStartStartRadius: 'inherit',
    top: 0,
  },
  chevron: {
    height: 9,
    width: 9,
  },
  content: {
    backgroundColor: 'var(--panel-background)',
    boxShadow: 'var(--panel-shadow)',
    boxSizing: 'border-box',
    color: 'var(--gray-12)',
    maxHeight: 'var(--available-height)',
    minWidth: 'var(--anchor-width)',
    // base ui focuses the popup when it opens; the highlighted item shows focus
    outline: 'none',
    overflow: 'hidden',
    transformOrigin: 'var(--transform-origin)',
  },
  contrast: {
    '--select-highlight': 'var(--accent-12)',
    '--select-highlight-color': 'var(--accent-1)',
  },
  flip: {
    transform: 'scaleY(-1)',
  },
  list: {
    boxSizing: 'border-box',
    maxHeight: 'var(--available-height)',
    outline: 'none',
    overflowY: 'auto',
    padding: 'var(--select-content-padding)',
    position: 'relative',
    // keeps the highlighted item clear of the scroll arrows
    scrollPaddingBlock: 'calc(var(--spacing) * 6)',
  },
  positioner: {
    outline: 'none',
    zIndex: 1,
  },
})

// what a highlighted item looks like
const contentVariants = stylex.create({
  soft: {
    '--select-highlight': 'var(--accent-4)',
    '--select-highlight-color': 'inherit',
  },
  solid: {
    '--select-highlight': 'var(--accent-9)',
    '--select-highlight-color': 'var(--accent-contrast)',
  },
})

// set on the popup; the items, labels and separators inside inherit them
const contentSizes = stylex.create({
  1: {
    '--select-check-size': '8px',
    '--select-content-padding': 'var(--spacing)',
    '--select-indicator-width': 'calc(var(--spacing) * 5)',
    '--select-item-height': 'calc(var(--spacing) * 6)',
    '--select-item-radius': 'var(--radius-sm)',
    '--select-separator-margin': 'calc(var(--spacing) * 2)',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--text-xs)',
    lineHeight: 'var(--text-xs--line-height)',
  },
  2: {
    '--select-check-size': '10px',
    '--select-content-padding': 'calc(var(--spacing) * 2)',
    '--select-indicator-width': 'calc(var(--spacing) * 6)',
    '--select-item-height': 'calc(var(--spacing) * 8)',
    '--select-item-radius': 'var(--radius-md)',
    '--select-separator-margin': 'calc(var(--spacing) * 3)',
    borderRadius: 'var(--radius-xl)',
    fontSize: 'var(--text-sm)',
    lineHeight: 'var(--text-sm--line-height)',
  },
  3: {
    '--select-check-size': '10px',
    '--select-content-padding': 'calc(var(--spacing) * 2)',
    '--select-indicator-width': 'calc(var(--spacing) * 6)',
    '--select-item-height': 'calc(var(--spacing) * 8)',
    '--select-item-radius': 'var(--radius-md)',
    '--select-separator-margin': 'calc(var(--spacing) * 3)',
    borderRadius: 'var(--radius-xl)',
    fontSize: 'var(--text-base)',
    lineHeight: 'var(--text-sm--line-height)',
  },
})
