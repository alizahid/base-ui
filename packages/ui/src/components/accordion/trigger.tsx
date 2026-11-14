import {
  Accordion as Component,
  type AccordionTriggerProps as ComponentProps,
} from '@base-ui/react/accordion'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { ChevronDownIcon } from '../../lib/icons.js'
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
    <Component.Header {...stylex.props(styles.header)}>
      <Component.Trigger
        {...props}
        {...merge(stylex.props(styles.main), className, style)}
      >
        {children}

        <ChevronDownIcon {...stylex.props(styles.icon)} />
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
  header: {
    font: 'inherit',
    margin: 0,
  },
  icon: {
    color: 'var(--gray-a11)',
    flexShrink: 0,
    height: '1lh',
    transform: {
      ':is([data-panel-open] > *)': 'rotate(180deg)',
      default: 'none',
    },
    transitionDuration: '150ms',
    transitionProperty: {
      [still]: 'none',
      default: 'transform',
    },
    transitionTimingFunction: 'ease-out',
    width: '1lh',
  },
  main: {
    alignItems: 'center',
    backgroundColor: {
      [hover]: {
        '@media (hover: hover)': 'var(--accordion-hover)',
        default: null,
      },
      default: 'transparent',
    },
    // the corners of the panel, so the focus ring follows them
    borderEndEndRadius: {
      ':is(:last-child > * > *):not([data-panel-open])':
        'var(--accordion-trigger-radius)',
      default: 0,
    },
    borderEndStartRadius: {
      ':is(:last-child > * > *):not([data-panel-open])':
        'var(--accordion-trigger-radius)',
      default: 0,
    },
    borderStartEndRadius: {
      ':is(:first-child > * > *)': 'var(--accordion-trigger-radius)',
      default: 0,
    },
    borderStartStartRadius: {
      ':is(:first-child > * > *)': 'var(--accordion-trigger-radius)',
      default: 0,
    },
    borderStyle: 'none',
    boxSizing: 'border-box',
    color: {
      [disabled]: 'var(--gray-a8)',
      default: 'inherit',
    },
    cursor: {
      [disabled]: 'not-allowed',
      default: 'pointer',
    },
    display: 'flex',
    font: 'inherit',
    fontWeight: '500',
    gap: 'calc(var(--spacing) * 4)',
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
