import {
  ActionBar,
  Affix,
  Avatar,
  Box,
  Button,
  Dialog,
  Drawer,
  FloatingWindow,
  Group,
  HoverCard,
  Kbd,
  LoadingOverlay,
  Menu,
  Modal,
  Overlay,
  Popover,
  Stack,
  Text,
  TextInput,
  Tooltip,
  Tour,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  ArchiveIcon,
  CopyIcon,
  DownloadIcon,
  GearIcon,
  Pencil1Icon,
  PersonIcon,
  Share1Icon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { useState } from 'react'

import * as RT from '@radix-ui/themes'

import { Demo, Row, Section } from '../demo'

const positions = ['top', 'right', 'bottom', 'left'] as const

export function OverlaysSection() {
  const [modal, modalHandlers] = useDisclosure()
  const [centered, centeredHandlers] = useDisclosure()
  const [full, fullHandlers] = useDisclosure()
  const [drawer, setDrawer] = useState<(typeof positions)[number] | null>(null)
  const [dialog, dialogHandlers] = useDisclosure()
  const [overlay, overlayHandlers] = useDisclosure()
  const [loading, loadingHandlers] = useDisclosure()
  const [affix, affixHandlers] = useDisclosure()
  const [bar, barHandlers] = useDisclosure()
  const [win, winHandlers] = useDisclosure()
  const [tour, tourHandlers] = useDisclosure()
  const [view, setView] = useState('list')
  const [columns, setColumns] = useState(['name', 'status'])

  return (
    <Section title="Overlays">
      <Demo title="Modal" description="Default, centered with a form, and full screen." radix="Dialog, AlertDialog">
        <Row
          label="confirm / alert dialog"
          radix={
            <RT.AlertDialog.Root>
              <RT.AlertDialog.Trigger>
                <RT.Button>Open modal</RT.Button>
              </RT.AlertDialog.Trigger>
              <RT.AlertDialog.Content maxWidth="450px">
                <RT.AlertDialog.Title>Delete project</RT.AlertDialog.Title>
                <RT.AlertDialog.Description size="2">
                  This permanently removes the project and its 14 deployments. This cannot be undone.
                </RT.AlertDialog.Description>
                <RT.Flex gap="3" justify="end" mt="4">
                  <RT.AlertDialog.Cancel>
                    <RT.Button color="gray" highContrast variant="surface">
                      Cancel
                    </RT.Button>
                  </RT.AlertDialog.Cancel>
                  <RT.AlertDialog.Action>
                    <RT.Button color="red">Delete</RT.Button>
                  </RT.AlertDialog.Action>
                </RT.Flex>
              </RT.AlertDialog.Content>
            </RT.AlertDialog.Root>
          }
        >
          <Button onClick={modalHandlers.open}>Open modal</Button>
        </Row>
        <Row
          label="form / dialog"
          radix={
            <RT.Dialog.Root>
              <RT.Dialog.Trigger>
                <RT.Button color="gray" highContrast variant="surface">
                  Centered form
                </RT.Button>
              </RT.Dialog.Trigger>
              <RT.Dialog.Content maxWidth="450px">
                <RT.Dialog.Title>Invite teammate</RT.Dialog.Title>
                <RT.Flex direction="column" gap="3">
                  <label>
                    <RT.Text as="div" mb="1" size="2" weight="medium">
                      Email
                    </RT.Text>
                    <RT.TextField.Root placeholder="name@company.com" />
                  </label>
                  <label>
                    <RT.Text as="div" mb="1" size="2" weight="medium">
                      Role
                    </RT.Text>
                    <RT.TextField.Root placeholder="Developer" />
                  </label>
                  <RT.Flex gap="3" justify="end" mt="1">
                    <RT.Dialog.Close>
                      <RT.Button color="gray" highContrast variant="surface">
                        Cancel
                      </RT.Button>
                    </RT.Dialog.Close>
                    <RT.Dialog.Close>
                      <RT.Button>Send invite</RT.Button>
                    </RT.Dialog.Close>
                  </RT.Flex>
                </RT.Flex>
              </RT.Dialog.Content>
            </RT.Dialog.Root>
          }
        >
          <Button onClick={centeredHandlers.open} variant="default">
            Centered form
          </Button>
        </Row>
        <Row label="full screen">
          <Button onClick={fullHandlers.open} variant="light">
            Full screen
          </Button>
        </Row>
        <Modal onClose={modalHandlers.close} opened={modal} title="Delete project">
          <Text size="sm">This permanently removes the project and its 14 deployments. This cannot be undone.</Text>
          <Group justify="flex-end" mt="md">
            <Button onClick={modalHandlers.close} variant="default">
              Cancel
            </Button>
            <Button color="red" onClick={modalHandlers.close}>
              Delete
            </Button>
          </Group>
        </Modal>
        <Modal centered onClose={centeredHandlers.close} opened={centered} title="Invite teammate">
          <Stack>
            <TextInput label="Email" placeholder="name@company.com" />
            <TextInput label="Role" placeholder="Developer" />
            <Group justify="flex-end">
              <Button onClick={centeredHandlers.close} variant="default">
                Cancel
              </Button>
              <Button onClick={centeredHandlers.close}>Send invite</Button>
            </Group>
          </Stack>
        </Modal>
        <Modal fullScreen onClose={fullHandlers.close} opened={full} title="Release notes">
          <Text>Version 2.4 adds dark mode, faster builds and a new billing page.</Text>
        </Modal>
      </Demo>

      <Demo title="Drawer" description="Side panels from each edge.">
        {positions.map((position) => (
          <Row key={position} label={`from ${position}`}>
            <Button onClick={() => setDrawer(position)} variant="default">
              {position}
            </Button>
          </Row>
        ))}
        <Drawer
          onClose={() => setDrawer(null)}
          opened={drawer !== null}
          position={drawer ?? 'right'}
          title="Notifications"
        >
          <Text>You have 3 unread notifications from your team.</Text>
        </Drawer>
      </Demo>

      <Demo title="Dialog" description="Small floating dialog anchored to the corner.">
        <Row label="with close button">
          <Button onClick={dialogHandlers.toggle}>{dialog ? 'Hide dialog' : 'Show dialog'}</Button>
        </Row>
        <Dialog onClose={dialogHandlers.close} opened={dialog} withCloseButton>
          <Text fw={500} mb="xs">
            Subscribe to updates
          </Text>
          <Group>
            <TextInput placeholder="name@company.com" flex={1} />
            <Button onClick={dialogHandlers.close}>Subscribe</Button>
          </Group>
        </Dialog>
      </Demo>

      <Demo title="Popover" description="Anchored panel with a small form, and one with an arrow." radix="Popover">
        <Row
          label="with a form"
          radix={
            <RT.Popover.Root>
              <RT.Popover.Trigger>
                <RT.Button color="gray" highContrast variant="surface">
                  Rename file
                </RT.Button>
              </RT.Popover.Trigger>
              <RT.Popover.Content align="center" width="280px">
                <RT.Flex direction="column" gap="2">
                  <label>
                    <RT.Text as="div" mb="1" size="2" weight="medium">
                      Name
                    </RT.Text>
                    <RT.TextField.Root defaultValue="quarterly-report.pdf" />
                  </label>
                  <RT.Popover.Close>
                    <RT.Button size="1">Save</RT.Button>
                  </RT.Popover.Close>
                </RT.Flex>
              </RT.Popover.Content>
            </RT.Popover.Root>
          }
        >
          <Popover position="bottom" shadow="md" width={280}>
            <Popover.Target>
              <Button variant="default">Rename file</Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Stack gap="xs">
                <TextInput label="Name" defaultValue="quarterly-report.pdf" />
                <Button size="xs">Save</Button>
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Row>
        <Row
          label="text, with arrow"
          radix={
            <RT.Popover.Root>
              <RT.Popover.Trigger>
                <RT.Button variant="soft">With arrow</RT.Button>
              </RT.Popover.Trigger>
              <RT.Popover.Content align="center">
                <RT.Text size="2">Changes sync across all your devices.</RT.Text>
              </RT.Popover.Content>
            </RT.Popover.Root>
          }
        >
          <Popover withArrow>
            <Popover.Target>
              <Button variant="light">With arrow</Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="sm">Changes sync across all your devices.</Text>
            </Popover.Dropdown>
          </Popover>
        </Row>
      </Demo>

      <Demo title="HoverCard" description="Profile preview shown on hover." radix="HoverCard">
        <Row
          label="profile preview"
          radix={
            <RT.HoverCard.Root>
              <RT.HoverCard.Trigger>
                <RT.Button variant="ghost">@maya.chen</RT.Button>
              </RT.HoverCard.Trigger>
              <RT.HoverCard.Content align="center" width="280px">
                <RT.Flex gap="3">
                  <RT.Avatar fallback="MC" />
                  <div>
                    <RT.Text as="div" weight="medium">
                      Maya Chen
                    </RT.Text>
                    <RT.Text as="div" color="gray" size="2">
                      Product designer at Northwind. Building design systems.
                    </RT.Text>
                  </div>
                </RT.Flex>
              </RT.HoverCard.Content>
            </RT.HoverCard.Root>
          }
        >
          <HoverCard width={280} shadow="md" withArrow>
            <HoverCard.Target>
              <Button variant="subtle">@maya.chen</Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Group wrap="nowrap">
                <Avatar>MC</Avatar>
                <div>
                  <Text fw={500}>Maya Chen</Text>
                  <Text c="dimmed" size="sm">
                    Product designer at Northwind. Building design systems.
                  </Text>
                </div>
              </Group>
            </HoverCard.Dropdown>
          </HoverCard>
        </Row>
      </Demo>

      <Demo title="Tooltip" description="Positions, arrow, group and floating variants." radix="Tooltip">
        {positions.map((position) => (
          <Row
            key={position}
            label={`${position}, always open`}
            radix={
              <RT.Box pl="110px" py="5">
                <RT.Tooltip content={`Tooltip ${position}`} open side={position}>
                  <RT.Button color="gray" highContrast variant="surface">
                    {position}
                  </RT.Button>
                </RT.Tooltip>
              </RT.Box>
            }
          >
            <Box pl={110} py={24}>
              <Tooltip label={`Tooltip ${position}`} opened position={position} withArrow>
                <Button variant="default">{position}</Button>
              </Tooltip>
            </Box>
          </Row>
        ))}
        <Tooltip.Group closeDelay={100} openDelay={200}>
          {(
            [
              ['Copy', 'Copy link', <CopyIcon key="i" />],
              ['Download', 'Download file', <DownloadIcon key="i" />],
              ['Share', 'Share with team', <Share1Icon key="i" />],
            ] as const
          ).map(([text, tip, icon]) => (
            <Row
              key={text}
              label="on hover, grouped"
              radix={
                <RT.Tooltip content={tip}>
                  <RT.Button color="gray" highContrast variant="surface">
                    {icon}
                    {text}
                  </RT.Button>
                </RT.Tooltip>
              }
            >
              <Tooltip label={tip}>
                <Button leftSection={icon} variant="default">
                  {text}
                </Button>
              </Tooltip>
            </Row>
          ))}
        </Tooltip.Group>
        <Row label="floating">
          <Tooltip.Floating label="Follows your cursor">
            <Box p="xl" bd="1px dashed gray" maw={420} ta="center">
              Hover this area
            </Box>
          </Tooltip.Floating>
        </Row>
      </Demo>

      <Demo title="Menu" description="Labels, icons, shortcuts, submenu, checkboxes and radios." radix="DropdownMenu">
        <Row
          label="items, submenu, danger"
          radix={
            <RT.DropdownMenu.Root>
              <RT.DropdownMenu.Trigger>
                <RT.Button>Actions</RT.Button>
              </RT.DropdownMenu.Trigger>
              <RT.DropdownMenu.Content align="center" style={{ width: 220 }}>
                <RT.DropdownMenu.Label>Application</RT.DropdownMenu.Label>
                <RT.DropdownMenu.Item shortcut="⌘,">
                  <RT.Flex align="center" gap="2">
                    <GearIcon /> Settings
                  </RT.Flex>
                </RT.DropdownMenu.Item>
                <RT.DropdownMenu.Item>
                  <RT.Flex align="center" gap="2">
                    <PersonIcon /> Profile
                  </RT.Flex>
                </RT.DropdownMenu.Item>
                <RT.DropdownMenu.Item disabled>
                  <RT.Flex align="center" gap="2">
                    <ArchiveIcon /> Archive (disabled)
                  </RT.Flex>
                </RT.DropdownMenu.Item>
                <RT.DropdownMenu.Sub>
                  <RT.DropdownMenu.SubTrigger>
                    <RT.Flex align="center" gap="2">
                      <Share1Icon /> Share
                    </RT.Flex>
                  </RT.DropdownMenu.SubTrigger>
                  <RT.DropdownMenu.SubContent>
                    <RT.DropdownMenu.Item>Email</RT.DropdownMenu.Item>
                    <RT.DropdownMenu.Item>Copy link</RT.DropdownMenu.Item>
                  </RT.DropdownMenu.SubContent>
                </RT.DropdownMenu.Sub>
                <RT.DropdownMenu.Separator />
                <RT.DropdownMenu.Label>Danger zone</RT.DropdownMenu.Label>
                <RT.DropdownMenu.Item color="red">
                  <RT.Flex align="center" gap="2">
                    <TrashIcon /> Delete
                  </RT.Flex>
                </RT.DropdownMenu.Item>
              </RT.DropdownMenu.Content>
            </RT.DropdownMenu.Root>
          }
        >
          <Menu shadow="md" width={220}>
            <Menu.Target>
              <Button>Actions</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item leftSection={<GearIcon />} rightSection={<Kbd>⌘,</Kbd>}>
                Settings
              </Menu.Item>
              <Menu.Item leftSection={<PersonIcon />}>Profile</Menu.Item>
              <Menu.Item disabled leftSection={<ArchiveIcon />}>
                Archive (disabled)
              </Menu.Item>
              <Menu.Sub>
                <Menu.Sub.Target>
                  <Menu.Sub.Item leftSection={<Share1Icon />}>Share</Menu.Sub.Item>
                </Menu.Sub.Target>
                <Menu.Sub.Dropdown>
                  <Menu.Item>Email</Menu.Item>
                  <Menu.Item>Copy link</Menu.Item>
                </Menu.Sub.Dropdown>
              </Menu.Sub>
              <Menu.Divider />
              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item color="red" leftSection={<TrashIcon />}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Row>
        <Row
          label="checkbox and radio items"
          radix={
            <RT.DropdownMenu.Root>
              <RT.DropdownMenu.Trigger>
                <RT.Button color="gray" highContrast variant="surface">
                  View options
                </RT.Button>
              </RT.DropdownMenu.Trigger>
              <RT.DropdownMenu.Content align="center" style={{ width: 220 }}>
                <RT.DropdownMenu.Label>Columns</RT.DropdownMenu.Label>
                {(['name', 'status', 'owner'] as const).map((column) => (
                  <RT.DropdownMenu.CheckboxItem
                    checked={columns.includes(column)}
                    key={column}
                    onCheckedChange={(on) => setColumns((c) => (on ? [...c, column] : c.filter((x) => x !== column)))}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {column[0].toUpperCase() + column.slice(1)}
                  </RT.DropdownMenu.CheckboxItem>
                ))}
                <RT.DropdownMenu.Separator />
                <RT.DropdownMenu.Label>Layout</RT.DropdownMenu.Label>
                <RT.DropdownMenu.RadioGroup onValueChange={setView} value={view}>
                  <RT.DropdownMenu.RadioItem value="list">List</RT.DropdownMenu.RadioItem>
                  <RT.DropdownMenu.RadioItem value="grid">Grid</RT.DropdownMenu.RadioItem>
                </RT.DropdownMenu.RadioGroup>
              </RT.DropdownMenu.Content>
            </RT.DropdownMenu.Root>
          }
        >
          <Menu shadow="md" width={220}>
            <Menu.Target>
              <Button variant="default">View options</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Columns</Menu.Label>
              <Menu.CheckboxGroup onChange={setColumns} value={columns}>
                <Menu.CheckboxItem value="name">Name</Menu.CheckboxItem>
                <Menu.CheckboxItem value="status">Status</Menu.CheckboxItem>
                <Menu.CheckboxItem value="owner">Owner</Menu.CheckboxItem>
              </Menu.CheckboxGroup>
              <Menu.Divider />
              <Menu.Label>Layout</Menu.Label>
              <Menu.RadioGroup onChange={setView} value={view}>
                <Menu.RadioItem value="list">List</Menu.RadioItem>
                <Menu.RadioItem value="grid">Grid</Menu.RadioItem>
              </Menu.RadioGroup>
            </Menu.Dropdown>
          </Menu>
        </Row>
      </Demo>

      <Demo title="Overlay" description="Dimmed layer over content, with blur.">
        <Row label="toggle">
          <Button onClick={overlayHandlers.toggle}>{overlay ? 'Hide overlay' : 'Show overlay'}</Button>
        </Row>
        <Row label="with blur">
          <Box h={140} maw={420} pos="relative">
            <Text>Dashboard content sits underneath the overlay.</Text>
            {overlay && <Overlay backgroundOpacity={0.5} blur={2} />}
          </Box>
        </Row>
      </Demo>

      <Demo title="LoadingOverlay" description="Spinner overlay while a section loads.">
        <Row label="toggle">
          <Button onClick={loadingHandlers.toggle}>{loading ? 'Stop loading' : 'Start loading'}</Button>
        </Row>
        <Row label="with blur">
          <Box h={140} maw={420} pos="relative">
            <Text>Billing history is refreshing.</Text>
            <LoadingOverlay overlayProps={{ blur: 2 }} visible={loading} />
          </Box>
        </Row>
      </Demo>

      <Demo title="Affix" description="Element pinned to the viewport corner.">
        <Row label="bottom right">
          <Button onClick={affixHandlers.toggle}>{affix ? 'Hide affix' : 'Show affix'}</Button>
        </Row>
        {affix && (
          <Affix position={{ bottom: 20, right: 20 }}>
            <Button onClick={affixHandlers.close}>Back to top</Button>
          </Affix>
        )}
      </Demo>

      <Demo title="ActionBar" description="Bulk-action bar shown while items are selected.">
        <Row label="with actions">
          <Button onClick={barHandlers.toggle}>{bar ? 'Clear selection' : 'Select 3 files'}</Button>
        </Row>
        <ActionBar onClose={barHandlers.close} opened={bar}>
          <Text size="sm">3 files selected</Text>
          <ActionBar.Divider />
          <Button leftSection={<DownloadIcon />} size="xs" variant="subtle">
            Download
          </Button>
          <Button leftSection={<ArchiveIcon />} size="xs" variant="subtle">
            Archive
          </Button>
          <Button color="red" leftSection={<TrashIcon />} size="xs" variant="subtle">
            Delete
          </Button>
          <ActionBar.CloseButton onClick={barHandlers.close} />
        </ActionBar>
      </Demo>

      <Demo title="FloatingWindow" description="Draggable window, for example a notes scratchpad.">
        <Row label="draggable">
          <Button onClick={winHandlers.toggle}>{win ? 'Close window' : 'Open window'}</Button>
        </Row>
        {win && (
          <FloatingWindow initialPosition={{ top: 120, right: 40 }} p="md" shadow="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>Scratchpad</Text>
              <Button onClick={winHandlers.close} size="compact-xs" variant="subtle">
                Close
              </Button>
            </Group>
            <Text size="sm">Drag me around. Jot down ideas for the next sprint.</Text>
          </FloatingWindow>
        )}
      </Demo>

      <Demo title="Tour" description="Three-step product tour over elements in this demo.">
        <Row label="start">
          <Button onClick={tourHandlers.open}>Start tour</Button>
        </Row>
        <Row label="step 1 target">
          <Button id="tour-search" variant="default">
            Search
          </Button>
        </Row>
        <Row label="step 2 target">
          <Button id="tour-create" leftSection={<Pencil1Icon />}>
            New project
          </Button>
        </Row>
        <Row label="step 3 target">
          <Button id="tour-settings" leftSection={<GearIcon />} variant="light">
            Settings
          </Button>
        </Row>
        <Tour active={tour} onClose={tourHandlers.close}>
          <Tour.Step target="#tour-search" title="Find anything">
            Search across projects, files and teammates.
          </Tour.Step>
          <Tour.Step target="#tour-create" title="Start something new">
            Create a project from a template in seconds.
          </Tour.Step>
          <Tour.Step target="#tour-settings" title="Make it yours">
            Tune notifications and workspace preferences here.
          </Tour.Step>
        </Tour>
      </Demo>
    </Section>
  )
}
