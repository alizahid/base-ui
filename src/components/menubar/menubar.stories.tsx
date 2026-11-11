import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Menubar } from '.'

const meta = {
  title: 'Components/Menubar',
  component: Menubar.Root,
  args: { color: 'accent', disabled: false },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    radius: { control: 'inline-radio', options: radii },
  },
} satisfies Meta<typeof Menubar.Root>

export default meta

type Story = StoryObj<typeof meta>

function Menus() {
  return (
    <>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item shortcut="⌘ N">New</Menubar.Item>
          <Menubar.Item shortcut="⌘ O">Open</Menubar.Item>
          <Menubar.Sub>
            <Menubar.SubTrigger>Export</Menubar.SubTrigger>
            <Menubar.SubContent>
              <Menubar.Item>PDF</Menubar.Item>
              <Menubar.Item>PNG</Menubar.Item>
              <Menubar.Item>SVG</Menubar.Item>
            </Menubar.SubContent>
          </Menubar.Sub>
          <Menubar.Separator />
          <Menubar.Item shortcut="⌘ P">Print</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item shortcut="⌘ X">Cut</Menubar.Item>
          <Menubar.Item shortcut="⌘ C">Copy</Menubar.Item>
          <Menubar.Item shortcut="⌘ V">Paste</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>View</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.CheckboxItem defaultChecked>Show sidebar</Menubar.CheckboxItem>
          <Menubar.CheckboxItem>Show minimap</Menubar.CheckboxItem>
          <Menubar.Separator />
          <Menubar.RadioGroup defaultValue="100">
            <Menubar.Label>Zoom</Menubar.Label>
            <Menubar.RadioItem value="50">50%</Menubar.RadioItem>
            <Menubar.RadioItem value="100">100%</Menubar.RadioItem>
            <Menubar.RadioItem value="200">200%</Menubar.RadioItem>
          </Menubar.RadioGroup>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu disabled>
        <Menubar.Trigger>Help</Menubar.Trigger>
      </Menubar.Menu>
    </>
  )
}

export const Playground: Story = {
  render: (args) => (
    <Menubar.Root {...args}>
      <Menus />
    </Menubar.Root>
  ),
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      {(['accent', 'crimson', 'jade', 'amber'] as const).map((color) => (
        <Menubar.Root color={color} key={color}>
          <Menubar.Menu>
            <Menubar.Trigger>{color}</Menubar.Trigger>
            <Menubar.Content color={color}>
              <Menubar.Item>New</Menubar.Item>
              <Menubar.Item>Open</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Trigger>Edit</Menubar.Trigger>
            <Menubar.Content color={color}>
              <Menubar.Item>Cut</Menubar.Item>
              <Menubar.Item>Copy</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      {radii.map((radius) => (
        <Menubar.Root key={radius} radius={radius}>
          <Menubar.Menu>
            <Menubar.Trigger>{radius}</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>New</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Trigger>Edit</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>Cut</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>
      ))}
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Menubar.Root orientation="vertical">
      <Menus />
    </Menubar.Root>
  ),
}

export const ClassNameOverride: Story = {
  render: () => (
    <Menubar.Root className="gap-0 border-gray-a5 border-b">
      <Menubar.Menu>
        <Menubar.Trigger className="rounded-none data-popup-open:bg-accent-9 data-popup-open:text-accent-contrast">
          File
        </Menubar.Trigger>
        <Menubar.Content className="rounded-none">
          <Menubar.Item>New</Menubar.Item>
          <Menubar.Item>Open</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger className="rounded-none data-popup-open:bg-accent-9 data-popup-open:text-accent-contrast">
          Edit
        </Menubar.Trigger>
        <Menubar.Content className="rounded-none">
          <Menubar.Item>Cut</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  ),
}
