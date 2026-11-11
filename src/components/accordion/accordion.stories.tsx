import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { Accordion } from '.'

const sizes = ['sm', 'md', 'lg'] as const
const variants = ['surface', 'ghost'] as const

const meta = {
  title: 'Components/Accordion',
  component: Accordion.Root,
  args: { color: 'accent', disabled: false, multiple: false, size: 'md', variant: 'surface' },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
    variant: { control: 'inline-radio', options: variants },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion.Root>

export default meta

type Story = StoryObj<typeof meta>

const questions = [
  ['What is Base UI?', 'A library of unstyled React components for accessible user interfaces.'],
  ['How do I get started?', 'Install the package, wrap your app in a theme and import a part.'],
  ['Can I use it for my project?', 'Yes. It is free and open source.'],
] as const

function Items() {
  return questions.map(([question, answer]) => (
    <Accordion.Item key={question} value={question}>
      <Accordion.Trigger>{question}</Accordion.Trigger>
      <Accordion.Content>{answer}</Accordion.Content>
    </Accordion.Item>
  ))
}

export const Playground: Story = {
  args: { defaultValue: [questions[0][0]] },
  render: (args) => (
    <Accordion.Root {...args}>
      <Items />
    </Accordion.Root>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      {variants.map((variant) => (
        <Accordion.Root key={variant} {...args} defaultValue={[questions[0][0]]} variant={variant}>
          <Items />
        </Accordion.Root>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      {sizes.map((size) => (
        <Accordion.Root key={size} {...args} defaultValue={[questions[0][0]]} size={size}>
          <Items />
        </Accordion.Root>
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {radii.map((radius) => (
        <Accordion.Root key={radius} {...args} radius={radius} size="sm">
          <Accordion.Item>
            <Accordion.Trigger>Radius {radius}</Accordion.Trigger>
            <Accordion.Content>The corners of the box follow the radius.</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      ))}
    </div>
  ),
}

export const Multiple: Story = {
  ...Playground,
  args: { defaultValue: [questions[0][0], questions[1][0]], multiple: true },
}

export const Disabled: Story = {
  render: (args) => (
    <Accordion.Root {...args}>
      <Accordion.Item>
        <Accordion.Trigger>This one opens</Accordion.Trigger>
        <Accordion.Content>Hello.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item disabled>
        <Accordion.Trigger>This one is disabled</Accordion.Trigger>
        <Accordion.Content>You can not see this.</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
}

/** `className` on every part, and `classNames` for the arrow and the padded box. */
export const ClassNameOverride: Story = {
  render: (args) => (
    <Accordion.Root {...args} className="rounded-none bg-accent-a2">
      <Accordion.Item className="border-accent-a6">
        <Accordion.Trigger
          className="px-2 font-bold hover:bg-accent-a4"
          classNames={{ icon: 'size-6 text-accent-11' }}
        >
          Custom look
        </Accordion.Trigger>
        <Accordion.Content className="duration-700" classNames={{ inner: 'px-2 text-accent-11' }}>
          Square corners, tinted, a big arrow and a slow animation.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item className="border-accent-a6">
        <Accordion.Trigger className="px-2 font-bold hover:bg-accent-a4">Second</Accordion.Trigger>
        <Accordion.Content classNames={{ inner: 'px-2' }}>More text.</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
}
