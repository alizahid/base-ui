import { Text, Title, useComputedColorScheme } from '@mantine/core'
import { Theme } from '@radix-ui/themes'
import { createContext, type ReactNode, useContext } from 'react'
import { autoGray } from '../theme/radix'
import { useSettings } from '../theme/settings'

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** Radix Themes components, themed with the same accent, gray, radius and appearance as the Mantine side. */
export function RadixTheme({ children }: { children: ReactNode }) {
  const { accent, gray, radius } = useSettings()
  const appearance = useComputedColorScheme('light')
  return (
    <Theme
      accentColor={accent}
      grayColor={gray === 'auto' ? autoGray(accent) : gray}
      radius={radius}
      appearance={appearance}
      hasBackground={false}
      className="pg-radix"
    >
      {children}
    </Theme>
  )
}

const HasRadix = createContext(false)

/**
 * One component on the playground. `radix` names the Radix Themes component it is compared with
 * (e.g. "Button"); leave it out when Radix Themes has no equivalent.
 */
export function Demo({
  title,
  description,
  radix,
  children,
}: {
  title: string
  description?: string
  radix?: string
  children: ReactNode
}) {
  return (
    <section className="pg-demo" id={slug(title)} data-demo-title={title}>
      <Title order={3} className="pg-demo-title">
        {title}
      </Title>
      {description && (
        <Text c="dimmed" size="sm" mt={4}>
          {description}
        </Text>
      )}
      <div className="pg-rows" data-compare={radix ? true : undefined}>
        <div className="pg-row pg-head">
          <span />
          <span>Mantine{!radix && <span className="pg-none"> · no Radix Themes equivalent</span>}</span>
          {radix && <span>Radix Themes · {radix}</span>}
        </div>
        <HasRadix.Provider value={!!radix}>{children}</HasRadix.Provider>
      </div>
    </section>
  )
}

/**
 * One example on its own line: a label, the Mantine component (children) and, next to it,
 * the same thing built with Radix Themes (`radix`).
 */
export function Row({ label, radix, children }: { label?: string; radix?: ReactNode; children: ReactNode }) {
  const compare = useContext(HasRadix)
  return (
    <div className="pg-row">
      <span className="pg-label">{label}</span>
      <div className="pg-cell" data-side="Mantine">
        {children}
      </div>
      {compare && (
        <div className="pg-cell" data-side="Radix Themes">
          {radix ? <RadixTheme>{radix}</RadixTheme> : <span className="pg-none">—</span>}
        </div>
      )}
    </div>
  )
}

/** A group of demos under a section heading, e.g. "Inputs". */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="pg-section" id={`section-${slug(title)}`} data-section-title={title}>
      <Text className="pg-section-title">{title}</Text>
      {children}
    </div>
  )
}
