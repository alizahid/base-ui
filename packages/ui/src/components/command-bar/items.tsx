'use client'

import { use, useEffect, useId } from 'react'

import {
  CommandBarContext,
  type CommandBarGroup,
  type CommandBarItem,
} from './context.js'

export type CommandBarItemsProps = {
  items: ReadonlyArray<CommandBarItem>
  // a heading for these commands
  label?: CommandBarGroup['label']
  // where the group goes: lower comes first. 0 by default, so a page puts
  // its own commands above the layout's with a negative order. groups with
  // the same order show in the order they mounted
  order?: CommandBarGroup['order']
}

// adds commands to the bar for as long as it is mounted, from anywhere under
// the root: a page adds its own beside the ones the layout added. renders
// nothing
export function Items({ items, label, order }: CommandBarItemsProps) {
  const id = useId()
  const { register, unregister } = use(CommandBarContext)

  // on every change, in place: the group keeps its position in the bar
  useEffect(() => {
    register(id, {
      items,
      label,
      order,
    })
  }, [id, items, label, order, register])

  useEffect(() => () => unregister(id), [id, unregister])

  return null
}
