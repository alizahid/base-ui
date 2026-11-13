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
      <h2 className="text-(--gray-11)">{t('components')}</h2>

      {pages.map((page) => {
        const href = `/components/${page}`

        return (
          <Link
            className={cn(
              'text-(--gray-12) hover:underline',
              pathname === href && 'font-medium text-(--gray-12)',
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
