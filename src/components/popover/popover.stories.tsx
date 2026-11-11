import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { Dialog } from '../dialog'
import { Tooltip } from '../tooltip'
import { Popover } from '.'

const sizes = ['sm', 'md', 'lg', 'xl'] as const
const sides = ['top', 'right', 'bottom', 'left'] as const

const meta = {
  title: 'Components/Popover',
  component: Popover.Content,
  args: { align: 'start', arrow: false, side: 'bottom', sideOffset: 8, size: 'md' },
  argTypes: {
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    side: { control: 'inline-radio', options: sides },
    size: { control: 'inline-radio', options: sizes },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-80 items-center justify-center gap-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popover.Content>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Popover.Root>
      <Popover.Trigger render={<Button variant="soft" />}>Notifications</Popover.Trigger>
      <Popover.Content {...args}>
        <Popover.Title>Notifications</Popover.Title>
        <Popover.Description>You are all caught up. Good job!</Popover.Description>
      </Popover.Content>
    </Popover.Root>
  ),
}

export const Sizes: Story = {
  render: () => (
    <>
      {sizes.map((size) => (
        <Popover.Root key={size}>
          <Popover.Trigger render={<Button variant="soft" />}>Size {size}</Popover.Trigger>
          <Popover.Content size={size}>
            <Popover.Title>Size {size}</Popover.Title>
            <Popover.Description>The padding and the corners change.</Popover.Description>
          </Popover.Content>
        </Popover.Root>
      ))}
    </>
  ),
}

/** `arrow` adds a small arrow that points at the trigger. */
export const Arrow: Story = {
  render: () => (
    <>
      {sides.map((side) => (
        <Popover.Root key={side}>
          <Popover.Trigger render={<Button variant="soft" />}>{side}</Popover.Trigger>
          <Popover.Content arrow side={side} size="sm">
            <Popover.Description>Opens on the {side}.</Popover.Description>
          </Popover.Content>
        </Popover.Root>
      ))}
    </>
  ),
}

/** `Popover.Close` closes the popover from the inside. */
export const WithClose: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger render={<Button />}>Share</Popover.Trigger>
      <Popover.Content align="start" className="w-72">
        <Popover.Title>Share this page</Popover.Title>
        <Popover.Description>Anyone with the link can view it.</Popover.Description>
        <div className="mt-4 flex justify-end gap-2">
          <Popover.Close render={<Button variant="soft" />}>Cancel</Popover.Close>
          <Popover.Close render={<Button />}>Copy link</Popover.Close>
        </div>
      </Popover.Content>
    </Popover.Root>
  ),
}

/** `className` on `Content`, and `classNames` for the arrow it renders. */
export const ClassNameOverride: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger render={<Button variant="outline" />}>Open</Popover.Trigger>
      <Popover.Content
        arrow
        className="rounded-none bg-accent-3 p-8"
        classNames={{ arrow: 'bg-accent-3' }}
      >
        <Popover.Title>Custom look</Popover.Title>
        <Popover.Description>Square corners, tinted, more padding.</Popover.Description>
      </Popover.Content>
    </Popover.Root>
  ),
}

/** Popups stack in the order they open: dialog, then popover, then tooltip. */
export const InsideDialog: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="soft" />}>Open dialog</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Dialog</Dialog.Title>
        <Dialog.Description className="mb-4">
          The popover opens above the dialog.
        </Dialog.Description>
        <Popover.Root>
          <Popover.Trigger render={<Button />}>Open popover</Popover.Trigger>
          <Popover.Content arrow>
            <Popover.Title>Popover</Popover.Title>
            <Popover.Description>The tooltip opens above the popover.</Popover.Description>
            <div className="mt-3">
              <Tooltip content="Above everything" delay={0}>
                <Button variant="soft">Hover me</Button>
              </Tooltip>
            </div>
          </Popover.Content>
        </Popover.Root>
      </Dialog.Content>
    </Dialog.Root>
  ),
}
