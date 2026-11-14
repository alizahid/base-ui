'use client'

import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

// link to the current page as Markdown
export function Source({ children }: Props) {
  const pathname = usePathname()

  return (
    <a
      className="text-sm text-(--gray-11) hover:underline"
      href={`${pathname}.md`}
    >
      {children}
    </a>
  )
}
