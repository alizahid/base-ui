import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { TextField } from '../text-field'
import { Autocomplete } from '.'

const sizes = ['sm', 'md', 'lg', 'xl'] as const

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
    variant: { control: 'inline-radio', options: ['surface', 'soft'] },
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

function TagList(props: Omit<Autocomplete.ContentProps, 'children' | 'empty'>) {
  return (
    <Autocomplete.Content {...props} empty="No tags found">
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

export const Variants: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-4">
      {(['surface', 'soft'] as const).map((variant) => (
        <Autocomplete.Root defaultValue="design" items={tags} key={variant}>
          <Autocomplete.Input {...args} variant={variant} />
          <TagList />
        </Autocomplete.Root>
      ))}
    </div>
  ),
}

/** `Content` has the same `size`, `variant` and `highContrast` props as a menu. */
export const ContentVariants: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-4">
      <Autocomplete.Root items={tags}>
        <Autocomplete.Input {...args} placeholder="solid" />
        <TagList />
      </Autocomplete.Root>
      <Autocomplete.Root items={tags}>
        <Autocomplete.Input {...args} placeholder="soft" />
        <TagList variant="soft" />
      </Autocomplete.Root>
      <Autocomplete.Root items={tags}>
        <Autocomplete.Input {...args} placeholder="solid, high contrast" />
        <TagList highContrast />
      </Autocomplete.Root>
      <Autocomplete.Root items={tags}>
        <Autocomplete.Input {...args} placeholder="size sm" size="sm" />
        <TagList size="sm" />
      </Autocomplete.Root>
    </div>
  ),
}

/** A `TextField.Slot` inside the input, for example a search icon on the left. */
export const WithSlot: Story = {
  render: (args) => (
    <div className="w-64">
      <Autocomplete.Root items={tags}>
        <Autocomplete.Input {...args}>
          <TextField.Slot>
            <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 16 16">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="m10.5 10.5 3 3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
          </TextField.Slot>
        </Autocomplete.Input>
        <TagList />
      </Autocomplete.Root>
    </div>
  ),
}
