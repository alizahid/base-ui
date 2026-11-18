'use client'

import { Link } from 'basedkit'
import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'

import { usePathname as usePage } from '@/intl/navigation'

type Props = {
  children: ReactNode
}

const slash = /\/$/u

// link to the current page as Markdown
export function Source({ children }: Props) {
  // with the locale, as the address bar has it, bar the slash of a bare /
  const pathname = usePathname().replace(slash, '')

  // without the locale: the home page has no name of its own to add .md to
  const home = usePage() === '/'

  return (
    <Link
      className="text-sm"
      color="gray"
      href={home ? `${pathname}/index.md` : `${pathname}.md`}
    >
      {children}
    </Link>
  )
}
