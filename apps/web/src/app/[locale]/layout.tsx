import '../main.css'

import { BaseProvider, CommandBar, ScrollArea } from '@repo/ui'
import { ThemeProvider } from '@wrksz/themes/next'
import { cn } from 'cn'
import { type Metadata } from 'next'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'

import { Command } from '../../components/command'
import { Toaster } from '../../components/demos/toast'
import { LocaleSwitcher } from '../../components/locale'
import { Menu } from '../../components/menu'
import { Search } from '../../components/search'
import { Sidebar } from '../../components/sidebar'
import { Theme } from '../../components/theme'
import { pages } from '../../content'
import { Link } from '../../intl/navigation'
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

  const t = await getTranslations()

  // client components only need these; page text stays on the server
  const { header, locales, metadata, nav } = await getMessages()

  return (
    <html
      className={cn(sans.variable, mono.variable)}
      dir={directions[locale]}
      lang={locale}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={{ header, locales, metadata, nav }}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <BaseProvider
              accent="plum"
              className="mx-auto flex max-w-6xl flex-col border-(--gray-a6) md:flex-row xl:border-x"
              direction={directions[locale]}
            >
              {/* every page, a keystroke away: the bar goes around the site, so
                  a page could add commands of its own */}
              <Command
                empty={t('header.no-components-found')}
                placeholder={t('header.search-components')}
              >
                <CommandBar.Items
                  items={pages.map((page) => ({
                    label: t(`nav.${page}`),
                    render: <Link href={`/components/${page}`} />,
                  }))}
                  label={t('nav.components')}
                />

                {/* on desktop it stays in view at the height of the window, and
                  the list of pages scrolls inside it */}
                <aside className="w-full border-b border-(--gray-a6) p-6 md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:self-start md:border-e md:border-b-0 md:pb-0">
                  <div className="flex flex-col gap-6 md:h-full">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold">
                        {t('metadata.title')}
                      </span>

                      <Search />

                      <Theme />

                      <Menu pages={pages} />
                    </div>

                    <LocaleSwitcher />

                    {/* as wide as the links, which bleed 1px past the padding */}
                    <ScrollArea
                      axis="y"
                      className="mx-[calc(-6*var(--spacing)-1px)] hidden min-h-0 flex-1 md:flex"
                      visibility="scroll"
                    >
                      <div className="px-[calc(6*var(--spacing)+1px)] pb-6">
                        <Sidebar pages={pages} />
                      </div>
                    </ScrollArea>
                  </div>
                </aside>

                <main className="min-h-screen min-w-0 flex-1 p-6">
                  {children}
                </main>

                <Toaster />
              </Command>
            </BaseProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
