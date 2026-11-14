'use client'

import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'
import { CommandBar, IconButton } from '@repo/ui'
import { useTranslations } from 'next-intl'

// opens the site's command bar, which ⌘K does too
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
