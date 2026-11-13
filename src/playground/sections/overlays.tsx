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

import { Demo, Section } from '../demo'

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

  return (
    <Section title="Overlays">
      <Demo title="Modal" description="Default, centered with a form, and full screen.">
        <Group>
          <Button onClick={modalHandlers.open}>Open modal</Button>
          <Button onClick={centeredHandlers.open} variant="default">
            Centered form
          </Button>
          <Button onClick={fullHandlers.open} variant="light">
            Full screen
          </Button>
        </Group>
        <Modal onClose={modalHandlers.close} opened={modal} title="Delete project">
          <Text>This permanently removes the project and its 14 deployments. This cannot be undone.</Text>
          <Group justify="flex-end" mt="lg">
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
        <Group>
          {positions.map((position) => (
            <Button key={position} onClick={() => setDrawer(position)} variant="default">
              {position}
            </Button>
          ))}
        </Group>
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
        <Button onClick={dialogHandlers.toggle}>{dialog ? 'Hide dialog' : 'Show dialog'}</Button>
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

      <Demo title="Popover" description="Anchored panel with a small form, and one with an arrow.">
        <Group>
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
          <Popover withArrow>
            <Popover.Target>
              <Button variant="light">With arrow</Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="sm">Changes sync across all your devices.</Text>
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Demo>

      <Demo title="HoverCard" description="Profile preview shown on hover.">
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
      </Demo>

      <Demo title="Tooltip" description="Positions, arrow, group and floating variants.">
        <Stack>
          <Group>
            {positions.map((position) => (
              <Tooltip key={position} label={`Tooltip ${position}`} opened position={position} withArrow>
                <Button variant="default">{position}</Button>
              </Tooltip>
            ))}
          </Group>
          <Group>
            <Tooltip.Group closeDelay={100} openDelay={200}>
              <Tooltip label="Copy link">
                <Button leftSection={<CopyIcon />} variant="default">
                  Copy
                </Button>
              </Tooltip>
              <Tooltip label="Download file">
                <Button leftSection={<DownloadIcon />} variant="default">
                  Download
                </Button>
              </Tooltip>
              <Tooltip label="Share with team">
                <Button leftSection={<Share1Icon />} variant="default">
                  Share
                </Button>
              </Tooltip>
            </Tooltip.Group>
          </Group>
          <Tooltip.Floating label="Follows your cursor">
            <Box p="xl" bd="1px dashed gray" ta="center">
              Hover this area
            </Box>
          </Tooltip.Floating>
        </Stack>
      </Demo>

      <Demo title="Menu" description="Labels, icons, shortcuts, submenu, checkboxes and radios.">
        <Group>
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

          <Menu shadow="md" width={220}>
            <Menu.Target>
              <Button variant="default">View options</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Columns</Menu.Label>
              <Menu.CheckboxGroup defaultValue={['name', 'status']}>
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
        </Group>
      </Demo>

      <Demo title="Overlay" description="Dimmed layer over content, with blur.">
        <Stack>
          <Button onClick={overlayHandlers.toggle} w="fit-content">
            {overlay ? 'Hide overlay' : 'Show overlay'}
          </Button>
          <Box h={140} pos="relative">
            <Text>Dashboard content sits underneath the overlay.</Text>
            {overlay && <Overlay backgroundOpacity={0.5} blur={2} />}
          </Box>
        </Stack>
      </Demo>

      <Demo title="LoadingOverlay" description="Spinner overlay while a section loads.">
        <Stack>
          <Button onClick={loadingHandlers.toggle} w="fit-content">
            {loading ? 'Stop loading' : 'Start loading'}
          </Button>
          <Box h={140} pos="relative">
            <Text>Billing history is refreshing.</Text>
            <LoadingOverlay overlayProps={{ blur: 2 }} visible={loading} />
          </Box>
        </Stack>
      </Demo>

      <Demo title="Affix" description="Element pinned to the viewport corner.">
        <Button onClick={affixHandlers.toggle}>{affix ? 'Hide affix' : 'Show affix'}</Button>
        {affix && (
          <Affix position={{ bottom: 20, right: 20 }}>
            <Button onClick={affixHandlers.close}>Back to top</Button>
          </Affix>
        )}
      </Demo>

      <Demo title="ActionBar" description="Bulk-action bar shown while items are selected.">
        <Button onClick={barHandlers.toggle}>{bar ? 'Clear selection' : 'Select 3 files'}</Button>
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
        <Button onClick={winHandlers.toggle}>{win ? 'Close window' : 'Open window'}</Button>
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
        <Stack>
          <Button onClick={tourHandlers.open} w="fit-content">
            Start tour
          </Button>
          <Group>
            <Button id="tour-search" variant="default">
              Search
            </Button>
            <Button id="tour-create" leftSection={<Pencil1Icon />}>
              New project
            </Button>
            <Button id="tour-settings" leftSection={<GearIcon />} variant="light">
              Settings
            </Button>
          </Group>
        </Stack>
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
