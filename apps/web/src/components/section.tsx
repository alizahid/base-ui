import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  title: string
}

export function Section({ children, title }: Props) {
  return (
    <section className="flex max-w-full flex-col gap-8">
      <h2 className="text-2xl font-bold">{title}</h2>

      {children}
    </section>
  )
}

export function Subsection({ children, title }: Props) {
  return (
    <div className="flex max-w-full flex-col gap-4">
      <h3 className="text-lg font-semibold">{title}</h3>

      {children}
    </div>
  )
}
