import { type ComponentProps } from 'react'

export type TableHeaderProps = ComponentProps<'thead'>

// the head rows
export function Header(props: TableHeaderProps) {
  return <thead {...props} />
}
