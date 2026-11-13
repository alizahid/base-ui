import { EnvelopeClosedIcon, LockClosedIcon, MagnifyingGlassIcon, StarIcon } from '@radix-ui/react-icons'
import {
  AngleSlider,
  Checkbox,
  Chip,
  ColorInput,
  ColorPicker,
  Fieldset,
  FileInput,
  Group,
  Input,
  JsonInput,
  MaskInput,
  NativeSelect,
  NumberInput,
  PasswordInput,
  PhoneInput,
  PinInput,
  Radio,
  RangeSlider,
  Rating,
  SegmentedControl,
  Slider,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import * as RT from '@radix-ui/themes'
import { type ReactNode, useState } from 'react'

import { Demo, Row, Section } from '../demo'

const W = 320
const rw = { maxWidth: W }

// Mantine size → Radix size. Mantine's default (sm) is Radix 2.
const fieldSizes = [
  ['xs', '1'],
  ['sm', '2'],
  ['md', '3'],
] as const
// Slider tracks are 4/6/8/10px in Mantine; Radix has 6/8/10px, so Mantine's default md is Radix 2.
const sliderSizes = [
  ['sm', '1'],
  ['md', '2'],
  ['lg', '3'],
] as const
const colors = ['gray', 'red', 'green'] as const
const marks = [
  { value: 0, label: '0%' },
  { value: 50, label: '50%' },
  { value: 100, label: '100%' },
]

type RSize = '1' | '2' | '3'

/** Radix Themes has no field wrapper, so the label, description and error are plain Text around the control. */
function RField({
  label,
  description,
  error,
  required,
  size = '2',
  children,
}: {
  label?: string
  description?: string
  error?: string
  required?: boolean
  size?: RSize
  children: ReactNode
}) {
  return (
    <label style={{ display: 'block', ...rw }}>
      {label && (
        <RT.Text as="div" size={size} weight="medium" mb="1">
          {label}
          {required && (
            <RT.Text color="red" aria-hidden>
              {' '}
              *
            </RT.Text>
          )}
        </RT.Text>
      )}
      {description && (
        <RT.Text as="div" size="1" color="gray" mb="1">
          {description}
        </RT.Text>
      )}
      {children}
      {error && (
        <RT.Text as="div" size="1" color="red" mt="1">
          {error}
        </RT.Text>
      )}
    </label>
  )
}

/** A Radix checkbox, radio or switch with its label, laid out the way the Radix docs do it. */
function RLabel({
  children,
  label,
  description,
  error,
  size = '2',
  disabled,
  left,
}: {
  children: ReactNode
  label: string
  description?: string
  error?: string
  size?: RSize
  disabled?: boolean
  left?: boolean
}) {
  return (
    <RT.Text as="label" size={size} color={disabled ? 'gray' : undefined}>
      <RT.Flex gap="2" direction={left ? 'row-reverse' : 'row'} justify={left ? 'end' : 'start'}>
        {children}
        <div>
          {label}
          {description && (
            <RT.Text as="div" size="1" color="gray">
              {description}
            </RT.Text>
          )}
          {error && (
            <RT.Text as="div" size="1" color="red">
              {error}
            </RT.Text>
          )}
        </div>
      </RT.Flex>
    </RT.Text>
  )
}

export function InputsSection() {
  const [color, setColor] = useState('#7048e8')
  const [swatch, setSwatch] = useState('#2563eb')
  const [plan, setPlan] = useState('team')
  const [cards, setCards] = useState<string[]>(['email'])
  const [tags, setTags] = useState<string[]>(['design'])
  const [tag, setTag] = useState('design')
  const [volume, setVolume] = useState(40)
  const [range, setRange] = useState<[number, number]>([20, 70])
  const [angle, setAngle] = useState(90)
  const [rating, setRating] = useState(3)
  const [view, setView] = useState('list')
  const [radioCard, setRadioCard] = useState('pro')
  const [singleCard, setSingleCard] = useState(true)

  return (
    <Section title="Inputs">
      <Demo title="TextInput" description="Single-line text field with label, description and error." radix="TextField">
        {(
          [
            ['default', 'surface'],
            ['filled', 'soft'],
          ] as const
        ).map(([m, r]) => (
          <Row
            key={m}
            label={`${m} / ${r}`}
            radix={
              <RField label={`Email (${m})`} description="We only use this for receipts.">
                <RT.TextField.Root variant={r} placeholder="you@company.com">
                  <RT.TextField.Slot>
                    <EnvelopeClosedIcon />
                  </RT.TextField.Slot>
                </RT.TextField.Root>
              </RField>
            }
          >
            <TextInput
              maw={W}
              description="We only use this for receipts."
              label={`Email (${m})`}
              leftSection={<EnvelopeClosedIcon />}
              placeholder="you@company.com"
              variant={m}
            />
          </Row>
        ))}
        <Row label="unstyled">
          <TextInput
            maw={W}
            description="We only use this for receipts."
            label="Email (unstyled)"
            leftSection={<EnvelopeClosedIcon />}
            placeholder="you@company.com"
            variant="unstyled"
          />
        </Row>
        {fieldSizes.map(([m, r]) => (
          <Row
            key={m}
            label={`size ${m} / ${r}`}
            radix={
              <RField label={`Size ${m}`} size={r}>
                <RT.TextField.Root size={r} placeholder="Project name" />
              </RField>
            }
          >
            <TextInput maw={W} label={`Size ${m}`} placeholder="Project name" size={m} />
          </Row>
        ))}
        <Row label="size lg">
          <TextInput maw={W} label="Size lg" placeholder="Project name" size="lg" />
        </Row>
        <Row
          label="error / color red"
          radix={
            <RField label="Username" error="That username is taken">
              <RT.TextField.Root color="red" defaultValue="alizahid" />
            </RField>
          }
        >
          <TextInput maw={W} label="Username" error="That username is taken" defaultValue="alizahid" />
        </Row>
        <Row
          label="disabled"
          radix={
            <RField label="Workspace">
              <RT.TextField.Root disabled defaultValue="Acme Inc." />
            </RField>
          }
        >
          <TextInput maw={W} label="Workspace" disabled defaultValue="Acme Inc." />
        </Row>
        <Row
          label="required, right icon"
          radix={
            <RField label="Name" required>
              <RT.TextField.Root placeholder="Full name">
                <RT.TextField.Slot side="right">
                  <MagnifyingGlassIcon />
                </RT.TextField.Slot>
              </RT.TextField.Root>
            </RField>
          }
        >
          <TextInput maw={W} label="Name" required placeholder="Full name" rightSection={<MagnifyingGlassIcon />} />
        </Row>
      </Demo>

      <Demo title="PasswordInput" description="Text field with a visibility toggle." radix="TextField (type password)">
        <Row
          label="with icon"
          radix={
            <RField label="Password">
              <RT.TextField.Root type="password" placeholder="At least 8 characters">
                <RT.TextField.Slot>
                  <LockClosedIcon />
                </RT.TextField.Slot>
              </RT.TextField.Root>
            </RField>
          }
        >
          <PasswordInput maw={W} label="Password" placeholder="At least 8 characters" leftSection={<LockClosedIcon />} />
        </Row>
        <Row
          label="filled / soft"
          radix={
            <RField label="Confirm">
              <RT.TextField.Root type="password" variant="soft" defaultValue="hunter2hunter2" />
            </RField>
          }
        >
          <PasswordInput maw={W} label="Confirm" variant="filled" defaultValue="hunter2hunter2" />
        </Row>
        <Row
          label="error / color red"
          radix={
            <RField label="Password" error="Password is too weak">
              <RT.TextField.Root type="password" color="red" defaultValue="abc" />
            </RField>
          }
        >
          <PasswordInput maw={W} label="Password" error="Password is too weak" defaultValue="abc" />
        </Row>
      </Demo>

      <Demo title="NumberInput" description="Numeric field with steppers and formatting." radix="TextField (type number)">
        <Row
          label="steppers"
          radix={
            <RField label="Seats">
              <RT.TextField.Root type="number" defaultValue={5} min={1} max={50} />
            </RField>
          }
        >
          <NumberInput maw={W} label="Seats" defaultValue={5} min={1} max={50} />
        </Row>
        <Row label="prefix, separator">
          <NumberInput maw={W} label="Price" prefix="$" thousandSeparator="," decimalScale={2} defaultValue={1299} />
        </Row>
        <Row
          label="no controls"
          radix={
            <RField label="Quantity">
              <RT.TextField.Root inputMode="numeric" placeholder="Enter amount" />
            </RField>
          }
        >
          <NumberInput maw={W} label="Quantity" hideControls placeholder="Enter amount" />
        </Row>
        <Row label="suffix, error">
          <NumberInput maw={W} label="Discount" suffix="%" error="Must be under 100" defaultValue={120} />
        </Row>
      </Demo>

      <Demo title="Textarea" description="Multi-line text, including an autosizing variant." radix="TextArea">
        <Row
          label="default / surface"
          radix={
            <RField label="Bio" description="Shown on your profile.">
              <RT.TextArea placeholder="Tell us about yourself" rows={3} />
            </RField>
          }
        >
          <Textarea maw={W} label="Bio" description="Shown on your profile." placeholder="Tell us about yourself" rows={3} />
        </Row>
        <Row
          label="filled / soft, autosize"
          radix={
            <RField label="Autosize">
              <RT.TextArea variant="soft" placeholder="Grows as you type" rows={3} defaultValue={'Line one\nLine two\nLine three'} />
            </RField>
          }
        >
          <Textarea
            maw={W}
            label="Autosize"
            autosize
            minRows={2}
            maxRows={5}
            placeholder="Grows as you type"
            defaultValue={'Line one\nLine two\nLine three'}
            variant="filled"
          />
        </Row>
        <Row
          label="disabled, error"
          radix={
            <RField label="Notes" error="Notes are required">
              <RT.TextArea disabled placeholder="Disabled" />
            </RField>
          }
        >
          <Textarea maw={W} label="Notes" error="Notes are required" disabled placeholder="Disabled" />
        </Row>
      </Demo>

      <Demo title="JsonInput" description="Textarea that validates and formats JSON.">
        <Row label="format on blur">
          <JsonInput
            maw={W * 2}
            label="Webhook payload"
            description="Formatted on blur."
            placeholder='{ "event": "invoice.paid" }'
            formatOnBlur
            autosize
            minRows={3}
            defaultValue='{"event":"invoice.paid","amount":4200}'
          />
        </Row>
      </Demo>

      <Demo title="MaskInput" description="Text field constrained by a mask pattern.">
        <Row label="default">
          <MaskInput maw={W} label="Card number" mask="0000 0000 0000 0000" placeholder="4242 4242 4242 4242" />
        </Row>
        <Row label="filled">
          <MaskInput maw={W} label="Expiry" mask="00/00" placeholder="MM/YY" variant="filled" />
        </Row>
        <Row label="always show mask">
          <MaskInput maw={W} label="Promo code" mask="AAA-000" alwaysShowMask description="Three letters, three digits." />
        </Row>
      </Demo>

      <Demo title="PhoneInput" description="International phone number with country picker.">
        <Row label="default">
          <PhoneInput maw={W} label="Phone" defaultCountry="us" />
        </Row>
        <Row label="filled">
          <PhoneInput maw={W} label="Mobile" defaultCountry="gb" variant="filled" preferredCountries={['gb', 'us']} />
        </Row>
        <Row label="error">
          <PhoneInput maw={W} label="Phone" defaultCountry="us" error="Enter a valid number" />
        </Row>
      </Demo>

      <Demo title="PinInput" description="One-time code entry.">
        {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
          <Row key={size} label={`size ${size}`}>
            <PinInput length={4} size={size} />
          </Row>
        ))}
        <Row label="6 digits">
          <PinInput length={6} type="number" placeholder="" />
        </Row>
        <Row label="error">
          <PinInput length={4} error />
        </Row>
        <Row label="disabled">
          <PinInput length={4} disabled />
        </Row>
      </Demo>

      <Demo title="NativeSelect" description="Browser-native dropdown." radix="Select (closest)">
        <Row
          label="default / surface"
          radix={
            <RField label="Country">
              <RT.Select.Root defaultValue="United States">
                <RT.Select.Trigger style={{ width: '100%' }} />
                <RT.Select.Content>
                  {['United States', 'Canada', 'Germany', 'Japan'].map((v) => (
                    <RT.Select.Item key={v} value={v}>
                      {v}
                    </RT.Select.Item>
                  ))}
                </RT.Select.Content>
              </RT.Select.Root>
            </RField>
          }
        >
          <NativeSelect maw={W} label="Country" data={['United States', 'Canada', 'Germany', 'Japan']} />
        </Row>
        <Row
          label="filled / soft"
          radix={
            <RField label="Role" description="Controls permissions.">
              <RT.Select.Root defaultValue="Admin">
                <RT.Select.Trigger variant="soft" style={{ width: '100%' }} />
                <RT.Select.Content variant="soft">
                  {['Admin', 'Editor', 'Viewer'].map((v) => (
                    <RT.Select.Item key={v} value={v}>
                      {v}
                    </RT.Select.Item>
                  ))}
                </RT.Select.Content>
              </RT.Select.Root>
            </RField>
          }
        >
          <NativeSelect maw={W} label="Role" variant="filled" data={['Admin', 'Editor', 'Viewer']} description="Controls permissions." />
        </Row>
        <Row
          label="error / color red"
          radix={
            <RField label="Timezone" error="Select a timezone">
              <RT.Select.Root defaultValue="UTC">
                <RT.Select.Trigger color="red" style={{ width: '100%' }} />
                <RT.Select.Content color="red">
                  {['UTC', 'CET'].map((v) => (
                    <RT.Select.Item key={v} value={v}>
                      {v}
                    </RT.Select.Item>
                  ))}
                </RT.Select.Content>
              </RT.Select.Root>
            </RField>
          }
        >
          <NativeSelect maw={W} label="Timezone" data={['UTC', 'CET']} error="Select a timezone" />
        </Row>
      </Demo>

      <Demo title="FileInput" description="Input that opens a file picker.">
        <Row label="clearable">
          <FileInput maw={W} label="Resume" placeholder="Upload PDF" accept="application/pdf" clearable />
        </Row>
        <Row label="filled, multiple">
          <FileInput maw={W} label="Attachments" placeholder="Pick files" multiple variant="filled" />
        </Row>
        <Row label="error">
          <FileInput maw={W} label="Logo" placeholder="Upload logo" error="File is too large" />
        </Row>
      </Demo>

      <Demo title="ColorInput" description="Text field with a color picker dropdown.">
        <Row label="default">
          <ColorInput maw={W} label="Brand color" value={color} onChange={setColor} />
        </Row>
        <Row label="filled, hsla">
          <ColorInput maw={W} label="Accent" format="hsla" defaultValue="rgba(34, 197, 94, 1)" variant="filled" />
        </Row>
        <Row label="disabled">
          <ColorInput maw={W} label="Background" placeholder="Pick a color" disabled />
        </Row>
      </Demo>

      <Demo title="ColorPicker" description="Inline saturation, hue and swatches.">
        <Row label="hex, swatches">
          <ColorPicker value={swatch} onChange={setSwatch} format="hex" swatches={['#2563eb', '#16a34a', '#dc2626', '#f59e0b', '#7c3aed']} />
        </Row>
        <Row label="size sm, rgba">
          <ColorPicker size="sm" format="rgba" defaultValue="rgba(220, 38, 38, 0.8)" />
        </Row>
        <Row label="swatches only">
          <ColorPicker withPicker={false} format="hex" swatches={['#2563eb', '#16a34a', '#dc2626', '#f59e0b']} />
        </Row>
      </Demo>

      <Demo title="Input" description="Base input with sections, shown in each variant." radix="TextField">
        {(
          [
            ['default', 'surface'],
            ['filled', 'soft'],
          ] as const
        ).map(([m, r]) => (
          <Row
            key={m}
            label={`${m} / ${r}`}
            radix={
              <RT.TextField.Root variant={r} placeholder={`Search (${m})`} style={rw}>
                <RT.TextField.Slot>
                  <MagnifyingGlassIcon />
                </RT.TextField.Slot>
                <RT.TextField.Slot side="right">
                  <StarIcon />
                </RT.TextField.Slot>
              </RT.TextField.Root>
            }
          >
            <Input maw={W} leftSection={<MagnifyingGlassIcon />} placeholder={`Search (${m})`} rightSection={<StarIcon />} variant={m} />
          </Row>
        ))}
        <Row label="unstyled">
          <Input maw={W} leftSection={<MagnifyingGlassIcon />} placeholder="Search (unstyled)" rightSection={<StarIcon />} variant="unstyled" />
        </Row>
        <Row label="error / color red" radix={<RT.TextField.Root color="red" placeholder="Invalid" style={rw} />}>
          <Input maw={W} placeholder="Invalid" error />
        </Row>
        <Row label="disabled" radix={<RT.TextField.Root disabled placeholder="Disabled" style={rw} />}>
          <Input maw={W} placeholder="Disabled" disabled />
        </Row>
        <Row label="size md / 3" radix={<RT.TextField.Root size="3" placeholder="Medium" style={rw} />}>
          <Input maw={W} placeholder="Medium" size="md" />
        </Row>
        <Row label="size lg">
          <Input maw={W} placeholder="Large" size="lg" />
        </Row>
      </Demo>

      <Demo title="Input.Wrapper" description="Label, description and error around any control.">
        <Row label="required, description">
          <Input.Wrapper maw={W} label="Subdomain" description="Your workspace address." required>
            <Input placeholder="acme" rightSection={<Text size="xs">.app.com</Text>} rightSectionWidth={70} />
          </Input.Wrapper>
        </Row>
        <Row label="error">
          <Input.Wrapper maw={W} label="Display name" error="This field is required">
            <Input placeholder="Your name" error />
          </Input.Wrapper>
        </Row>
      </Demo>

      <Demo title="Fieldset" description="Groups related fields under a legend.">
        {(['default', 'filled', 'unstyled'] as const).map((variant) => (
          <Row key={variant} label={variant}>
            <Fieldset maw={W + 40} legend={`Billing (${variant})`} variant={variant}>
              <Stack>
                <TextInput label="Company" placeholder="Acme Inc." />
                <TextInput label="VAT ID" placeholder="DE123456789" />
              </Stack>
            </Fieldset>
          </Row>
        ))}
        <Row label="disabled">
          <Fieldset maw={W + 40} legend="Disabled" disabled>
            <TextInput label="Company" placeholder="Acme Inc." />
          </Fieldset>
        </Row>
      </Demo>

      <Demo title="Checkbox" description="Binary choice in each variant, size and state." radix="Checkbox">
        <Row
          label="filled / surface"
          radix={
            <RLabel label="filled">
              <RT.Checkbox defaultChecked />
            </RLabel>
          }
        >
          <Checkbox variant="filled" label="filled" defaultChecked />
        </Row>
        <Row label="outline">
          <Checkbox variant="outline" label="outline" defaultChecked />
        </Row>
        <Row
          label="light / soft"
          radix={
            <RLabel label="light">
              <RT.Checkbox variant="soft" defaultChecked />
            </RLabel>
          }
        >
          <Checkbox variant="light" label="light" defaultChecked />
        </Row>
        {colors.map((c) => (
          <Row
            key={c}
            label={`color ${c}`}
            radix={
              <RLabel label={c}>
                <RT.Checkbox color={c} defaultChecked />
              </RLabel>
            }
          >
            <Checkbox color={c} label={c} defaultChecked />
          </Row>
        ))}
        {fieldSizes.map(([m, r]) => (
          <Row
            key={m}
            label={`size ${m} / ${r}`}
            radix={
              <RLabel label={m} size={r}>
                <RT.Checkbox size={r} defaultChecked />
              </RLabel>
            }
          >
            <Checkbox size={m} label={m} defaultChecked />
          </Row>
        ))}
        <Row label="size lg">
          <Checkbox size="lg" label="lg" defaultChecked />
        </Row>
        <Row
          label="unchecked, description"
          radix={
            <RLabel label="Email notifications" description="Get a digest every Monday.">
              <RT.Checkbox />
            </RLabel>
          }
        >
          <Checkbox label="Email notifications" description="Get a digest every Monday." />
        </Row>
        <Row
          label="indeterminate"
          radix={
            <RLabel label="Indeterminate">
              <RT.Checkbox checked="indeterminate" />
            </RLabel>
          }
        >
          <Checkbox label="Indeterminate" indeterminate />
        </Row>
        <Row
          label="disabled"
          radix={
            <RLabel label="Disabled" disabled>
              <RT.Checkbox disabled />
            </RLabel>
          }
        >
          <Checkbox label="Disabled" disabled />
        </Row>
        <Row
          label="disabled checked"
          radix={
            <RLabel label="Disabled checked" disabled>
              <RT.Checkbox disabled defaultChecked />
            </RLabel>
          }
        >
          <Checkbox label="Disabled checked" disabled defaultChecked />
        </Row>
        <Row
          label="error / color red"
          radix={
            <RLabel label="Accept terms" error="You must accept the terms">
              <RT.Checkbox color="red" />
            </RLabel>
          }
        >
          <Checkbox label="Accept terms" error="You must accept the terms" />
        </Row>
        <Row
          label="label left"
          radix={
            <RLabel label="Label left" left>
              <RT.Checkbox />
            </RLabel>
          }
        >
          <Checkbox label="Label left" labelPosition="left" />
        </Row>
      </Demo>

      <Demo title="Checkbox.Group" description="Multiple checkboxes sharing one value." radix="CheckboxGroup">
        <Row
          label="group"
          radix={
            <div>
              <RT.Text as="div" size="2" weight="medium">
                Notify me about
              </RT.Text>
              <RT.Text as="div" size="1" color="gray" mb="2">
                Pick any that apply.
              </RT.Text>
              <RT.CheckboxGroup.Root value={tags} onValueChange={setTags}>
                <RT.CheckboxGroup.Item value="design">Design reviews</RT.CheckboxGroup.Item>
                <RT.CheckboxGroup.Item value="deploys">Deployments</RT.CheckboxGroup.Item>
                <RT.CheckboxGroup.Item value="billing">Billing</RT.CheckboxGroup.Item>
              </RT.CheckboxGroup.Root>
            </div>
          }
        >
          <Checkbox.Group label="Notify me about" description="Pick any that apply." value={tags} onChange={setTags}>
            <Stack mt="xs" gap="xs">
              <Checkbox value="design" label="Design reviews" />
              <Checkbox value="deploys" label="Deployments" />
              <Checkbox value="billing" label="Billing" />
            </Stack>
          </Checkbox.Group>
        </Row>
      </Demo>

      <Demo title="CheckboxCard" description="Checkbox presented as a selectable card." radix="CheckboxCards">
        <Row
          label="group"
          radix={
            <RT.CheckboxCards.Root value={cards} onValueChange={setCards} columns="1" style={rw}>
              {(
                [
                  ['email', 'Email', 'Weekly product updates', false],
                  ['sms', 'SMS', 'Critical alerts only', false],
                  ['push', 'Push', 'Unavailable on web', true],
                ] as const
              ).map(([value, title, text, disabled]) => (
                <RT.CheckboxCards.Item key={value} value={value} disabled={disabled}>
                  <RT.Flex direction="column" width="100%">
                    <RT.Text weight="medium">{title}</RT.Text>
                    <RT.Text color="gray">{text}</RT.Text>
                  </RT.Flex>
                </RT.CheckboxCards.Item>
              ))}
            </RT.CheckboxCards.Root>
          }
        >
          <Checkbox.Group value={cards} onChange={setCards}>
            <Stack gap="md" maw={W}>
              <Checkbox.Card value="email" p="md" radius="md">
                <Group wrap="nowrap" align="flex-start">
                  <Checkbox.Indicator />
                  <div>
                    <Text fw={500} size="sm">Email</Text>
                    <Text size="sm" c="dimmed">
                      Weekly product updates
                    </Text>
                  </div>
                </Group>
              </Checkbox.Card>
              <Checkbox.Card value="sms" p="md" radius="md">
                <Group wrap="nowrap" align="flex-start">
                  <Checkbox.Indicator />
                  <div>
                    <Text fw={500} size="sm">SMS</Text>
                    <Text size="sm" c="dimmed">
                      Critical alerts only
                    </Text>
                  </div>
                </Group>
              </Checkbox.Card>
              <Checkbox.Card value="push" p="md" radius="md" disabled>
                <Group wrap="nowrap" align="flex-start">
                  <Checkbox.Indicator disabled />
                  <div>
                    <Text fw={500} size="sm">Push</Text>
                    <Text size="sm" c="dimmed">
                      Unavailable on web
                    </Text>
                  </div>
                </Group>
              </Checkbox.Card>
            </Stack>
          </Checkbox.Group>
        </Row>
        <Row
          label="standalone"
          radix={
            <RT.CheckboxCards.Root
              value={singleCard ? ['on'] : []}
              onValueChange={(v) => setSingleCard(v.length > 0)}
              columns="1"
              style={rw}
            >
              <RT.CheckboxCards.Item value="on">
                <RT.Text weight="medium">Standalone card</RT.Text>
              </RT.CheckboxCards.Item>
            </RT.CheckboxCards.Root>
          }
        >
          <Checkbox.Card checked={singleCard} onChange={setSingleCard} p="md" radius="md" maw={W}>
            <Group wrap="nowrap" align="flex-start">
              <Checkbox.Indicator checked={singleCard} />
              <Text fw={500} size="sm">Standalone card</Text>
            </Group>
          </Checkbox.Card>
        </Row>
      </Demo>

      <Demo title="Radio" description="Single choice in each variant, size and state." radix="Radio">
        <Row
          label="filled / surface"
          radix={
            <RLabel label="filled">
              <RT.Radio name="r-variant-filled" value="1" defaultChecked />
            </RLabel>
          }
        >
          <Radio variant="filled" label="filled" defaultChecked name="variant-filled" />
        </Row>
        <Row label="outline">
          <Radio variant="outline" label="outline" defaultChecked name="variant-outline" />
        </Row>
        <Row
          label="light / soft"
          radix={
            <RLabel label="light">
              <RT.Radio variant="soft" name="r-variant-light" value="1" defaultChecked />
            </RLabel>
          }
        >
          <Radio variant="light" label="light" defaultChecked name="variant-light" />
        </Row>
        {colors.map((c) => (
          <Row
            key={c}
            label={`color ${c}`}
            radix={
              <RLabel label={c}>
                <RT.Radio color={c} name={`r-c-${c}`} value="1" defaultChecked />
              </RLabel>
            }
          >
            <Radio color={c} label={c} defaultChecked name={`c-${c}`} />
          </Row>
        ))}
        {fieldSizes.map(([m, r]) => (
          <Row
            key={m}
            label={`size ${m} / ${r}`}
            radix={
              <RLabel label={m} size={r}>
                <RT.Radio size={r} name={`r-size-${m}`} value="1" defaultChecked />
              </RLabel>
            }
          >
            <Radio size={m} label={m} defaultChecked name={`size-${m}`} />
          </Row>
        ))}
        <Row label="size lg">
          <Radio size="lg" label="lg" defaultChecked name="size-lg" />
        </Row>
        <Row
          label="unchecked, description"
          radix={
            <RLabel label="With description" description="Helpful context below.">
              <RT.Radio name="r-d" value="1" />
            </RLabel>
          }
        >
          <Radio label="With description" description="Helpful context below." name="d" />
        </Row>
        <Row
          label="disabled"
          radix={
            <RLabel label="Disabled" disabled>
              <RT.Radio name="r-dis" value="1" disabled />
            </RLabel>
          }
        >
          <Radio label="Disabled" disabled name="dis" />
        </Row>
        <Row
          label="error / color red"
          radix={
            <RLabel label="Error" error="Choose one">
              <RT.Radio color="red" name="r-err" value="1" />
            </RLabel>
          }
        >
          <Radio label="Error" error="Choose one" name="err" />
        </Row>
      </Demo>

      <Demo title="Radio.Group" description="Mutually exclusive options with a shared label." radix="RadioGroup">
        <Row
          label="group"
          radix={
            <div>
              <RT.Text as="div" size="2" weight="medium">
                Billing plan
              </RT.Text>
              <RT.Text as="div" size="1" color="gray" mb="2">
                You can change this later.
              </RT.Text>
              <RT.RadioGroup.Root value={plan} onValueChange={setPlan}>
                {(
                  [
                    ['solo', 'Solo', '$9 per month', false],
                    ['team', 'Team', '$29 per month', false],
                    ['enterprise', 'Enterprise', 'Contact sales', true],
                  ] as const
                ).map(([value, title, text, disabled]) => (
                  <RT.RadioGroup.Item key={value} value={value} disabled={disabled}>
                    {title}
                    <RT.Text as="div" size="1" color="gray">
                      {text}
                    </RT.Text>
                  </RT.RadioGroup.Item>
                ))}
              </RT.RadioGroup.Root>
            </div>
          }
        >
          <Radio.Group label="Billing plan" description="You can change this later." value={plan} onChange={setPlan}>
            <Stack mt="xs" gap="xs">
              <Radio value="solo" label="Solo" description="$9 per month" />
              <Radio value="team" label="Team" description="$29 per month" />
              <Radio value="enterprise" label="Enterprise" description="Contact sales" disabled />
            </Stack>
          </Radio.Group>
        </Row>
      </Demo>

      <Demo title="RadioCard" description="Radio presented as a selectable card." radix="RadioCards">
        <Row
          label="group"
          radix={
            <RT.RadioCards.Root value={radioCard} onValueChange={setRadioCard} columns="1" style={rw}>
              {[
                ['free', 'Free', '3 projects'],
                ['pro', 'Pro', 'Unlimited projects'],
                ['scale', 'Scale', 'SSO and audit logs'],
              ].map(([value, title, text]) => (
                <RT.RadioCards.Item key={value} value={value}>
                  <RT.Flex direction="column" width="100%">
                    <RT.Text weight="medium">{title}</RT.Text>
                    <RT.Text color="gray">{text}</RT.Text>
                  </RT.Flex>
                </RT.RadioCards.Item>
              ))}
            </RT.RadioCards.Root>
          }
        >
          <Radio.Group value={radioCard} onChange={setRadioCard}>
            <Stack gap="md" maw={W}>
              {[
                ['free', 'Free', '3 projects'],
                ['pro', 'Pro', 'Unlimited projects'],
                ['scale', 'Scale', 'SSO and audit logs'],
              ].map(([value, title, text]) => (
                <Radio.Card key={value} value={value} p="md" radius="md">
                  <Group wrap="nowrap" align="flex-start">
                    <Radio.Indicator />
                    <div>
                      <Text fw={500} size="sm">{title}</Text>
                      <Text size="sm" c="dimmed">
                        {text}
                      </Text>
                    </div>
                  </Group>
                </Radio.Card>
              ))}
            </Stack>
          </Radio.Group>
        </Row>
      </Demo>

      <Demo title="Switch" description="On/off toggle with sizes, labels and states." radix="Switch">
        {fieldSizes.map(([m, r]) => (
          <Row
            key={m}
            label={`size ${m} / ${r}`}
            radix={
              <RLabel label={m} size={r}>
                <RT.Switch size={r} defaultChecked />
              </RLabel>
            }
          >
            <Switch size={m} defaultChecked label={m} />
          </Row>
        ))}
        <Row label="size lg">
          <Switch size="lg" defaultChecked label="lg" />
        </Row>
        {colors.map((c) => (
          <Row
            key={c}
            label={`color ${c}`}
            radix={
              <RLabel label={c}>
                <RT.Switch color={c} defaultChecked />
              </RLabel>
            }
          >
            <Switch defaultChecked color={c} label={c} />
          </Row>
        ))}
        <Row label="on/off labels, on">
          <Switch size="lg" onLabel="ON" offLabel="OFF" defaultChecked label="On/off labels" />
        </Row>
        <Row label="on/off labels, off">
          <Switch size="md" onLabel="ON" offLabel="OFF" label="Off state" />
        </Row>
        <Row
          label="off, description"
          radix={
            <RLabel label="Auto-renew" description="Charged on the 1st of each month.">
              <RT.Switch />
            </RLabel>
          }
        >
          <Switch label="Auto-renew" description="Charged on the 1st of each month." />
        </Row>
        <Row
          label="disabled"
          radix={
            <RLabel label="Disabled" disabled>
              <RT.Switch disabled />
            </RLabel>
          }
        >
          <Switch label="Disabled" disabled />
        </Row>
        <Row
          label="disabled on"
          radix={
            <RLabel label="Disabled on" disabled>
              <RT.Switch disabled defaultChecked />
            </RLabel>
          }
        >
          <Switch label="Disabled on" disabled defaultChecked />
        </Row>
        <Row
          label="label left"
          radix={
            <RLabel label="Label left" left>
              <RT.Switch />
            </RLabel>
          }
        >
          <Switch label="Label left" labelPosition="left" />
        </Row>
        <Row
          label="error / color red"
          radix={
            <RLabel label="Marketing emails" error="Required">
              <RT.Switch color="red" />
            </RLabel>
          }
        >
          <Switch label="Marketing emails" error="Required" />
        </Row>
      </Demo>

      <Demo title="Switch.Group" description="Several switches sharing one value.">
        <Row label="group">
          <Switch.Group label="Integrations" description="Enable the ones you use." defaultValue={['slack']}>
            <Stack mt="xs" gap="xs">
              <Switch value="slack" label="Slack" />
              <Switch value="github" label="GitHub" />
              <Switch value="linear" label="Linear" />
            </Stack>
          </Switch.Group>
        </Row>
      </Demo>

      <Demo title="Chip" description="Compact toggleable filter in each variant.">
        {(['filled', 'outline', 'light'] as const).map((variant) => (
          <Row key={variant} label={variant}>
            <Chip variant={variant} defaultChecked>
              {variant}
            </Chip>
          </Row>
        ))}
        {colors.map((c) => (
          <Row key={c} label={`color ${c}`}>
            <Chip color={c} defaultChecked>
              {c}
            </Chip>
          </Row>
        ))}
        <Row label="disabled">
          <Chip disabled>Disabled</Chip>
        </Row>
        {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
          <Row key={size} label={`size ${size}`}>
            <Chip size={size}>{size}</Chip>
          </Row>
        ))}
      </Demo>

      <Demo title="Chip.Group" description="Single or multiple selection across chips.">
        <Row label="single">
          <Chip.Group value={tag} onChange={(value) => setTag(value as string)}>
            <Group>
              <Chip value="design">Design</Chip>
              <Chip value="engineering">Engineering</Chip>
              <Chip value="marketing">Marketing</Chip>
            </Group>
          </Chip.Group>
        </Row>
        <Row label="multiple, outline">
          <Chip.Group multiple defaultValue={['open']}>
            <Group>
              <Chip variant="outline" value="open">
                Open
              </Chip>
              <Chip variant="outline" value="closed">
                Closed
              </Chip>
              <Chip variant="outline" value="draft">
                Draft
              </Chip>
            </Group>
          </Chip.Group>
        </Row>
      </Demo>

      <Demo title="SegmentedControl" description="Inline switcher between a few options." radix="SegmentedControl">
        <Row
          label="controlled"
          radix={
            <RT.SegmentedControl.Root value={view} onValueChange={setView}>
              <RT.SegmentedControl.Item value="list">List</RT.SegmentedControl.Item>
              <RT.SegmentedControl.Item value="board">Board</RT.SegmentedControl.Item>
              <RT.SegmentedControl.Item value="calendar">Calendar</RT.SegmentedControl.Item>
            </RT.SegmentedControl.Root>
          }
        >
          <SegmentedControl
            value={view}
            onChange={setView}
            data={[
              { value: 'list', label: 'List' },
              { value: 'board', label: 'Board' },
              { value: 'calendar', label: 'Calendar' },
            ]}
          />
        </Row>
        {fieldSizes.map(([m, r]) => (
          <Row
            key={m}
            label={`size ${m} / ${r}`}
            radix={
              <RT.SegmentedControl.Root size={r} defaultValue="Daily">
                {['Daily', 'Weekly', 'Monthly'].map((v) => (
                  <RT.SegmentedControl.Item key={v} value={v}>
                    {v}
                  </RT.SegmentedControl.Item>
                ))}
              </RT.SegmentedControl.Root>
            }
          >
            <SegmentedControl size={m} data={['Daily', 'Weekly', 'Monthly']} />
          </Row>
        ))}
        <Row label="size lg">
          <SegmentedControl size="lg" data={['Daily', 'Weekly', 'Monthly']} />
        </Row>
        <Row label="color green">
          <SegmentedControl color="green" data={['Draft', 'Review', 'Live']} defaultValue="Review" />
        </Row>
        <Row
          label="disabled"
          radix={
            <RT.SegmentedControl.Root disabled defaultValue="One">
              <RT.SegmentedControl.Item value="One">One</RT.SegmentedControl.Item>
              <RT.SegmentedControl.Item value="Two">Two</RT.SegmentedControl.Item>
            </RT.SegmentedControl.Root>
          }
        >
          <SegmentedControl disabled data={['One', 'Two']} />
        </Row>
        <Row label="vertical">
          <SegmentedControl orientation="vertical" data={['Inbox', 'Sent', 'Archive']} />
        </Row>
      </Demo>

      <Demo title="Slider" description="Single-value slider with marks and labels." radix="Slider">
        <Row label="controlled" radix={<RT.Slider value={[volume]} onValueChange={([v]) => setVolume(v)} style={rw} />}>
          <Slider maw={W} value={volume} onChange={setVolume} />
        </Row>
        <Row label="marks">
          <Slider maw={W} defaultValue={40} marks={marks} mb="lg" />
        </Row>
        <Row label="size xs">
          <Slider maw={W} size="xs" defaultValue={30} />
        </Row>
        {sliderSizes.map(([m, r]) => (
          <Row key={m} label={`size ${m} / ${r}`} radix={<RT.Slider size={r} defaultValue={[30]} style={rw} />}>
            <Slider maw={W} size={m} defaultValue={30} />
          </Row>
        ))}
        <Row label="color green" radix={<RT.Slider color="green" defaultValue={[60]} style={rw} />}>
          <Slider maw={W} color="green" defaultValue={60} label={(value) => `${value}%`} />
        </Row>
        <Row label="disabled" radix={<RT.Slider disabled defaultValue={[50]} style={rw} />}>
          <Slider maw={W} disabled defaultValue={50} />
        </Row>
      </Demo>

      <Demo title="RangeSlider" description="Slider with two handles." radix="Slider (two values)">
        <Row
          label="controlled"
          radix={
            <RT.Slider value={range} onValueChange={(v) => setRange([v[0], v[1]])} minStepsBetweenThumbs={10} style={rw} />
          }
        >
          <RangeSlider maw={W} value={range} onChange={setRange} minRange={10} />
        </Row>
        <Row label="marks">
          <RangeSlider maw={W} defaultValue={[20, 70]} marks={marks} minRange={10} mb="lg" />
        </Row>
        <Row label="size lg / 3, color red" radix={<RT.Slider size="3" color="red" defaultValue={[10, 40]} style={rw} />}>
          <RangeSlider maw={W} size="lg" color="red" defaultValue={[10, 40]} />
        </Row>
        <Row label="disabled" radix={<RT.Slider disabled defaultValue={[25, 75]} style={rw} />}>
          <RangeSlider maw={W} disabled defaultValue={[25, 75]} />
        </Row>
      </Demo>

      <Demo title="AngleSlider" description="Circular slider for angles.">
        <Row label="with label">
          <AngleSlider value={angle} onChange={setAngle} withLabel formatLabel={(value) => `${value}°`} />
        </Row>
        <Row label="size 80, marks">
          <AngleSlider defaultValue={45} size={80} marks={[{ value: 0 }, { value: 90 }, { value: 180 }, { value: 270 }]} />
        </Row>
        <Row label="disabled">
          <AngleSlider disabled defaultValue={200} />
        </Row>
      </Demo>

      <Demo title="Rating" description="Star rating, interactive and read-only.">
        <Row label="controlled">
          <Rating value={rating} onChange={setRating} />
        </Row>
        {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
          <Row key={size} label={`size ${size}`}>
            <Rating size={size} defaultValue={4} />
          </Row>
        ))}
        <Row label="fractions, color red">
          <Rating fractions={2} defaultValue={3.5} color="red" />
        </Row>
        <Row label="read only, 10">
          <Rating readOnly defaultValue={4} count={10} />
        </Row>
      </Demo>
    </Section>
  )
}
