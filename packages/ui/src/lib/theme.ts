'use client'

import { createContext } from 'react'

import { type ColorToken, type GrayToken } from './colors.js'

// the provider's colors, for content that is portaled out of the provider's
// element (popups, dialogs) and so can't inherit them through css
export const ThemeContext = createContext<{
  accent?: ColorToken
  gray?: GrayToken
}>({})
