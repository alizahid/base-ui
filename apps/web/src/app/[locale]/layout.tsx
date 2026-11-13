import '../main.css'

import { BaseProvider } from '@repo/ui'
import { cn } from 'cn'
import { type Metadata } from 'next'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'

import { LocaleSwitcher } from '../../components/locale'
import { Sidebar } from '../../components/sidebar'
import { Theme } from '../../components/theme'
import { directions, routing } from '../../intl/routing'

const sans = localFont({
  src: '../../assets/fonts/sans.woff2',
  variable: '--font-sans',
})

const mono = localFont({
  src: '../../assets/fonts/mono.woff2',
  variable: '--font-mono',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }))
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')

  return {
    title: {
      default: t('title'),
      template: `%s – ${t('title')}`,
    },
  }
}

export default async function Layout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const t = await getTranslations('metadata')

  return (
    <html
      className={cn(sans.variable, mono.variable)}
      dir={directions[locale]}
      lang={locale}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <BaseProvider
              accent="plum"
              className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row"
            >
              <aside className="w-64 bg-(--gray-1) p-6">
                <div className="sticky top-6 flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold">{t('title')}</span>

                    <Theme />
                  </div>

                  <LocaleSwitcher />

                  <Sidebar />
                </div>
              </aside>

              <main className="my-12 flex-1">{children}</main>
            </BaseProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
