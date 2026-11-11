import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { NavigationMenu } from '.'

const meta = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu.Root,
  args: { color: 'accent' },
  argTypes: {
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    color: { control: 'select', options: ['accent', ...colors] },
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
  },
} satisfies Meta<typeof NavigationMenu.Root>

export default meta

type Story = StoryObj<typeof meta>

const overview = [
  { title: 'Quick start', text: 'Install and assemble your first component.' },
  { title: 'Accessibility', text: 'Learn how we build accessible components.' },
  { title: 'Releases', text: 'See what is new in the latest versions.' },
  { title: 'About', text: 'Learn more about the project and our mission.' },
]

const handbook = [
  { title: 'Styling', text: 'Style the components with plain CSS or Tailwind CSS.' },
  { title: 'Animation', text: 'Animate with CSS transitions or JavaScript libraries.' },
  { title: 'Composition', text: 'Replace and compose parts with your own components.' },
]

function Card({ active, text, title }: { active?: boolean; text: string; title: string }) {
  return (
    <NavigationMenu.Link active={active} href="#">
      <div className="font-medium">{title}</div>
      <div className="text-gray-11">{text}</div>
    </NavigationMenu.Link>
  )
}

function Items() {
  return (
    <NavigationMenu.List>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Overview</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <ul className="grid w-96 grid-cols-2 gap-1">
            {overview.map((item, index) => (
              <li key={item.title}>
                <Card {...item} active={index === 0} />
              </li>
            ))}
          </ul>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Handbook</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <ul className="flex w-72 flex-col gap-1">
            {handbook.map((item) => (
              <li key={item.title}>
                <Card {...item} />
              </li>
            ))}
          </ul>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link className="flex h-8 items-center px-3 font-medium" href="#">
          GitHub
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  )
}

export const Playground: Story = {
  render: (args) => (
    <NavigationMenu.Root {...args}>
      <Items />
    </NavigationMenu.Root>
  ),
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['accent', 'crimson', 'jade', 'amber'] as const).map((color) => (
        <NavigationMenu.Root color={color} key={color}>
          <Items />
        </NavigationMenu.Root>
      ))}
    </div>
  ),
}

/** `className` on the parts, and `classNames` for the popup that `Root` renders. */
export const ClassNameOverride: Story = {
  render: () => (
    <NavigationMenu.Root
      classNames={{ popup: 'rounded-none shadow-none', viewport: 'rounded-none' }}
    >
      <NavigationMenu.List className="gap-4">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="rounded-none" classNames={{ icon: 'text-accent-9' }}>
            Overview
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="p-6">
            <NavigationMenu.Link className="rounded-none" href="#">
              Square link
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  ),
}
