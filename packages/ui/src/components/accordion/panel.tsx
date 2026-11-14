import {
  Accordion as Component,
  type AccordionPanelProps as ComponentProps,
} from '@base-ui/react/accordion'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '../../lib/stylex.js'

export type AccordionPanelProps = Omit<
  ComponentProps,
  'className' | 'style'
> & {
  className?: string
  style?: CSSProperties
}

// the content under a trigger. className and style go to the padded box
// inside; the panel itself only animates its height
export function Panel({
  children,
  className,
  style,
  ...props
}: AccordionPanelProps) {
  return (
    <Component.Panel {...props} {...stylex.props(styles.main)}>
      <div {...merge(stylex.props(styles.content), className, style)}>
        {children}
      </div>
    </Component.Panel>
  )
}

const still = '@media (prefers-reduced-motion: reduce)'

const styles = stylex.create({
  content: {
    color: 'var(--gray-a11)',
    paddingBlockEnd: 'var(--accordion-padding-y)',
    paddingInline: 'var(--accordion-padding-x)',
  },
  // base ui measures the content; the height opens to it and closes to 0
  main: {
    boxSizing: 'border-box',
    height: {
      ':is([data-starting-style], [data-ending-style])': 0,
      default: 'var(--accordion-panel-height)',
    },
    overflow: 'hidden',
    transitionDuration: '150ms',
    transitionProperty: {
      [still]: 'none',
      default: 'height',
    },
    transitionTimingFunction: 'ease-out',
  },
})
