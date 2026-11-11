import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { Drawer } from '.'

const sizes = ['sm', 'md', 'lg', 'xl'] as const
const sides = ['left', 'right', 'top', 'bottom'] as const

type PlaygroundArgs = Drawer.ContentProps & { side: Drawer.Side }

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Drawer',
  component: Drawer.Content,
  args: { side: 'right', size: 'lg' },
  argTypes: {
    side: { control: 'inline-radio', options: sides },
    size: { control: 'inline-radio', options: sizes },
  },
}

export default meta

type Story = StoryObj<PlaygroundArgs>

/** `side` goes on `Drawer.Root`. Swipe the panel towards its edge to close it. */
export const Playground: Story = {
  render: ({ side, ...args }) => (
    <Drawer.Root side={side}>
      <Drawer.Trigger render={<Button />}>Open drawer</Drawer.Trigger>
      <Drawer.Content {...args}>
        <Drawer.Title>Edit profile</Drawer.Title>
        <Drawer.Description className="mb-4">
          Make changes to your profile here. Swipe or press Escape to close.
        </Drawer.Description>
        <div className="flex justify-end gap-3">
          <Drawer.Close render={<Button variant="soft" />}>Cancel</Drawer.Close>
          <Drawer.Close render={<Button />}>Save</Drawer.Close>
        </div>
      </Drawer.Content>
    </Drawer.Root>
  ),
}

export const Sides: Story = {
  render: () => (
    <div className="flex gap-4">
      {sides.map((side) => (
        <Drawer.Root key={side} side={side}>
          <Drawer.Trigger render={<Button variant="soft" />}>{side}</Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>From the {side}</Drawer.Title>
            <Drawer.Description className="mb-4">
              Swipe towards the {side} edge to close.
            </Drawer.Description>
            <Drawer.Close render={<Button variant="soft" />}>Close</Drawer.Close>
          </Drawer.Content>
        </Drawer.Root>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      {sizes.map((size) => (
        <Drawer.Root key={size}>
          <Drawer.Trigger render={<Button variant="soft" />}>Size {size}</Drawer.Trigger>
          <Drawer.Content size={size}>
            <Drawer.Title>Size {size}</Drawer.Title>
            <Drawer.Description className="mb-4">
              The padding and the width change with the size.
            </Drawer.Description>
            <Drawer.Close render={<Button variant="soft" />}>Close</Drawer.Close>
          </Drawer.Content>
        </Drawer.Root>
      ))}
    </div>
  ),
}

/** Long content scrolls inside the panel. */
export const Scrolling: Story = {
  render: () => (
    <Drawer.Root side="bottom">
      <Drawer.Trigger render={<Button variant="soft" />}>Open</Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Title>Terms</Drawer.Title>
        {Array.from({ length: 30 }, (_, index) => (
          <p className="mb-3 text-gray-11" key={index}>
            Paragraph {index + 1}. The panel never grows past the screen, the inside scrolls.
          </p>
        ))}
        <Drawer.Close render={<Button />}>Done</Drawer.Close>
      </Drawer.Content>
    </Drawer.Root>
  ),
}

/** `className` on `Content`, and `classNames` for the parts around and inside it. */
export const ClassNameOverride: Story = {
  render: () => (
    <Drawer.Root>
      <Drawer.Trigger render={<Button variant="outline" />}>Open</Drawer.Trigger>
      <Drawer.Content
        className="max-w-2xl rounded-none p-12"
        classNames={{ backdrop: 'bg-accent-a6' }}
      >
        <Drawer.Title>Custom look</Drawer.Title>
        <Drawer.Description className="mb-4">
          Square corners, wider, and a tinted backdrop.
        </Drawer.Description>
        <Drawer.Close render={<Button />}>Close</Drawer.Close>
      </Drawer.Content>
    </Drawer.Root>
  ),
}
