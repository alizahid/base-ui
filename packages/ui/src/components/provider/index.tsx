import { type ReactNode } from 'react'

import { type ColorToken, type GrayToken, getGray } from '../../lib/colors.js'

type Props = {
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
}: Props) {
  return (
    <div className={className} data-accent={accent} data-gray={gray}>
      {children}
    </div>
  )
}
