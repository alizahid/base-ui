import {
  Anchor,
  Breadcrumbs,
  Burger,
  Group,
  Menu,
  Menubar,
  NavLink,
  Pagination,
  SimpleGrid,
  Stack,
  Stepper,
  TableOfContents,
  Tabs,
  Text,
  Toolbar,
  Tree,
} from '@mantine/core'
import {
  BellIcon,
  ChatBubbleIcon,
  FontBoldIcon,
  FontItalicIcon,
  GearIcon,
  HomeIcon,
  ImageIcon,
  PersonIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons'
import { useState } from 'react'

import { Demo, Section } from '../demo'

const crumbs = [
  { title: 'Workspace', href: '#' },
  { title: 'Projects', href: '#' },
  { title: 'Atlas', href: '#' },
  { title: 'Settings', href: '#' },
].map((item) => (
  <Anchor href={item.href} key={item.title}>
    {item.title}
  </Anchor>
))

const fileTree = [
  {
    value: 'src',
    label: 'src',
    children: [
      { value: 'src/components', label: 'components', children: [{ value: 'button.tsx', label: 'button.tsx' }, { value: 'input.tsx', label: 'input.tsx' }] },
      { value: 'src/main.tsx', label: 'main.tsx' },
    ],
  },
  { value: 'package.json', label: 'package.json' },
  { value: 'README.md', label: 'README.md' },
]

function NavLinks() {
  const [active, setActive] = useState('inbox')

  return (
    <Stack gap="xs">
      <NavLink active={active === 'inbox'} description="12 unread" label="Inbox" leftSection={<ChatBubbleIcon />} onClick={() => setActive('inbox')} />
      <NavLink active={active === 'profile'} label="Profile" leftSection={<PersonIcon />} onClick={() => setActive('profile')} variant="filled" />
      <NavLink active={active === 'sub'} label="Settings" leftSection={<GearIcon />} onClick={() => setActive('sub')} variant="subtle">
        <NavLink label="General" />
        <NavLink label="Notifications" leftSection={<BellIcon />} />
        <NavLink disabled label="Billing (locked)" />
      </NavLink>
      <NavLink defaultOpened label="Projects" leftSection={<HomeIcon />}>
        <NavLink active label="Atlas" />
        <NavLink label="Orbit" />
      </NavLink>
    </Stack>
  )
}

function Burgers() {
  const [open, setOpen] = useState(false)

  return (
    <Group>
      <Burger aria-label="Toggle menu" onClick={() => setOpen((o) => !o)} opened={open} />
      <Burger aria-label="Toggle menu" opened size="sm" />
      <Burger aria-label="Toggle menu" size="lg" />
    </Group>
  )
}

function Steppers() {
  const [step, setStep] = useState(1)

  return (
    <Stack gap="xl">
      <Stepper active={step} onStepClick={setStep}>
        <Stepper.Step description="Create an account" label="Account" />
        <Stepper.Step description="Verify your email" label="Verify" />
        <Stepper.Step description="Pick a plan" label="Billing" />
        <Stepper.Completed>All set, welcome aboard.</Stepper.Completed>
      </Stepper>
      <Stepper active={1} color="gray" orientation="vertical" size="sm">
        <Stepper.Step description="Connect your repository" label="Source" />
        <Stepper.Step description="Configure build settings" label="Build" />
        <Stepper.Step description="Ship to production" label="Deploy" />
      </Stepper>
    </Stack>
  )
}

function TabsDemo() {
  const body = (
    <>
      <Tabs.List>
        <Tabs.Tab leftSection={<HomeIcon />} value="overview">
          Overview
        </Tabs.Tab>
        <Tabs.Tab leftSection={<ImageIcon />} value="assets">
          Assets
        </Tabs.Tab>
        <Tabs.Tab leftSection={<GearIcon />} value="settings">
          Settings
        </Tabs.Tab>
        <Tabs.Tab disabled value="billing">
          Billing
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel pt="sm" value="overview">
        <Text size="sm">Project overview and recent activity.</Text>
      </Tabs.Panel>
      <Tabs.Panel pt="sm" value="assets">
        <Text size="sm">Images, fonts and other uploaded files.</Text>
      </Tabs.Panel>
      <Tabs.Panel pt="sm" value="settings">
        <Text size="sm">Domains, environment variables and members.</Text>
      </Tabs.Panel>
    </>
  )

  return (
    <Stack gap="xl">
      {(['default', 'outline', 'pills'] as const).map((variant) => (
        <Tabs defaultValue="overview" key={variant} variant={variant}>
          {body}
        </Tabs>
      ))}
      <Tabs color="gray" defaultValue="overview" orientation="vertical" variant="pills">
        {body}
      </Tabs>
    </Stack>
  )
}

export function NavigationSection() {
  const [page, setPage] = useState(3)

  return (
    <Section title="Navigation">
      <Demo title="Anchor" description="Styled link with underline variants.">
        <Group>
          <Anchor href="#">Default link</Anchor>
          <Anchor href="#" underline="always">
            Always underlined
          </Anchor>
          <Anchor href="#" underline="never">
            Never underlined
          </Anchor>
          <Anchor c="red" href="#">
            Danger link
          </Anchor>
        </Group>
      </Demo>

      <Demo title="Breadcrumbs" description="Path to the current page.">
        <Stack>
          <Breadcrumbs>{crumbs}</Breadcrumbs>
          <Breadcrumbs separator="/">{crumbs}</Breadcrumbs>
        </Stack>
      </Demo>

      <Demo title="Burger" description="Menu toggle icon in a few sizes.">
        <Burgers />
      </Demo>

      <Demo title="NavLink" description="Sidebar link with nested, active and disabled states.">
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <NavLinks />
        </SimpleGrid>
      </Demo>

      <Demo title="Pagination" description="Page controls in several sizes with edge buttons.">
        <Stack>
          <Pagination onChange={setPage} total={10} value={page} />
          <Pagination radius="xl" size="sm" total={8} withEdges />
          <Pagination color="gray" size="lg" total={5} />
          <Pagination disabled total={5} />
        </Stack>
      </Demo>

      <Demo title="Stepper" description="Progress through a multi-step flow, horizontal and vertical.">
        <Steppers />
      </Demo>

      <Demo title="Tabs" description="Default, outline and pills variants, plus a vertical layout with icons.">
        <TabsDemo />
      </Demo>

      <Demo title="TableOfContents" description="In-page headings with scroll spy.">
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          {(['light', 'filled', 'none'] as const).map((variant) => (
            <TableOfContents
              initialData={[
                { depth: 1, value: 'Introduction', id: 'toc-intro' },
                { depth: 2, value: 'Installation', id: 'toc-install' },
                { depth: 2, value: 'Usage', id: 'toc-usage' },
                { depth: 1, value: 'Reference', id: 'toc-ref' },
              ]}
              key={variant}
              scrollSpyOptions={{ selector: '[id^="section-"] > h2' }}
              getControlProps={({ data }) => ({ component: 'a', href: `#${data.id}` })}
              variant={variant}
            />
          ))}
        </SimpleGrid>
      </Demo>

      <Demo title="Tree" description="Expandable file tree.">
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <Tree data={fileTree} />
          <Tree data={fileTree} withLines />
        </SimpleGrid>
      </Demo>

      <Demo title="Menubar" description="Application-style menu bar with dropdowns.">
        <Menubar>
          <Menubar.Menu>
            <Menubar.Target>File</Menubar.Target>
            <Menubar.Dropdown>
              <Menu.Item rightSection="Cmd+N">New file</Menu.Item>
              <Menu.Item rightSection="Cmd+O">Open</Menu.Item>
              <Menu.Divider />
              <Menu.Item disabled>Export</Menu.Item>
            </Menubar.Dropdown>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Target>Edit</Menubar.Target>
            <Menubar.Dropdown>
              <Menu.Item rightSection="Cmd+Z">Undo</Menu.Item>
              <Menu.Item rightSection="Cmd+Shift+Z">Redo</Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red">Delete</Menu.Item>
            </Menubar.Dropdown>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Target>View</Menubar.Target>
            <Menubar.Dropdown>
              <Menu.Item>Zoom in</Menu.Item>
              <Menu.Item>Zoom out</Menu.Item>
            </Menubar.Dropdown>
          </Menubar.Menu>
        </Menubar>
      </Demo>

      <Demo title="Toolbar" description="Grouped formatting controls with toggles and separators.">
        <Stack>
          <Toolbar withBorder>
            <Toolbar.Group>
              <Toolbar.Toggle aria-label="Bold">
                <FontBoldIcon />
              </Toolbar.Toggle>
              <Toolbar.Toggle aria-label="Italic" active>
                <FontItalicIcon />
              </Toolbar.Toggle>
              <Toolbar.Toggle aria-label="Underline">
                <UnderlineIcon />
              </Toolbar.Toggle>
            </Toolbar.Group>
            <Toolbar.Divider />
            <Toolbar.ToggleGroup defaultValue="left" type="single">
              <Toolbar.ToggleItem aria-label="Align left" value="left">
                <TextAlignLeftIcon />
              </Toolbar.ToggleItem>
              <Toolbar.ToggleItem aria-label="Align center" value="center">
                <TextAlignCenterIcon />
              </Toolbar.ToggleItem>
              <Toolbar.ToggleItem aria-label="Align right" value="right">
                <TextAlignRightIcon />
              </Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
          </Toolbar>
          <Toolbar color="gray" size="sm" variant="filled">
            <Toolbar.ToggleGroup defaultValue={['bold']} type="multiple">
              <Toolbar.ToggleItem aria-label="Bold" value="bold">
                <FontBoldIcon />
              </Toolbar.ToggleItem>
              <Toolbar.ToggleItem aria-label="Italic" value="italic">
                <FontItalicIcon />
              </Toolbar.ToggleItem>
              <Toolbar.ToggleItem disabled aria-label="Underline" value="underline">
                <UnderlineIcon />
              </Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
          </Toolbar>
        </Stack>
      </Demo>
    </Section>
  )
}
