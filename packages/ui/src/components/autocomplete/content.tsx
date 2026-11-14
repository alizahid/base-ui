'use client'

import {
  type AutocompleteListProps,
  type AutocompletePopupProps,
  Autocomplete as Component,
} from '@base-ui/react/autocomplete'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, type ReactNode, use } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { listbox, listboxSizes, listboxVariants } from '../../lib/listbox.js'
import { SizeContext } from '../../lib/size.js'
import { merge } from '../../lib/stylex.js'
import { ThemeContext } from '../../lib/theme.js'
import { itemLabel } from '../combobox/utils.js'
import { Group } from './group.js'
import { Item } from './item.js'
import { Label } from './label.js'

export type AutocompleteContentProps = Omit<
  AutocompletePopupProps,
  'children'
> & {
  children?: AutocompleteListProps['children']
  className?: string
  color?: ColorToken | 'gray'
  empty?: ReactNode
  highContrast?: boolean
  status?: ReactNode
  style?: CSSProperties
  variant?: 'solid' | 'soft'
}

// children are optional. left out, each of the root's `items` renders as an
// Item showing its label, which covers a plain list of strings or of
// { label } objects, and { label, items } renders as a labelled group. pass a function, (item) => <Autocomplete.Item />, for
// custom rows. `empty` is shown when nothing matches what was typed, and
// `status` whenever it is set ("Loading…")
export function Content({
  children = renderItem,
  className,
  color,
  empty,
  highContrast,
  status,
  style,
  variant = 'solid',
  ...props
}: AutocompleteContentProps) {
  const size = use(SizeContext)
  const theme = use(ThemeContext)

  return (
    <Component.Portal>
      <Component.Positioner sideOffset={4} {...stylex.props(styles.positioner)}>
        {/* portaled out of the provider's element, so its colors are set again */}
        <Component.Popup
          data-accent={color ?? theme.accent}
          data-gray={theme.gray}
          {...props}
          {...merge(
            stylex.props(
              listbox.content,
              listboxVariants[variant],
              highContrast && variant === 'solid' && listbox.contrast,
              listboxSizes[size],
              styles.content,
            ),
            className,
            style,
          )}
        >
          {status ? (
            <Component.Status {...stylex.props(styles.empty)}>
              {status}
            </Component.Status>
          ) : null}

          {/* base ui keeps this mounted and only fills it when there are no
              matches, so the padding is on the inner element */}
          {empty ? (
            <Component.Empty>
              <div {...stylex.props(styles.empty)}>{empty}</div>
            </Component.Empty>
          ) : null}

          <Component.List {...stylex.props(listbox.list, styles.list)}>
            {children}
          </Component.List>
        </Component.Popup>
      </Component.Positioner>
    </Component.Portal>
  )
}

function renderItem(item: unknown) {
  const label = itemLabel(item)

  // a group: { label, items }
  if (typeof item === 'object' && item !== null && 'items' in item) {
    return (
      <Group items={item.items as Array<unknown>} key={label}>
        <Label>{label}</Label>

        <Component.Collection>{renderItem}</Component.Collection>
      </Group>
    )
  }

  return (
    <Item key={label} value={item}>
      {label}
    </Item>
  )
}

const styles = stylex.create({
  // as wide as the input
  content: {
    maxWidth: 'var(--available-width)',
    width: 'var(--anchor-width)',
  },
  empty: {
    color: 'var(--gray-a10)',
    paddingBlock: 'calc(var(--listbox-content-padding) + var(--spacing) * 2)',
    paddingInline: 'calc(var(--listbox-content-padding) + var(--spacing) * 2)',
  },
  list: {
    maxHeight: 'min(22.5rem, var(--available-height))',
    overscrollBehavior: 'contain',
    padding: {
      ':is([data-empty])': 0,
      default: 'var(--listbox-content-padding)',
    },
    scrollPaddingBlock: 'var(--listbox-content-padding)',
  },
  positioner: {
    outline: 'none',
    zIndex: 1,
  },
})
