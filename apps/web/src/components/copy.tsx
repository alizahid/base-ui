'use client'

import { CheckIcon, CopyIcon } from '@phosphor-icons/react/dist/ssr'
import { IconButton, useCopy } from 'basedkit'

type Props = {
  className?: string
  code: string
  label: string
}

export function Copy({ className, code, label }: Props) {
  const { copied, copy } = useCopy()

  return (
    <IconButton
      aria-label={label}
      className={className}
      color="gray"
      onClick={() => copy(code)}
      variant="ghost"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </IconButton>
  )
}
