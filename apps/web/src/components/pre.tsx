import { type ComponentProps, type ReactElement } from 'react'
import { codeToHtml } from 'shiki'

export function highlight(code: string, lang: string) {
  return codeToHtml(code, {
    defaultColor: false,
    lang,
    // the scroll area around it is the tab stop; a second one on the
    // pre only adds its own focus ring
    tabindex: false,
    themes: {
      dark: 'github-dark',
      light: 'github-light',
    },
  })
}

type Code = ReactElement<{
  children: string
  className?: string
}>

type Props = {
  code: string
  lang: string
}

// a block of highlighted code
export async function Block({ code, lang }: Props) {
  const html = await highlight(code, lang)

  return (
    // code reads left to right in every locale
    <div
      className="mt-4 overflow-x-auto border border-(--gray-a6) p-4 text-sm leading-relaxed"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki's output, from our own source
      dangerouslySetInnerHTML={{
        __html: html,
      }}
      dir="ltr"
    />
  )
}

// a fenced code block. MDX hands it over as <pre><code>
export function Pre({ children }: ComponentProps<'pre'>) {
  const { children: code, className } = (children as Code).props

  return (
    <Block
      code={code.trimEnd()}
      lang={className?.replace('language-', '') ?? 'text'}
    />
  )
}
