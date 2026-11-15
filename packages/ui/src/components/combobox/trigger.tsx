'use client'

import {
  type ComboboxValueProps,
  Combobox as Component,
  type ComboboxTriggerProps as ComponentTriggerProps,
} from '@base-ui/react/combobox'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, type ReactNode, use } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { ChevronDownIcon, icon } from '../../lib/icons.js'
import { type RadiusToken, radii } from '../../lib/radii.js'
import { SizeContext } from '../../lib/size.js'
import { merge } from '../../lib/stylex.js'
import { trigger, triggerSizes, triggerVariants } from '../../lib/trigger.js'

export type ComboboxTriggerProps = Omit<ComponentTriggerProps, 'children'> & {
  children?: ComboboxValueProps['children']
  className?: string
  color?: ColorToken | 'gray'
  placeholder?: ReactNode
  radius?: RadiusToken
  style?: CSSProperties
  variant?: 'surface' | 'soft' | 'ghost'
}

// a button that looks like Select.Trigger, for a combobox whose search input
// lives inside the popup: use this in place of Combobox.Input, and pass
// Combobox.Search to the content's `search`
export function Trigger({
  children,
  className,
  color,
  placeholder,
  radius,
  style,
  variant = 'surface',
  ...props
}: ComboboxTriggerProps) {
  const size = use(SizeContext)

  return (
    <Component.Trigger
      data-accent={color}
      {...props}
      {...merge(
        stylex.props(
          trigger.trigger,
          triggerVariants[variant],
          triggerSizes[size],
          radius && radii[radius],
        ),
        className,
        style,
      )}
    >
      <span {...stylex.props(trigger.value)}>
        <Component.Value placeholder={placeholder}>{children}</Component.Value>
      </span>

      <Component.Icon
        render={<ChevronDownIcon />}
        {...stylex.props(icon.small, trigger.icon)}
      />
    </Component.Trigger>
  )
}
