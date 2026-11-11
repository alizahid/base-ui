import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { colors } from '../../lib/colors'
import { ContextMenu } from '.'

const sizes = ['sm', 'md'] as const

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu.Content,
  args: { color: 'accent', highContrast: false, size: 'md', variant: 'solid' },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    size: { control: 'inline-radio', options: sizes },
    variant: { control: 'inline-radio', options: ['solid', 'soft'] },
  },
} satisfies Meta<typeof ContextMenu.Content>

export default meta

type Story = StoryObj<typeof meta>

const area =
  'flex h-32 w-72 select-none items-center justify-center rounded-panel-md border border-gray-a6 border-dashed text-gray-a11 text-sm'

export const Playground: Story = {
  render: function Render(args) {
    const [zoom, setZoom] = useState('100')

    return (
      <ContextMenu.Root>
        <ContextMenu.Trigger className={area}>Right click here</ContextMenu.Trigger>
        <ContextMenu.Content {...args}>
          <ContextMenu.Item shortcut="⌘ C">Copy</ContextMenu.Item>
          <ContextMenu.Item shortcut="⌘ V">Paste</ContextMenu.Item>
          <ContextMenu.Item disabled>Paste and match style</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.CheckboxItem defaultChecked>Show grid</ContextMenu.CheckboxItem>
          <ContextMenu.CheckboxItem>Show rulers</ContextMenu.CheckboxItem>
          <ContextMenu.Separator />
          <ContextMenu.RadioGroup onValueChange={setZoom} value={zoom}>
            <ContextMenu.Label>Zoom</ContextMenu.Label>
            <ContextMenu.RadioItem value="50">50%</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="100">100%</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="200">200%</ContextMenu.RadioItem>
          </ContextMenu.RadioGroup>
          <ContextMenu.Separator />
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>Share</ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item>Copy link</ContextMenu.Item>
              <ContextMenu.Item>Email…</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
          <ContextMenu.Item color="red" shortcut="⌘ ⌫">
            Delete
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => (
        <ContextMenu.Root key={size}>
          <ContextMenu.Trigger className={area}>Size {size}</ContextMenu.Trigger>
          <ContextMenu.Content size={size}>
            <ContextMenu.Item shortcut="⌘ C">Copy</ContextMenu.Item>
            <ContextMenu.Item shortcut="⌘ V">Paste</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item color="red">Delete</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      ))}
    </div>
  ),
}

/** `variant` and `highContrast` change the look of the highlighted row. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(
        [
          { label: 'solid', variant: 'solid' },
          { label: 'soft', variant: 'soft' },
          { highContrast: true, label: 'solid, high contrast', variant: 'solid' },
        ] as const
      ).map(({ label, ...props }) => (
        <ContextMenu.Root key={label}>
          <ContextMenu.Trigger className={area}>{label}</ContextMenu.Trigger>
          <ContextMenu.Content {...props}>
            <ContextMenu.Item shortcut="⌘ C">Copy</ContextMenu.Item>
            <ContextMenu.Item shortcut="⌘ V">Paste</ContextMenu.Item>
            <ContextMenu.CheckboxItem defaultChecked>Show grid</ContextMenu.CheckboxItem>
            <ContextMenu.Separator />
            <ContextMenu.Item color="red">Delete</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['accent', 'crimson', 'jade', 'amber'] as const).map((color) => (
        <ContextMenu.Root key={color}>
          <ContextMenu.Trigger className={area}>{color}</ContextMenu.Trigger>
          <ContextMenu.Content color={color}>
            <ContextMenu.Item>Copy</ContextMenu.Item>
            <ContextMenu.Item>Paste</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      ))}
    </div>
  ),
}

export const ClassNameOverride: Story = {
  render: () => (
    <ContextMenu.Root>
      <ContextMenu.Trigger className={area}>Right click here</ContextMenu.Trigger>
      <ContextMenu.Content className="min-w-56 rounded-none">
        <ContextMenu.Item className="rounded-none">Square row</ContextMenu.Item>
        <ContextMenu.Item className="h-12 text-base">Tall row</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  ),
}
