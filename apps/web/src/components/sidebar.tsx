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
              'mx-[calc(-6*var(--spacing)-1px)] flex h-8 items-center px-[calc(6*var(--spacing)+1px)] text-sm text-(--gray-12) ring-(--accent-a8) outline-none hover:bg-(--accent-a4) focus-visible:ring-2',
              pathname === href && 'bg-(--accent-a5) font-medium',
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
