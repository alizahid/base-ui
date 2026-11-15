'use client'

import { DirectionProvider } from '@base-ui/react/direction-provider'
import { type ReactNode } from 'react'

import { type ColorToken, type GrayToken, getGray } from '#lib/colors.js'
import { ThemeContext } from '#lib/theme.js'

export type BaseProviderProps = {
  accent?: ColorToken
  children: ReactNode
  className?: string
  direction?: 'ltr' | 'rtl'
  gray?: GrayToken
  // the background of cards: see-through with a blur, or opaque
  panelBackground?: 'solid' | 'translucent'
}

export function BaseProvider({
  accent = 'blue',
  children,
  className,
  direction = 'ltr',
  gray = getGray(accent),
  panelBackground = 'solid',
}: BaseProviderProps) {
  return (
    <ThemeContext
      value={{
        accent,
        gray,
      }}
    >
      {/* base ui can't read the page's `dir`, so it has to be told: this is
          what makes submenus open towards the left in rtl, and arrow keys
          follow */}
      <DirectionProvider direction={direction}>
        <div
          className={className}
          data-accent={accent}
          data-gray={gray}
          data-panel-background={panelBackground}
        >
          {children}
        </div>
      </DirectionProvider>
    </ThemeContext>
  )
}
