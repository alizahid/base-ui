'use client'

import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import { Fragment, useEffect, useRef } from 'react'

import { type Page, type Section } from '@/content'
import { Link, usePathname } from '@/intl/navigation'

type Props = {
  sections: Record<Section, Array<Page>>
  // called when a link is followed
  onNavigate?: () => void
}

export function Sidebar({ sections, onNavigate }: Props) {
  const pathname = usePathname()

  const t = useTranslations('nav')

  const ref = useRef<HTMLElement>(null)

  // when it mounts on the client, as in the drawer. on a page load the
  // script below has already done it, before the first paint
  useEffect(() => {
    if (ref.current) {
      centre(ref.current)
    }
  }, [])

  return (
    <nav className="flex flex-col gap-1" ref={ref}>
      {(Object.keys(sections) as Array<Section>).map((section) => (
        <Fragment key={section}>
          <h2 className="mb-1 text-xs text-(--gray-11) not-first:mt-4">
            {t(section)}
          </h2>

          {sections[section].map((page) => {
            const href = `/${section}/${page}`

            return (
              <Link
                aria-current={pathname === href ? 'page' : undefined}
                className={cn(
                  'mx-[calc(-6*var(--spacing)-1px)] flex h-8 items-center px-[calc(6*var(--spacing)+1px)] text-sm text-(--gray-12) ring-(--accent-a8) outline-none hover:bg-(--accent-a4) focus-visible:ring-2',
                  pathname === href && 'bg-(--accent-a5) font-medium',
                )}
                href={href}
                key={page}
                onClick={onNavigate}
              >
                {t(page)}
              </Link>
            )
          })}
        </Fragment>
      ))}

      {/* runs as the HTML is parsed, so the list never shows unscrolled */}
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: our own function, as source
        dangerouslySetInnerHTML={{
          __html: `(${centre.toString()})(document.currentScript.parentElement)`,
        }}
      />
    </nav>
  )
}

// centres the current page's link in whatever scrolls the list, unless it has
// been scrolled already. scrollIntoView would scroll the page too, so the list
// is moved by hand. also inlined as a script, so it can't use anything outside
// itself
function centre(nav: HTMLElement) {
  const link = nav.querySelector('[aria-current="page"]')

  let list = link?.parentElement

  while (
    list &&
    list !== document.body &&
    list.scrollHeight <= list.clientHeight
  ) {
    list = list.parentElement
  }

  // nothing scrolls it short of the page, as on a phone outside the drawer
  if (!(link && list) || list === document.body || list.scrollTop > 0) {
    return
  }

  const item = link.getBoundingClientRect()
  const area = list.getBoundingClientRect()

  list.scrollTop += item.top - area.top - (area.height - item.height) / 2
}
