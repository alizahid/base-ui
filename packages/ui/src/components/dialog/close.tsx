'use client'

import {
  Dialog as Component,
  type DialogCloseProps as ComponentCloseProps,
} from '@base-ui/react/dialog'

export type DialogCloseProps = ComponentCloseProps

// unstyled, like Trigger: render={<Button />}
export function Close(props: DialogCloseProps) {
  return <Component.Close {...props} />
}
