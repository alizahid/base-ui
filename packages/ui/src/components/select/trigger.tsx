'use client'

import {
  Select as Component,
  type SelectTriggerProps as ComponentTriggerProps,
  type SelectValueProps,
} from '@base-ui/react/select'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, type ReactNode, use } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { ChevronDownIcon, icon } from '../../lib/icons.js'
import { type RadiusToken, radii } from '../../lib/radii.js'
import { SizeContext } from '../../lib/size.js'
import { merge } from '../../lib/stylex.js'
import { trigger, triggerSizes, triggerVariants } from '../../lib/trigger.js'

export type SelectTriggerProps = Omit<ComponentTriggerProps, 'children'> & {
  children?: SelectValueProps['children']
  className?: string
  color?: ColorToken | 'gray'
  placeholder?: ReactNode
  radius?: RadiusToken
  style?: CSSProperties
  variant?: 'surface' | 'soft' | 'ghost'
}

// shows the selected item's label, or several joined by commas. pass a
// function as children, (value) => node, to show something else, such as
// "Apple (+2 more)" for a multiple select
export function Trigger({
  children,
  className,
  color,
  placeholder,
  radius,
  style,
  variant = 'surface',
  ...props
}: SelectTriggerProps) {
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
      <Component.Value
        placeholder={placeholder}
        {...stylex.props(trigger.value)}
      >
        {children}
      </Component.Value>

      <Component.Icon
        render={<ChevronDownIcon />}
        {...stylex.props(icon.small, trigger.icon)}
      />
    </Component.Trigger>
  )
}
