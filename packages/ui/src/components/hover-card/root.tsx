'use client'

import {
  PreviewCard as Component,
  type PreviewCardRootProps as ComponentRootProps,
} from '@base-ui/react/preview-card'

export type HoverCardRootProps = ComponentRootProps

export function Root(props: HoverCardRootProps) {
  return <Component.Root {...props} />
}
