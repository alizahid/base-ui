'use client'

import { MoonIcon, SunIcon } from '@phosphor-icons/react/dist/ssr'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

export function Theme() {
  const t = useTranslations('header')

  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      aria-label={t('theme')}
      className="flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-(--gray-3)"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      type="button"
    >
      <SunIcon className="dark:hidden" />
      <MoonIcon className="hidden dark:block" />
    </button>
  )
}
