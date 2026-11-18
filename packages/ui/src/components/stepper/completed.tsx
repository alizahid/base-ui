import { type ReactNode } from 'react'

export type StepperCompletedProps = {
  children?: ReactNode
}

// what shows below the list once every step is done: when the root's value is
// the number of steps
export function Completed({ children }: StepperCompletedProps) {
  return children
}
