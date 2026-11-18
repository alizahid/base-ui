import {
  Accordion as Component,
  type AccordionRootProps as ComponentProps,
} from '@base-ui/react/accordion'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { merge } from '#lib/stylex.js'

export type AccordionRootProps = Omit<ComponentProps, 'className' | 'style'> & {
  className?: string
  size?: '1' | '2' | '3'
  style?: CSSProperties
  variant?: 'ghost' | 'surface'
}

// one item open at a time, or several with `multiple`. the options only set
// variables; the items, triggers and panels read them
export function Root({
  className,
  size = '2',
  style,
  variant = 'ghost',
  ...props
}: AccordionRootProps) {
  return (
    <Component.Root
      {...props}
      {...merge(
        stylex.props(styles.main, sizes[size], variants[variant]),
        className,
        style,
      )}
    />
  )
}

// base ui has the behaviour; radix themes has no accordion, so the look
// follows Table: ghost is rows with lines between them, surface a panel
const styles = stylex.create({
  main: {
    borderRadius: 'var(--accordion-radius)',
    color: 'var(--gray-12)',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
})

const variants = stylex.create({
  ghost: {
    '--accordion-hover': 'transparent',
    '--accordion-padding-x': '0px',
    // a trigger has no inline padding, so its focus ring reaches out on
    // either side to give the text room, as a tab's does
    '--accordion-ring-inset': 'calc(var(--ui-spacing) * -2)',
    '--accordion-ring-radius': 'var(--ui-radius-md)',
    '--accordion-trigger-radius': '0px',
  },
  // a panel, like Card: the provider's panelBackground applies
  surface: {
    '--accordion-hover': 'var(--gray-a2)',
    '--accordion-padding-x': 'var(--accordion-inset)',
    // inside the 1px border
    '--accordion-trigger-radius': 'calc(var(--accordion-radius) - 1px)',
    backdropFilter: 'var(--panel-backdrop, none)',
    backgroundClip: 'padding-box',
    backgroundColor: 'var(--panel, var(--panel-background))',
    borderColor: 'color-mix(in oklab, var(--gray-a5), var(--gray-6))',
    borderWidth: 1,
    overflow: 'hidden',
  },
})

const sizes = stylex.create({
  1: {
    '--accordion-inset': 'calc(var(--ui-spacing) * 3)',
    '--accordion-padding-y': 'calc(var(--ui-spacing) * 2)',
    '--accordion-radius': 'var(--ui-radius-md)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
  2: {
    '--accordion-inset': 'calc(var(--ui-spacing) * 4)',
    '--accordion-padding-y': 'calc(var(--ui-spacing) * 3)',
    '--accordion-radius': 'var(--ui-radius-lg)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
  3: {
    '--accordion-inset': 'calc(var(--ui-spacing) * 5)',
    '--accordion-padding-y': 'calc(var(--ui-spacing) * 4)',
    '--accordion-radius': 'var(--ui-radius-lg)',
    fontSize: 'var(--ui-text-base)',
    lineHeight: 'var(--ui-text-base--line-height)',
  },
})
