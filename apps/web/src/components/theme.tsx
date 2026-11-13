'use client'

import { MoonIcon, SunIcon } from '@phosphor-icons/react/dist/ssr'
import { IconButton } from '@repo/ui'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

export function Theme() {
  const t = useTranslations('header')

  const { resolvedTheme, setTheme } = useTheme()

  return (
    <IconButton
      aria-label={t('theme')}
      highContrast
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      variant="ghost"
    >
      <SunIcon className="dark:hidden" />
      <MoonIcon className="hidden dark:block" />
    </IconButton>
  )
}
