'use client'

import { createContext } from 'react'

import { type ColorToken } from '#lib/colors.js'

export type MenuContextValue = {
  color?: ColorToken | 'gray'
  highContrast?: boolean
  size: '1' | '2'
  variant: 'solid' | 'soft'
}

// a menu's popups are portaled apart from each other, so what the content was
// given can't reach a submenu through css. the items read it too: their
// highlight has to resolve against their own color, not the popup's
export const MenuContext = createContext<MenuContextValue>({
  size: '2',
  variant: 'solid',
})
