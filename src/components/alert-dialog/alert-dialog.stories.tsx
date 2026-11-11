import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { AlertDialog } from '.'

const sizes = ['sm', 'md', 'lg', 'xl'] as const

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog.Content,
  args: { size: 'lg' },
  argTypes: {
    size: { control: 'inline-radio', options: sizes },
  },
} satisfies Meta<typeof AlertDialog.Content>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger render={<Button color="red" />}>Revoke access</AlertDialog.Trigger>
      <AlertDialog.Content {...args}>
        <AlertDialog.Title>Revoke access</AlertDialog.Title>
        <AlertDialog.Description className="mb-4">
          Are you sure? This application will no longer be accessible.
        </AlertDialog.Description>
        <div className="flex justify-end gap-3">
          <AlertDialog.Cancel render={<Button variant="soft" />}>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action render={<Button color="red" />}>Revoke access</AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      {sizes.map((size) => (
        <AlertDialog.Root key={size}>
          <AlertDialog.Trigger render={<Button variant="soft" />}>Size {size}</AlertDialog.Trigger>
          <AlertDialog.Content size={size}>
            <AlertDialog.Title>Size {size}</AlertDialog.Title>
            <AlertDialog.Description className="mb-4">
              The padding and the corners change with the size.
            </AlertDialog.Description>
            <div className="flex justify-end gap-3">
              <AlertDialog.Cancel render={<Button variant="soft" />}>Cancel</AlertDialog.Cancel>
              <AlertDialog.Action render={<Button />}>OK</AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>
      ))}
    </div>
  ),
}

/** `className` on `Content`, and `classNames` for the backdrop it renders. */
export const ClassNameOverride: Story = {
  render: () => (
    <AlertDialog.Root>
      <AlertDialog.Trigger render={<Button variant="outline" />}>Open</AlertDialog.Trigger>
      <AlertDialog.Content
        className="max-w-lg rounded-none"
        classNames={{ backdrop: 'bg-accent-a6' }}
      >
        <AlertDialog.Title>Custom look</AlertDialog.Title>
        <AlertDialog.Description className="mb-4">
          Square corners, wider, and a tinted backdrop.
        </AlertDialog.Description>
        <AlertDialog.Cancel render={<Button />}>Close</AlertDialog.Cancel>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}
