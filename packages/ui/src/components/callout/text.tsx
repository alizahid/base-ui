import { type ComponentProps } from 'react'

export type CalloutTextProps = ComponentProps<'p'>

export function Text(props: CalloutTextProps) {
  return <p {...props} />
}
