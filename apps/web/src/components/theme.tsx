'use client'

import { MoonIcon, SunIcon } from '@phosphor-icons/react/dist/ssr'
import { useState } from 'react'

export function Theme() {
  const [dark, setDark] = useState(
    typeof window === 'undefined'
      ? false
      : document.body.classList.contains('dark'),
  )

  return (
    <button
      onClick={() => {
        setDark(document.body.classList.toggle('dark'))
      }}
      type="button"
    >
      {dark ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
