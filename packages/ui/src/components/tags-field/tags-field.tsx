'use client'

import {
  Input as Component,
  type InputProps as ComponentProps,
} from '@base-ui/react/input'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, type MouseEvent, useState } from 'react'

import { chipSizes, chips, chipVariants } from '#lib/chips.js'
import { type ColorToken } from '#lib/colors.js'
import { Cross2Icon, icon } from '#lib/icons.js'
import { input, inputSizes, inputVariants } from '#lib/input.js'
import { type RadiusToken, radii } from '#lib/radii.js'
import { merge } from '#lib/stylex.js'

export type TagsFieldProps = Omit<
  ComponentProps,
  | 'className'
  | 'color'
  | 'defaultValue'
  | 'max'
  | 'onValueChange'
  | 'size'
  | 'style'
  | 'value'
> & {
  className?: string
  clearable?: boolean
  clearLabel?: string
  color?: ColorToken | 'gray'
  defaultValue?: Array<string>
  // how many tags the field takes
  max?: number
  onValueChange?: (value: Array<string>) => void
  radius?: RadiusToken
  removeLabel?: string
  size?: '1' | '2' | '3'
  style?: CSSProperties
  value?: Array<string>
  variant?: 'surface' | 'soft'
}

// what ends a tag when typed, and splits pasted text into several
const separator = /[,\n]/u

// a text field whose value is a list of tags, shown as chips before the
// input, as in a multiple Combobox. enter or a comma turns what was typed
// into a tag, and so does leaving the field; pasted text is split at commas
// and line breaks. a tag is trimmed, and one the field already has is
// dropped. backspace in an empty input removes the last tag. escape clears
// what is typed, then the tags, unless `clearable` is false. with a `name`,
// each tag is sent in a form as its own entry. className and style go to the
// wrapper, everything else to the input
export function TagsField({
  className,
  clearable = true,
  clearLabel = 'Clear',
  color,
  defaultValue,
  disabled,
  max = Number.POSITIVE_INFINITY,
  name,
  onValueChange,
  radius,
  removeLabel = 'Remove',
  required,
  size = '2',
  style,
  value,
  variant = 'surface',
  ...props
}: TagsFieldProps) {
  const [own, setOwn] = useState(defaultValue ?? [])
  const [text, setText] = useState('')

  const tags = value ?? own

  function commit(next: Array<string>) {
    setOwn(next)
    onValueChange?.(next)
  }

  // turns text into tags: trimmed, without the ones already there, up to max
  function add(raw: string) {
    const fresh = raw
      .split(separator)
      .map((tag) => tag.trim())
      .filter(Boolean)

    const next = [...new Set([...tags, ...fresh])].slice(0, max)

    if (next.length > tags.length) {
      commit(next)
    }

    setText('')
  }

  // escape clears what is typed, then the tags. false when there was nothing
  // to clear
  function clear() {
    if (text) {
      setText('')

      return true
    }

    if (clearable && tags.length > 0) {
      commit([])

      return true
    }

    return false
  }

  // a button that goes away would take the focus with it
  function refocus(event: MouseEvent<HTMLButtonElement>) {
    event.currentTarget.closest('label')?.querySelector('input')?.focus()
  }

  return (
    <>
      <label
        data-accent={color}
        {...merge(
          stylex.props(
            input.main,
            inputVariants[variant],
            inputSizes[size],
            chipVariants[variant],
            chipSizes[size],
            chips.tall,
            radius && radii[radius],
          ),
          className,
          style,
        )}
      >
        <span {...stylex.props(chips.chips)}>
          {/* first in the markup and shown last: a label acts on the first
            control inside it, which has to be the input and not a chip's
            remove button */}
          <Component
            {...props}
            disabled={disabled}
            onBlur={(event) => {
              props.onBlur?.(event)

              add(text)
            }}
            onChange={(event) => {
              props.onChange?.(event)

              const next = event.currentTarget.value

              // a comma ends a tag however it got here: typed, pasted, or from
              // a phone keyboard that sends no key
              if (separator.test(next)) {
                add(next)
              } else {
                setText(next)
              }
            }}
            onKeyDown={(event) => {
              props.onKeyDown?.(event)

              // enter also picks a word while composing one, in japanese for
              // instance
              if (event.nativeEvent.isComposing) {
                return
              }

              if (event.key === 'Enter') {
                // enter only submits the form once there is nothing left to add
                if (text.trim()) {
                  event.preventDefault()
                }

                add(text)

                return
              }

              if (event.key === 'Backspace' && !text && tags.length > 0) {
                commit(tags.slice(0, -1))

                return
              }

              if (event.key === 'Escape' && clear()) {
                // so a dialog around the field stays open
                event.stopPropagation()
              }
            }}
            // an input drops the line breaks of what is pasted into it, so a
            // pasted list is split here, before it gets there
            onPaste={(event) => {
              props.onPaste?.(event)

              const pasted = event.clipboardData.getData('text')

              if (pasted.includes('\n')) {
                event.preventDefault()

                add(text + pasted)
              }
            }}
            // a tag satisfies `required`
            required={required && tags.length === 0}
            value={text}
            {...stylex.props(input.input, chips.grow, styles.input)}
          />

          {tags.map((tag) => (
            <span data-chip="" key={tag} {...stylex.props(chips.chip)}>
              {tag}

              {/* for the pointer: the keyboard has backspace */}
              <button
                aria-label={`${removeLabel} ${tag}`}
                data-disabled={disabled ? '' : undefined}
                disabled={disabled}
                onClick={(event) => {
                  refocus(event)

                  commit(tags.filter((item) => item !== tag))
                }}
                tabIndex={-1}
                type="button"
                {...stylex.props(input.action, chips.remove)}
              >
                <Cross2Icon {...stylex.props(chips.cross)} />
              </button>
            </span>
          ))}
        </span>

        {clearable && tags.length > 0 && !disabled ? (
          <div
            data-side="end"
            {...stylex.props(input.slot, input.end, chips.slot)}
          >
            {/* for the pointer: the keyboard has escape */}
            <button
              aria-label={clearLabel}
              onClick={(event) => {
                refocus(event)

                commit([])
              }}
              tabIndex={-1}
              type="button"
              {...stylex.props(input.action)}
            >
              <Cross2Icon {...stylex.props(icon.small)} />
            </button>
          </div>
        ) : null}
      </label>

      {/* beside the field, not inside it: a hidden input counts as read-only,
          and the field would take the read-only look */}
      {name
        ? tags.map((tag) => (
            <input key={tag} name={name} type="hidden" value={tag} />
          ))
        : null}
    </>
  )
}

const styles = stylex.create({
  // after the chips, though it comes before them in the markup
  input: {
    order: 1,
  },
})
