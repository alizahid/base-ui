import type messages from '../src/intl/locales/en.json'
import { type routing } from '../src/intl/routing'

declare module 'next-intl' {
  // biome-ignore lint/style/useConsistentTypeDefinitions: augmentation needs interface merging
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
  }
}
