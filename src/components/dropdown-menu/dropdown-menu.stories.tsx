import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { colors } from '../../lib/colors'
import { Button } from '../button'
import { DropdownMenu } from '.'

const sizes = ['sm', 'md'] as const

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu.Content,
  args: { color: 'accent', size: 'md' },
  argTypes: {
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    color: { control: 'select', options: ['accent', ...colors] },
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
    size: { control: 'inline-radio', options: sizes },
  },
} satisfies Meta<typeof DropdownMenu.Content>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger render={<Button variant="soft" />}>Options</DropdownMenu.Trigger>
      <DropdownMenu.Content {...args}>
        <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
            <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Share</DropdownMenu.Item>
        <DropdownMenu.Item disabled>Add to favorites</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="red" shortcut="⌘ ⌫">
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      {sizes.map((size) => (
        <DropdownMenu.Root key={size}>
          <DropdownMenu.Trigger render={<Button size={size} variant="soft" />}>
            Size {size}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content size={size}>
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
                <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
            <DropdownMenu.CheckboxItem defaultChecked>Show hidden files</DropdownMenu.CheckboxItem>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ))}
    </div>
  ),
}

/** `color` on `Content` changes the highlight. `color` on an `Item` changes only that row. */
export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {colors.map((color) => (
        <DropdownMenu.Root key={color}>
          <DropdownMenu.Trigger render={<Button color={color} variant="soft" />}>
            {color}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content color={color}>
            <DropdownMenu.Item>Edit</DropdownMenu.Item>
            <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ))}
    </div>
  ),
}

/** Checkbox and radio items show a check on the left. The other rows move right to line up. */
export const CheckboxAndRadioItems: Story = {
  render: function Render() {
    const [sort, setSort] = useState('date')

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger render={<Button variant="soft" />}>View</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.CheckboxItem defaultChecked shortcut="⌘ B">
            Show sidebar
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem>Show minimap</DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem disabled>Show toolbar</DropdownMenu.CheckboxItem>
          <DropdownMenu.Separator />
          <DropdownMenu.RadioGroup onValueChange={setSort} value={sort}>
            <DropdownMenu.Label>Sort by</DropdownMenu.Label>
            <DropdownMenu.RadioItem value="date">Date</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="name">Name</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="type">Type</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Reset view</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )
  },
}

export const Groups: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger render={<Button variant="soft" />}>Account</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Label>Profile</DropdownMenu.Label>
          <DropdownMenu.Item>Settings</DropdownMenu.Item>
          <DropdownMenu.Item>Billing</DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Label>Team</DropdownMenu.Label>
          <DropdownMenu.Item>Invite people</DropdownMenu.Item>
          <DropdownMenu.Item>Switch team</DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

/** A long menu never grows past the screen. It scrolls. */
export const LongList: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger render={<Button variant="soft" />}>Pick a number</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {Array.from({ length: 60 }, (_, index) => (
          <DropdownMenu.Item key={index}>Item {index + 1}</DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

export const ClassNameOverride: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger render={<Button variant="outline" />}>Open</DropdownMenu.Trigger>
      <DropdownMenu.Content className="min-w-56 rounded-none p-2">
        <DropdownMenu.Item className="rounded-none">Square row</DropdownMenu.Item>
        <DropdownMenu.Item className="h-12 text-base">Tall row</DropdownMenu.Item>
        <DropdownMenu.Separator className="bg-accent-a6" />
        <DropdownMenu.Item className="data-highlighted:bg-gray-12 data-highlighted:text-gray-1">
          Gray highlight
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}
