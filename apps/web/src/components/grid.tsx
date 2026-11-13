import { type ReactNode } from 'react'

type GridProps = {
  children: ReactNode
  columns: ReadonlyArray<string>
}

export function Grid({ children, columns }: GridProps) {
  return (
    <div
      className="grid max-w-full items-center justify-items-start gap-4"
      style={{
        gridTemplateColumns: `repeat(${columns.length + 1}, max-content)`,
      }}
    >
      <span />

      {columns.map((column) => (
        <span className="text-sm text-(--gray-11) capitalize" key={column}>
          {column}
        </span>
      ))}

      {children}
    </div>
  )
}

type RowProps = {
  children: ReactNode
  label: string
}

export function Row({ children, label }: RowProps) {
  return (
    <>
      <span className="text-sm text-(--gray-11) capitalize">{label}</span>

      {children}
    </>
  )
}
