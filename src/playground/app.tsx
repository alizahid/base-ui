import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Button,
  CloseButton,
  ColorSwatch,
  Group,
  NavLink,
  Popover,
  ScrollArea,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { MagnifyingGlassIcon, MixerHorizontalIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { accents, autoGray, grays, radii } from '../theme/radix'
import { useSettings } from '../theme/settings'
import { ButtonsSection } from './sections/buttons'
import { ChartsSection } from './sections/charts'
import { ComboboxSection } from './sections/combobox'
import { DataDisplaySection } from './sections/data-display'
import { DatesSection } from './sections/dates'
import { ExtensionsSection } from './sections/extensions'
import { FeedbackSection } from './sections/feedback'
import { InputsSection } from './sections/inputs'
import { LayoutSection } from './sections/layout'
import { NavigationSection } from './sections/navigation'
import { OverlaysSection } from './sections/overlays'
import { TypographySection } from './sections/typography'

type NavItem = { id: string; title: string; demos: { id: string; title: string }[] }

/** The table of contents, read from the rendered sections so it never drifts from them. */
function useNav() {
  const [nav, setNav] = useState<NavItem[]>([])
  useEffect(() => {
    setNav(
      [...document.querySelectorAll<HTMLElement>('[id^="section-"]')].map((section) => ({
        id: section.id,
        title: section.querySelector('h2')?.textContent ?? '',
        demos: [...section.querySelectorAll<HTMLElement>(':scope > [id]')].map((d) => ({
          id: d.id,
          title: d.querySelector('h4')?.textContent ?? d.id,
        })),
      })),
    )
  }, [])
  return nav
}

function ThemePanel() {
  const { accent, gray, radius, set } = useSettings()
  const { colorScheme, setColorScheme } = useMantineColorScheme()
  return (
    <Popover position="bottom-end" width={328}>
      <Popover.Target>
        <Button variant="default" leftSection={<MixerHorizontalIcon />}>
          Theme
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap="md">
          <Stack gap={6}>
            <Text size="xs" fw={500} c="dimmed">
              Accent color
            </Text>
            <SimpleGrid cols={10} spacing={6} verticalSpacing={6}>
              {accents.map((a) => (
                <Tooltip key={a} label={a} withArrow={false}>
                  <ColorSwatch
                    component="button"
                    color={`var(--${a}-9)`}
                    size={20}
                    withShadow={false}
                    aria-label={a}
                    aria-pressed={accent === a}
                    onClick={() => set({ accent: a })}
                    data-swatch
                  />
                </Tooltip>
              ))}
            </SimpleGrid>
          </Stack>
          <Stack gap={6}>
            <Text size="xs" fw={500} c="dimmed">
              Gray color
            </Text>
            <SimpleGrid cols={10} spacing={6}>
              {(['auto', ...grays] as const).map((g) => (
                <Tooltip key={g} label={g === 'auto' ? `auto (${autoGray(accent)})` : g} withArrow={false}>
                  <ColorSwatch
                    component="button"
                    color={`var(--${g === 'auto' ? 'gray' : g === 'gray' ? 'gray' : g}-9)`}
                    size={20}
                    withShadow={false}
                    aria-label={g}
                    aria-pressed={gray === g}
                    onClick={() => set({ gray: g })}
                    data-swatch
                  />
                </Tooltip>
              ))}
            </SimpleGrid>
          </Stack>
          <Stack gap={6}>
            <Text size="xs" fw={500} c="dimmed">
              Radius
            </Text>
            <SegmentedControl
              size="xs"
              fullWidth
              value={radius}
              onChange={(v) => set({ radius: v as typeof radius })}
              data={radii.map((r) => ({ value: r, label: r[0].toUpperCase() + r.slice(1) }))}
            />
          </Stack>
          <Stack gap={6}>
            <Text size="xs" fw={500} c="dimmed">
              Appearance
            </Text>
            <SegmentedControl
              size="xs"
              fullWidth
              value={colorScheme}
              onChange={(v) => setColorScheme(v as typeof colorScheme)}
              data={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'auto', label: 'System' },
              ]}
            />
          </Stack>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

function SchemeToggle() {
  const { toggleColorScheme } = useMantineColorScheme()
  return (
    <ActionIcon variant="subtle" color="gray" size="lg" onClick={toggleColorScheme} aria-label="Toggle color scheme">
      <SunIcon className="icon-light" />
      <MoonIcon className="icon-dark" />
    </ActionIcon>
  )
}

export function App() {
  const [opened, { toggle, close }] = useDisclosure()
  const [query, setQuery] = useState('')
  const nav = useNav()
  const q = query.trim().toLowerCase()

  return (
    <AppShell header={{ height: 56 }} navbar={{ width: 248, breakpoint: 'sm', collapsed: { mobile: !opened } }} padding={{ base: "md", sm: "xl" }}>
      <AppShell.Header px="md">
        <Group h="100%" justify="space-between" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={6}>Mantine × Radix</Title>
            <Text size="sm" c="dimmed" visibleFrom="xs">
              Every Mantine component, in Radix Themes
            </Text>
          </Group>
          <Group gap="xs" wrap="nowrap">
            <SchemeToggle />
            <ThemePanel />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <Box p="sm" pb={4}>
          <TextInput
            placeholder="Find a component"
            leftSection={<MagnifyingGlassIcon />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            rightSection={query && <CloseButton size="sm" onClick={() => setQuery('')} aria-label="Clear" />}
          />
        </Box>
        <ScrollArea flex={1} px="sm" pb="sm">
          {nav.map((section) => {
            const demos = section.demos.filter((d) => d.title.toLowerCase().includes(q))
            if (!demos.length) return null
            return (
              <Box key={section.id} mt="md">
                <Text size="xs" fw={500} c="dimmed" px={12} mb={4}>
                  {section.title}
                </Text>
                {demos.map((d) => (
                  <NavLink key={d.id} href={`#${d.id}`} label={d.title} onClick={close} />
                ))}
              </Box>
            )
          })}
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>
        <Stack gap={64} maw={1040} mx="auto" pb={96}>
          <ButtonsSection />
          <InputsSection />
          <ComboboxSection />
          <NavigationSection />
          <FeedbackSection />
          <OverlaysSection />
          <DataDisplaySection />
          <TypographySection />
          <LayoutSection />
          <DatesSection />
          <ChartsSection />
          <ExtensionsSection />
        </Stack>
      </AppShell.Main>
    </AppShell>
  )
}
