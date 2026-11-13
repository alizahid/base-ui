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

import * as RT from '@radix-ui/themes'
import { Demo, Row, Section } from '../demo'

const shadows = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const tabs = ['Overview', 'Analytics', 'Reports', 'Settings']

const box = (label: string) => (
  <Paper key={label} p="sm" withBorder>
    <Text size="sm">{label}</Text>
  </Paper>
)

/** The same bordered box, built with Radix Themes. */
const rbox = (label: string) => (
  <RT.Card key={label} size="1">
    <RT.Text as="div" size="2">
      {label}
    </RT.Text>
  </RT.Card>
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
      <Demo title="Paper" description="Surfaces with shadows and borders." radix="Card">
        {shadows.map((shadow) => (
          <Row key={shadow} label={`shadow ${shadow}`}>
            <Paper p="md" shadow={shadow} maw={240}>
              <Text size="sm">Shadow {shadow}</Text>
            </Paper>
          </Row>
        ))}
        <Row
          label="with border / surface"
          radix={
            <RT.Card size="2" style={{ maxWidth: 240 }}>
              <RT.Text as="div" size="2">
                With border
              </RT.Text>
            </RT.Card>
          }
        >
          <Paper p="md" withBorder maw={240}>
            <Text size="sm">With border</Text>
          </Paper>
        </Row>
      </Demo>

      <Demo title="Divider" description="Variants, orientations and labels." radix="Separator">
        <Row label="solid" radix={<RT.Separator size="4" />}>
          <Divider />
        </Row>
        <Row label="dashed">
          <Divider variant="dashed" />
        </Row>
        <Row label="dotted">
          <Divider variant="dotted" />
        </Row>
        <Row label="label center">
          <Divider label="Or continue with" labelPosition="center" />
        </Row>
        <Row label="label left, size md">
          <Divider label="Section" labelPosition="left" size="md" />
        </Row>
        <Row
          label="vertical"
          radix={
            <RT.Flex align="center" gap="4" height="30px">
              <RT.Text size="2">Left</RT.Text>
              <RT.Separator orientation="vertical" size="4" />
              <RT.Text size="2">Right</RT.Text>
            </RT.Flex>
          }
        >
          <Group h={30}>
            <Text size="sm">Left</Text>
            <Divider orientation="vertical" />
            <Text size="sm">Right</Text>
          </Group>
        </Row>
      </Demo>

      <Demo title="Container" description="Centered content with max width sizes." radix="Container">
        {(
          [
            ['xs', '1'],
            ['sm', '2'],
            ['md', '3'],
          ] as const
        ).map(([size, r]) => (
          <Row key={size} label={`size ${size} / ${r}`} radix={<RT.Container size={r}>{rbox(`Container ${r}`)}</RT.Container>}>
            <Container size={size} w="100%">
              {box(`Container ${size}`)}
            </Container>
          </Row>
        ))}
      </Demo>

      <Demo title="Center" description="Centers its content.">
        <Row>
          <Center h={100}>
            <Paper p="sm" withBorder>
              <Text size="sm">Centered</Text>
            </Paper>
          </Center>
        </Row>
      </Demo>

      <Demo title="AspectRatio" description="16:9 and 1:1 ratios." radix="AspectRatio">
        <Row
          label="16 / 9"
          radix={
            <RT.Box width="240px">
              <RT.AspectRatio ratio={16 / 9}>
                <RT.Flex align="center" justify="center" height="100%" style={{ background: 'var(--gray-a2)' }}>
                  <RT.Text size="2">16 / 9</RT.Text>
                </RT.Flex>
              </RT.AspectRatio>
            </RT.Box>
          }
        >
          <AspectRatio ratio={16 / 9} w={240}>
            <Box bg="var(--mantine-color-default-hover)">
              <Center h="100%">
                <Text size="sm">16 / 9</Text>
              </Center>
            </Box>
          </AspectRatio>
        </Row>
        <Row
          label="1 / 1"
          radix={
            <RT.Box width="120px">
              <RT.AspectRatio ratio={1}>
                <RT.Flex align="center" justify="center" height="100%" style={{ background: 'var(--gray-a2)' }}>
                  <RT.Text size="2">1 / 1</RT.Text>
                </RT.Flex>
              </RT.AspectRatio>
            </RT.Box>
          }
        >
          <AspectRatio ratio={1} w={120}>
            <Box bg="var(--mantine-color-default-hover)">
              <Center h="100%">
                <Text size="sm">1 / 1</Text>
              </Center>
            </Box>
          </AspectRatio>
        </Row>
      </Demo>

      <Demo title="Flex" description="Responsive flex container." radix="Flex">
        <Row
          label="space between"
          radix={
            <RT.Flex direction={{ initial: 'column', sm: 'row' }} gap="3" justify="between">
              {['Draft', 'Review', 'Published'].map(rbox)}
            </RT.Flex>
          }
        >
          <Flex direction={{ base: 'column', sm: 'row' }} gap="sm" justify="space-between">
            {['Draft', 'Review', 'Published'].map(box)}
          </Flex>
        </Row>
      </Demo>

      <Demo title="Grid" description="12-column grid with spans." radix="Grid">
        <Row
          label="12 columns"
          radix={
            <RT.Grid columns="12" gap="4">
              {[8, 4, 4, 4, 4].map((span, index) => (
                <RT.Box key={index} gridColumn={`span ${span}`}>
                  {rbox(`span ${span}`)}
                </RT.Box>
              ))}
            </RT.Grid>
          }
        >
          <Grid>
            <Grid.Col span={8}>{box('span 8')}</Grid.Col>
            <Grid.Col span={4}>{box('span 4')}</Grid.Col>
            <Grid.Col span={4}>{box('span 4')}</Grid.Col>
            <Grid.Col span={4}>{box('span 4')}</Grid.Col>
            <Grid.Col span={4}>{box('span 4')}</Grid.Col>
          </Grid>
        </Row>
      </Demo>

      <Demo title="SimpleGrid" description="Equal columns that respond to width." radix="Grid">
        <Row
          label="responsive columns"
          radix={
            <RT.Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="4">
              {['One', 'Two', 'Three', 'Four'].map(rbox)}
            </RT.Grid>
          }
        >
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>{['One', 'Two', 'Three', 'Four'].map(box)}</SimpleGrid>
        </Row>
      </Demo>

      <Demo title="Group" description="Horizontal layout with spacing and justify." radix="Flex">
        <Row
          label="space between"
          radix={
            <RT.Flex justify="between" align="center" gap="4" wrap="wrap">
              {['Back', 'Save draft', 'Publish'].map(rbox)}
            </RT.Flex>
          }
        >
          <Group justify="space-between">{['Back', 'Save draft', 'Publish'].map(box)}</Group>
        </Row>
      </Demo>

      <Demo title="Stack" description="Vertical layout with gap." radix="Flex">
        <Row
          label="gap xs / 2"
          radix={
            <RT.Flex direction="column" gap="2" maxWidth="260px">
              {['First', 'Second', 'Third'].map(rbox)}
            </RT.Flex>
          }
        >
          <Stack gap="xs" maw={260}>
            {['First', 'Second', 'Third'].map(box)}
          </Stack>
        </Row>
      </Demo>

      <Demo title="Space" description="Empty spacing between elements.">
        <Row>
          <Group gap={0}>
            {box('Left')}
            <Space w="xl" />
            {box('Right')}
          </Group>
        </Row>
      </Demo>

      <Demo title="ScrollArea" description="Scrollable list with styled scrollbars." radix="ScrollArea">
        <Row
          label="vertical"
          radix={
            <RT.ScrollArea type="always" scrollbars="vertical" style={{ height: 180, maxWidth: 320 }}>
              <RT.Flex direction="column" gap="2" p="2" pr="4">
                {Array.from({ length: 20 }, (_, index) => rbox(`Notification ${index + 1}`))}
              </RT.Flex>
            </RT.ScrollArea>
          }
        >
          <ScrollArea h={180} maw={320} offsetScrollbars scrollbars="y" type="always">
            <Stack gap="xs" p="xs">
              {Array.from({ length: 20 }, (_, index) => box(`Notification ${index + 1}`))}
            </Stack>
          </ScrollArea>
        </Row>
      </Demo>

      <Demo title="Scroller" description="Horizontal scrolling row with edge controls.">
        <Row>
          <Scroller maw={420}>
            {['Home', 'Projects', 'Tasks', 'Calendar', 'Messages', 'Files', 'Reports', 'Billing', 'Settings'].map((item) => (
              <Paper key={item} px="md" py="xs" style={{ flexShrink: 0 }} withBorder>
                <Text size="sm">{item}</Text>
              </Paper>
            ))}
          </Scroller>
        </Row>
      </Demo>

      <Demo title="Splitter" description="Resizable panes.">
        <Row>
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
        </Row>
      </Demo>

      <Demo title="Collapse" description="Animated show and hide.">
        <Row>
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
        </Row>
      </Demo>

      <Demo title="Transition" description="Mount and unmount with a transition.">
        <Row>
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
        </Row>
      </Demo>

      <Demo title="FloatingIndicator" description="Segmented tab bar with a sliding indicator.">
        <Row>
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
        </Row>
      </Demo>

      <Demo title="FocusTrap" description="Keeps tab focus inside while active.">
        <Row>
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
        </Row>
      </Demo>

      <Demo title="VisuallyHidden" description="Hidden visually, available to screen readers." radix="VisuallyHidden">
        <Row
          radix={
            <RT.Button>
              Save
              <RT.VisuallyHidden>changes to your profile</RT.VisuallyHidden>
            </RT.Button>
          }
        >
          <Button>
            Save
            <VisuallyHidden>changes to your profile</VisuallyHidden>
          </Button>
        </Row>
      </Demo>

      <Demo title="Portal" description="Renders children outside the DOM tree, here at the end of the body.">
        <Row>
          <Portal>
            <VisuallyHidden>Portal content rendered into document.body</VisuallyHidden>
          </Portal>
          <Text size="sm">A visually hidden note is portaled into the document body.</Text>
        </Row>
      </Demo>

      <Demo title="Box" description="The base primitive with style props." radix="Box">
        <Row
          radix={
            <RT.Box p="4" style={{ background: 'var(--gray-a2)' }}>
              <RT.Text as="div" size="2">
                A Box with padding and a themed background.
              </RT.Text>
            </RT.Box>
          }
        >
          <Box bg="var(--mantine-color-default-hover)" p="md">
            <Text size="sm">A Box with padding and a themed background.</Text>
          </Box>
        </Row>
      </Demo>
    </Section>
  )
}
