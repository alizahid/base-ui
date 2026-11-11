import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { Dialog } from '.'

const sizes = ['sm', 'md', 'lg'] as const

const meta = {
  title: 'Components/Dialog',
  component: Dialog.Content,
  args: { size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: sizes },
  },
} satisfies Meta<typeof Dialog.Content>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Dialog.Root>
      <Dialog.Trigger render={<Button />}>Edit profile</Dialog.Trigger>
      <Dialog.Content {...args}>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>Make changes to your profile here.</Dialog.Description>
        <div className="flex justify-end gap-3">
          <Dialog.Close render={<Button variant="soft" />}>Cancel</Dialog.Close>
          <Dialog.Close render={<Button />}>Save</Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      {sizes.map((size) => (
        <Dialog.Root key={size}>
          <Dialog.Trigger render={<Button variant="soft" />}>Size {size}</Dialog.Trigger>
          <Dialog.Content size={size}>
            <Dialog.Title>Size {size}</Dialog.Title>
            <Dialog.Description>The padding and the width change with the size.</Dialog.Description>
            <Dialog.Close render={<Button variant="soft" />}>Close</Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      ))}
    </div>
  ),
}

/** `className` on `Content`, and `classNames` for the backdrop it renders. */
export const ClassNameOverride: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="outline" />}>Open</Dialog.Trigger>
      <Dialog.Content className="max-w-2xl rounded-none" classNames={{ backdrop: 'bg-accent-a6' }}>
        <Dialog.Title>Custom look</Dialog.Title>
        <Dialog.Description>Square corners, wider, and a tinted backdrop.</Dialog.Description>
        <Dialog.Close render={<Button />}>Close</Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  ),
}
