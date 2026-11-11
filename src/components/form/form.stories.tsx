import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../button'
import { Checkbox } from '../checkbox'
import { Combobox } from '../combobox'
import { Field } from '../field'
import { Fieldset } from '../fieldset'
import { NumberField } from '../number-field'
import { RadioGroup } from '../radio-group'
import { Select } from '../select'
import { Switch } from '../switch'
import { TextField } from '../text-field'
import { Form } from './form'

const meta = {
  title: 'Components/Form',
  component: Form,
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Form>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Form {...args} onSubmit={(event) => event.preventDefault()}>
      <Field.Root name="email">
        <Field.Label>Email</Field.Label>
        <TextField.Root placeholder="you@example.com" required type="email" />
        <Field.Error />
      </Field.Root>
      <Button className="self-start" type="submit">
        Subscribe
      </Button>
    </Form>
  ),
}

/** Errors that come back from a server are passed with the `errors` prop. */
export const ServerErrors: Story = {
  args: { errors: { username: 'This username is already taken.' } },
  render: (args) => (
    <Form {...args} onSubmit={(event) => event.preventDefault()}>
      <Field.Root name="username">
        <Field.Label>Username</Field.Label>
        <TextField.Root defaultValue="admin" />
        <Field.Error />
      </Field.Root>
      <Button className="self-start" type="submit">
        Save
      </Button>
    </Form>
  ),
}

/** Several of our controls in one form. Submit it empty to see the errors. */
export const FormExample: Story = {
  render: function Render(args) {
    const [values, setValues] = useState<Record<string, unknown> | null>(null)

    return (
      <Form {...args} onFormSubmit={(formValues) => setValues(formValues)}>
        <Field.Root name="name">
          <Field.Label>Full name</Field.Label>
          <TextField.Root placeholder="Ada Lovelace" required />
          <Field.Error match="valueMissing">Please enter your name.</Field.Error>
        </Field.Root>

        <Field.Root name="email">
          <Field.Label>Email</Field.Label>
          <TextField.Root placeholder="you@example.com" required type="email" />
          <Field.Description>We only use it to send receipts.</Field.Description>
          <Field.Error match="valueMissing">Please enter your email.</Field.Error>
          <Field.Error match="typeMismatch">This is not a valid email address.</Field.Error>
        </Field.Root>

        <Field.Root name="plan">
          <Fieldset.Root className="gap-2" render={<RadioGroup.Root defaultValue="pro" />}>
            <Fieldset.Legend className="text-sm">Plan</Fieldset.Legend>
            <RadioGroup.Item value="free">Free</RadioGroup.Item>
            <RadioGroup.Item value="pro">Pro</RadioGroup.Item>
            <RadioGroup.Item value="team">Team</RadioGroup.Item>
          </Fieldset.Root>
        </Field.Root>

        <Field.Root name="newsletter">
          <Field.Label className="flex items-center gap-2 font-normal">
            <Switch defaultChecked />
            Send me product news
          </Field.Label>
        </Field.Root>

        <Field.Root name="terms">
          <Field.Label className="flex items-center gap-2 font-normal">
            <Checkbox required />I accept the terms and conditions
          </Field.Label>
          <Field.Error match="valueMissing">You have to accept the terms.</Field.Error>
        </Field.Root>

        <div className="flex gap-2">
          <Button type="submit">Create account</Button>
          <Button type="reset" variant="soft">
            Reset
          </Button>
        </div>

        {values && (
          <pre className="rounded-lg bg-gray-a3 p-3 text-gray-11 text-xs">
            {JSON.stringify(values, null, 2)}
          </pre>
        )}
      </Form>
    )
  },
}

/** `className` wins over the default styles. */
export const ClassNameOverride: Story = {
  render: (args) => (
    <Form
      {...args}
      className="flex-row items-end gap-2"
      onSubmit={(event) => event.preventDefault()}
    >
      <Field.Root className="flex-1 items-stretch" name="email">
        <Field.Label>Email</Field.Label>
        <TextField.Root placeholder="you@example.com" />
      </Field.Root>
      <Button type="submit">Join</Button>
    </Form>
  ),
}

const boxSizes = ['xs', 'sm', 'md', 'lg'] as const
const boxVariants = ['surface', 'soft'] as const
const fruits = ['Apple', 'Banana', 'Cherry']

/** TextField, NumberField, Combobox and Select share one box, so they line up. */
export const SameBox: Story = {
  render: () => (
    <div className="flex w-max flex-col gap-3">
      {boxVariants.map((variant) =>
        boxSizes.map((size) => (
          <div className="flex items-center gap-2" key={`${variant}-${size}`}>
            <TextField.Root className="w-36" placeholder="Text" size={size} variant={variant} />
            <NumberField
              aria-label="Amount"
              className="w-32"
              defaultValue={10}
              size={size}
              variant={variant}
            />
            <div className="w-40">
              <Combobox.Root items={fruits}>
                <Combobox.Input placeholder="Fruit" size={size} variant={variant} />
                <Combobox.Content>
                  {(item: string) => (
                    <Combobox.Item key={item} value={item}>
                      {item}
                    </Combobox.Item>
                  )}
                </Combobox.Content>
              </Combobox.Root>
            </div>
            <Select.Root size={size}>
              <Select.Trigger placeholder="Fruit" variant={variant} />
              <Select.Content>
                {fruits.map((fruit) => (
                  <Select.Item key={fruit} value={fruit}>
                    {fruit}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <Button size={size}>Go</Button>
          </div>
        )),
      )}
      <div className="flex items-center gap-2">
        <TextField.Root className="w-36" disabled placeholder="Text" />
        <NumberField aria-label="Amount" className="w-32" defaultValue={10} disabled />
        <div className="w-40">
          <Combobox.Root disabled items={fruits}>
            <Combobox.Input placeholder="Fruit" />
          </Combobox.Root>
        </div>
        <Select.Root disabled>
          <Select.Trigger placeholder="Fruit" />
        </Select.Root>
        <Button disabled>Go</Button>
      </div>
    </div>
  ),
}
