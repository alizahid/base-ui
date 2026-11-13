'use client'

import { cn } from 'cn'
import { useTranslations } from 'next-intl'

import { pages } from '../content'
import { Link, usePathname } from '../intl/navigation'

export function Sidebar() {
  const pathname = usePathname()

  const t = useTranslations('nav')

  return (
    <nav className="flex flex-col gap-1">
      <h2 className="mb-1 text-(--gray-11)">{t('components')}</h2>

      {pages.map((page) => {
        const href = `/components/${page}`

        return (
          <Link
            className={cn(
              '-mx-6 px-6 py-1 text-(--gray-12) ring-(--accent-8) outline-none hover:bg-(--accent-4) focus-visible:ring-2',
              pathname === href && 'bg-(--accent-5) font-medium',
            )}
            href={href}
            key={page}
          >
            {t(page)}
          </Link>
        )
      })}
    </nav>
  )
}
