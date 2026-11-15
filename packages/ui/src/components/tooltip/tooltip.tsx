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

import { panel } from '../../lib/panel.js'
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
  delay = 200,
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
          collisionPadding={8}
          side={side}
          sideOffset={sideOffset}
          {...stylex.props(panel.positioner)}
        >
          {/* portaled out of the provider's element, so its gray is set again */}
          <Component.Popup
            data-gray={theme.gray}
            {...merge(
              stylex.props(panel.motion, styles.content),
              className,
              style,
            )}
          >
            {content}

            <Component.Arrow {...stylex.props(styles.arrow)} />
          </Component.Popup>
        </Component.Positioner>
      </Component.Portal>
    </Component.Root>
  )
}

// ported from radix themes' tooltip.css. inverted: the darkest gray behind the
// lightest text
const styles = stylex.create({
  // a square turned 45 degrees, half of it tucked under the popup. base ui
  // places it along the edge; these pull it out on whichever side it is on
  arrow: {
    backgroundColor: 'var(--gray-12)',
    bottom: {
      ':is([data-side="top"])': 'calc(var(--spacing) * -1)',
    },
    height: 'calc(var(--spacing) * 2)',
    left: {
      ':is([data-side="right"])': 'calc(var(--spacing) * -1)',
    },
    right: {
      ':is([data-side="left"])': 'calc(var(--spacing) * -1)',
    },
    top: {
      ':is([data-side="bottom"])': 'calc(var(--spacing) * -1)',
    },
    transform: 'rotate(45deg)',
    width: 'calc(var(--spacing) * 2)',
  },
  content: {
    backgroundColor: 'var(--gray-12)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--gray-1)',
    cursor: 'default',
    fontSize: 'var(--text-xs)',
    lineHeight: 'var(--text-xs--line-height)',
    maxWidth: 'calc(var(--spacing) * 96)',
    paddingBlock: 'var(--spacing)',
    paddingInline: 'calc(var(--spacing) * 2)',
    // as in radix, only the delayed open animates: closing, and opening
    // straight after another tooltip, are instant
    transitionDuration: {
      ':is([data-ending-style], [data-instant])': '0s',
      default: '150ms',
    },
    userSelect: 'none',
  },
})
