'use client'

import { Combobox as Component } from '@base-ui/react/combobox'
import { Field } from '@base-ui/react/field'
import { Input, type InputProps } from '@base-ui/react/input'
import * as stylex from '@stylexjs/stylex'
import {
  AsYouType,
  type CountryCode,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from 'libphonenumber-js'
import {
  type ChangeEvent,
  type CSSProperties,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  type ComboboxContentProps,
  Content,
} from '#components/combobox/content.js'
import { Item } from '#components/combobox/item.js'
import { Root } from '#components/combobox/root.js'
import { Search } from '#components/combobox/search.js'
import { type ColorToken } from '#lib/colors.js'
import { ChevronDownIcon, icon } from '#lib/icons.js'
import { input, inputSizes, inputVariants } from '#lib/input.js'
import { type RadiusToken, radii } from '#lib/radii.js'
import { merge } from '#lib/stylex.js'

export type PhoneFieldCountry = CountryCode

export type PhoneFieldDetails = {
  country: PhoneFieldCountry | undefined
  valid: boolean
}

export type PhoneFieldProps = Omit<
  InputProps,
  | 'className'
  | 'color'
  | 'defaultValue'
  | 'onValueChange'
  | 'size'
  | 'style'
  | 'type'
  | 'value'
> & {
  className?: string
  color?: ColorToken | 'gray'
  countryLabel?: string
  defaultCountry?: PhoneFieldCountry
  defaultValue?: string
  empty?: ReactNode
  invalidMessage?: string
  locale?: string
  onValueChange?: (value: string, details: PhoneFieldDetails) => void
  radius?: RadiusToken
  searchPlaceholder?: string
  size?: '1' | '2' | '3'
  style?: CSSProperties
  value?: string
  variant?: 'ghost' | 'soft' | 'surface'
} & Pick<ComboboxContentProps, 'align' | 'side' | 'sideOffset'>

type Country = {
  code: string
  label: string
  value: PhoneFieldCountry
}

// a TextField for phone numbers, with a searchable country picker at its
// start. the number is formatted as it is typed and checked against the
// country's rules (libphonenumber); typing or pasting one with its + code
// switches the country. the input shows the number with spaces, but
// `onValueChange` and a form submit always get it without them, as E.164
// (+971501234567) once it is valid. `value` and `defaultValue` take it
// either way. a valid number turns the field green while it has focus; an
// invalid one turns it red once the field is left, and sets the input's
// validity, so a Field around it shows `invalidMessage` when it validates.
// className and style go to the wrapper, everything else to the input
export function PhoneField({
  align,
  className,
  color,
  countryLabel = 'Country',
  defaultCountry,
  defaultValue,
  empty = 'No countries found',
  invalidMessage = 'Enter a valid phone number',
  locale = 'en',
  onValueChange,
  radius,
  searchPlaceholder = 'Search',
  side,
  sideOffset,
  size = '2',
  style,
  value,
  variant = 'surface',
  ...props
}: PhoneFieldProps) {
  const wrapper = useRef<HTMLDivElement>(null)
  const field = useRef<HTMLInputElement>(null)

  // how many digits sit before the caret, to put it back after reformatting
  const caret = useRef<number | null>(null)

  const [state, setState] = useState(() =>
    read(value ?? defaultValue ?? '', defaultCountry),
  )

  // a `value` from outside that isn't what was last reported replaces the text
  const reported = useRef(state.number)

  if (value !== undefined && value !== reported.current) {
    const next = read(value, state.country)

    reported.current = next.number

    setState(next)
  }

  // an invalid number only shows as invalid once the field has been left
  const [touched, setTouched] = useState(false)

  // a valid one only shows as valid while the number is being typed
  const [focused, setFocused] = useState(false)

  const countries = useMemo(() => list(locale), [locale])

  const invalid = state.text.trim() !== '' && !state.valid

  useLayoutEffect(() => {
    field.current?.setCustomValidity(invalid ? invalidMessage : '')
  }, [invalid, invalidMessage])

  // the input holds the formatted text, which is what a form would send.
  // this swaps in the number without spaces as the form's data is gathered,
  // for a native submit and for `new FormData(form)` alike
  useEffect(() => {
    function onFormData(event: FormDataEvent) {
      const element = field.current

      if (
        element?.name &&
        event.target === element.form &&
        event.formData.has(element.name)
      ) {
        event.formData.set(element.name, reported.current)
      }
    }

    document.addEventListener('formdata', onFormData)

    return () => {
      document.removeEventListener('formdata', onFormData)
    }
  }, [])

  useLayoutEffect(() => {
    if (caret.current === null) {
      return
    }

    const position = after(state.text, caret.current)

    field.current?.setSelectionRange(position, position)

    caret.current = null
  })

  function update(text: string, country: PhoneFieldCountry | undefined) {
    const next = read(text, country)

    reported.current = next.number

    setState(next)

    onValueChange?.(next.number, {
      country: next.country,
      valid: next.valid,
    })
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const element = event.currentTarget

    caret.current = [
      ...element.value.slice(0, element.selectionStart ?? undefined),
    ].filter((character) => countable.test(character)).length

    update(element.value, state.country)
  }

  // keeps the number that was typed and puts the new country's code in front.
  // the digits are read again as a local number of the new country, so its
  // own trunk prefix goes: 050 123 4567 becomes +971 50 123 4567, not
  // +971 050 123 4567
  function onCountry(country: PhoneFieldCountry) {
    const current = new AsYouType(state.country)

    current.input(state.text)

    // with a + code, only what follows the code; otherwise all of it. this
    // works on an unfinished number too, which can't be parsed yet
    const local = state.text.trim().startsWith('+')
      ? current.getNationalNumber()
      : state.text

    const typer = new AsYouType(country)

    typer.input(local)

    update(
      typer.getNumberValue() ?? `+${getCountryCallingCode(country)}`,
      country,
    )

    field.current?.focus()
  }

  return (
    <div
      data-accent={color}
      ref={wrapper}
      {...merge(
        stylex.props(
          input.main,
          inputVariants[variant],
          inputSizes[size],
          radius && radii[radius],
          focused && state.valid && valid[variant],
          styles.main,
        ),
        className,
        style,
      )}
    >
      {/* before the input, so it comes first when tabbing, as it does on
          screen. it carries no data-side, unlike a TextField slot: the input
          keeps its text indent, so the space between the picker and the
          number is the input's own and a click there focuses it */}
      <div {...stylex.props(input.slot, styles.slot)}>
        {/* the picker gets a field of its own. inside a Field it would
            otherwise join it as a second control, and take its name and
            validation */}
        <Field.Root {...stylex.props(styles.picker)}>
          <Root<Country>
            autoHighlight
            disabled={props.disabled}
            filter={filter}
            items={countries}
            onValueChange={(item) => {
              if (item) {
                onCountry(item.value)
              }
            }}
            size={size}
            value={
              countries.find((item) => item.value === state.country) ?? null
            }
          >
            <Component.Trigger
              aria-label={countryLabel}
              {...stylex.props(input.action, styles.trigger)}
            >
              <Flag country={state.country} />

              <ChevronDownIcon {...stylex.props(icon.small)} />
            </Component.Trigger>

            <Content
              align={align}
              anchor={wrapper}
              empty={empty}
              search={<Search placeholder={searchPlaceholder} />}
              side={side}
              sideOffset={sideOffset}
            >
              {(item: Country) => (
                <Item key={item.value} value={item}>
                  <span {...stylex.props(styles.country)}>
                    <Flag country={item.value} />

                    <span {...stylex.props(styles.name)}>{item.label}</span>

                    <span {...stylex.props(styles.code)}>+{item.code}</span>
                  </span>
                </Item>
              )}
            </Content>
          </Root>
        </Field.Root>
      </div>

      <Input
        autoComplete="tel"
        inputMode="tel"
        {...props}
        aria-invalid={touched && invalid ? true : undefined}
        data-invalid={touched && invalid ? '' : undefined}
        onBlur={(event) => {
          setFocused(false)
          setTouched(true)

          props.onBlur?.(event)
        }}
        onChange={onChange}
        onFocus={(event) => {
          setFocused(true)

          props.onFocus?.(event)
        }}
        ref={field}
        type="tel"
        value={state.text}
        {...stylex.props(input.input)}
      />
    </div>
  )
}

type FlagProps = {
  country: PhoneFieldCountry | undefined
}

// a round flag from circle-flags (hatscripts.github.io/circle-flags), loaded
// as an image when it scrolls into view, so the package carries no flag
// artwork. the gray disc behind it shows until it loads, and when there is
// no country yet
function Flag({ country }: FlagProps) {
  return (
    <span {...stylex.props(styles.flag)}>
      {country ? (
        // biome-ignore lint/performance/noImgElement: a plain image; the library has no image component
        <img
          alt=""
          height={16}
          loading="lazy"
          src={`https://hatscripts.github.io/circle-flags/flags/${country.toLowerCase()}.svg`}
          width={16}
          {...stylex.props(styles.image)}
        />
      ) : null}
    </span>
  )
}

// the picker button's states. stylex doesn't order these against each other,
// so they must not overlap
const open = ':is([data-popup-open])'
const active = ':is(:active:not(:disabled, [data-popup-open]))'
const hover = ':is(:hover:not(:active, :disabled, [data-popup-open]))'

// what counts when placing the caret: the digits and a leading plus
const countable = /[+\d]/u

// everything else, which is what formatting adds
const uncountable = /[^+\d]/gu

// the index just past the given number of digits. it stops right after the
// last of them rather than after any space that follows, so a backspace
// over a space lands on the digit before it
function after(text: string, digits: number) {
  if (digits === 0) {
    return 0
  }

  let seen = 0

  const index = [...text].findIndex((character) => {
    if (countable.test(character)) {
      seen += 1
    }

    return seen === digits
  })

  return index === -1 ? text.length : index + 1
}

// formats what was typed, and works out the country, the E.164 number and
// whether it is valid. the country follows a + code once that is recognised,
// and otherwise stays as it was
function read(text: string, country: PhoneFieldCountry | undefined) {
  const typer = new AsYouType(country)

  const formatted = typer.input(text)

  const found = typer.getCountry() ?? country

  const phone = parsePhoneNumberFromString(text, found)

  const valid = phone?.isValid() ?? false

  return {
    country: found,
    // never with spaces: the E.164 number once it is valid, and before that
    // as much of it as there is, or failing that just the digits typed
    number:
      (valid ? phone?.number : typer.getNumberValue()) ??
      text.replace(uncountable, ''),
    text: formatted,
    valid,
  }
}

// every country libphonenumber knows, named in the given language
function list(locale: string): Array<Country> {
  const names = new Intl.DisplayNames([locale], {
    type: 'region',
  })

  return getCountries()
    .map((value) => ({
      code: getCountryCallingCode(value),
      label: names.of(value) ?? value,
      value,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, locale))
}

// by name, by dial code with or without the plus, or by the two-letter code
function filter(item: Country, query: string) {
  const text = query.trim().toLowerCase()

  return (
    item.label.toLowerCase().includes(text) ||
    `+${item.code}`.includes(text) ||
    item.value.toLowerCase() === text
  )
}

// while it has focus, a valid number turns the field green, as an invalid one
// turns it red: the ring on surface, the fill on the borderless variants, and
// the focus ring on all three. these replace the variant's variables, so a
// disabled or read-only field, which uses others, stays as it is
const valid = stylex.create({
  ghost: {
    '--text-field-background': 'var(--green-a3)',
    '--text-field-focus-color': 'var(--green-8)',
  },
  soft: {
    '--text-field-background': 'var(--green-a3)',
    '--text-field-focus-color': 'var(--green-8)',
  },
  surface: {
    '--text-field-focus-color': 'var(--green-8)',
    '--text-field-shadow': 'inset 0 0 0 1px var(--green-8)',
  },
})

const styles = stylex.create({
  // muted through opacity, so it follows the row's colour when highlighted.
  // always left to right, or the plus lands after the digits in an rtl list
  code: {
    direction: 'ltr',
    fontVariantNumeric: 'tabular-nums',
    opacity: 0.7,
  },
  country: {
    alignItems: 'center',
    display: 'flex',
    gap: 'calc(var(--ui-spacing) * 2)',
  },
  // a disc, a step smaller than the text line
  flag: {
    backgroundColor: 'var(--gray-a4)',
    borderRadius: 'calc(infinity * 1px)',
    flexShrink: 0,
    height: 'calc(1lh - var(--ui-spacing))',
    overflow: 'hidden',
    width: 'calc(1lh - var(--ui-spacing))',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  // a phone number reads left to right in every language, plus first. so the
  // field does too, wherever it is: the flag stays on the left and the
  // number starts beside it. the country list is outside the field, and
  // keeps the page's direction
  main: {
    direction: 'ltr',
  },
  // takes the room, which puts the code at the far end of the row
  name: {
    flexGrow: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  // only there to scope the picker; it takes no part in the layout. the
  // radius is passed on, for the button's corners
  picker: {
    borderRadius: 'inherit',
    display: 'contents',
  },
  // a TextField slot without padding of its own: the button fills it, so
  // there is no dead space on either side of the picker
  slot: {
    alignItems: 'stretch',
    borderRadius: 'inherit',
  },
  // as tall as the field, and padded at the start by as much as the field's
  // text would be, so the edge of the field opens the picker too. it tints on
  // hover and while the list is open, and shows a focus ring of its own, so
  // tabbing to it says the list can be opened. like the NumberField's
  // buttons it reaches under the field's border on its three outer sides,
  // with a transparent border its fill stops at, which puts the tint and the
  // ring's corners exactly on the field's
  trigger: {
    backgroundClip: 'padding-box',
    backgroundColor: {
      [active]: 'var(--gray-a4)',
      [hover]: {
        '@media (hover: hover)': 'var(--gray-a3)',
        default: null,
      },
      [open]: 'var(--gray-a3)',
    },
    borderBlockWidth: 'var(--text-field-border-width)',
    borderColor: 'transparent',
    borderEndStartRadius: 'inherit',
    borderInlineStartWidth: 'var(--text-field-border-width)',
    borderStartStartRadius: 'inherit',
    gap: 'var(--ui-spacing)',
    marginBlock: 'calc(var(--text-field-border-width) * -1)',
    marginInlineStart: 'calc(var(--text-field-border-width) * -1)',
    outline: {
      ':focus-visible': '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: -1,
    paddingInlineEnd: 'var(--ui-spacing)',
    paddingInlineStart: 'var(--text-field-padding)',
  },
})
