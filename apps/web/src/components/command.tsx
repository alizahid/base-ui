'use client'

import { CommandBar, type CommandBarRootProps } from '@repo/ui'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

// the site's command bar. the library's bar binds no keys, so ⌘K (ctrl+K off
// a mac) is ours: also while typing, so the same keys close it again
export function Command(props: CommandBarRootProps) {
  const [open, setOpen] = useState(false)

  useHotkeys('mod+k', () => setOpen((previous) => !previous), {
    enableOnContentEditable: true,
    enableOnFormTags: true,
    preventDefault: true,
  })

  return <CommandBar.Root {...props} onOpenChange={setOpen} open={open} />
}
