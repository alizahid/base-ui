import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Tabs } from '.'

const sizes = ['sm', 'md'] as const

const meta = {
  title: 'Components/Tabs',
  component: Tabs.Root,
  args: { color: 'accent', defaultValue: 'account', orientation: 'horizontal', size: 'md' },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    size: { control: 'inline-radio', options: sizes },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs.Root>

export default meta

type Story = StoryObj<typeof meta>

function Parts() {
  return (
    <>
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="text-sm" value="account">
        Make changes to your account.
      </Tabs.Content>
      <Tabs.Content className="text-sm" value="documents">
        Access and update your documents.
      </Tabs.Content>
      <Tabs.Content className="text-sm" value="settings">
        Edit your profile or update contact information.
      </Tabs.Content>
    </>
  )
}

export const Playground: Story = {
  render: (args) => (
    <Tabs.Root {...args}>
      <Parts />
    </Tabs.Root>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      {sizes.map((size) => (
        <Tabs.Root key={size} {...args} size={size}>
          <Parts />
        </Tabs.Root>
      ))}
    </div>
  ),
}

export const Vertical: Story = {
  ...Playground,
  args: { orientation: 'vertical' },
}

export const Colors: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-4">
      {colors.map((color) => (
        <Tabs.Root key={color} {...args} color={color}>
          <Tabs.List>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <Tabs.Root {...args}>
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger disabled value="documents">
          Documents
        </Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="text-sm" value="account">
        The second tab is disabled.
      </Tabs.Content>
      <Tabs.Content className="text-sm" value="settings">
        Settings.
      </Tabs.Content>
    </Tabs.Root>
  ),
}

/** `className` on every part, and `classNames` for the line and the pill. */
export const ClassNameOverride: Story = {
  render: (args) => (
    <Tabs.Root {...args}>
      <Tabs.List
        className="justify-center shadow-none"
        classNames={{ indicator: 'h-1 bg-gray-12' }}
      >
        <Tabs.Trigger className="h-12 text-base" value="account">
          Account
        </Tabs.Trigger>
        <Tabs.Trigger
          className="h-12 text-base"
          classNames={{ inner: 'rounded-none group-hover/tab:bg-accent-a4' }}
          value="documents"
        >
          Documents
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="pt-8 text-center text-sm" value="account">
        Centered tabs with a thick dark line.
      </Tabs.Content>
      <Tabs.Content className="pt-8 text-center text-sm" value="documents">
        Documents.
      </Tabs.Content>
    </Tabs.Root>
  ),
}

/** The radius shows on the hover highlight of a tab. */
export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      {radii.map((radius) => (
        <Tabs.Root key={radius} {...args} radius={radius}>
          <Tabs.List>
            <Tabs.Trigger value="account">Radius {radius}</Tabs.Trigger>
            <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      ))}
    </div>
  ),
}
