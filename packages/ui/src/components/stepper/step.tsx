import { type CSSProperties, type ReactElement, type ReactNode } from 'react'

import { type ColorToken } from '#lib/colors.js'

export type StepperStepProps = {
  // names a step that has no label, only an icon
  'aria-label'?: string
  children?: ReactNode
  className?: string
  color?: ColorToken | 'gray'
  completedIcon?: ReactNode
  disabled?: boolean
  icon?: ReactNode
  label?: ReactNode
  loading?: boolean
  // the element the step is, in place of a button: a link, for instance
  render?: ReactElement
  style?: CSSProperties
}

// one step. the root reads its props to draw the step in the list, and shows
// its children below the list while the step is the active one, so it has to
// be a direct child of the root. `icon` takes the number's place and
// `completedIcon` the check's. `color` is for this step alone, red for one
// that failed for instance. a `disabled` step can't be clicked. `render`
// makes the step another element, a link to the step's page for instance.
// className and style go to the step's list item
export function Step({ children }: StepperStepProps) {
  return children
}
