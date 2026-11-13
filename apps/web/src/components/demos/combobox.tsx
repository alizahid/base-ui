'use client'

import { Combobox } from '@repo/ui'
import { useRef, useState } from 'react'

type Item = {
  label: string
  value: string
}

type Props = {
  empty: string
  hint: string
  items: Array<Item>
  loading: string
  placeholder: string
}

// loads its options as you type. nothing is fetched until there is a query,
// and the previous results are dropped while the next ones load. the timeout
// stands in for a request
export function AsyncCombobox({
  empty,
  hint,
  items: all,
  loading,
  placeholder,
}: Props) {
  const [items, setItems] = useState<Array<Item>>([])
  const [query, setQuery] = useState('')
  const [pending, setPending] = useState(false)

  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  // one message at a time: loading, then a prompt to type, then no results
  let message = empty

  if (pending) {
    message = loading
  } else if (!query) {
    message = hint
  }

  return (
    <Combobox.Root
      // the "server" has already filtered, so base ui shouldn't filter again
      filter={null}
      items={items}
      onInputValueChange={(value) => {
        clearTimeout(timer.current)

        setQuery(value)
        setItems([])
        setPending(Boolean(value))

        if (!value) {
          return
        }

        timer.current = setTimeout(() => {
          setItems(
            all.filter((item) =>
              item.label.toLowerCase().includes(value.toLowerCase()),
            ),
          )

          setPending(false)
        }, 600)
      }}
    >
      <Combobox.Input placeholder={placeholder} />

      <Combobox.Content
        empty={pending ? undefined : message}
        status={pending ? message : undefined}
      />
    </Combobox.Root>
  )
}

type CollapsedProps = {
  empty: string
  items: Array<Item>
  more: string
  placeholder: string
  search: string
}

// a multiple combobox with a button trigger that stays on one line: the first
// value, then a count of the rest. the function child is why this is a client
// component
export function CollapsedCombobox({
  empty,
  items,
  more,
  placeholder,
  search,
}: CollapsedProps) {
  return (
    <Combobox.Root defaultValue={items.slice(0, 3)} items={items} multiple>
      <Combobox.Trigger className="w-48">
        {(value: Array<Item>) => {
          const [first, ...rest] = value

          if (!first) {
            return placeholder
          }

          return rest.length > 0
            ? `${first.label} (+${rest.length} ${more})`
            : first.label
        }}
      </Combobox.Trigger>

      <Combobox.Content
        empty={empty}
        search={<Combobox.Search placeholder={search} />}
      />
    </Combobox.Root>
  )
}
