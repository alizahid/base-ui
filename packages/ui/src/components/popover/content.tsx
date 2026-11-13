'use client'

import {
  Popover as Component,
  type PopoverPopupProps,
  type PopoverPositionerProps,
} from '@base-ui/react/popover'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, use } from 'react'

import { panel, panelSizes } from '../../lib/panel.js'
import { merge } from '../../lib/stylex.js'
import { ThemeContext } from '../../lib/theme.js'

export type PopoverContentProps = PopoverPopupProps &
  Pick<PopoverPositionerProps, 'align' | 'side' | 'sideOffset'> & {
    className?: string
    size?: '1' | '2' | '3' | '4'
    style?: CSSProperties
  }

// opens below the trigger, lined up with its start edge, as in radix. `side`,
// `align` and `sideOffset` move it. capped at 480px wide; a max-w class
// changes that
export function Content({
  align = 'start',
  className,
  side,
  sideOffset = 8,
  size = '2',
  style,
  ...props
}: PopoverContentProps) {
  const theme = use(ThemeContext)

  return (
    <Component.Portal>
      <Component.Positioner
        align={align}
        collisionPadding={10}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(panel.positioner)}
      >
        {/* portaled out of the provider's element, so its colors are set
            again for everything inside */}
        <Component.Popup
          data-accent={theme.accent}
          data-gray={theme.gray}
          {...props}
          {...merge(
            stylex.props(panel.content, panelSizes[size]),
            className,
            style,
          )}
        />
      </Component.Positioner>
    </Component.Portal>
  )
}
