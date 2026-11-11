import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { TextField } from '../text-field'
import { Combobox } from '.'

const sizes = ['xs', 'sm', 'md', 'lg'] as const

const meta = {
  title: 'Components/Combobox',
  component: Combobox.Input,
  args: {
    color: 'accent',
    disabled: false,
    placeholder: 'Pick a fruit',
    showClear: true,
    showTrigger: true,
    size: 'md',
  },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
    variant: { control: 'inline-radio', options: ['surface', 'soft'] },
  },
} satisfies Meta<typeof Combobox.Input>

export default meta

type Story = StoryObj<typeof meta>

const fruits = [
  'Apple',
  'Apricot',
  'Banana',
  'Blackberry',
  'Blueberry',
  'Cherry',
  'Grape',
  'Grapefruit',
  'Kiwi',
  'Lemon',
  'Mango',
  'Orange',
  'Papaya',
  'Peach',
  'Pear',
  'Pineapple',
  'Plum',
  'Raspberry',
  'Strawberry',
  'Watermelon',
]

function FruitList({ color }: { color?: (typeof colors)[number] | 'accent' }) {
  return (
    <Combobox.Content color={color} empty="No fruits found">
      {(fruit: string) => (
        <Combobox.Item key={fruit} value={fruit}>
          {fruit}
        </Combobox.Item>
      )}
    </Combobox.Content>
  )
}

export const Playground: Story = {
  render: (args) => (
    <div className="w-64">
      <Combobox.Root items={fruits}>
        <Combobox.Input {...args} />
        <FruitList color={args.color} />
      </Combobox.Root>
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-4">
      {sizes.map((size) => (
        <Combobox.Root defaultValue="Banana" items={fruits} key={size}>
          <Combobox.Input {...args} size={size} />
          <FruitList />
        </Combobox.Root>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="grid w-fit grid-cols-3 gap-4">
      {colors.map((color) => (
        <Combobox.Root items={fruits} key={color}>
          <Combobox.Input {...args} className="w-48" color={color} placeholder={color} />
          <FruitList color={color} />
        </Combobox.Root>
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-4">
      {radii.map((radius) => (
        <Combobox.Root items={fruits} key={radius}>
          <Combobox.Input {...args} placeholder={radius} radius={radius} />
          <FruitList />
        </Combobox.Root>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <div className="w-64">
      <Combobox.Root defaultValue="Banana" disabled items={fruits}>
        <Combobox.Input {...args} />
        <FruitList />
      </Combobox.Root>
    </div>
  ),
}

type Produce = { label: string; value: string }

const groups: { items: Produce[]; value: string }[] = [
  {
    value: 'Fruits',
    items: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Orange', value: 'orange' },
    ],
  },
  {
    value: 'Vegetables',
    items: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Potato', value: 'potato' },
    ],
  },
]

type ProduceGroup = (typeof groups)[number]

/** Grouped `items`, with `Group`, `Label`, `Collection` and `Separator`. */
export const Groups: Story = {
  render: (args) => (
    <div className="w-64">
      <Combobox.Root items={groups}>
        <Combobox.Input {...args} placeholder="Pick something" />
        <Combobox.Content>
          {(group: ProduceGroup, index: number) => (
            <Combobox.Group items={group.items} key={group.value}>
              {index > 0 && <Combobox.Separator />}
              <Combobox.Label>{group.value}</Combobox.Label>
              <Combobox.Collection>
                {(item: Produce) => (
                  <Combobox.Item key={item.value} value={item}>
                    {item.label}
                  </Combobox.Item>
                )}
              </Combobox.Collection>
            </Combobox.Group>
          )}
        </Combobox.Content>
      </Combobox.Root>
    </div>
  ),
}

/** `multiple` on `Root`, and `Chips` in place of `Input`. */
export const Multiple: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-4">
      {sizes.map((size) => (
        <Combobox.Root defaultValue={['Apple', 'Kiwi']} items={fruits} key={size} multiple>
          <Combobox.Chips color={args.color} placeholder="Pick fruits" size={size}>
            {(value: string[]) =>
              value.map((fruit) => <Combobox.Chip key={fruit}>{fruit}</Combobox.Chip>)
            }
          </Combobox.Chips>
          <FruitList color={args.color} />
        </Combobox.Root>
      ))}
    </div>
  ),
}

export const ClassNameOverride: Story = {
  render: (args) => (
    <div className="w-64">
      <Combobox.Root items={fruits}>
        <Combobox.Input
          {...args}
          className="rounded-none bg-accent-a2"
          classNames={{ input: 'font-bold', trigger: 'text-accent-9' }}
        />
        <Combobox.Content className="rounded-none" classNames={{ list: 'max-h-40' }}>
          {(fruit: string) => (
            <Combobox.Item className="rounded-none" key={fruit} value={fruit}>
              {fruit}
            </Combobox.Item>
          )}
        </Combobox.Content>
      </Combobox.Root>
    </div>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-4">
      {(['surface', 'soft'] as const).map((variant) => (
        <Combobox.Root defaultValue="Banana" items={fruits} key={variant}>
          <Combobox.Input {...args} variant={variant} />
          <FruitList />
        </Combobox.Root>
      ))}
      <Combobox.Root defaultValue={['Apple', 'Kiwi']} items={fruits} multiple>
        <Combobox.Chips aria-label="Fruits" variant="soft">
          {(value: string[]) =>
            value.map((fruit) => <Combobox.Chip key={fruit}>{fruit}</Combobox.Chip>)
          }
        </Combobox.Chips>
        <FruitList />
      </Combobox.Root>
    </div>
  ),
}

/** A `TextField.Slot` inside the input, for example a search icon on the left. */
export const WithSlot: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-4">
      {sizes.map((size) => (
        <Combobox.Root items={fruits} key={size}>
          <Combobox.Input {...args} size={size}>
            <TextField.Slot>
              <SearchIcon />
            </TextField.Slot>
          </Combobox.Input>
          <FruitList />
        </Combobox.Root>
      ))}
    </div>
  ),
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="size-[1em]" fill="none" viewBox="0 0 16 16">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m10.5 10.5 3 3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}
