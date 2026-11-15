import { type ComponentProps } from 'react'

export type TableRowProps = ComponentProps<'tr'>

// one row
export function Row(props: TableRowProps) {
  return <tr {...props} />
}
