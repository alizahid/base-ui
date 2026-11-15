import {
  Accordion as Component,
  type AccordionTriggerProps as ComponentProps,
} from '@base-ui/react/accordion'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { ChevronDownIcon, icon } from '../../lib/icons.js'
import { merge } from '../../lib/stylex.js'

export type AccordionTriggerProps = Omit<
  ComponentProps,
  'className' | 'style'
> & {
  className?: string
  style?: CSSProperties
}

// the heading that opens and closes the panel, with a chevron at the end
export function Trigger({
  children,
  className,
  style,
  ...props
}: AccordionTriggerProps) {
  return (
    <Component.Header>
      <Component.Trigger
        {...props}
        {...merge(stylex.props(styles.main), className, style)}
      >
        {children}

        <ChevronDownIcon {...stylex.props(icon.small, styles.icon)} />
      </Component.Trigger>
    </Component.Header>
  )
}

// stylex doesn't order these against each other, so they must not overlap
const disabled = ':is([data-disabled])'
// no hover once open: the tint would sit right against the content
const hover = ':is(:hover:not([data-disabled], [data-panel-open]))'
const still = '@media (prefers-reduced-motion: reduce)'

const styles = stylex.create({
  icon: {
    color: 'var(--gray-a11)',
    flexShrink: 0,
    transform: {
      ':is([data-panel-open] > *)': 'rotate(180deg)',
      default: null,
    },
    transitionDuration: '150ms',
    transitionProperty: {
      [still]: 'none',
      default: 'transform',
    },
    transitionTimingFunction: 'ease-out',
  },
  main: {
    alignItems: 'center',
    backgroundColor: {
      [hover]: {
        '@media (hover: hover)': 'var(--accordion-hover)',
        default: null,
      },
      default: null,
    },
    // the corners of the panel, so the focus ring follows them
    borderEndEndRadius: {
      ':is(:last-child > * > *):not([data-panel-open])':
        'var(--accordion-trigger-radius)',
      default: null,
    },
    borderEndStartRadius: {
      ':is(:last-child > * > *):not([data-panel-open])':
        'var(--accordion-trigger-radius)',
      default: null,
    },
    borderStartEndRadius: {
      ':is(:first-child > * > *)': 'var(--accordion-trigger-radius)',
      default: null,
    },
    borderStartStartRadius: {
      ':is(:first-child > * > *)': 'var(--accordion-trigger-radius)',
      default: null,
    },
    color: {
      [disabled]: 'var(--gray-a8)',
      default: null,
    },
    cursor: {
      [disabled]: 'not-allowed',
      default: 'pointer',
    },
    display: 'flex',
    fontWeight: '500',
    gap: 'calc(var(--ui-spacing) * 4)',
    justifyContent: 'space-between',
    outline: {
      ':focus-visible': '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: -2,
    paddingBlock: 'var(--accordion-padding-y)',
    paddingInline: 'var(--accordion-padding-x)',
    textAlign: 'start',
    userSelect: 'none',
    width: '100%',
  },
})
