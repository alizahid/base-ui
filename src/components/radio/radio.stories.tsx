import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { Radio } from './radio'

const sizes = ['sm', 'md', 'lg'] as const
const variants = ['surface', 'soft'] as const

const meta = {
  title: 'Components/Radio',
  component: Radio,
  args: { color: 'accent', disabled: false, size: 'md', value: 'a', variant: 'surface' },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    size: { control: 'inline-radio', options: sizes },
    variant: { control: 'inline-radio', options: variants },
  },
  // A radio needs a group around it to keep track of the value
  decorators: [
    (Story) => (
      <BaseRadioGroup className="flex flex-col gap-4" defaultValue="a">
        <Story />
      </BaseRadioGroup>
    ),
  ],
} satisfies Meta<typeof Radio>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <>
      {variants.map((variant) => (
        <div className="flex items-center gap-4" key={variant}>
          <Radio {...args} value="a" variant={variant} />
          <Radio {...args} value="b" variant={variant} />
          <span className="text-gray-11 text-sm">{variant}</span>
        </div>
      ))}
    </>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <Radio key={size} {...args} size={size} value="a" />
      ))}
      {sizes.map((size) => (
        <Radio key={size} {...args} size={size} value="b" />
      ))}
    </div>
  ),
}

export const States: Story = {
  render: (args) => (
    <>
      {variants.map((variant) => (
        <div className="flex items-center gap-4" key={variant}>
          <Radio {...args} value="b" variant={variant} />
          <Radio {...args} value="a" variant={variant} />
          <Radio {...args} disabled value="b" variant={variant} />
          <Radio {...args} disabled value="a" variant={variant} />
        </div>
      ))}
    </>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <>
      {variants.map((variant) => (
        <div className="flex flex-wrap items-center gap-4" key={variant}>
          {colors.map((color) => (
            <Radio key={color} {...args} color={color} value="a" variant={variant} />
          ))}
        </div>
      ))}
    </>
  ),
}

/** `className` wins over the default styles. */
export const ClassNameOverride: Story = {
  args: {
    className: 'size-6 data-checked:bg-accent-12',
    classNames: { indicator: 'size-3 bg-gray-1' },
  },
}
