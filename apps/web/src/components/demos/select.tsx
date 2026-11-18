'use client'

import { Select } from 'basedkit'

type Props = {
  items: Record<string, string>
  more: string
  placeholder: string
}

// a multiple select whose trigger stays on one line: the first value, then a
// count of the rest. the function child is why this is a client component
export function CollapsedSelect({ items, more, placeholder }: Props) {
  const values = Object.keys(items)

  return (
    <Select.Root defaultValue={values.slice(0, 3)} items={items} multiple>
      <Select.Trigger className="w-48">
        {(value: Array<string>) => {
          const [first, ...rest] = value

          if (!first) {
            return placeholder
          }

          return rest.length > 0
            ? `${items[first]} (+${rest.length} ${more})`
            : items[first]
        }}
      </Select.Trigger>

      <Select.Content>
        {values.map((item) => (
          <Select.Item key={item} value={item}>
            {items[item]}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
