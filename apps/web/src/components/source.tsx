'use client'

import { Link } from 'basedkit'
import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

// link to the current page as Markdown
export function Source({ children }: Props) {
  // with the locale, as the address bar has it
  const pathname = usePathname()

  return (
    <Link className="text-sm" color="gray" href={`${pathname}.md`}>
      {children}
    </Link>
  )
}
