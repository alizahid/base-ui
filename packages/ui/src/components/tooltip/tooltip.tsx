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
const still = '@media (prefers-reduced-motion: reduce)'

// radix slides a popup 4px towards its trigger as it fades: the offset depends
// on which side of the trigger it sits. written out, as stylex has to be able
// to read these at build time
const top =
  ':is(:is([data-starting-style], [data-ending-style])[data-side="top"])'
const bottom =
  ':is(:is([data-starting-style], [data-ending-style])[data-side="bottom"])'
const left =
  ':is(:is([data-starting-style], [data-ending-style])[data-side="left"])'
const right =
  ':is(:is([data-starting-style], [data-ending-style])[data-side="right"])'
const other =
  ':is(:is([data-starting-style], [data-ending-style]):not([data-side="top"], [data-side="bottom"], [data-side="left"], [data-side="right"]))'

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
      [other]: 'scale(0.97)',
      [bottom]: 'translateY(-4px) scale(0.97)',
      [left]: 'translateX(4px) scale(0.97)',
      [right]: 'translateX(-4px) scale(0.97)',
      [top]: 'translateY(4px) scale(0.97)',
      default: 'none',
    },
    transformOrigin: 'var(--transform-origin)',
    // as in radix, only the delayed open animates: closing, and opening
    // straight after another tooltip, are instant
    transitionDuration: {
      ':is([data-ending-style], [data-instant])': '0s',
      default: '140ms',
    },
    // no motion at all for people who ask for less of it
    transitionProperty: {
      [still]: 'none',
      default: 'opacity, transform',
    },
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    userSelect: 'none',
  },
  positioner: {
    outline: 'none',
    zIndex: 1,
  },
})
