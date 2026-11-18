import { markdown, params } from '@/content/markdown'

export const dynamicParams = false

export function generateStaticParams() {
  return params('hooks')
}

export async function GET(
  _request: Request,
  context: RouteContext<'/[locale]/hooks/[page]'>,
) {
  const { locale, page } = await context.params

  return markdown('hooks', locale, page)
}
