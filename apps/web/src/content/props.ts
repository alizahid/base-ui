import data from './props.json'

export type Prop = {
  default?: string
  name: string
  required?: boolean
  type: string
}

export type Part = {
  name: string
  props: Array<Prop>
}

// a page's components that declare props of their own. generated from the
// library's types by scripts/props.ts
export function parts(page: string) {
  const all: Array<Part> = (data as Record<string, Array<Part>>)[page] ?? []

  return all.filter((part) => part.props.length > 0)
}

// a part is named on the page unless it is the page's only component
export function named(page: string) {
  return ((data as Record<string, Array<Part>>)[page] ?? []).length > 1
}

const tag = /^<Props page="(?<page>[^"]+)" \/>$/mu

// the same tables as markdown, for the .md route
export function markdown(source: string, t: (id: string) => string) {
  return source.replace(tag, (...match) => {
    const { page } = match.pop() as { page: string }
    const list = parts(page)

    if (list.length === 0) {
      return ''
    }

    const tables = list.map((part) =>
      [
        ...(named(page) ? [`### ${part.name}`, ''] : []),
        `| ${t('common.prop')} | ${t('common.type')} | ${t('common.default')} |`,
        '| --- | --- | --- |',
        ...part.props.map(
          (prop) =>
            `| \`${prop.name}\`${prop.required ? ` (${t('common.required')})` : ''} | \`${prop.type.replaceAll('|', '\\|')}\` | ${prop.default ? `\`${prop.default}\`` : ''} |`,
        ),
      ].join('\n'),
    )

    return [`## ${t('common.props')}`, t('common.props-note'), ...tables].join(
      '\n\n',
    )
  })
}
