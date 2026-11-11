import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { Button } from './button'

const variants = ['solid', 'soft', 'surface', 'outline', 'ghost'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    color: 'accent',
    disabled: false,
    loading: false,
    size: 'md',
    variant: 'solid',
  },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    size: { control: 'inline-radio', options: sizes },
    variant: { control: 'inline-radio', options: variants },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div className="flex flex-wrap items-center gap-4" key={variant}>
          {sizes.map((size) => (
            <Button key={size} {...args} size={size} variant={variant}>
              Size {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: Variants.render,
}

export const Loading: Story = {
  args: { loading: true },
  render: Variants.render,
}

export const Colors: Story = {
  render: (args) => (
    <div className="grid grid-cols-[auto_repeat(5,max-content)] items-center gap-x-6 gap-y-3">
      {(['accent', ...colors] as const).map((color) => (
        <div className="contents" key={color}>
          <span className="text-gray-11 text-sm">{color}</span>
          {variants.map((variant) => (
            <Button key={variant} {...args} color={color} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
}

/** `data-color` on any parent changes what `accent` means for everything inside. */
export const InheritedColor: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(['crimson', 'jade', 'amber'] as const).map((color) => (
        <div className="flex flex-wrap items-center gap-4" data-color={color} key={color}>
          {variants.map((variant) => (
            <Button key={variant} {...args} variant={variant}>
              {color}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
}

/** `className` wins over the default styles. */
export const ClassNameOverride: Story = {
  args: {
    children: 'Rounded, wide and dark',
    className: 'rounded-full bg-accent-12 px-8 text-gray-1 hover:bg-accent-11',
  },
}

/** Base UI's `render` prop swaps the element, for example to a link. */
export const AsLink: Story = {
  args: {
    children: 'I am a link',
    nativeButton: false,
    render: <a href="https://base-ui.com" />,
  },
}
