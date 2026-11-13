'use client'

import { createContext } from 'react'

export type Size = '1' | '2' | '3'

// for components whose content is portaled away from the rest (Select,
// Combobox): the size can't reach the popup through css, so it travels here
export const SizeContext = createContext<Size>('2')
