'use client'

import { Switch, useLocalState } from 'basedkit'

type Props = {
  label: string
}

// stays as it was left after a reload
export function UseLocalStateDemo({ label }: Props) {
  const [on, setOn] = useLocalState('is-on', false)

  return <Switch aria-label={label} checked={on} onCheckedChange={setOn} />
}
