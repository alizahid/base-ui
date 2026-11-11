import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors } from '../../lib/colors'
import { radii } from '../../lib/theme'
import { OtpField } from './otp-field'

const sizes = ['xs', 'sm', 'md', 'lg'] as const

const meta = {
  title: 'Components/OtpField',
  component: OtpField,
  args: {
    'aria-label': 'Verification code',
    color: 'accent',
    disabled: false,
    length: 6,
    size: 'md',
  },
  argTypes: {
    color: { control: 'select', options: ['accent', ...colors] },
    radius: { control: 'inline-radio', options: radii },
    size: { control: 'inline-radio', options: sizes },
  },
} satisfies Meta<typeof OtpField>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <OtpField key={size} {...args} defaultValue="123" size={size} />
      ))}
    </div>
  ),
}

export const Length: Story = {
  args: { defaultValue: '12', length: 4 },
}

export const Placeholder: Story = {
  args: { placeholder: '•' },
}

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <OtpField {...args} defaultValue="123456" />
      <OtpField {...args} defaultValue="123" disabled />
      <OtpField {...args} classNames={{ input: 'data-invalid:inset-ring-(--red-a8)' }} />
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(['crimson', 'jade', 'amber'] as const).map((color) => (
        <OtpField key={color} {...args} color={color} />
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {radii.map((radius) => (
        <OtpField key={radius} {...args} defaultValue="123" radius={radius} />
      ))}
    </div>
  ),
}

/** `className` and `classNames` win over the default styles. */
export const ClassNameOverride: Story = {
  args: {
    className: 'gap-4',
    classNames: { input: 'h-14 w-12 rounded-none bg-accent-a3 text-xl inset-ring-accent-a8' },
    defaultValue: '12',
  },
}
