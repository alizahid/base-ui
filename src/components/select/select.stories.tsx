import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Select } from '.'

const variants = ['surface', 'soft', 'ghost'] as const
const sizes = ['sm', 'md', 'lg'] as const

const meta = {
  title: 'Components/Select',
  component: Select.Trigger,
  args: { color: 'accent', disabled: false, placeholder: 'Pick a fruit', variant: 'surface' },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    radius: { control: 'inline-radio', options: radii },
    variant: { control: 'inline-radio', options: variants },
  },
} satisfies Meta<typeof Select.Trigger>

export default meta

type Story = StoryObj<typeof meta>

function Fruits() {
  return (
    <>
      <Select.Group>
        <Select.Label>Fruits</Select.Label>
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
        <Select.Item value="orange">Orange</Select.Item>
        <Select.Item disabled value="grape">
          Grape
        </Select.Item>
      </Select.Group>
      <Select.Separator />
      <Select.Group>
        <Select.Label>Vegetables</Select.Label>
        <Select.Item value="carrot">Carrot</Select.Item>
        <Select.Item value="potato">Potato</Select.Item>
      </Select.Group>
    </>
  )
}

const labels: Record<string, string> = {
  apple: 'Apple',
  banana: 'Banana',
  carrot: 'Carrot',
  grape: 'Grape',
  orange: 'Orange',
  potato: 'Potato',
}

export const Playground: Story = {
  render: (args) => (
    <Select.Root items={labels}>
      <Select.Trigger {...args} />
      <Select.Content color={args.color}>
        <Fruits />
      </Select.Content>
    </Select.Root>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {variants.map((variant) => (
        <Select.Root defaultValue="apple" items={labels} key={variant}>
          <Select.Trigger {...args} variant={variant} />
          <Select.Content>
            <Fruits />
          </Select.Content>
        </Select.Root>
      ))}
      {variants.map((variant) => (
        <Select.Root items={labels} key={variant}>
          <Select.Trigger {...args} variant={variant} />
          <Select.Content>
            <Fruits />
          </Select.Content>
        </Select.Root>
      ))}
    </div>
  ),
}

/** `size` goes on `Root`. The trigger and the rows follow it. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((size) => (
        <Select.Root defaultValue="apple" items={labels} key={size} size={size}>
          <Select.Trigger {...args} />
          <Select.Content>
            <Fruits />
          </Select.Content>
        </Select.Root>
      ))}
    </div>
  ),
}

/**
 * `variant` on `Content` is the look of the highlighted row: a full color fill
 * (`solid`) or a light tint (`soft`). `highContrast` makes the solid fill darker.
 */
export const ContentVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {(
        [
          { label: 'solid', variant: 'solid' },
          { label: 'soft', variant: 'soft' },
          { highContrast: true, label: 'solid, high contrast', variant: 'solid' },
        ] as const
      ).map(({ label, ...props }) => (
        <Select.Root items={labels} key={label}>
          <Select.Trigger {...args} placeholder={label} />
          <Select.Content {...props}>
            <Fruits />
          </Select.Content>
        </Select.Root>
      ))}
    </div>
  ),
}

/** `color` on `Trigger` and on `Content`. */
export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {colors.map((color) => (
        <Select.Root defaultValue="apple" items={labels} key={color}>
          <Select.Trigger {...args} color={color} variant="soft" />
          <Select.Content color={color}>
            <Fruits />
          </Select.Content>
        </Select.Root>
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {radii.map((radius) => (
        <Select.Root items={labels} key={radius}>
          <Select.Trigger {...args} placeholder={radius} radius={radius} />
          <Select.Content>
            <Fruits />
          </Select.Content>
        </Select.Root>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {variants.map((variant) => (
        <Select.Root defaultValue="apple" disabled items={labels} key={variant}>
          <Select.Trigger {...args} variant={variant} />
          <Select.Content>
            <Fruits />
          </Select.Content>
        </Select.Root>
      ))}
    </div>
  ),
}

/** With `alignItemWithTrigger={false}` the list opens below the trigger, like a menu. */
export const BelowTrigger: Story = {
  render: (args) => (
    <Select.Root defaultValue="orange" items={labels}>
      <Select.Trigger {...args} />
      <Select.Content alignItemWithTrigger={false}>
        <Fruits />
      </Select.Content>
    </Select.Root>
  ),
}

export const Multiple: Story = {
  render: (args) => (
    <Select.Root defaultValue={['apple', 'carrot']} items={labels} multiple>
      <Select.Trigger {...args} className="w-56" />
      <Select.Content alignItemWithTrigger={false}>
        <Fruits />
      </Select.Content>
    </Select.Root>
  ),
}

const countries = Array.from({ length: 80 }, (_, index) => `Country ${index + 1}`)

/** A long list scrolls, with arrows at the top and bottom. */
export const LongList: Story = {
  render: (args) => (
    <Select.Root defaultValue="Country 40">
      <Select.Trigger {...args} />
      <Select.Content>
        {countries.map((country) => (
          <Select.Item key={country} value={country}>
            {country}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  ),
}

export const ClassNameOverride: Story = {
  render: (args) => (
    <Select.Root items={labels}>
      <Select.Trigger
        {...args}
        className="w-64 rounded-none"
        classNames={{ icon: 'text-accent-9', value: 'font-bold' }}
      />
      <Select.Content className="rounded-none" classNames={{ list: 'p-2' }}>
        <Select.Item className="rounded-none" value="apple">
          Apple
        </Select.Item>
        <Select.Item
          className="rounded-none"
          classNames={{ indicator: 'text-accent-9' }}
          value="banana"
        >
          Banana
        </Select.Item>
      </Select.Content>
    </Select.Root>
  ),
}
