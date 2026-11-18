import { cn } from 'cn'
import { getTranslations } from 'next-intl/server'
import { type ComponentProps } from 'react'

import { fill } from '@/intl/fill'

import { Code } from './code'
import { highlight } from './pre'

type Props = ComponentProps<'div'> & {
  // the example's source, added by the remark plugin in src/mdx
  code?: string
  orientation?: 'horizontal' | 'vertical'
}

// a live preview with its code underneath. vertical stacks larger components
// instead of wrapping them
export async function Example({
  code,
  orientation = 'horizontal',
  ...props
}: Props) {
  const t = await getTranslations()

  const source = code
    ? fill(code, (id) => t(id as Parameters<typeof t>[0]))
    : undefined

  const html = source ? await highlight(source, 'tsx') : undefined

  return (
    <div className="mt-4 border border-(--gray-a6)">
      <div
        className={cn(
          'flex min-h-32 items-center justify-center gap-12 p-6',
          orientation === 'vertical' ? 'flex-col' : 'flex-wrap',
        )}
        {...props}
      />

      {source && html ? (
        <Code
          code={source}
          html={html}
          labels={{
            copy: t('common.copy-code'),
            hide: t('common.hide-code'),
            show: t('common.show-code'),
          }}
        />
      ) : null}
    </div>
  )
}
