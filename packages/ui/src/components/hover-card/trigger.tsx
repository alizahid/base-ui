'use client'

import {
  PreviewCard as Component,
  type PreviewCardTriggerProps as ComponentTriggerProps,
} from '@base-ui/react/preview-card'

export type HoverCardTriggerProps = ComponentTriggerProps

// renders a link by default, since a hover card usually previews where a link
// goes. `render` swaps in another element
export function Trigger(props: HoverCardTriggerProps) {
  return <Component.Trigger {...props} />
}
