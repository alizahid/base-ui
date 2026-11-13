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
  SimpleGrid,
  Slider,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useState } from 'react'

import { Demo, Section } from '../demo'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
const inputVariants = ['default', 'filled', 'unstyled'] as const
const checkVariants = ['filled', 'outline', 'light'] as const
const marks = [
  { value: 0, label: '0%' },
  { value: 50, label: '50%' },
  { value: 100, label: '100%' },
]

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
      <Demo title="TextInput" description="Single-line text field with label, description and error.">
        <Stack>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            {inputVariants.map((variant) => (
              <TextInput
                key={variant}
                description="We only use this for receipts."
                label={`Email (${variant})`}
                leftSection={<EnvelopeClosedIcon />}
                placeholder="you@company.com"
                variant={variant}
              />
            ))}
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 4 }}>
            {sizes.map((size) => (
              <TextInput key={size} label={`Size ${size}`} placeholder="Project name" size={size} />
            ))}
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput label="Username" error="That username is taken" defaultValue="alizahid" />
            <TextInput label="Workspace" disabled defaultValue="Acme Inc." />
            <TextInput label="Name" required placeholder="Full name" rightSection={<MagnifyingGlassIcon />} />
          </SimpleGrid>
        </Stack>
      </Demo>

      <Demo title="PasswordInput" description="Text field with a visibility toggle.">
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <PasswordInput label="Password" placeholder="At least 8 characters" leftSection={<LockClosedIcon />} />
          <PasswordInput label="Confirm" variant="filled" defaultValue="hunter2hunter2" />
          <PasswordInput label="Password" error="Password is too weak" defaultValue="abc" />
        </SimpleGrid>
      </Demo>

      <Demo title="NumberInput" description="Numeric field with steppers and formatting.">
        <SimpleGrid cols={{ base: 1, sm: 4 }}>
          <NumberInput label="Seats" defaultValue={5} min={1} max={50} />
          <NumberInput label="Price" prefix="$" thousandSeparator="," decimalScale={2} defaultValue={1299} />
          <NumberInput label="Quantity" hideControls placeholder="Enter amount" />
          <NumberInput label="Discount" suffix="%" error="Must be under 100" defaultValue={120} />
        </SimpleGrid>
      </Demo>

      <Demo title="Textarea" description="Multi-line text, including an autosizing variant.">
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <Textarea label="Bio" description="Shown on your profile." placeholder="Tell us about yourself" rows={3} />
          <Textarea
            label="Autosize"
            autosize
            minRows={2}
            maxRows={5}
            placeholder="Grows as you type"
            defaultValue={'Line one\nLine two\nLine three'}
            variant="filled"
          />
          <Textarea label="Notes" error="Notes are required" disabled placeholder="Disabled" />
        </SimpleGrid>
      </Demo>

      <Demo title="JsonInput" description="Textarea that validates and formats JSON.">
        <JsonInput
          label="Webhook payload"
          description="Formatted on blur."
          placeholder='{ "event": "invoice.paid" }'
          formatOnBlur
          autosize
          minRows={3}
          defaultValue='{"event":"invoice.paid","amount":4200}'
        />
      </Demo>

      <Demo title="MaskInput" description="Text field constrained by a mask pattern.">
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <MaskInput label="Card number" mask="0000 0000 0000 0000" placeholder="4242 4242 4242 4242" />
          <MaskInput label="Expiry" mask="00/00" placeholder="MM/YY" variant="filled" />
          <MaskInput label="Promo code" mask="AAA-000" alwaysShowMask description="Three letters, three digits." />
        </SimpleGrid>
      </Demo>

      <Demo title="PhoneInput" description="International phone number with country picker.">
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <PhoneInput label="Phone" defaultCountry="us" />
          <PhoneInput label="Mobile" defaultCountry="gb" variant="filled" preferredCountries={['gb', 'us']} />
          <PhoneInput label="Phone" defaultCountry="us" error="Enter a valid number" />
        </SimpleGrid>
      </Demo>

      <Demo title="PinInput" description="One-time code entry.">
        <Stack>
          <Group>
            {sizes.map((size) => (
              <PinInput key={size} length={4} size={size} />
            ))}
          </Group>
          <Group>
            <PinInput length={6} type="number" placeholder="" />
            <PinInput length={4} error />
            <PinInput length={4} disabled />
          </Group>
        </Stack>
      </Demo>

      <Demo title="NativeSelect" description="Browser-native dropdown.">
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <NativeSelect label="Country" data={['United States', 'Canada', 'Germany', 'Japan']} />
          <NativeSelect label="Role" variant="filled" data={['Admin', 'Editor', 'Viewer']} description="Controls permissions." />
          <NativeSelect label="Timezone" data={['UTC', 'CET']} error="Select a timezone" />
        </SimpleGrid>
      </Demo>

      <Demo title="FileInput" description="Input that opens a file picker.">
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <FileInput label="Resume" placeholder="Upload PDF" accept="application/pdf" clearable />
          <FileInput label="Attachments" placeholder="Pick files" multiple variant="filled" />
          <FileInput label="Logo" placeholder="Upload logo" error="File is too large" />
        </SimpleGrid>
      </Demo>

      <Demo title="ColorInput" description="Text field with a color picker dropdown.">
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <ColorInput label="Brand color" value={color} onChange={setColor} />
          <ColorInput label="Accent" format="hsla" defaultValue="rgba(34, 197, 94, 1)" variant="filled" />
          <ColorInput label="Background" placeholder="Pick a color" disabled />
        </SimpleGrid>
      </Demo>

      <Demo title="ColorPicker" description="Inline saturation, hue and swatches.">
        <Group align="flex-start">
          <ColorPicker value={swatch} onChange={setSwatch} format="hex" swatches={['#2563eb', '#16a34a', '#dc2626', '#f59e0b', '#7c3aed']} />
          <ColorPicker size="sm" format="rgba" defaultValue="rgba(220, 38, 38, 0.8)" />
          <ColorPicker withPicker={false} format="hex" swatches={['#2563eb', '#16a34a', '#dc2626', '#f59e0b']} />
        </Group>
      </Demo>

      <Demo title="Input" description="Base input with sections, shown in each variant.">
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          {inputVariants.map((variant) => (
            <Input
              key={variant}
              leftSection={<MagnifyingGlassIcon />}
              placeholder={`Search (${variant})`}
              rightSection={<StarIcon />}
              variant={variant}
            />
          ))}
          <Input placeholder="Invalid" error />
          <Input placeholder="Disabled" disabled />
          <Input placeholder="Large" size="lg" />
        </SimpleGrid>
      </Demo>

      <Demo title="Input.Wrapper" description="Label, description and error around any control.">
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <Input.Wrapper label="Subdomain" description="Your workspace address." required>
            <Input placeholder="acme" rightSection={<Text size="xs">.app.com</Text>} rightSectionWidth={70} />
          </Input.Wrapper>
          <Input.Wrapper label="Display name" error="This field is required">
            <Input placeholder="Your name" error />
          </Input.Wrapper>
        </SimpleGrid>
      </Demo>

      <Demo title="Fieldset" description="Groups related fields under a legend.">
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          {(['default', 'filled', 'unstyled'] as const).map((variant) => (
            <Fieldset key={variant} legend={`Billing (${variant})`} variant={variant}>
              <Stack>
                <TextInput label="Company" placeholder="Acme Inc." />
                <TextInput label="VAT ID" placeholder="DE123456789" />
              </Stack>
            </Fieldset>
          ))}
          <Fieldset legend="Disabled" disabled>
            <TextInput label="Company" placeholder="Acme Inc." />
          </Fieldset>
        </SimpleGrid>
      </Demo>

      <Demo title="Checkbox" description="Binary choice in each variant, size and state.">
        <Stack>
          <Group>
            {checkVariants.map((variant) => (
              <Checkbox key={variant} variant={variant} label={variant} defaultChecked />
            ))}
            <Checkbox color="gray" label="gray" defaultChecked />
            <Checkbox color="red" label="red" defaultChecked />
            <Checkbox color="green" label="green" defaultChecked />
          </Group>
          <Group>
            {sizes.map((size) => (
              <Checkbox key={size} size={size} label={size} defaultChecked />
            ))}
          </Group>
          <Group align="flex-start">
            <Checkbox label="Email notifications" description="Get a digest every Monday." />
            <Checkbox label="Indeterminate" indeterminate />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Disabled checked" disabled defaultChecked />
            <Checkbox label="Accept terms" error="You must accept the terms" />
            <Checkbox label="Label left" labelPosition="left" />
          </Group>
        </Stack>
      </Demo>

      <Demo title="Checkbox.Group" description="Multiple checkboxes sharing one value.">
        <Checkbox.Group label="Notify me about" description="Pick any that apply." value={tags} onChange={setTags}>
          <Stack mt="xs" gap="xs">
            <Checkbox value="design" label="Design reviews" />
            <Checkbox value="deploys" label="Deployments" />
            <Checkbox value="billing" label="Billing" />
          </Stack>
        </Checkbox.Group>
      </Demo>

      <Demo title="CheckboxCard" description="Checkbox presented as a selectable card.">
        <Checkbox.Group value={cards} onChange={setCards}>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <Checkbox.Card value="email" p="md" radius="md">
              <Group wrap="nowrap" align="flex-start">
                <Checkbox.Indicator />
                <div>
                  <Text fw={500}>Email</Text>
                  <Text size="sm" c="dimmed">Weekly product updates</Text>
                </div>
              </Group>
            </Checkbox.Card>
            <Checkbox.Card value="sms" p="md" radius="md">
              <Group wrap="nowrap" align="flex-start">
                <Checkbox.Indicator />
                <div>
                  <Text fw={500}>SMS</Text>
                  <Text size="sm" c="dimmed">Critical alerts only</Text>
                </div>
              </Group>
            </Checkbox.Card>
            <Checkbox.Card value="push" p="md" radius="md" disabled>
              <Group wrap="nowrap" align="flex-start">
                <Checkbox.Indicator disabled />
                <div>
                  <Text fw={500}>Push</Text>
                  <Text size="sm" c="dimmed">Unavailable on web</Text>
                </div>
              </Group>
            </Checkbox.Card>
          </SimpleGrid>
        </Checkbox.Group>
        <Checkbox.Card checked={singleCard} onChange={setSingleCard} p="md" radius="md" mt="md" maw={320}>
          <Group wrap="nowrap" align="flex-start">
            <Checkbox.Indicator checked={singleCard} />
            <Text fw={500}>Standalone card</Text>
          </Group>
        </Checkbox.Card>
      </Demo>

      <Demo title="Radio" description="Single choice in each variant, size and state.">
        <Stack>
          <Group>
            {checkVariants.map((variant) => (
              <Radio key={variant} variant={variant} label={variant} defaultChecked name={`variant-${variant}`} />
            ))}
            <Radio color="gray" label="gray" defaultChecked name="c-gray" />
            <Radio color="red" label="red" defaultChecked name="c-red" />
            <Radio color="green" label="green" defaultChecked name="c-green" />
          </Group>
          <Group>
            {sizes.map((size) => (
              <Radio key={size} size={size} label={size} defaultChecked name={`size-${size}`} />
            ))}
          </Group>
          <Group align="flex-start">
            <Radio label="With description" description="Helpful context below." name="d" />
            <Radio label="Disabled" disabled name="dis" />
            <Radio label="Error" error="Choose one" name="err" />
          </Group>
        </Stack>
      </Demo>

      <Demo title="Radio.Group" description="Mutually exclusive options with a shared label.">
        <Radio.Group label="Billing plan" description="You can change this later." value={plan} onChange={setPlan}>
          <Stack mt="xs" gap="xs">
            <Radio value="solo" label="Solo" description="$9 per month" />
            <Radio value="team" label="Team" description="$29 per month" />
            <Radio value="enterprise" label="Enterprise" description="Contact sales" disabled />
          </Stack>
        </Radio.Group>
      </Demo>

      <Demo title="RadioCard" description="Radio presented as a selectable card.">
        <Radio.Group value={radioCard} onChange={setRadioCard}>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            {[
              ['free', 'Free', '3 projects'],
              ['pro', 'Pro', 'Unlimited projects'],
              ['scale', 'Scale', 'SSO and audit logs'],
            ].map(([value, title, text]) => (
              <Radio.Card key={value} value={value} p="md" radius="md">
                <Group wrap="nowrap" align="flex-start">
                  <Radio.Indicator />
                  <div>
                    <Text fw={500}>{title}</Text>
                    <Text size="sm" c="dimmed">{text}</Text>
                  </div>
                </Group>
              </Radio.Card>
            ))}
          </SimpleGrid>
        </Radio.Group>
      </Demo>

      <Demo title="Switch" description="On/off toggle with sizes, labels and states.">
        <Stack>
          <Group>
            {sizes.map((size) => (
              <Switch key={size} size={size} defaultChecked label={size} />
            ))}
          </Group>
          <Group>
            <Switch defaultChecked color="gray" label="gray" />
            <Switch defaultChecked color="red" label="red" />
            <Switch defaultChecked color="green" label="green" />
            <Switch size="lg" onLabel="ON" offLabel="OFF" defaultChecked label="On/off labels" />
            <Switch size="md" onLabel="ON" offLabel="OFF" label="Off state" />
          </Group>
          <Group align="flex-start">
            <Switch label="Auto-renew" description="Charged on the 1st of each month." />
            <Switch label="Disabled" disabled />
            <Switch label="Disabled on" disabled defaultChecked />
            <Switch label="Label left" labelPosition="left" />
            <Switch label="Marketing emails" error="Required" />
          </Group>
        </Stack>
      </Demo>

      <Demo title="Switch.Group" description="Several switches sharing one value.">
        <Switch.Group label="Integrations" description="Enable the ones you use." defaultValue={['slack']}>
          <Stack mt="xs" gap="xs">
            <Switch value="slack" label="Slack" />
            <Switch value="github" label="GitHub" />
            <Switch value="linear" label="Linear" />
          </Stack>
        </Switch.Group>
      </Demo>

      <Demo title="Chip" description="Compact toggleable filter in each variant.">
        <Stack>
          <Group>
            {checkVariants.map((variant) => (
              <Chip key={variant} variant={variant} defaultChecked>
                {variant}
              </Chip>
            ))}
            <Chip color="gray" defaultChecked>gray</Chip>
            <Chip color="red" defaultChecked>red</Chip>
            <Chip color="green" defaultChecked>green</Chip>
            <Chip disabled>Disabled</Chip>
          </Group>
          <Group>
            {sizes.map((size) => (
              <Chip key={size} size={size}>
                {size}
              </Chip>
            ))}
          </Group>
        </Stack>
      </Demo>

      <Demo title="Chip.Group" description="Single or multiple selection across chips.">
        <Stack>
          <Chip.Group value={tag} onChange={(value) => setTag(value as string)}>
            <Group>
              <Chip value="design">Design</Chip>
              <Chip value="engineering">Engineering</Chip>
              <Chip value="marketing">Marketing</Chip>
            </Group>
          </Chip.Group>
          <Chip.Group multiple defaultValue={['open']}>
            <Group>
              <Chip variant="outline" value="open">Open</Chip>
              <Chip variant="outline" value="closed">Closed</Chip>
              <Chip variant="outline" value="draft">Draft</Chip>
            </Group>
          </Chip.Group>
        </Stack>
      </Demo>

      <Demo title="SegmentedControl" description="Inline switcher between a few options.">
        <Stack align="flex-start">
          <SegmentedControl value={view} onChange={setView} data={[{ value: 'list', label: 'List' }, { value: 'board', label: 'Board' }, { value: 'calendar', label: 'Calendar' }]} />
          {sizes.map((size) => (
            <SegmentedControl key={size} size={size} data={['Daily', 'Weekly', 'Monthly']} />
          ))}
          <SegmentedControl color="green" data={['Draft', 'Review', 'Live']} defaultValue="Review" />
          <SegmentedControl disabled data={['One', 'Two']} />
          <SegmentedControl orientation="vertical" data={['Inbox', 'Sent', 'Archive']} />
        </Stack>
      </Demo>

      <Demo title="Slider" description="Single-value slider with marks and labels.">
        <Stack>
          <Slider value={volume} onChange={setVolume} marks={marks} />
          {sizes.map((size) => (
            <Slider key={size} size={size} defaultValue={30} />
          ))}
          <Slider color="green" defaultValue={60} label={(value) => `${value}%`} />
          <Slider disabled defaultValue={50} />
        </Stack>
      </Demo>

      <Demo title="RangeSlider" description="Slider with two handles.">
        <Stack>
          <RangeSlider value={range} onChange={setRange} marks={marks} minRange={10} />
          <RangeSlider size="lg" color="red" defaultValue={[10, 40]} />
          <RangeSlider disabled defaultValue={[25, 75]} />
        </Stack>
      </Demo>

      <Demo title="AngleSlider" description="Circular slider for angles.">
        <Group>
          <AngleSlider value={angle} onChange={setAngle} withLabel formatLabel={(value) => `${value}°`} />
          <AngleSlider defaultValue={45} size={80} marks={[{ value: 0 }, { value: 90 }, { value: 180 }, { value: 270 }]} />
          <AngleSlider disabled defaultValue={200} />
        </Group>
      </Demo>

      <Demo title="Rating" description="Star rating, interactive and read-only.">
        <Stack>
          <Rating value={rating} onChange={setRating} />
          <Group>
            {sizes.map((size) => (
              <Rating key={size} size={size} defaultValue={4} />
            ))}
          </Group>
          <Group>
            <Rating fractions={2} defaultValue={3.5} color="red" />
            <Rating readOnly defaultValue={4} count={10} />
          </Group>
        </Stack>
      </Demo>
    </Section>
  )
}
