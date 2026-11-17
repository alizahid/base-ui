'use client'

import { useRender } from '@base-ui/react/use-render'
import { type HTMLAttributes, type ReactElement, type Ref } from 'react'

export type SlotProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  children: ReactElement
  ref?: Ref<HTMLElement>
}

// radix's Slot on base ui's useRender: renders its child with its own props
// merged in. event handlers both run, class names and styles are joined, and
// for anything else the child's own prop wins. the child has to be a single
// element that passes on the props and ref it is given. components here take
// `render` for this; Slot is for giving your own component the same ability
export function Slot({ children, ref, ...props }: SlotProps) {
  return useRender({
    props,
    ref,
    render: children,
  })
}
