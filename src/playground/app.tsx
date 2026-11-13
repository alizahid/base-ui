import { ActionIcon, Button, CloseButton, Select, Text, Tooltip, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
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

type NavGroup = { group: string; items: { value: string; label: string }[] }

/** Every demo on the page, read from the rendered sections so the list never drifts from them. */
function useNav() {
  const [nav, setNav] = useState<NavGroup[]>([])
  useEffect(() => {
    setNav(
      [...document.querySelectorAll<HTMLElement>('[data-section-title]')].map((section) => ({
        group: section.dataset.sectionTitle ?? '',
        items: [...section.querySelectorAll<HTMLElement>('[data-demo-title]')].map((d) => ({
          value: d.id,
          label: d.dataset.demoTitle ?? d.id,
        })),
      })),
    )
  }, [])
  return nav
}

const RADIUS_PREVIEW = { none: '0', small: '4px', medium: '8px', large: '12px', full: '80%' } as const
const cap = (s: string) => s[0].toUpperCase() + s.slice(1)

function ThemePanel({ onClose }: { onClose: () => void }) {
  const { accent, gray, radius, set } = useSettings()
  const { setColorScheme } = useMantineColorScheme()
  const scheme = useComputedColorScheme('light')
  return (
    <aside className="pg-panel" aria-label="Theme">
      <CloseButton onClick={onClose} aria-label="Close theme panel" style={{ position: 'absolute', top: 12, right: 12 }} />
      <div className="pg-panel-title">Theme</div>

      <div className="pg-panel-label">Accent color</div>
      <div className="pg-swatches">
        {accents.map((a) => (
          <Tooltip key={a} label={cap(a)}>
            <button
              type="button"
              className="pg-swatch"
              style={{ background: `var(--${a}-9)` }}
              aria-label={a}
              aria-pressed={accent === a}
              onClick={() => set({ accent: a })}
            />
          </Tooltip>
        ))}
      </div>

      <div className="pg-panel-label">Gray color</div>
      <div className="pg-swatches">
        {(['auto', ...grays] as const).map((g) => (
          <Tooltip key={g} label={g === 'auto' ? `Auto (${autoGray(accent)})` : cap(g)}>
            <button
              type="button"
              className="pg-swatch"
              style={{ background: `var(--${g === 'auto' ? autoGray(accent) : g === 'gray' ? 'gray' : g}-9)` }}
              aria-label={g}
              aria-pressed={gray === g}
              onClick={() => set({ gray: g })}
            />
          </Tooltip>
        ))}
      </div>

      <div className="pg-panel-label">Appearance</div>
      <div className="pg-options" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {(['light', 'dark'] as const).map((s) => (
          <button key={s} type="button" className="pg-option" aria-pressed={scheme === s} onClick={() => setColorScheme(s)}>
            {s === 'light' ? <SunIcon /> : <MoonIcon />}
            {cap(s)}
          </button>
        ))}
      </div>

      <div className="pg-panel-label">Radius</div>
      <div className="pg-options" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {radii.map((r) => (
          <div key={r}>
            <button type="button" className="pg-option" data-radius style={{ width: '100%' }} aria-label={r} aria-pressed={radius === r} onClick={() => set({ radius: r })}>
              <span className="pg-corner" style={{ borderTopLeftRadius: RADIUS_PREVIEW[r] }} />
            </button>
            <div className="pg-option-caption">{cap(r)}</div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export function App() {
  const [panel, setPanel] = useState(() => window.innerWidth >= 1280)
  const { toggleColorScheme } = useMantineColorScheme()
  const nav = useNav()

  return (
    <>
      <header className="pg-header">
        <div className="pg-brand">
          <Text fw={700}>Mantine × Radix Themes</Text>
          <Text size="sm" c="dimmed" visibleFrom="md">
            Every Mantine component, next to its Radix Themes twin
          </Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Select
            placeholder="Find a component"
            aria-label="Find a component"
            data={nav}
            value={null}
            searchable
            leftSection={<MagnifyingGlassIcon />}
            maxDropdownHeight={360}
            w={220}
            visibleFrom="xs"
            comboboxProps={{ position: 'bottom-end', width: 260 }}
            onChange={(id) => id && document.getElementById(id)?.scrollIntoView()}
          />
          <ActionIcon variant="subtle" color="gray" onClick={toggleColorScheme} aria-label="Toggle color scheme">
            <SunIcon className="icon-light" />
            <MoonIcon className="icon-dark" />
          </ActionIcon>
          <Button variant="default" leftSection={<MixerHorizontalIcon />} onClick={() => setPanel((v) => !v)} aria-expanded={panel}>
            Theme
          </Button>
        </div>
      </header>

      {panel && <ThemePanel onClose={() => setPanel(false)} />}

      <main className="pg-main">
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
      </main>
    </>
  )
}
