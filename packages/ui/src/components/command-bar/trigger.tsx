'use client'

import { useRender } from '@base-ui/react/use-render'
import { use } from 'react'

import { CommandBarContext } from './context.js'

export type CommandBarTriggerProps = useRender.ComponentProps<'button'>

// opens the bar. unstyled: pass the element as `render`, e.g.
// render={<Button />}
export function Trigger({ onClick, render, ...props }: CommandBarTriggerProps) {
  const { setOpen } = use(CommandBarContext)

  return useRender({
    defaultTagName: 'button',
    props: {
      type: 'button',
      ...props,
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        setOpen(true)
      },
    },
    render,
  })
}
