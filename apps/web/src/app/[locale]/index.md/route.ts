import { markdown } from '@/content/markdown'
import { routing } from '@/intl/routing'

export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }))
}

// the home page as markdown
export async function GET(
  _request: Request,
  context: RouteContext<'/[locale]/index.md'>,
) {
  const { locale } = await context.params

  return markdown(locale)
}
