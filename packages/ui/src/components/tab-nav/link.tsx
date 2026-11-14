'use client'

import { useRender } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'

import { merge } from '../../lib/stylex.js'
import { tabs } from '../tabs/styles.js'

export type TabNavLinkProps = useRender.ComponentProps<'a'> & {
  // marks the link for the current page
  active?: boolean
}

// an anchor by default; `render` swaps in a framework's link
export function Link({
  active,
  className,
  render,
  style,
  ...props
}: TabNavLinkProps) {
  return useRender({
    defaultTagName: 'a',
    props: {
      'aria-current': active ? 'page' : undefined,
      'data-active': active ? '' : undefined,
      ...props,
      ...merge(
        stylex.props(tabs.tab, styles.main),
        typeof className === 'string' ? className : undefined,
        typeof style === 'object' ? style : undefined,
      ),
    },
    render,
  })
}

const styles = stylex.create({
  // the line under the current page is the link's own: the page changes, so
  // there is nothing to slide and nothing to measure
  main: {
    '::after': {
      backgroundColor: 'var(--tabs-indicator, var(--accent-indicator))',
      bottom: 0,
      content: {
        ':is([data-active])': '""',
        default: 'none',
      },
      height: 2,
      insetInline: 0,
      position: 'absolute',
    },
  },
})
