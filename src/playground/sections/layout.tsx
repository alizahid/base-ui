import {
  AspectRatio,
  Box,
  Button,
  Center,
  Collapse,
  Container,
  Divider,
  FloatingIndicator,
  FocusTrap,
  Flex,
  Grid,
  Group,
  Paper,
  Portal,
  ScrollArea,
  Scroller,
  SimpleGrid,
  Space,
  Splitter,
  Stack,
  Text,
  TextInput,
  Transition,
  UnstyledButton,
  VisuallyHidden,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

import { Demo, Section } from '../demo'

const shadows = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const tabs = ['Overview', 'Analytics', 'Reports', 'Settings']

const box = (label: string) => (
  <Paper key={label} p="sm" withBorder>
    <Text size="sm">{label}</Text>
  </Paper>
)

export function LayoutSection() {
  const [collapsed, { toggle: toggleCollapse }] = useDisclosure(false)
  const [mounted, { toggle: toggleMounted }] = useDisclosure(true)
  const [trapped, { toggle: toggleTrap }] = useDisclosure(false)
  const [root, setRoot] = useState<HTMLDivElement | null>(null)
  const [refs, setRefs] = useState<Record<string, HTMLButtonElement | null>>({})
  const [active, setActive] = useState('Overview')

  return (
    <Section title="Layout & misc">
      <Demo title="Paper" description="Surfaces with shadows and borders.">
        <SimpleGrid cols={{ base: 2, sm: 3 }}>
          {shadows.map((shadow) => (
            <Paper key={shadow} p="md" shadow={shadow}>
              <Text size="sm">Shadow {shadow}</Text>
            </Paper>
          ))}
          <Paper p="md" withBorder>
            <Text size="sm">With border</Text>
          </Paper>
        </SimpleGrid>
      </Demo>

      <Demo title="Divider" description="Variants, orientations and labels.">
        <Stack>
          <Divider />
          <Divider variant="dashed" />
          <Divider variant="dotted" />
          <Divider label="Or continue with" labelPosition="center" />
          <Divider label="Section" labelPosition="left" size="md" />
          <Group h={30}>
            <Text size="sm">Left</Text>
            <Divider orientation="vertical" />
            <Text size="sm">Right</Text>
          </Group>
        </Stack>
      </Demo>

      <Demo title="Container" description="Centered content with max width sizes.">
        <Stack>
          {(['xs', 'sm', 'md'] as const).map((size) => (
            <Container key={size} size={size} w="100%">
              {box(`Container ${size}`)}
            </Container>
          ))}
        </Stack>
      </Demo>

      <Demo title="Center" description="Centers its content.">
        <Center h={100}>
          <Paper p="sm" withBorder>
            <Text size="sm">Centered</Text>
          </Paper>
        </Center>
      </Demo>

      <Demo title="AspectRatio" description="16:9 and 1:1 ratios.">
        <Group align="flex-start">
          <AspectRatio ratio={16 / 9} w={240}>
            <Box bg="var(--mantine-color-default-hover)">
              <Center h="100%">
                <Text size="sm">16 / 9</Text>
              </Center>
            </Box>
          </AspectRatio>
          <AspectRatio ratio={1} w={120}>
            <Box bg="var(--mantine-color-default-hover)">
              <Center h="100%">
                <Text size="sm">1 / 1</Text>
              </Center>
            </Box>
          </AspectRatio>
        </Group>
      </Demo>

      <Demo title="Flex" description="Responsive flex container.">
        <Flex direction={{ base: 'column', sm: 'row' }} gap="sm" justify="space-between">
          {['Draft', 'Review', 'Published'].map(box)}
        </Flex>
      </Demo>

      <Demo title="Grid" description="12-column grid with spans.">
        <Grid>
          <Grid.Col span={8}>{box('span 8')}</Grid.Col>
          <Grid.Col span={4}>{box('span 4')}</Grid.Col>
          <Grid.Col span={4}>{box('span 4')}</Grid.Col>
          <Grid.Col span={4}>{box('span 4')}</Grid.Col>
          <Grid.Col span={4}>{box('span 4')}</Grid.Col>
        </Grid>
      </Demo>

      <Demo title="SimpleGrid" description="Equal columns that respond to width.">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>{['One', 'Two', 'Three', 'Four'].map(box)}</SimpleGrid>
      </Demo>

      <Demo title="Group" description="Horizontal layout with spacing and justify.">
        <Group justify="space-between">
          {['Back', 'Save draft', 'Publish'].map(box)}
        </Group>
      </Demo>

      <Demo title="Stack" description="Vertical layout with gap.">
        <Stack gap="xs" maw={260}>
          {['First', 'Second', 'Third'].map(box)}
        </Stack>
      </Demo>

      <Demo title="Space" description="Empty spacing between elements.">
        <Group gap={0}>
          {box('Left')}
          <Space w="xl" />
          {box('Right')}
        </Group>
      </Demo>

      <Demo title="ScrollArea" description="Scrollable list with styled scrollbars.">
        <ScrollArea h={180} maw={320} offsetScrollbars scrollbars="y" type="always">
          <Stack gap="xs" p="xs">
            {Array.from({ length: 20 }, (_, index) => box(`Notification ${index + 1}`))}
          </Stack>
        </ScrollArea>
      </Demo>

      <Demo title="Scroller" description="Horizontal scrolling row with edge controls.">
        <Scroller maw={420}>
          {['Home', 'Projects', 'Tasks', 'Calendar', 'Messages', 'Files', 'Reports', 'Billing', 'Settings'].map((item) => (
            <Paper key={item} px="md" py="xs" style={{ flexShrink: 0 }} withBorder>
              <Text size="sm">{item}</Text>
            </Paper>
          ))}
        </Scroller>
      </Demo>

      <Demo title="Splitter" description="Resizable panes.">
        <Splitter h={180}>
          <Splitter.Pane defaultSize={30} min={15}>
            <Center h="100%">
              <Text size="sm">Sidebar</Text>
            </Center>
          </Splitter.Pane>
          <Splitter.Pane defaultSize={70}>
            <Center h="100%">
              <Text size="sm">Content</Text>
            </Center>
          </Splitter.Pane>
        </Splitter>
      </Demo>

      <Demo title="Collapse" description="Animated show and hide.">
        <Stack maw={360}>
          <Button onClick={toggleCollapse} variant="light" w="fit-content">
            {collapsed ? 'Hide' : 'Show'} details
          </Button>
          <Collapse expanded={collapsed}>
            <Paper p="md" withBorder>
              <Text size="sm">Shipping is free on orders over $50 and arrives in 3 to 5 business days.</Text>
            </Paper>
          </Collapse>
        </Stack>
      </Demo>

      <Demo title="Transition" description="Mount and unmount with a transition.">
        <Stack>
          <Button onClick={toggleMounted} variant="light" w="fit-content">
            Toggle
          </Button>
          <Transition duration={250} mounted={mounted} transition="fade-up">
            {(styles) => (
              <Paper p="md" style={styles} w={240} withBorder>
                <Text size="sm">Changes saved</Text>
              </Paper>
            )}
          </Transition>
        </Stack>
      </Demo>

      <Demo title="FloatingIndicator" description="Segmented tab bar with a sliding indicator.">
        <Box display="inline-flex" pos="relative" ref={setRoot}>
          <FloatingIndicator parent={root} target={refs[active]} />
          {tabs.map((tab) => (
            <UnstyledButton
              key={tab}
              onClick={() => setActive(tab)}
              px="md"
              py="xs"
              pos="relative"
              ref={(node) => {
                if (refs[tab] !== node) setRefs((current) => ({ ...current, [tab]: node }))
              }}
              style={{ zIndex: 1 }}
            >
              <Text fw={active === tab ? 600 : 400} size="sm">
                {tab}
              </Text>
            </UnstyledButton>
          ))}
        </Box>
      </Demo>

      <Demo title="FocusTrap" description="Keeps tab focus inside while active.">
        <Stack maw={320}>
          <Button onClick={toggleTrap} variant="light" w="fit-content">
            {trapped ? 'Release focus' : 'Trap focus'}
          </Button>
          <FocusTrap active={trapped}>
            <Stack gap="xs">
              <TextInput label="Email" placeholder="you@company.com" />
              <TextInput label="Name" placeholder="Jane Cooper" />
            </Stack>
          </FocusTrap>
        </Stack>
      </Demo>

      <Demo title="VisuallyHidden" description="Hidden visually, available to screen readers.">
        <Button>
          Save
          <VisuallyHidden>changes to your profile</VisuallyHidden>
        </Button>
      </Demo>

      <Demo title="Portal" description="Renders children outside the DOM tree, here at the end of the body.">
        <Portal>
          <VisuallyHidden>Portal content rendered into document.body</VisuallyHidden>
        </Portal>
        <Text size="sm">A visually hidden note is portaled into the document body.</Text>
      </Demo>

      <Demo title="Box" description="The base primitive with style props.">
        <Box bg="var(--mantine-color-default-hover)" p="md">
          <Text size="sm">A Box with padding and a themed background.</Text>
        </Box>
      </Demo>
    </Section>
  )
}
