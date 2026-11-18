import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { tabSizes, tabs } from '#components/tabs/styles.js'
import { type ColorToken } from '#lib/colors.js'
import { merge } from '#lib/stylex.js'

export type TabNavRootProps = Omit<ComponentProps<'nav'>, 'color'> & {
  color?: ColorToken | 'gray'
  highContrast?: boolean
  size?: '1' | '2'
}

// links between pages that look like Tabs. tabs switch a panel in place and
// are announced as tabs; these are a nav of plain links, with the current
// page marked. give it an aria-label. the row scrolls sideways when the links
// don't fit
export function Root({
  children,
  className,
  color,
  highContrast,
  size = '2',
  style,
  ...props
}: TabNavRootProps) {
  return (
    <nav
      data-accent={color}
      {...props}
      {...merge(
        stylex.props(tabSizes[size], highContrast && tabs.contrast),
        className,
        style,
      )}
    >
      {/* the scroller is wider than the nav, to leave room for a focus ring
          at either end, so it is its own element and a width given to the
          nav is the width of the row */}
      <div {...stylex.props(tabs.scroll)}>
        <div {...stylex.props(tabs.list)}>{children}</div>
      </div>
    </nav>
  )
}
