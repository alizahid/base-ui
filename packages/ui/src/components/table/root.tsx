import * as stylex from '@stylexjs/stylex'
import { type ComponentProps } from 'react'

import { merge } from '../../lib/stylex.js'

export type TableRootProps = ComponentProps<'div'> & {
  size?: '1' | '2' | '3'
  variant?: 'surface' | 'ghost'
}

// a wrapper that scrolls sideways when the table is wider than it. the box
// inside is as wide as the table, so a surface table's border scrolls with
// it. the options only set variables; the box and cells read them
export function Root({
  children,
  className,
  size = '2',
  style,
  variant = 'ghost',
  ...props
}: TableRootProps) {
  return (
    <div
      {...props}
      {...merge(
        stylex.props(styles.main, variants[variant], sizes[size]),
        className,
        style,
      )}
    >
      <div
        {...stylex.props(styles.box, variant === 'surface' && styles.surface)}
      >
        <table {...stylex.props(styles.table)}>{children}</table>
      </div>
    </div>
  )
}

// ported from radix themes' table.css. radix wraps the table in its scroll
// area; this scrolls natively
const styles = stylex.create({
  // at least as wide as the wrapper, and as wide as the table once the table
  // can't shrink any further
  box: {
    minWidth: '100%',
    width: 'fit-content',
  },
  // scrolls sideways without showing a scrollbar
  main: {
    '::-webkit-scrollbar': {
      display: 'none',
    },
    overflowX: 'auto',
    scrollbarWidth: 'none',
  },
  // a panel, like Card: the provider's panelBackground applies
  surface: {
    backdropFilter: 'var(--panel-backdrop, none)',
    backgroundClip: 'padding-box',
    backgroundColor: 'var(--panel, var(--panel-background))',
    borderColor: 'color-mix(in oklab, var(--gray-a5), var(--gray-6))',
    borderRadius: 'var(--table-radius)',
    borderWidth: 1,
    // clips the header's tint to the rounded corners
    overflow: 'hidden',
  },
  table: {
    color: 'var(--gray-12)',
    // makes "height: 100%" work on content inside cells
    height: 0,
    textAlign: 'start',
    width: '100%',
  },
})

const variants = stylex.create({
  ghost: {
    '--table-header': 'transparent',
    '--table-last-row': 'inset 0 -1px var(--gray-a5)',
  },
  surface: {
    '--table-header': 'var(--gray-a2)',
    '--table-last-row': 'none',
  },
})

const sizes = stylex.create({
  1: {
    '--table-cell-height': 'calc(var(--ui-spacing) * 9)',
    '--table-cell-padding': 'calc(var(--ui-spacing) * 2)',
    '--table-radius': 'var(--ui-radius-md)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
  2: {
    '--table-cell-height': 'calc(var(--ui-spacing) * 11)',
    '--table-cell-padding': 'calc(var(--ui-spacing) * 3)',
    '--table-radius': 'var(--ui-radius-lg)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
  3: {
    '--table-cell-height': 'calc(var(--ui-spacing) * 12)',
    '--table-cell-padding':
      'calc(var(--ui-spacing) * 3) calc(var(--ui-spacing) * 4)',
    '--table-radius': 'var(--ui-radius-lg)',
    fontSize: 'var(--ui-text-base)',
    lineHeight: 'var(--ui-text-base--line-height)',
  },
})
