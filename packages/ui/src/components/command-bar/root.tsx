'use client'

import { Autocomplete } from '@base-ui/react/autocomplete'
import { Dialog } from '@base-ui/react/dialog'
import * as stylex from '@stylexjs/stylex'
import { type ReactNode, use, useCallback, useMemo, useState } from 'react'

import { flush } from '#components/autocomplete/styles.js'
import { dialog } from '#components/dialog/content.js'
import { ScrollArea } from '#components/scroll-area/scroll-area.js'
import { listbox, listboxSize, listboxVariants } from '#lib/listbox.js'
import { ThemeContext } from '#lib/theme.js'

import {
  CommandBarContext,
  type CommandBarGroup,
  type CommandBarItem,
} from './context.js'

export type CommandBarRootProps = {
  children?: ReactNode
  // shown when nothing matches what was typed
  empty?: ReactNode
  onOpenChange?: (open: boolean) => void
  // for opening and closing it yourself, e.g. from a keyboard shortcut: the
  // bar binds no keys of its own. without it, the bar keeps track
  open?: boolean
  // also names the dialog for screen readers
  placeholder?: string
  // what the highlighted command looks like
  variant?: 'solid' | 'soft'
}

// a dialog for finding and running commands, opened with a Trigger or by
// controlling `open`. goes around the app: CommandBar.Items anywhere inside adds
// commands while it is mounted. the bar is a base ui autocomplete inside a
// dialog; the look is our own
export function Root({
  children,
  empty,
  onOpenChange,
  open: controlled,
  placeholder,
  variant = 'soft',
}: CommandBarRootProps) {
  const theme = use(ThemeContext)
  const filter = Autocomplete.useFilter()

  const [uncontrolled, setUncontrolled] = useState(false)

  const open = controlled ?? uncontrolled

  const setOpen = useCallback(
    (next: boolean) => {
      setUncontrolled(next)
      onOpenChange?.(next)
    },
    [onOpenChange],
  )
  const [groups, setGroups] = useState<ReadonlyMap<string, CommandBarGroup>>(
    new Map(),
  )

  // by `order`, and by when they mounted where that is the same: the sort
  // is stable and the map keeps insertion order
  const sorted = useMemo(
    () => [...groups.values()].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [groups],
  )

  // these two never change, so an Items only registers again when its own
  // props do
  const registry = useMemo(
    () => ({
      register: (id: string, group: CommandBarGroup) =>
        setGroups((previous) => new Map(previous).set(id, group)),
      unregister: (id: string) =>
        setGroups((previous) => {
          const next = new Map(previous)

          next.delete(id)

          return next
        }),
    }),
    [],
  )

  const context = useMemo(
    () => ({
      ...registry,
      setOpen,
    }),
    [registry, setOpen],
  )

  return (
    <CommandBarContext value={context}>
      {children}

      <Dialog.Root onOpenChange={setOpen} open={open}>
        <Dialog.Portal>
          <Dialog.Backdrop {...stylex.props(dialog.backdrop)} />

          <Dialog.Viewport {...stylex.props(dialog.viewport)}>
            <div {...stylex.props(dialog.padding, dialog.start, styles.top)}>
              {/* portaled out of the provider's element, so its colors are
                  set again for everything inside */}
              <Dialog.Popup
                aria-label={placeholder}
                data-accent={theme.accent}
                data-gray={theme.gray}
                {...stylex.props(
                  dialog.content,
                  ...listboxSize('2'),
                  listboxVariants[variant],
                  styles.popup,
                )}
              >
                {/* the list is part of the dialog, not a popup of its own,
                    and what is typed is thrown away when the dialog closes */}
                <Autocomplete.Root
                  autoHighlight="always"
                  filter={(item: CommandBarItem, query) =>
                    filter.contains(
                      [item.label, ...(item.keywords ?? [])].join(' '),
                      query,
                    )
                  }
                  inline
                  items={sorted}
                  itemToStringValue={(item: CommandBarItem) => item.label}
                  // otherwise the highlight jumps back to the first item
                  // whenever the pointer is between items
                  keepHighlight
                  open
                >
                  <Autocomplete.Input
                    placeholder={placeholder}
                    {...stylex.props(styles.input)}
                  />

                  {empty ? (
                    <Autocomplete.Empty>
                      <div {...stylex.props(styles.empty)}>{empty}</div>
                    </Autocomplete.Empty>
                  ) : null}

                  {/* the area scrolls, not the list inside it */}
                  <ScrollArea axis="y" {...stylex.props(styles.scroll)}>
                    <Autocomplete.List
                      {...stylex.props(listbox.list, styles.list)}
                    >
                      {(group: CommandBarGroup, index: number) => (
                        <Autocomplete.Group
                          items={group.items}
                          key={index}
                          {...stylex.props(flush.group, styles.group)}
                        >
                          {group.label ? (
                            <Autocomplete.GroupLabel
                              {...stylex.props(listbox.label, flush.row)}
                            >
                              {group.label}
                            </Autocomplete.GroupLabel>
                          ) : null}

                          <Autocomplete.Collection>
                            {(item: CommandBarItem) => (
                              <Autocomplete.Item
                                disabled={item.disabled}
                                key={item.label}
                                onClick={() => {
                                  item.onSelect?.()
                                  setOpen(false)
                                }}
                                render={item.render}
                                value={item}
                                {...stylex.props(
                                  listbox.item,
                                  flush.row,
                                  styles.item,
                                )}
                              >
                                {item.icon}

                                <span {...stylex.props(listbox.text)}>
                                  {item.label}
                                </span>

                                {item.shortcut ? (
                                  <span {...stylex.props(styles.shortcut)}>
                                    {item.shortcut}
                                  </span>
                                ) : null}
                              </Autocomplete.Item>
                            )}
                          </Autocomplete.Collection>
                        </Autocomplete.Group>
                      )}
                    </Autocomplete.List>
                  </ScrollArea>
                </Autocomplete.Root>
              </Dialog.Popup>
            </div>
          </Dialog.Viewport>
        </Dialog.Portal>
      </Dialog.Root>
    </CommandBarContext>
  )
}

