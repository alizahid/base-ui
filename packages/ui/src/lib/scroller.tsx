'use client'

import { type ComponentProps } from 'react'

type Props = ComponentProps<'div'> & {
  as?: 'div' | 'ol'
}

// a row that scrolls sideways, and starts out scrolled to its active item:
// the selected tab, the current link or the current step. only once, when it
// mounts, and only the row moves, never the page. the styles that make it
// scroll are the caller's. a client component of its own, so a component that
// has no other reason to be one can use it
export function Scroller({ as = 'div', ...props }: Props) {
  // the two take the same props here
  const Tag = as as 'div'

  return <Tag ref={reveal} {...props} />
}

// centres the active item in the row. the row clamps the scroll, so a row
// that fits doesn't move
function reveal(row: HTMLElement | null) {
  const item = row?.querySelector('[aria-current], [data-active]')

  if (!(row && item)) {
    return
  }

  const outer = row.getBoundingClientRect()
  const inner = item.getBoundingClientRect()

  row.scrollLeft += inner.left - outer.left - (outer.width - inner.width) / 2
}
