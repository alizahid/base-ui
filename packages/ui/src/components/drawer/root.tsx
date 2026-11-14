'use client'

import { useDirection } from '@base-ui/react/direction-provider'
import {
  Drawer as Component,
  type DrawerRootProps as ComponentRootProps,
} from '@base-ui/react/drawer'

export type DrawerRootProps = Omit<ComponentRootProps, 'swipeDirection'> & {
  side?: 'bottom' | 'end' | 'start' | 'top'
}

// the side it opens from is also the direction it is swiped away in. start
// and end follow the reading direction
export function Root({ side = 'end', ...props }: DrawerRootProps) {
  const direction = useDirection()

  const rtl = direction === 'rtl'

  const directions = {
    bottom: 'down',
    end: rtl ? 'left' : 'right',
    start: rtl ? 'right' : 'left',
    top: 'up',
  } as const

  return <Component.Root {...props} swipeDirection={directions[side]} />
}
