import type { Meta, StoryObj } from '@storybook/react-vite'
import { radii } from '../../lib/theme'
import { SegmentedControl } from '.'

const sizes = ['sm', 'md', 'lg'] as const

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl.Root,
  args: { defaultValue: 'inbox', disabled: false, size: 'md' },
  argTypes: {
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
  },
} satisfies Meta<typeof SegmentedControl.Root>

export default meta

type Story = StoryObj<typeof meta>

function Items() {
  return (
    <>
      <SegmentedControl.Item value="inbox">Inbox</SegmentedControl.Item>
      <SegmentedControl.Item value="drafts">Drafts</SegmentedControl.Item>
      <SegmentedControl.Item value="sent">Sent</SegmentedControl.Item>
    </>
  )
}

export const Playground: Story = {
  render: (args) => (
    <SegmentedControl.Root {...args} aria-label="Mailbox">
      <Items />
    </SegmentedControl.Root>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      {sizes.map((size) => (
        <SegmentedControl.Root key={size} {...args} aria-label="Mailbox" size={size}>
          <Items />
        </SegmentedControl.Root>
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      {radii.map((radius) => (
        <SegmentedControl.Root key={radius} {...args} aria-label="Mailbox" radius={radius}>
          <Items />
        </SegmentedControl.Root>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      <SegmentedControl.Root {...args} aria-label="Mailbox" disabled>
        <Items />
      </SegmentedControl.Root>
      <SegmentedControl.Root {...args} aria-label="Mailbox">
        <SegmentedControl.Item value="inbox">Inbox</SegmentedControl.Item>
        <SegmentedControl.Item disabled value="drafts">
          Drafts
        </SegmentedControl.Item>
        <SegmentedControl.Item value="sent">Sent</SegmentedControl.Item>
      </SegmentedControl.Root>
    </div>
  ),
}

/** A `rounded-*` class on the track also reshapes the picked segment. */
export const ClassNameOverride: Story = {
  render: (args) => (
    <SegmentedControl.Root {...args} aria-label="Mailbox" className="w-80 rounded-full">
      <Items />
    </SegmentedControl.Root>
  ),
}
