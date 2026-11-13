'use client'

import {
  PreviewCard as Component,
  type PreviewCardRootProps as ComponentRootProps,
} from '@base-ui/react/preview-card'

export type PreviewCardRootProps = ComponentRootProps

export function Root(props: PreviewCardRootProps) {
  return <Component.Root {...props} />
}
