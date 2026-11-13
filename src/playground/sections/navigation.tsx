import {
  Anchor,
  Breadcrumbs,
  Burger,
  Menu,
  Menubar,
  NavLink,
  Pagination,
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

import * as RT from '@radix-ui/themes'

import { Demo, Row, Section } from '../demo'

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

function ToggleBurger() {
  const [open, setOpen] = useState(false)
  return <Burger aria-label="Toggle menu" onClick={() => setOpen((o) => !o)} opened={open} />
}

function ClickableStepper() {
  const [step, setStep] = useState(1)
  return (
    <Stepper active={step} onStepClick={setStep}>
      <Stepper.Step description="Create an account" label="Account" />
      <Stepper.Step description="Verify your email" label="Verify" />
      <Stepper.Step description="Pick a plan" label="Billing" />
      <Stepper.Completed>All set, welcome aboard.</Stepper.Completed>
    </Stepper>
  )
}

function tabsBody(vertical = false) {
  const pad = vertical ? { pl: 'md', pt: 6 } : { pt: 'md' }
  return (
    <>
      <Tabs.List>
        <Tabs.Tab leftSection={<HomeIcon />} value="overview">
          Overview
        </Tabs.Tab>
        <Tabs.Tab leftSection={<ImageIcon />} value="assets">
          Assets
        </Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
        <Tabs.Tab disabled value="billing">
          Billing
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel {...pad} value="overview">
        <Text size="sm">Project overview and recent activity.</Text>
      </Tabs.Panel>
      <Tabs.Panel {...pad} value="assets">
        <Text size="sm">Images, fonts and other uploaded files.</Text>
      </Tabs.Panel>
      <Tabs.Panel {...pad} value="settings">
        <Text size="sm">Domains, environment variables and members.</Text>
      </Tabs.Panel>
    </>
  )
}

function RadixTabs({ size, color }: { size?: '1' | '2'; color?: 'gray' }) {
  const icon = { display: 'inline-flex', alignItems: 'center', gap: 8 }
  return (
    <RT.Tabs.Root defaultValue="overview">
      <RT.Tabs.List color={color} size={size}>
        <RT.Tabs.Trigger value="overview">
          <span style={icon}>
            <HomeIcon />
            Overview
          </span>
        </RT.Tabs.Trigger>
        <RT.Tabs.Trigger value="assets">
          <span style={icon}>
            <ImageIcon />
            Assets
          </span>
        </RT.Tabs.Trigger>
        <RT.Tabs.Trigger value="settings">Settings</RT.Tabs.Trigger>
        <RT.Tabs.Trigger disabled value="billing">
          Billing
        </RT.Tabs.Trigger>
      </RT.Tabs.List>
      <RT.Box pt="3">
        <RT.Tabs.Content value="overview">
          <RT.Text size="2">Project overview and recent activity.</RT.Text>
        </RT.Tabs.Content>
        <RT.Tabs.Content value="assets">
          <RT.Text size="2">Images, fonts and other uploaded files.</RT.Text>
        </RT.Tabs.Content>
        <RT.Tabs.Content value="settings">
          <RT.Text size="2">Domains, environment variables and members.</RT.Text>
        </RT.Tabs.Content>
      </RT.Box>
    </RT.Tabs.Root>
  )
}

const toc = [
  { depth: 1, value: 'Introduction', id: 'toc-intro' },
  { depth: 2, value: 'Installation', id: 'toc-install' },
  { depth: 2, value: 'Usage', id: 'toc-usage' },
  { depth: 1, value: 'Reference', id: 'toc-ref' },
]

export function NavigationSection() {
  const [page, setPage] = useState(3)

  return (
    <Section title="Navigation">
      <Demo title="Anchor" description="Styled link with underline variants." radix="Link">
        <Row label="underline hover / auto" radix={<RT.Link href="#">Default link</RT.Link>}>
          <Anchor href="#">Default link</Anchor>
        </Row>
        <Row
          label="underline always"
          radix={
            <RT.Link href="#" underline="always">
              Always underlined
            </RT.Link>
          }
        >
          <Anchor href="#" underline="always">
            Always underlined
          </Anchor>
        </Row>
        <Row
          label="underline never / none"
          radix={
            <RT.Link href="#" underline="none">
              Never underlined
            </RT.Link>
          }
        >
          <Anchor href="#" underline="never">
            Never underlined
          </Anchor>
        </Row>
        <Row
          label="color red"
          radix={
            <RT.Link color="red" href="#">
              Danger link
            </RT.Link>
          }
        >
          <Anchor c="red" href="#">
            Danger link
          </Anchor>
        </Row>
      </Demo>

      <Demo title="Breadcrumbs" description="Path to the current page.">
        <Row label="default">
          <Breadcrumbs>{crumbs}</Breadcrumbs>
        </Row>
        <Row label="separator /">
          <Breadcrumbs separator="/">{crumbs}</Breadcrumbs>
        </Row>
      </Demo>

      <Demo title="Burger" description="Menu toggle icon in a few sizes.">
        <Row label="toggle">
          <ToggleBurger />
        </Row>
        <Row label="opened, size sm">
          <Burger aria-label="Toggle menu" opened size="sm" />
        </Row>
        <Row label="size lg">
          <Burger aria-label="Toggle menu" size="lg" />
        </Row>
      </Demo>

      <Demo title="NavLink" description="Sidebar link with nested, active and disabled states.">
        <Row label="list">
          <div style={{ maxWidth: 420 }}>
            <NavLinks />
          </div>
        </Row>
      </Demo>

      <Demo title="Pagination" description="Page controls in several sizes with edge buttons.">
        <Row label="default">
          <Pagination onChange={setPage} total={10} value={page} />
        </Row>
        <Row label="size sm, edges">
          <Pagination radius="xl" size="sm" total={8} withEdges />
        </Row>
        <Row label="size lg, gray">
          <Pagination color="gray" size="lg" total={5} />
        </Row>
        <Row label="disabled">
          <Pagination disabled total={5} />
        </Row>
      </Demo>

      <Demo title="Stepper" description="Progress through a multi-step flow, horizontal and vertical.">
        <Row label="horizontal">
          <ClickableStepper />
        </Row>
        <Row label="vertical, sm, gray">
          <Stepper active={1} color="gray" orientation="vertical" size="sm">
            <Stepper.Step description="Connect your repository" label="Source" />
            <Stepper.Step description="Configure build settings" label="Build" />
            <Stepper.Step description="Ship to production" label="Deploy" />
          </Stepper>
        </Row>
      </Demo>

      <Demo title="Tabs" description="Default, outline and pills variants, plus a vertical layout with icons." radix="Tabs">
        <Row label="default" radix={<RadixTabs />}>
          <Tabs defaultValue="overview">{tabsBody()}</Tabs>
        </Row>
        <Row label="color gray" radix={<RadixTabs color="gray" />}>
          <Tabs color="gray" defaultValue="overview">
            {tabsBody()}
          </Tabs>
        </Row>
        <Row label="outline">
          <Tabs defaultValue="overview" variant="outline">
            {tabsBody()}
          </Tabs>
        </Row>
        <Row label="pills">
          <Tabs defaultValue="overview" variant="pills">
            {tabsBody()}
          </Tabs>
        </Row>
        <Row label="vertical">
          <Tabs defaultValue="overview" orientation="vertical">
            {tabsBody(true)}
          </Tabs>
        </Row>
        <Row label="vertical pills, gray">
          <Tabs color="gray" defaultValue="overview" orientation="vertical" variant="pills">
            {tabsBody(true)}
          </Tabs>
        </Row>
      </Demo>

      <Demo title="TableOfContents" description="In-page headings with scroll spy.">
        {(['light', 'filled', 'none'] as const).map((variant) => (
          <Row key={variant} label={variant}>
            <TableOfContents
              getControlProps={({ data }) => ({ component: 'a', href: `#${data.id}`, children: data.value })}
              initialData={toc}
              maw={260}
              scrollSpyOptions={{ selector: '[id^="section-"] > h2' }}
              variant={variant}
            />
          </Row>
        ))}
      </Demo>

      <Demo title="Tree" description="Expandable file tree.">
        <Row label="default">
          <Tree data={fileTree} />
        </Row>
        <Row label="with lines">
          <Tree data={fileTree} withLines />
        </Row>
      </Demo>

      <Demo title="Menubar" description="Application-style menu bar with dropdowns.">
        <Row label="default">
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
        </Row>
      </Demo>

      <Demo title="Toolbar" description="Grouped formatting controls with toggles and separators.">
        <Row label="with border">
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
        </Row>
        <Row label="filled, sm, gray">
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
        </Row>
      </Demo>
    </Section>
  )
}
