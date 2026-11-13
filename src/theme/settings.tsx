import { MantineProvider } from '@mantine/core'
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { type Accent, accentClassesCss, autoGray, createRadixTheme, cssVariablesResolver, type Gray, type Radius } from './radix'

type Settings = { accent: Accent; gray: Gray | 'auto'; radius: Radius }
type Ctx = Settings & { set: (patch: Partial<Settings>) => void }

const SettingsContext = createContext<Ctx | null>(null)
export const useSettings = () => useContext(SettingsContext)!

const KEY = 'radix-settings'
const load = (): Settings => {
  try {
    return { accent: 'indigo', gray: 'auto', radius: 'medium', ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }
  } catch {
    return { accent: 'indigo', gray: 'auto', radius: 'medium' }
  }
}

/** MantineProvider with a Radix theme the playground can switch: accent, gray and radius. */
export function RadixProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(load)
  const gray = settings.gray === 'auto' ? autoGray(settings.accent) : settings.gray
  const theme = useMemo(() => createRadixTheme(settings.accent, gray), [settings.accent, gray])
  const resolver = useMemo(() => cssVariablesResolver(settings.accent, gray), [settings.accent, gray])

  useEffect(() => {
    document.documentElement.dataset.radius = settings.radius
    try {
      localStorage.setItem(KEY, JSON.stringify(settings))
    } catch {}
  }, [settings])

  const ctx = useMemo(() => ({ ...settings, set: (p: Partial<Settings>) => setSettings((s) => ({ ...s, ...p })) }), [settings])

  return (
    <SettingsContext.Provider value={ctx}>
      <style>{accentClassesCss}</style>
      <MantineProvider theme={theme} cssVariablesResolver={resolver} defaultColorScheme="auto">
        {children}
      </MantineProvider>
    </SettingsContext.Provider>
  )
}
