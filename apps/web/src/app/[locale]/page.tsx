import { getLocale } from 'next-intl/server'

import { redirect } from '@/intl/navigation'

// the site opens on the quick start
export default async function Home() {
  redirect({
    href: '/overview/quick-start',
    locale: await getLocale(),
  })
}
