'use client'

import {
  PreviewCard as Component,
  type PreviewCardTriggerProps as ComponentTriggerProps,
} from '@base-ui/react/preview-card'

export type PreviewCardTriggerProps = ComponentTriggerProps

// renders a link by default, since a preview card usually previews where a link
// goes. `render` swaps in another element
export function Trigger(props: PreviewCardTriggerProps) {
  return <Component.Trigger {...props} />
}
