'use client'

import { Button } from 'basedkit'
import { PhoneField } from 'basedkit/phone-field'

type Props = {
  country: string
  empty: string
  label: string
  locale: string
  search: string
  submit: string
}

// a form that logs what the field reports, to see in the browser's console
// that the number arrives without spaces: on every change, and on submit
export function PhoneFieldDemo({
  country,
  empty,
  label,
  locale,
  search,
  submit,
}: Props) {
  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(event) => {
        event.preventDefault()

        console.log(
          'submit',
          Object.fromEntries(new FormData(event.currentTarget)),
        )
      }}
    >
      <PhoneField
        aria-label={label}
        className="w-64"
        countryLabel={country}
        defaultCountry="AE"
        empty={empty}
        locale={locale}
        name="phone"
        onValueChange={(value, details) => {
          console.log('change', value, details)
        }}
        searchPlaceholder={search}
      />

      <Button type="submit">{submit}</Button>
    </form>
  )
}
