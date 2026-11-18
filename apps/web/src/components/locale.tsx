'use client'

import { IconButton } from 'basedkit'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

import { Link, usePathname } from '@/intl/navigation'
import { flags, routing } from '@/intl/routing'

export function LocaleSwitcher() {
  const pathname = usePathname()

  const locale = useLocale()
  const t = useTranslations('locales')

  return (
    <nav className="-ms-1.5 flex gap-2">
      {routing.locales.map((item) => (
        <IconButton
          key={item}
          nativeButton={false}
          render={<Link href={pathname} locale={item} role="link" />}
          variant={item === locale ? 'soft' : 'ghost'}
        >
          <Image
            alt={t(item)}
            className="size-5"
            height={20}
            src={`https://flags.willa.app/flags/${flags[item]}.svg`}
            unoptimized
            width={20}
          />
        </IconButton>
      ))}
    </nav>
  )
}
