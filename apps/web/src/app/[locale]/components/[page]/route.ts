import { readFile } from 'node:fs/promises'

import { createTranslator, hasLocale } from 'next-intl'

import { pages } from '../../../../content'
import { routing } from '../../../../intl/routing'

// imports and exports sit above the title; the page starts at it
const title = /^# /mu

// <Text /> and a useText child become the text, other useText calls a string
const child =
  /<Text id="(?<id>[^"]+)" \/>|(?<!=)\{useText\('(?<hook>[^']+)'\)\}/gu
const prop = /\{useText\('(?<id>[^']+)'\)\}|useText\('(?<hook>[^']+)'\)/gu

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

  // ids come from our own files; a missing one fails the build
  const text = (...match: Array<unknown>) => {
    const { hook, id } = match.pop() as Record<string, string | undefined>

    return t((id ?? hook) as Parameters<typeof t>[0])
  }

  const source = await readFile(
    `src/app/[locale]/components/${page.slice(0, -'.md'.length)}/page.mdx`,
    'utf8',
  )

  const markdown = source
    .slice(source.search(title))
    .replace(child, text)
    .replace(prop, (...match) => JSON.stringify(text(...match)))

  return new Response(markdown, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
    },
  })
}
