'use client'

import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'
import { CommandBar, IconButton } from 'basedkit'
import { useTranslations } from 'next-intl'

// opens the site's command bar, as ⌘K does
export function Search() {
  const t = useTranslations('header')

  return (
    <CommandBar.Trigger
      render={
        <IconButton aria-label={t('search')} highContrast variant="ghost" />
      }
    >
      <MagnifyingGlassIcon />
    </CommandBar.Trigger>
  )
}
