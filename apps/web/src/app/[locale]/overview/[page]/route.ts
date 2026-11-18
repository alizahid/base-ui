import { readFile } from 'node:fs/promises'

import { markdown, params } from '@/content/markdown'

export const dynamicParams = false

export function generateStaticParams() {
  return params('overview')
}

export async function GET(
  _request: Request,
  context: RouteContext<'/[locale]/overview/[page]'>,
) {
  const { locale, page } = await context.params

  // already markdown: release-it writes it. read at build time, like the pages
  if (page === 'changelog.md') {
    return new Response(await readFile('../../packages/ui/CHANGELOG.md'), {
      headers: {
        'content-type': 'text/markdown; charset=utf-8',
      },
    })
  }

  return markdown(locale, 'overview', page)
}
