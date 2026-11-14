'use client'

import { Button, ScrollArea } from '@repo/ui'
import { cn } from 'cn'
import { useState } from 'react'

import { Copy } from './copy'

type Props = {
  code: string
  // the code, highlighted
  html: string
  labels: {
    copy: string
    hide: string
    show: string
  }
}

// shorter than this and there is nothing worth hiding
const lines = 6

// an example's code: the first few lines, and the rest behind a button
export function Code({ code, html, labels }: Props) {
  const [open, setOpen] = useState(false)

  const long = code.split('\n').length > lines

  return (
    // code reads left to right in every locale
    <div className="relative isolate border-t border-(--gray-a6)" dir="ltr">
      <Copy
        className="absolute top-3 right-3 z-1"
        code={code}
        label={labels.copy}
      />

      {/* sideways only: closed it is cut short, open the page scrolls. closed
          it is only a preview, so it can't be scrolled, selected or focused */}
      <ScrollArea
        axis="x"
        className={cn(long && !open && 'max-h-32')}
        inert={long && !open}
      >
        <div
          className="w-max min-w-full p-4 text-sm"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki's output, from our own source
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </ScrollArea>

      {long ? (
        // open, it floats over the code and sticks to the bottom of the
        // window until the end of the block scrolls into view
        <div
          className={cn(
            'pointer-events-none bottom-0 flex justify-center pb-3',
            open
              ? 'sticky -mt-10'
              : 'absolute inset-x-0 bg-linear-to-t from-(--gray-1) pt-10',
          )}
        >
          <Button
            className="pointer-events-auto"
            color="gray"
            highContrast
            onClick={() => setOpen(!open)}
            radius="full"
            size="1"
            variant="surface"
          >
            {open ? labels.hide : labels.show}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
