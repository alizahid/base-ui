import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { type Page } from '@/content'

// page title for a component page, taken from the nav translations
export function title(page: Page) {
  return async (): Promise<Metadata> => {
    const t = await getTranslations('nav')

    return {
      title: t(page),
    }
  }
}
