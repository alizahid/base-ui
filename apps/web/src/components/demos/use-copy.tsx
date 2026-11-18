'use client'

import { Button, useCopy } from '@repo/ui'

type Props = {
  copied: string
  label: string
  text: string
}

export function UseCopyDemo({ copied, label, text }: Props) {
  const { copied: done, copy } = useCopy()

  const children = done ? copied : label

  return (
    <Button onClick={() => copy(text)} variant="soft">
      {children}
    </Button>
  )
}
