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
  // a hook's return type; its props are its parameters
  returns?: string
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

const closers: Record<string, string> = {
  '(': ')',
  '[': ']',
  '{': '}',
}

// where the bracket opened at `start` closes
function close(text: string, start: number) {
  const stack: Array<string> = []

  for (let index = start; index < text.length; index += 1) {
    const character = text.charAt(index)

    if (closers[character]) {
      stack.push(closers[character])
    } else if (character === stack.at(-1)) {
      stack.pop()
    }

    if (stack.length === 0) {
      return index
    }
  }

  return text.length - 1
}

// an object's members: split at the semicolons outside any bracket
function members(text: string) {
  const list: Array<string> = []

  let from = 0

  for (let index = 0; index < text.length; index += 1) {
    if (closers[text.charAt(index)]) {
      index = close(text, index)
    } else if (text.charAt(index) === ';') {
      list.push(text.slice(from, index))

      from = index + 1
    }
  }

  return [...list, text.slice(from)]
    .map((member) => member.trim())
    .filter(Boolean)
}

// a type as the checker prints it, easier to read: an object with more than
// one member gets a line for each, and the semicolons go
// ponytail: brackets inside string literals aren't skipped; no type has any yet
export function pretty(type: string, indent = ''): string {
  const start = type.indexOf('{')

  if (start === -1) {
    return type
  }

  const end = close(type, start)
  const inner = `${indent}  `

  const list = members(type.slice(start + 1, end)).map((member) =>
    pretty(member, inner),
  )

  const body =
    list.length > 1
      ? `{\n${list.map((member) => inner + member).join('\n')}\n${indent}}`
      : `{${list.map((member) => ` ${member} `).join('')}}`

  return type.slice(0, start) + body + pretty(type.slice(end + 1), indent)
}

const tag = /^<Props (?<bare>bare )?page="(?<page>[^"]+)" \/>$/mu

// the same tables as markdown, for the .md route
export function markdown(source: string, t: (id: string) => string) {
  return source.replace(tag, (...match) => {
    const { bare, page } = match.pop() as { bare?: string; page: string }
    const list = parts(page)

    if (list.length === 0) {
      return ''
    }

    const hook = list.some((part) => part.returns)

    const tables = list.map((part) =>
      [
        ...(named(page) ? [`### ${part.name}`, ''] : []),
        `| ${t(hook ? 'common.name' : 'common.prop')} | ${t('common.type')} | ${t('common.default')} |`,
        '| --- | --- | --- |',
        ...part.props.map(
          (prop) =>
            `| \`${prop.name}\`${prop.required ? ` (${t('common.required')})` : ''} | \`${prop.type.replaceAll('|', '\\|')}\` | ${prop.default ? `\`${prop.default}\`` : ''} |`,
        ),
        ...(part.returns
          ? [
              '',
              `## ${t('common.returns')}`,
              '',
              `\`\`\`ts\n${pretty(part.returns)}\n\`\`\``,
            ]
          : []),
      ].join('\n'),
    )

    const heading = `## ${t(hook ? 'common.parameters' : 'common.props')}`

    return [...(bare ? [] : [heading]), ...tables].join('\n\n')
  })
}
