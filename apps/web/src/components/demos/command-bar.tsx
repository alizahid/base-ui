'use client'

import { CommandBar, Switch } from 'basedkit'
import { useState } from 'react'

type Props = {
  commands: Array<string>
  group: string
  label: string
}

// stands in for a page that adds its own commands to the bar while it is
// open: the switch mounts and unmounts a CommandBar.Items
export function CommandBarDemo({ commands, group, label }: Props) {
  const [on, setOn] = useState(false)

  return (
    <label className="flex items-center gap-2 text-sm">
      <Switch checked={on} onCheckedChange={setOn} />

      {label}

      {on ? (
        <CommandBar.Items
          items={commands.map((command) => ({
            label: command,
          }))}
          label={group}
          order={-1}
        />
      ) : null}
    </label>
  )
}
