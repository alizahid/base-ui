import {
  Accordion as Component,
  type AccordionItemProps as ComponentProps,
} from '@base-ui/react/accordion'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'

export type AccordionItemProps = Omit<ComponentProps, 'className' | 'style'> & {
  className?: string
  style?: CSSProperties
}

// a trigger and its panel
export function Item({ className, style, ...props }: AccordionItemProps) {
  return (
    <Component.Item
      {...props}
      {...merge(stylex.props(styles.main), className, style)}
    />
  )
}

const styles = stylex.create({
  // a line above every item but the first
  main: {
    boxShadow: {
      ':not(:first-child)': 'inset 0 1px var(--gray-a5)',
    },
  },
})
