import { getLocale } from 'next-intl/server'

import { pages } from '../../content'
import { redirect } from '../../intl/navigation'

export default async function Home() {
  redirect({
    href: `/components/${pages[0]}`,
    locale: await getLocale(),
  })
}
