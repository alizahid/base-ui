'use client'

import {
  Tooltip as Component,
  type TooltipPositionerProps,
  type TooltipRootProps,
  type TooltipTriggerProps,
} from '@base-ui/react/tooltip'
import * as stylex from '@stylexjs/stylex'
import {
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  use,
} from 'react'

import { merge } from '../../lib/stylex.js'
import { ThemeContext } from '../../lib/theme.js'

export type TooltipProps = Pick<
  TooltipRootProps,
  'defaultOpen' | 'disabled' | 'onOpenChange' | 'open'
> &
  Pick<TooltipPositionerProps, 'align' | 'side' | 'sideOffset'> &
  Pick<TooltipTriggerProps, 'closeDelay' | 'delay'> & {
    children: ReactElement
    className?: string
    content: ReactNode
    style?: CSSProperties
  }

// one component, as in radix themes: wrap the element the tooltip is for and
// pass the text as `content`. the child becomes the trigger, so it has to be a
// single element that takes a ref and event handlers
export function Tooltip({
  align,
  children,
  className,
  closeDelay,
  content,
  delay,
  side,
  sideOffset = 4,
  style,
  ...props
}: TooltipProps) {
  const theme = use(ThemeContext)

  return (
    <Component.Root {...props}>
      <Component.Trigger
        closeDelay={closeDelay}
        delay={delay}
        render={children}
      />

      <Component.Portal>
        <Component.Positioner
          align={align}
          collisionPadding={10}
          side={side}
          sideOffset={sideOffset}
          {...stylex.props(styles.positioner)}
        >
          {/* portaled out of the provider's element, so its gray is set again */}
          <Component.Popup
            data-gray={theme.gray}
            {...merge(stylex.props(styles.content), className, style)}
          >
            {content}

            <Component.Arrow {...stylex.props(styles.arrow)} />
          </Component.Popup>
        </Component.Positioner>
      </Component.Portal>
    </Component.Root>
  )
}

const hidden = ':is([data-starting-style], [data-ending-style])'

// ported from radix themes' tooltip.css. inverted: the darkest gray behind the
// lightest text
const styles = stylex.create({
  // a square turned 45 degrees, half of it tucked under the popup. base ui
  // places it along the edge; these pull it out on whichever side it is on
  arrow: {
    backgroundColor: 'var(--gray-12)',
    bottom: {
      ':is([data-side="top"])': -4,
    },
    height: 8,
    left: {
      ':is([data-side="right"])': -4,
    },
    right: {
      ':is([data-side="left"])': -4,
    },
    top: {
      ':is([data-side="bottom"])': -4,
    },
    transform: 'rotate(45deg)',
    width: 8,
  },
  content: {
    backgroundColor: 'var(--gray-12)',
    borderRadius: 'var(--radius-md)',
    boxSizing: 'border-box',
    color: 'var(--gray-1)',
    cursor: 'default',
    fontSize: 'var(--text-xs)',
    lineHeight: 'var(--text-xs--line-height)',
    maxWidth: 360,
    opacity: {
      [hidden]: 0,
      default: 1,
    },
    paddingBlock: 'var(--spacing)',
    paddingInline: 'calc(var(--spacing) * 2)',
    transform: {
      [hidden]: 'scale(0.97)',
      default: 'none',
    },
    transformOrigin: 'var(--transform-origin)',
    transitionDuration: {
      '@media (prefers-reduced-motion: reduce)': '0s',
      default: '140ms',
    },
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    userSelect: 'none',
  },
  positioner: {
    outline: 'none',
    zIndex: 1,
  },
})
