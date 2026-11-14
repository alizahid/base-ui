import { readdirSync } from 'node:fs'

import { type Messages } from 'next-intl'

export type Page = Exclude<keyof Messages['nav'], 'components'>

// one folder per component page, bar the dynamic [page] routes. server only, and read at build time: every
// page is prerendered, so src doesn't need to exist at runtime
export const pages = readdirSync('src/app/[locale]/components', {
  withFileTypes: true,
})
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('['))
  .map((entry) => entry.name as Page)
  .sort()
