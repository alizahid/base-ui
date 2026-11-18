import { readFile } from 'node:fs/promises'

import { createTranslator, hasLocale } from 'next-intl'

import { type Section, sections } from '@/content'
import { markdown as tables } from '@/content/props'
import { fill } from '@/intl/fill'
import { routing } from '@/intl/routing'

// imports and exports sit above the title; the page starts at it
const title = /^# /mu

// each page's path with .md on the end
export function params(section: Section) {
  return routing.locales.flatMap((locale) =>
    sections[section].map((page) => ({
      locale,
      page: `${page}.md`,
    })),
  )
}

// a page's MDX source with the translations filled in
export async function markdown(locale: string, section: Section, page: string) {
  if (!hasLocale(routing.locales, locale)) {
    return new Response(null, {
      status: 404,
    })
  }

  // the request config reads root params, which route handlers can't yet
  const t = createTranslator({
    locale,
    messages: (await import(`../intl/locales/${locale}.json`)).default,
  })

  const source = await readFile(
    `src/app/[locale]/${section}/${page.slice(0, -'.md'.length)}/page.mdx`,
    'utf8',
  )

  // ids come from our own files; a missing one fails the build
  const text = (id: string) => t(id as Parameters<typeof t>[0])

  // the props tables are written out as markdown ones
  return new Response(
    tables(fill(source.slice(source.search(title)), text), text),
    {
      headers: {
        'content-type': 'text/markdown; charset=utf-8',
      },
    },
  )
}
