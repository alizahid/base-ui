'use client'

import {
  Combobox as Component,
  type ComboboxInputProps as ComponentInputProps,
} from '@base-ui/react/combobox'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, use } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { ChevronDownIcon, Cross2Icon, icon } from '../../lib/icons.js'
import { input, inputSizes, inputVariants } from '../../lib/input.js'
import { type RadiusToken, radii } from '../../lib/radii.js'
import { SizeContext } from '../../lib/size.js'
import { merge } from '../../lib/stylex.js'
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
      {...stylex.props(input.input, multiple && styles.grow)}
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
          sizes[size],
          multiple && styles.tall,
          radius && radii[radius],
        ),
        className,
        style,
      )}
    >
      {multiple ? (
        <Component.Chips {...stylex.props(styles.chips)}>
          <Component.Value>
            {(values: ReadonlyArray<unknown>) =>
              values.map((value) => {
                const label = itemLabel(value)

                return (
                  <Component.Chip
                    aria-label={label}
                    data-chip=""
                    key={label}
                    {...stylex.props(styles.chip)}
                  >
                    {label}

                    <Component.ChipRemove
                      aria-label={removeLabel}
                      {...stylex.props(input.action, styles.remove)}
                    >
                      <Cross2Icon {...stylex.props(styles.cross)} />
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

      <div data-side="end" {...stylex.props(input.slot, input.end)}>
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

const styles = stylex.create({
  chip: {
    alignItems: 'center',
    backgroundColor: {
      ':is([data-highlighted])': 'var(--combobox-chip-highlight)',
      default: 'var(--combobox-chip)',
    },
    borderRadius: 'var(--radius-sm)',
    cursor: 'default',
    display: 'inline-flex',
    gap: 'calc(var(--spacing) * 0.5)',
    height: 'var(--combobox-chip-height)',
    outline: 'none',
    paddingInlineEnd: 'var(--spacing)',
    paddingInlineStart: 'calc(var(--spacing) * 1.5)',
    whiteSpace: 'nowrap',
  },
  // chips and the input share one wrapping row. the space around a chip is
  // what a single row leaves above and below it, so it is the same on every
  // side and between rows. the field's border takes its width out of the edges
  chips: {
    '--combobox-chip-space':
      'calc((var(--text-field-height) - var(--combobox-chip-height)) / 2)',
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    gap: 'var(--combobox-chip-space)',
    minWidth: 0,
    paddingBlock:
      'calc(var(--combobox-chip-space) - var(--text-field-border-width))',
    paddingInlineStart: {
      ':has([data-chip])':
        'calc(var(--combobox-chip-space) - var(--text-field-border-width))',
    },
  },
  // a step smaller than the line, so it reads as part of the chip
  cross: {
    height: 'calc(1lh - var(--spacing) * 1.5)',
    width: 'calc(1lh - var(--spacing) * 1.5)',
  },
  // the input takes whatever is left of the row, and wraps when that is tight
  grow: {
    flexBasis: 'calc(var(--spacing) * 16)',
    flexGrow: 1,
    height: 'var(--combobox-chip-height)',
    minWidth: 'calc(var(--spacing) * 16)',
    width: 'auto',
  },
  remove: {
    opacity: {
      ':hover': {
        '@media (hover: hover)': 1,
        default: null,
      },
      default: 0.6,
    },
  },
  // with chips the field grows with its rows instead of keeping a fixed height
  tall: {
    height: 'auto',
    minHeight: 'var(--text-field-height)',
  },
})

const chipVariants = stylex.create({
  soft: {
    '--combobox-chip': 'var(--accent-a5)',
    '--combobox-chip-highlight': 'var(--accent-a6)',
  },
  surface: {
    '--combobox-chip': 'var(--accent-a3)',
    '--combobox-chip-highlight': 'var(--accent-a5)',
  },
})

const sizes = stylex.create({
  1: {
    '--combobox-chip-height': 'calc(var(--spacing) * 5)',
  },
  2: {
    '--combobox-chip-height': 'calc(var(--spacing) * 6)',
  },
  3: {
    '--combobox-chip-height': 'calc(var(--spacing) * 7)',
  },
})
