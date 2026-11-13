'use client'

import { createContext } from 'react'

// whether the root allows several values. the input needs to know, to wrap
// itself in chips, and the root renders no element to hang a css hook on
export const MultipleContext = createContext(false)
