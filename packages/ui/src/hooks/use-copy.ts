'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// copies text to the clipboard. `copied` is true for `delay` ms afterwards.
// `copy` rejects if the browser refuses the write
export function useCopy(delay = 2000) {
  const [copied, setCopied] = useState(false)

  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text: string) => {
      await navigator.clipboard.writeText(text)

      setCopied(true)

      clearTimeout(timer.current)

      timer.current = setTimeout(() => setCopied(false), delay)
    },
    [delay],
  )

  return { copied, copy }
}