const styles = stylex.create({
  empty: {
    color: 'var(--gray-a10)',
    padding: 'calc(var(--ui-spacing) * 6)',
    textAlign: 'center',
  },
  // a little air between the rows, so the highlight doesn't touch its
  // neighbours
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'calc(var(--ui-spacing) * 0.5)',
  },
  input: {
    '::placeholder': {
      color: 'var(--gray-a10)',
    },
    // divides it from the list
    boxShadow: 'inset 0 -1px var(--gray-a6)',
    flexShrink: 0,
    fontSize: 'var(--ui-text-base)',
    height: 'calc(var(--ui-spacing) * 12)',
    outline: 'none',
    paddingInline:
      'calc(var(--listbox-content-padding) + var(--listbox-separator-margin))',
    width: '100%',
  },
  item: {
    // the shortcut is muted until the row is highlighted
    '--command-bar-shortcut': {
      ':is([data-highlighted]:not([data-disabled]))': 'inherit',
      default: 'var(--gray-a10)',
    },
    // a row rendered as a Link looks like any other row: the text's color,
    // and an underline nobody sees
    '--link-color': 'currentColor',
    '--link-decoration': 'transparent',
    color: {
      ':is([data-disabled])': 'var(--gray-a8)',
      ':is([data-highlighted]:not([data-disabled]))':
        'var(--listbox-highlight-color)',
      default: 'inherit',
    },
    cursor: 'pointer',
    gap: 'calc(var(--ui-spacing) * 2)',
  },
  list: {
    maxHeight: 'none',
    overflowY: 'visible',
    padding: {
      ':is([data-empty])': 0,
      default: 'var(--listbox-content-padding)',
    },
  },
  popup: {
    // the rows' and the input's inset: as much inside the highlight as there
    // is around it
    '--listbox-separator-margin': 'var(--listbox-content-padding)',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 'calc(var(--ui-spacing) * 144)',
    overflow: 'hidden',
    padding: 0,
  },
  scroll: {
    maxHeight: 'min(calc(var(--ui-spacing) * 96), 60vh)',
  },
  shortcut: {
    color: 'var(--command-bar-shortcut)',
  },
  // nearer the top of the screen than a dialog, and it stays put as the list
  // gets shorter
  top: {
    paddingBlockStart: '12vh',
  },
})
