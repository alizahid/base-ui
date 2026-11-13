'use client'

import { cn } from 'cn'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

import { Link, usePathname } from '../intl/navigation'
import { flags, routing } from '../intl/routing'

export function LocaleSwitcher() {
  const pathname = usePathname()

  const locale = useLocale()
  const t = useTranslations('locales')

  return (
    <nav className="flex gap-2">
      {routing.locales.map((item) => (
        <Link
          className={cn(
            'flex size-8 items-center justify-center rounded-md hover:bg-(--gray-3)',
            item === locale && 'bg-(--accent-5)',
          )}
          href={pathname}
          key={item}
          locale={item}
        >
          <Image
            alt={t(item)}
            className="size-5"
            height={20}
            src={`https://flags.willa.app/flags/${flags[item]}.svg`}
            unoptimized
            width={20}
          />
        </Link>
      ))}
    </nav>
  )
}
