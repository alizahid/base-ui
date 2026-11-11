import type { Meta, StoryObj } from '@storybook/react-vite'
import { type ReactNode, useState } from 'react'
import {
  Accordion,
  AlertDialog,
  Autocomplete,
  Avatar,
  Badge,
  Button,
  Callout,
  Card,
  Checkbox,
  CheckboxGroup,
  Collapsible,
  Combobox,
  ContextMenu,
  Dialog,
  Drawer,
  DropdownMenu,
  Field,
  Fieldset,
  Form,
  HoverCard,
  IconButton,
  Menubar,
  Meter,
  NavigationMenu,
  NumberField,
  OtpField,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  ScrollArea,
  SegmentedControl,
  Select,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Tabs,
  TextArea,
  TextField,
  type Theme,
  ThemeProvider,
  Toast,
  Toggle,
  ToggleGroup,
  Toolbar,
  Tooltip,
  useTheme,
  useToast,
} from '..'
import { colors } from '../lib/colors'
import { grays, panelBackgrounds, radii } from '../lib/theme'

/**
 * Every component on one page, one of each. The panel on the right changes
 * the color, gray, appearance, radius and panels for all of them at once.
 */
const meta = {
  title: 'Playground',
  parameters: { controls: { disable: true } },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

const fruits = ['Apple', 'Banana', 'Cherry', 'Grape', 'Lemon', 'Mango', 'Orange', 'Peach']

function Section({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-gray-12 text-xl tracking-[-0.005em]">{title}</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-x-8 gap-y-6">
        {children}
      </div>
    </section>
  )
}

function Item({ children, name, wide }: { children: ReactNode; name: string; wide?: boolean }) {
  return (
    <div className={wide ? 'col-span-full flex flex-col gap-2' : 'flex flex-col gap-2'}>
      <span className="text-gray-a10 text-xs tracking-[0.0025em]">{name}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

function StarIcon() {
  return (
    <svg aria-hidden="true" className="size-[1em]" fill="currentColor" viewBox="0 0 16 16">
      <path d="m8 1.5 2 4.2 4.5.6-3.3 3.1.8 4.6L8 11.8 4 14l.8-4.6L1.5 6.3 6 5.7z" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7.25v3.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <circle cx="8" cy="5" fill="currentColor" r="0.9" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="size-[1em]" fill="none" viewBox="0 0 16 16">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m10.5 10.5 3 3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}

function ToastButton() {
  const toast = useToast()

  return (
    <Button
      onClick={() => toast.add({ description: 'Your changes are on the server.', title: 'Saved' })}
      variant="soft"
    >
      Show toast
    </Button>
  )
}

function Buttons() {
  return (
    <Section title="Buttons">
      <Item name="Button" wide>
        <Button>Solid</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="surface">Surface</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button color="red">Delete</Button>
        <Button highContrast>High contrast</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </Item>
      <Item name="IconButton">
        <IconButton aria-label="Favorite">
          <StarIcon />
        </IconButton>
        <IconButton aria-label="Favorite" variant="soft">
          <StarIcon />
        </IconButton>
        <IconButton aria-label="Favorite" variant="outline">
          <StarIcon />
        </IconButton>
        <IconButton aria-label="Favorite" variant="ghost">
          <StarIcon />
        </IconButton>
      </Item>
      <Item name="Toggle">
        <Toggle aria-label="Favorite" defaultPressed variant="soft">
          <StarIcon /> Favorite
        </Toggle>
        <Toggle aria-label="Bold">
          <b>B</b>
        </Toggle>
      </Item>
      <Item name="ToggleGroup">
        <ToggleGroup.Root defaultValue={['left']} variant="soft">
          <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
          <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
          <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
        </ToggleGroup.Root>
      </Item>
      <Item name="SegmentedControl">
        <SegmentedControl.Root aria-label="Mailbox" defaultValue="inbox">
          <SegmentedControl.Item value="inbox">Inbox</SegmentedControl.Item>
          <SegmentedControl.Item value="drafts">Drafts</SegmentedControl.Item>
          <SegmentedControl.Item value="sent">Sent</SegmentedControl.Item>
        </SegmentedControl.Root>
      </Item>
      <Item name="Toolbar">
        <Toolbar.Root>
          <Toolbar.Button aria-label="Bold" render={<Toggle defaultPressed />}>
            <b>B</b>
          </Toolbar.Button>
          <Toolbar.Button aria-label="Italic" render={<Toggle />}>
            <i>I</i>
          </Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.Button>Copy</Toolbar.Button>
          <Toolbar.Button disabled>Paste</Toolbar.Button>
        </Toolbar.Root>
      </Item>
    </Section>
  )
}

function Inputs() {
  return (
    <Section title="Inputs">
      <Item name="TextField">
        <TextField.Root aria-label="Search" className="w-64" placeholder="Search the docs…">
          <TextField.Slot>
            <SearchIcon />
          </TextField.Slot>
        </TextField.Root>
      </Item>
      <Item name="TextArea">
        <TextArea aria-label="Comment" className="w-64" placeholder="Reply to comment…" />
      </Item>
      <Item name="NumberField">
        <NumberField aria-label="Amount" defaultValue={10} />
      </Item>
      <Item name="OtpField">
        <OtpField aria-label="Code" defaultValue="123" />
      </Item>
      <Item name="Select">
        <Select.Root defaultValue="Apple">
          <Select.Trigger aria-label="Fruit" />
          <Select.Content>
            <Select.Group>
              <Select.Label>Fruits</Select.Label>
              {fruits.map((fruit) => (
                <Select.Item key={fruit} value={fruit}>
                  {fruit}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Item>
      <Item name="Combobox">
        <div className="w-64">
          <Combobox.Root items={fruits}>
            <Combobox.Input aria-label="Fruit" placeholder="Pick a fruit" />
            <Combobox.Content>
              {(fruit: string) => (
                <Combobox.Item key={fruit} value={fruit}>
                  {fruit}
                </Combobox.Item>
              )}
            </Combobox.Content>
          </Combobox.Root>
        </div>
      </Item>
      <Item name="Autocomplete">
        <div className="w-64">
          <Autocomplete.Root items={fruits}>
            <Autocomplete.Input aria-label="Fruit" placeholder="Type a fruit" />
            <Autocomplete.Content>
              {(fruit: string) => (
                <Autocomplete.Item key={fruit} value={fruit}>
                  {fruit}
                </Autocomplete.Item>
              )}
            </Autocomplete.Content>
          </Autocomplete.Root>
        </div>
      </Item>
      <Item name="Slider">
        <Slider aria-label="Volume" className="w-64" defaultValue={50} />
      </Item>
      <Item name="Checkbox">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox defaultChecked /> Agree to terms
        </label>
      </Item>
      <Item name="CheckboxGroup">
        <CheckboxGroup.Root defaultValue={['apple']}>
          <CheckboxGroup.Item value="apple">Apple</CheckboxGroup.Item>
          <CheckboxGroup.Item value="banana">Banana</CheckboxGroup.Item>
          <CheckboxGroup.Item value="cherry">Cherry</CheckboxGroup.Item>
        </CheckboxGroup.Root>
      </Item>
      <Item name="Radio">
        <RadioGroup.Root defaultValue="one">
          <label className="flex items-center gap-2 text-sm">
            <Radio value="one" /> A single radio
          </label>
        </RadioGroup.Root>
      </Item>
      <Item name="RadioGroup">
        <RadioGroup.Root defaultValue="comfortable">
          <RadioGroup.Item value="default">Default</RadioGroup.Item>
          <RadioGroup.Item value="comfortable">Comfortable</RadioGroup.Item>
          <RadioGroup.Item value="compact">Compact</RadioGroup.Item>
        </RadioGroup.Root>
      </Item>
      <Item name="Switch">
        <label className="flex items-center gap-2 text-sm">
          <Switch defaultChecked /> Notifications
        </label>
      </Item>
      <Item name="Form, Fieldset, Field">
        <Form className="w-64" onSubmit={(event) => event.preventDefault()}>
          <Fieldset.Root>
            <Fieldset.Legend>Account</Fieldset.Legend>
            <Field.Root name="email">
              <Field.Label>Email</Field.Label>
              <TextField.Root placeholder="you@example.com" required type="email" />
              <Field.Description>We only use it to send receipts.</Field.Description>
              <Field.Error />
            </Field.Root>
          </Fieldset.Root>
          <Button className="self-start" type="submit">
            Subscribe
          </Button>
        </Form>
      </Item>
    </Section>
  )
}

function Display() {
  return (
    <Section title="Display">
      <Item name="Avatar">
        <Avatar fallback="AL" />
        <Avatar fallback="TG" variant="solid" />
        <Avatar color="pink" fallback="Z" radius="full" />
      </Item>
      <Item name="Badge">
        <Badge>New</Badge>
        <Badge color="jade" variant="solid">
          Active
        </Badge>
        <Badge color="amber" variant="surface">
          Pending
        </Badge>
        <Badge color="red" variant="outline">
          Failed
        </Badge>
      </Item>
      <Item name="Card">
        <Card className="w-64">
          <div className="font-medium text-sm">Teodros Girmay</div>
          <div className="text-gray-11 text-sm">Engineering</div>
        </Card>
      </Item>
      <Item name="Callout">
        <Callout.Root>
          <Callout.Icon>
            <InfoIcon />
          </Callout.Icon>
          <Callout.Text>You will need admin rights to install this app.</Callout.Text>
        </Callout.Root>
      </Item>
      <Item name="Progress">
        <Progress aria-label="Upload" className="w-64" value={60} />
      </Item>
      <Item name="Meter">
        <Meter aria-label="Storage" className="w-64" value={35} />
      </Item>
      <Item name="Spinner">
        <Spinner />
        <Spinner size="lg" />
      </Item>
      <Item name="Skeleton">
        <div className="flex w-64 items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      </Item>
      <Item name="Separator">
        <div className="flex w-64 flex-col gap-3 text-sm">
          Above
          <Separator size="full" />
          <div className="flex h-5 items-center gap-3">
            Left <Separator orientation="vertical" /> Right
          </div>
        </div>
      </Item>
      <Item name="ScrollArea">
        <ScrollArea className="h-24 w-64">
          <p className="pr-4 text-sm">
            Three fundamental aspects of typography are legibility, readability, and aesthetics.
            Although in a non-technical sense “legible” and “readable” are often used synonymously,
            typographically they are separate but related concepts. Legibility describes how easily
            individual characters can be distinguished from one another.
          </p>
        </ScrollArea>
      </Item>
      <Item name="Tabs">
        <Tabs.Root className="w-72" defaultValue="account">
          <Tabs.List>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="text-sm" value="account">
            Make changes to your account.
          </Tabs.Content>
          <Tabs.Content className="text-sm" value="documents">
            Access and update your documents.
          </Tabs.Content>
          <Tabs.Content className="text-sm" value="settings">
            Edit your profile.
          </Tabs.Content>
        </Tabs.Root>
      </Item>
      <Item name="Accordion">
        <Accordion.Root className="w-72" defaultValue={['one']}>
          <Accordion.Item value="one">
            <Accordion.Trigger>What is Base UI?</Accordion.Trigger>
            <Accordion.Content>Unstyled React components for accessible UIs.</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="two">
            <Accordion.Trigger>How do I get started?</Accordion.Trigger>
            <Accordion.Content>Install the package and import the styles.</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </Item>
      <Item name="Collapsible">
        <Collapsible.Root className="w-64">
          <Collapsible.Trigger render={<Button variant="soft" />}>
            Recovery keys
          </Collapsible.Trigger>
          <Collapsible.Content>
            <p className="pt-2 text-gray-11 text-sm">alien-bean-pasta · wild-irish-burrito</p>
          </Collapsible.Content>
        </Collapsible.Root>
      </Item>
    </Section>
  )
}

function Overlays() {
  return (
    <Section title="Overlays and menus">
      <Item name="Dialog">
        <Dialog.Root>
          <Dialog.Trigger render={<Button variant="soft" />}>Edit profile</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Description className="mb-4">
              Make changes to your profile here.
            </Dialog.Description>
            <div className="flex justify-end gap-3">
              <Dialog.Close render={<Button color="accent" variant="soft" />}>Cancel</Dialog.Close>
              <Dialog.Close render={<Button />}>Save</Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </Item>
      <Item name="AlertDialog">
        <AlertDialog.Root>
          <AlertDialog.Trigger render={<Button color="red" variant="soft" />}>
            Revoke access
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>Revoke access</AlertDialog.Title>
            <AlertDialog.Description className="mb-4">
              Are you sure? This application will no longer be accessible.
            </AlertDialog.Description>
            <div className="flex justify-end gap-3">
              <AlertDialog.Cancel render={<Button variant="soft" />}>Cancel</AlertDialog.Cancel>
              <AlertDialog.Action render={<Button color="red" />}>Revoke access</AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Item>
      <Item name="Drawer">
        <Drawer.Root>
          <Drawer.Trigger render={<Button variant="soft" />}>Open drawer</Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Edit profile</Drawer.Title>
            <Drawer.Description className="mb-4">
              Swipe or press Escape to close.
            </Drawer.Description>
            <Drawer.Close render={<Button />}>Done</Drawer.Close>
          </Drawer.Content>
        </Drawer.Root>
      </Item>
      <Item name="Popover">
        <Popover.Root>
          <Popover.Trigger render={<Button variant="soft" />}>Notifications</Popover.Trigger>
          <Popover.Content>
            <Popover.Title>Notifications</Popover.Title>
            <Popover.Description>You are all caught up. Good job!</Popover.Description>
          </Popover.Content>
        </Popover.Root>
      </Item>
      <Item name="HoverCard">
        <p className="text-sm">
          Built with{' '}
          <HoverCard.Root>
            <HoverCard.Trigger
              className="text-accent-a11 underline underline-offset-2"
              href="https://base-ui.com"
            >
              Base UI
            </HoverCard.Trigger>
            <HoverCard.Content>
              <div className="flex w-56 gap-3">
                <Avatar fallback="B" />
                <div className="text-sm">
                  <div className="font-medium">Base UI</div>
                  <div className="text-gray-11">Unstyled React components.</div>
                </div>
              </div>
            </HoverCard.Content>
          </HoverCard.Root>
          .
        </p>
      </Item>
      <Item name="Tooltip">
        <Tooltip content="Add to library">
          <IconButton aria-label="Add to library" variant="soft">
            <StarIcon />
          </IconButton>
        </Tooltip>
      </Item>
      <Item name="Toast">
        <ToastButton />
      </Item>
      <Item name="DropdownMenu">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger render={<Button variant="soft" />}>Options</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
                <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red" shortcut="⌘ ⌫">
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Item>
      <Item name="ContextMenu">
        <ContextMenu.Root>
          <ContextMenu.Trigger className="flex h-16 w-64 items-center justify-center rounded-panel-md border border-gray-a7 border-dashed text-gray-a11 text-sm">
            Right click here
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item shortcut="⌘ C">Copy</ContextMenu.Item>
            <ContextMenu.Item shortcut="⌘ V">Paste</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.CheckboxItem defaultChecked>Show grid</ContextMenu.CheckboxItem>
          </ContextMenu.Content>
        </ContextMenu.Root>
      </Item>
      <Item name="Menubar">
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item shortcut="⌘ N">New</Menubar.Item>
              <Menubar.Item shortcut="⌘ O">Open</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Trigger>Edit</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item shortcut="⌘ X">Cut</Menubar.Item>
              <Menubar.Item shortcut="⌘ C">Copy</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>
      </Item>
      <Item name="NavigationMenu">
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Overview</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <ul className="flex w-64 flex-col gap-1">
                  <li>
                    <NavigationMenu.Link href="#">Quick start</NavigationMenu.Link>
                  </li>
                  <li>
                    <NavigationMenu.Link href="#">Accessibility</NavigationMenu.Link>
                  </li>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#">GitHub</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </Item>
    </Section>
  )
}

// The round color buttons in the theme panel
function Swatches<Value extends string>({
  label,
  onChange,
  options,
  swatch,
  value,
}: {
  label: string
  onChange: (value: Value) => void
  options: readonly Value[]
  /** Classes and attributes that paint one swatch in its own color. */
  swatch: (option: Value) => { className: string; 'data-color'?: string; 'data-gray'?: string }
  value: Value
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-medium text-sm">{label}</span>
      <div aria-label={label} className="grid grid-cols-13 gap-1.5" role="radiogroup">
        {options.map((option) => {
          const { className, ...attributes } = swatch(option)

          return (
            <Tooltip content={option} key={option}>
              <button
                {...attributes}
                aria-checked={option === value}
                aria-label={option}
                className={`size-5.5 cursor-default rounded-full outline-offset-2 outline-gray-12 focus-visible:outline-2 aria-checked:outline-2 ${className}`}
                onClick={() => onChange(option)}
                role="radio"
                type="button"
              />
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
}

// A row of options in the theme panel
function Options<Value extends string>({
  label,
  onChange,
  options,
  value,
}: {
  label: string
  onChange: (value: Value) => void
  options: readonly Value[]
  value: Value
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-medium text-sm">{label}</span>
      <SegmentedControl.Root
        aria-label={label}
        className="w-full"
        onValueChange={(next) => onChange(next as Value)}
        size="sm"
        value={value}
      >
        {options.map((option) => (
          <SegmentedControl.Item className="min-w-0 px-0 capitalize" key={option} value={option}>
            {option}
          </SegmentedControl.Item>
        ))}
      </SegmentedControl.Root>
    </div>
  )
}

/** The floating panel that changes the theme of the page, like the one in Radix Themes. */
function ThemePanel({ onChange, theme }: { onChange: (theme: Theme) => void; theme: Theme }) {
  const set = (change: Partial<Theme>) => onChange({ ...theme, ...change })

  return (
    <Card
      className="fixed top-4 right-4 z-10 flex max-h-[calc(100dvh-2rem)] w-96 flex-col gap-4 overflow-y-auto overflow-x-hidden shadow-ui-5"
      size="md"
    >
      <span className="font-bold text-base">Theme</span>
      <Swatches
        label="Accent color"
        onChange={(color) => set({ color })}
        options={colors}
        swatch={(color) => ({ className: 'bg-accent-9', 'data-color': color })}
        value={theme.color}
      />
      <Swatches
        label="Gray color"
        onChange={(gray) => set({ gray })}
        options={grays}
        swatch={(gray) => ({ className: 'bg-gray-9', 'data-gray': gray })}
        value={theme.gray}
      />
      <Options
        label="Appearance"
        onChange={(appearance) => set({ appearance })}
        options={['light', 'dark'] as const}
        value={theme.appearance === 'dark' ? 'dark' : 'light'}
      />
      <Options
        label="Radius"
        onChange={(radius) => set({ radius })}
        options={radii}
        value={theme.radius}
      />
      <Options
        label="Panel background"
        onChange={(panelBackground) => set({ panelBackground })}
        options={panelBackgrounds}
        value={theme.panelBackground}
      />
    </Card>
  )
}

function Page() {
  // Start from the theme picked in the Storybook toolbar
  const [theme, setTheme] = useState<Theme>(useTheme())

  return (
    <ThemeProvider {...theme} className="-m-4 min-h-dvh p-4" hasBackground>
      <Toast.Provider>
        <ThemePanel onChange={setTheme} theme={theme} />
        {/* Leave room for the panel on wide screens */}
        <div className="flex max-w-5xl flex-col gap-12 p-4 xl:mr-104">
          <Buttons />
          <Separator size="full" />
          <Inputs />
          <Separator size="full" />
          <Display />
          <Separator size="full" />
          <Overlays />
        </div>
      </Toast.Provider>
    </ThemeProvider>
  )
}

export const AllComponents: Story = {
  render: () => <Page />,
}
