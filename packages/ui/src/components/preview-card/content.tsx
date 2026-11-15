'use client'

import {
  PreviewCard as Component,
  type PreviewCardPopupProps,
  type PreviewCardPositionerProps,
} from '@base-ui/react/preview-card'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, use } from 'react'

import { panel, panelSizes } from '#lib/panel.js'
import { merge } from '#lib/stylex.js'
import { ThemeContext } from '#lib/theme.js'

export type PreviewCardContentProps = PreviewCardPopupProps &
  Pick<PreviewCardPositionerProps, 'align' | 'side' | 'sideOffset'> & {
    className?: string
    size?: '1' | '2' | '3'
    style?: CSSProperties
  }

// opens below the trigger, lined up with its start edge, as in radix. `side`,
// `align` and `sideOffset` move it. capped at 512px wide; a max-w class
// changes that
export function Content({
  align = 'start',
  className,
  side,
  sideOffset = 8,
  size = '2',
  style,
  ...props
}: PreviewCardContentProps) {
  const theme = use(ThemeContext)

  return (
    <Component.Portal>
      <Component.Positioner
        align={align}
        collisionPadding={8}
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
            stylex.props(
              panel.content,
              panel.motion,
              panel.card,
              panelSizes[size],
            ),
            className,
            style,
          )}
        />
      </Component.Positioner>
    </Component.Portal>
  )
}
