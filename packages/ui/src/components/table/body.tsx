import { type ComponentProps } from 'react'

export type TableBodyProps = ComponentProps<'tbody'>

// the body rows
export function Body(props: TableBodyProps) {
  return <tbody {...props} />
}
