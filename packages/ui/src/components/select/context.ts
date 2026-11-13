'use client'

import { createContext } from 'react'

export type Size = '1' | '2' | '3'

// the content is portaled away from the trigger, so the size can't reach it
// through css and has to travel in context
export const SizeContext = createContext<Size>('2')
