import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { merge } from '../../lib/stylex.js'
import { tabSizes, tabs } from '../tabs/styles.js'

export type TabNavRootProps = Omit<ComponentProps<'nav'>, 'color'> & {
  color?: ColorToken | 'gray'
  highContrast?: boolean
  size?: '1' | '2'
}

// links between pages that look like Tabs. tabs switch a panel in place and
// are announced as tabs; these are a nav of plain links, with the current
// page marked. give it an aria-label
export function Root({
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
        stylex.props(tabSizes[size], tabs.list, highContrast && tabs.contrast),
        className,
        style,
      )}
    />
  )
}
