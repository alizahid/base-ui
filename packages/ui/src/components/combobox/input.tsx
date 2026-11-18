'use client'

import {
  Combobox as Component,
  type ComboboxInputProps as ComponentInputProps,
} from '@base-ui/react/combobox'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, use } from 'react'

import { chipSizes, chips, chipVariants } from '#lib/chips.js'
import { type ColorToken } from '#lib/colors.js'
import { ChevronDownIcon, Cross2Icon, icon } from '#lib/icons.js'
import { input, inputSizes, inputVariants } from '#lib/input.js'
import { type RadiusToken, radii } from '#lib/radii.js'
import { SizeContext } from '#lib/size.js'
import { merge } from '#lib/stylex.js'

import { MultipleContext } from './context.js'
import { itemLabel } from './utils.js'

export type ComboboxInputProps = Omit<
  ComponentInputProps,
  'className' | 'color' | 'size' | 'style'
> & {
  className?: string
  clearLabel?: string
  color?: ColorToken | 'gray'
  openLabel?: string
  radius?: RadiusToken
  removeLabel?: string
  style?: CSSProperties
  variant?: 'surface' | 'soft'
}

// looks like a TextField with a Select's chevron. className and style go to
// the wrapper, which is also what the popup is anchored to; everything else
// goes to the input. with `multiple` on the root, the selected values show as
// chips before the input. the three labels name the icon buttons for screen
// readers
export function Input({
  className,
  clearLabel = 'Clear',
  color,
  openLabel = 'Open',
  radius,
  removeLabel = 'Remove',
  style,
  variant = 'surface',
  ...props
}: ComboboxInputProps) {
  const size = use(SizeContext)
  const multiple = use(MultipleContext)

  const field = (
    <Component.Input
      {...props}
      {...stylex.props(input.input, multiple && chips.grow)}
    />
  )

  return (
    <Component.InputGroup
      data-accent={color}
      {...merge(
        stylex.props(
          input.main,
          inputVariants[variant],
          inputSizes[size],
          chipVariants[variant],
          chipSizes[size],
          multiple && chips.tall,
          radius && radii[radius],
        ),
        className,
        style,
      )}
    >
      {multiple ? (
        <Component.Chips {...stylex.props(chips.chips)}>
          <Component.Value>
            {(values: ReadonlyArray<unknown>) =>
              values.map((value) => {
                const label = itemLabel(value)

                return (
                  <Component.Chip
                    aria-label={label}
                    data-chip=""
                    key={label}
                    {...stylex.props(chips.chip)}
                  >
                    {label}

                    <Component.ChipRemove
                      aria-label={removeLabel}
                      {...stylex.props(input.action, chips.remove)}
                    >
                      <Cross2Icon {...stylex.props(chips.cross)} />
                    </Component.ChipRemove>
                  </Component.Chip>
                )
              })
            }
          </Component.Value>

          {field}
        </Component.Chips>
      ) : (
        field
      )}

      <div
        data-side="end"
        {...stylex.props(input.slot, input.end, multiple && chips.slot)}
      >
        {/* base ui only renders this while there is something to clear */}
        <Component.Clear
          aria-label={clearLabel}
          {...stylex.props(input.action)}
        >
          <Cross2Icon {...stylex.props(icon.small)} />
        </Component.Clear>

        <Component.Trigger
          aria-label={openLabel}
          {...stylex.props(input.action)}
        >
          <ChevronDownIcon {...stylex.props(icon.small)} />
        </Component.Trigger>
      </div>
    </Component.InputGroup>
  )
}
