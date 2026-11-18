import { readdirSync } from 'node:fs'

import { type Messages } from 'next-intl'

export type Section = 'components' | 'hooks'

export type Page = Exclude<keyof Messages['nav'], Section>

// one folder per page, bar the dynamic [page] routes. server only, and read at build time: every
// page is prerendered, so src doesn't need to exist at runtime
function list(section: Section) {
  return readdirSync(`src/app/[locale]/${section}`, {
    withFileTypes: true,
  })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('['))
    .map((entry) => entry.name as Page)
    .sort()
}

// the sidebar's sections, in order
export const sections: Record<Section, Array<Page>> = {
  components: list('components'),
  hooks: list('hooks'),
}

export const pages = sections.components
