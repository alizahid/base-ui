'use client'

import {
  Select as Component,
  type SelectGroupProps as ComponentGroupProps,
} from '@base-ui/react/select'

export type SelectGroupProps = ComponentGroupProps

export function Group(props: SelectGroupProps) {
  return <Component.Group {...props} />
}
