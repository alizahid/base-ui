'use client'

import { type ReactNode } from 'react'

import { type ColorToken, type GrayToken, getGray } from '../../lib/colors.js'
import { ThemeContext } from '../../lib/theme.js'

export type BaseProviderProps = {
  accent?: ColorToken
  children: ReactNode
  className?: string
  gray?: GrayToken
}

export function BaseProvider({
  accent = 'blue',
  children,
  className,
  gray = getGray(accent),
}: BaseProviderProps) {
  return (
    <ThemeContext
      value={{
        accent,
        gray,
      }}
    >
      <div className={className} data-accent={accent} data-gray={gray}>
        {children}
      </div>
    </ThemeContext>
  )
}
