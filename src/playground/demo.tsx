import { Paper, Stack, Text, Title } from '@mantine/core'
import type { ReactNode } from 'react'

/** One component on the playground: a heading and a padded box holding its examples. */
export function Demo({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <Stack gap="xs" id={title.toLowerCase().replace(/\s+/g, '-')} style={{ scrollMarginTop: 72 }}>
      <div>
        <Title order={4}>{title}</Title>
        {description && (
          <Text c="dimmed" size="sm">
            {description}
          </Text>
        )}
      </div>
      <Paper p={{ base: "md", sm: "lg" }} withBorder style={{ overflowX: "auto" }}>
        {children}
      </Paper>
    </Stack>
  )
}

/** A group of demos under a section heading, e.g. "Inputs". */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Stack gap="xl" id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <Title order={2}>{title}</Title>
      {children}
    </Stack>
  )
}
