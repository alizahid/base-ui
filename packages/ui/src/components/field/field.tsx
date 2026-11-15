'use client'

import {
  Field as Component,
  type FieldRootProps as ComponentProps,
} from '@base-ui/react/field'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, type ReactNode } from 'react'

import { merge } from '#lib/stylex.js'

export type FieldProps = ComponentProps & {
  className?: string
  error?: string
  hint?: ReactNode
  label?: ReactNode
  style?: CSSProperties
}

export function Field({
  children,
  className,
  error,
  hint,
  label,
  style,
  ...props
}: FieldProps) {
  return (
    <Component.Root
      // an `error` from the caller (a form library, the server) forces the
      // invalid state; without one base ui's own validation decides
      invalid={error ? true : undefined}
      {...props}
      {...merge(stylex.props(styles.main), className, style)}
    >
      {label ? (
        <Component.Label {...stylex.props(styles.label)}>
          {label}
        </Component.Label>
      ) : null}

      {children}

      {hint ? (
        <Component.Description {...stylex.props(styles.hint)}>
          {hint}
        </Component.Description>
      ) : null}

      {/* with an `error` this always shows it. without one, base ui shows its
          own validation message when the field is invalid. children is only
          passed alongside an error, as an explicit undefined would blank
          base ui's message */}
      <Component.Error
        {...(error
          ? {
              children: error,
              match: true,
            }
          : null)}
        {...stylex.props(styles.error)}
      />
    </Component.Root>
  )
}

const styles = stylex.create({
  error: {
    color: 'var(--red-11)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
  hint: {
    color: 'var(--gray-11)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
  label: {
    color: 'var(--gray-12)',
    fontSize: 'var(--ui-text-sm)',
    fontWeight: '500',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'calc(var(--ui-spacing) * 1.5)',
  },
})
