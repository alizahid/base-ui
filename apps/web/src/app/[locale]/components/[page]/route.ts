import { readFile } from 'node:fs/promises'

import { createTranslator, hasLocale } from 'next-intl'

import { pages } from '../../../../content'
import { fill } from '../../../../intl/fill'
import { routing } from '../../../../intl/routing'

// imports and exports sit above the title; the page starts at it
const title = /^# /mu

export const dynamicParams = false

// the page's path with .md on the end
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    pages.map((page) => ({
      locale,
      page: `${page}.md`,
    })),
  )
}

// the page's MDX source with the translations filled in
export async function GET(
  _request: Request,
  { params }: RouteContext<'/[locale]/components/[page]'>,
) {
  const { locale, page } = await params

  if (!hasLocale(routing.locales, locale)) {
    return new Response(null, {
      status: 404,
    })
  }

  // the request config reads root params, which route handlers can't yet
  const t = createTranslator({
    locale,
    messages: (await import(`../../../../intl/locales/${locale}.json`)).default,
  })

  const source = await readFile(
    `src/app/[locale]/components/${page.slice(0, -'.md'.length)}/page.mdx`,
    'utf8',
  )

  // ids come from our own files; a missing one fails the build
  const markdown = fill(source.slice(source.search(title)), (id) =>
    t(id as Parameters<typeof t>[0]),
  )

  return new Response(markdown, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
    },
  })
}
