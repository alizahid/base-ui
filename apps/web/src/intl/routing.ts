import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  locales: ['en', 'ar', 'de'],
})

export const directions = {
  ar: 'rtl',
  de: 'ltr',
  en: 'ltr',
} as const satisfies Record<(typeof routing.locales)[number], 'ltr' | 'rtl'>

export const flags = {
  ar: 'ae',
  de: 'de',
  en: 'us',
} as const satisfies Record<(typeof routing.locales)[number], string>
