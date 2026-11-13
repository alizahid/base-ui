import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { type ComponentType } from 'react'

import { isPage, pages } from '../../../../content'

export const dynamicParams = false

export function generateStaticParams() {
  return pages.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/components/[slug]'>): Promise<Metadata> {
  const { slug } = await params

  const t = await getTranslations('nav')

  return {
    title: isPage(slug) ? t(slug) : undefined,
  }
}

export default async function Page({
  params,
}: PageProps<'/[locale]/components/[slug]'>) {
  const { locale, slug } = await params

  if (!isPage(slug)) {
    notFound()
  }

  const {
    default: Content,
  }: {
    default: ComponentType
  } = await import(`../../../../content/components/${slug}/${locale}.mdx`)

  return <Content />
}
