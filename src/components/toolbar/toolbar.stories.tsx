import { Toggle } from '@base-ui/react/toggle'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Toolbar } from '.'

const sizes = ['sm', 'md'] as const

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar.Root,
  args: { color: 'accent', disabled: false, orientation: 'horizontal', size: 'md' },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
  },
} satisfies Meta<typeof Toolbar.Root>

export default meta

type Story = StoryObj<typeof meta>

function Parts() {
  return (
    <>
      <Toolbar.Group aria-label="Text style">
        {/* Base UI's own Toggle here. Our `Toggle` works the same way. */}
        <Toolbar.Button aria-label="Bold" render={<Toggle defaultPressed />}>
          <b>B</b>
        </Toolbar.Button>
        <Toolbar.Button aria-label="Italic" render={<Toggle />}>
          <i>I</i>
        </Toolbar.Button>
        <Toolbar.Button aria-label="Underline" render={<Toggle />}>
          <u>U</u>
        </Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Button>Copy</Toolbar.Button>
      <Toolbar.Button disabled>Paste</Toolbar.Button>
      <Toolbar.Separator />
      <Toolbar.Input aria-label="Font size" defaultValue="16px" />
      <Toolbar.Link href="#">Edited 5 min ago</Toolbar.Link>
    </>
  )
}

export const Playground: Story = {
  render: (args) => (
    <Toolbar.Root {...args}>
      <Parts />
    </Toolbar.Root>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      {sizes.map((size) => (
        <Toolbar.Root key={size} {...args} size={size}>
          <Parts />
        </Toolbar.Root>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {colors.map((color) => (
        <Toolbar.Root key={color} {...args} color={color}>
          <Toolbar.Button render={<Toggle defaultPressed />}>{color}</Toolbar.Button>
          <Toolbar.Button render={<Toggle />}>Off</Toolbar.Button>
        </Toolbar.Root>
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      {radii.map((radius) => (
        <Toolbar.Root key={radius} {...args} radius={radius}>
          <Parts />
        </Toolbar.Root>
      ))}
    </div>
  ),
}

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <Toolbar.Root {...args}>
      <Toolbar.Button render={<Toggle defaultPressed />}>Bold</Toolbar.Button>
      <Toolbar.Button render={<Toggle />}>Italic</Toolbar.Button>
      <Toolbar.Separator />
      <Toolbar.Button>Copy</Toolbar.Button>
      <Toolbar.Button>Paste</Toolbar.Button>
    </Toolbar.Root>
  ),
}

export const Disabled: Story = {
  ...Playground,
  args: { disabled: true },
}

export const ClassNameOverride: Story = {
  render: (args) => (
    <Toolbar.Root {...args} className="gap-3 rounded-none bg-accent-a3 inset-ring-accent-a6">
      <Toolbar.Button className="rounded-full px-4 hover:bg-accent-a5">Round</Toolbar.Button>
      <Toolbar.Separator className="w-0.5 bg-accent-a8" />
      <Toolbar.Input className="w-24 rounded-none" defaultValue="Square" />
      <Toolbar.Link className="text-accent-11 underline" href="#">
        Link
      </Toolbar.Link>
    </Toolbar.Root>
  ),
}
