import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Autocomplete } from '.'

const sizes = ['xs', 'sm', 'md', 'lg'] as const

const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete.Input,
  args: {
    color: 'accent',
    disabled: false,
    placeholder: 'Search tags',
    showClear: true,
    showTrigger: false,
    size: 'md',
  },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
  },
} satisfies Meta<typeof Autocomplete.Input>

export default meta

type Story = StoryObj<typeof meta>

const tags = [
  'accessibility',
  'animation',
  'bug',
  'component',
  'design',
  'documentation',
  'enhancement',
  'feature',
  'performance',
  'question',
  'refactor',
  'security',
  'testing',
  'typescript',
]

function TagList({ color }: { color?: (typeof colors)[number] | 'accent' }) {
  return (
    <Autocomplete.Content color={color} empty="No tags found">
      {(tag: string) => (
        <Autocomplete.Item key={tag} value={tag}>
          {tag}
        </Autocomplete.Item>
      )}
    </Autocomplete.Content>
  )
}

export const Playground: Story = {
  render: (args) => (
    <div className="w-64">
      <Autocomplete.Root items={tags}>
        <Autocomplete.Input {...args} />
        <TagList color={args.color} />
      </Autocomplete.Root>
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-4">
      {sizes.map((size) => (
        <Autocomplete.Root defaultValue="design" items={tags} key={size}>
          <Autocomplete.Input {...args} size={size} />
          <TagList />
        </Autocomplete.Root>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-4">
      {(['accent', 'crimson', 'jade', 'amber'] as const).map((color) => (
        <Autocomplete.Root items={tags} key={color}>
          <Autocomplete.Input {...args} color={color} placeholder={color} />
          <TagList color={color} />
        </Autocomplete.Root>
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-4">
      {radii.map((radius) => (
        <Autocomplete.Root items={tags} key={radius}>
          <Autocomplete.Input {...args} placeholder={radius} radius={radius} />
          <TagList />
        </Autocomplete.Root>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <div className="w-64">
      <Autocomplete.Root defaultValue="design" disabled items={tags}>
        <Autocomplete.Input {...args} />
        <TagList />
      </Autocomplete.Root>
    </div>
  ),
}

const groups = [
  { value: 'Type', items: ['bug', 'feature', 'question'] },
  { value: 'Area', items: ['design', 'documentation', 'testing'] },
]

type TagGroup = (typeof groups)[number]

/** Grouped `items`, with `Group`, `Label`, `Collection` and `Separator`. */
export const Groups: Story = {
  render: (args) => (
    <div className="w-64">
      <Autocomplete.Root items={groups}>
        <Autocomplete.Input {...args} showTrigger />
        <Autocomplete.Content>
          {(group: TagGroup, index: number) => (
            <Autocomplete.Group items={group.items} key={group.value}>
              {index > 0 && <Autocomplete.Separator />}
              <Autocomplete.Label>{group.value}</Autocomplete.Label>
              <Autocomplete.Collection>
                {(tag: string) => (
                  <Autocomplete.Item key={tag} value={tag}>
                    {tag}
                  </Autocomplete.Item>
                )}
              </Autocomplete.Collection>
            </Autocomplete.Group>
          )}
        </Autocomplete.Content>
      </Autocomplete.Root>
    </div>
  ),
}

export const ClassNameOverride: Story = {
  render: (args) => (
    <div className="w-64">
      <Autocomplete.Root items={tags}>
        <Autocomplete.Input
          {...args}
          className="rounded-none bg-accent-a2"
          classNames={{ input: 'font-bold' }}
        />
        <Autocomplete.Content className="rounded-none">
          {(tag: string) => (
            <Autocomplete.Item className="rounded-none" key={tag} value={tag}>
              {tag}
            </Autocomplete.Item>
          )}
        </Autocomplete.Content>
      </Autocomplete.Root>
    </div>
  ),
}
