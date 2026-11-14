'use client'

import { CheckIcon, CopyIcon } from '@phosphor-icons/react/dist/ssr'
import { IconButton } from '@repo/ui'
import { useState } from 'react'

type Props = {
  className?: string
  code: string
  label: string
}

export function Copy({ className, code, label }: Props) {
  const [copied, setCopied] = useState(false)

  return (
    <IconButton
      aria-label={label}
      className={className}
      color="gray"
      onClick={async () => {
        await navigator.clipboard.writeText(code)

        setCopied(true)

        setTimeout(() => setCopied(false), 2000)
      }}
      variant="ghost"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </IconButton>
  )
}
