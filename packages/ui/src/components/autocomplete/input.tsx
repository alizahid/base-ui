'use client'

import {
  Autocomplete as Component,
  type AutocompleteInputProps as ComponentInputProps,
} from '@base-ui/react/autocomplete'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, use } from 'react'

import { type ColorToken } from '#lib/colors.js'
import { Cross2Icon, icon } from '#lib/icons.js'
import { input, inputSizes, inputVariants } from '#lib/input.js'
import { type RadiusToken, radii } from '#lib/radii.js'
import { SizeContext } from '#lib/size.js'
import { merge } from '#lib/stylex.js'

export type AutocompleteInputProps = Omit<
  ComponentInputProps,
  'className' | 'color' | 'size' | 'style'
> & {
  className?: string
  clearLabel?: string
  color?: ColorToken | 'gray'
  radius?: RadiusToken
  style?: CSSProperties
  variant?: 'surface' | 'soft'
}

// looks like a TextField, with a button to clear what was typed. className
// and style go to the wrapper, which is also what the popup is anchored to;
// everything else goes to the input. `clearLabel` names the button for screen
// readers. children are TextField.Slots, e.g. a search icon at the start
export function Input({
  children,
  className,
  clearLabel = 'Clear',
  color,
  radius,
  style,
  variant = 'surface',
  ...props
}: AutocompleteInputProps) {
  const size = use(SizeContext)

  return (
    <Component.InputGroup
      data-accent={color}
      {...merge(
        stylex.props(
          input.main,
          inputVariants[variant],
          inputSizes[size],
          radius && radii[radius],
        ),
        className,
        style,
      )}
    >
      <Component.Input {...props} {...stylex.props(input.input)} />

      {children}

      <div
        data-side="end"
        {...stylex.props(input.slot, input.end, styles.slot)}
      >
        {/* base ui only renders this while there is something to clear */}
        <Component.Clear
          aria-label={clearLabel}
          {...stylex.props(input.action)}
        >
          <Cross2Icon {...stylex.props(icon.small)} />
        </Component.Clear>
      </div>
    </Component.InputGroup>
  )
}

const styles = stylex.create({
  // keeps the button's room while it is not there, so the field is the same
  // width before and after something is typed
  slot: {
    boxSizing: 'content-box',
    minWidth: 'calc(1lh - var(--ui-spacing))',
  },
})
