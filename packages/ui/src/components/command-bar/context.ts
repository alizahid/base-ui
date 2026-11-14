'use client'

import { createContext, type ReactElement, type ReactNode } from 'react'

export type CommandBarItem = {
  disabled?: boolean
  icon?: ReactNode
  // more words to match what is typed against, besides the label
  keywords?: ReadonlyArray<string>
  label: string
  onSelect?: () => void
  // the element for the row, for a command that is a link: <a href />, or a
  // framework's link
  render?: ReactElement
  // shown at the end of the row, e.g. "⌘N". for display only: binding the
  // keys is up to the app
  shortcut?: ReactNode
}

export type CommandBarGroup = {
  items: ReadonlyArray<CommandBarItem>
  label?: string
  order?: number
}

type Context = {
  register: (id: string, group: CommandBarGroup) => void
  setOpen: (open: boolean) => void
  unregister: (id: string) => void
}

function noop() {
  // outside a CommandBar.Root there is no bar to add to
}

// how Items and Trigger, anywhere in the app, reach the bar. it only holds
// functions that never change, so nothing re-renders when commands are added
export const CommandBarContext = createContext<Context>({
  register: noop,
  setOpen: noop,
  unregister: noop,
})
