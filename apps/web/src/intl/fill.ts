// <Text /> and a useText child become the text, other useText calls a string
const child =
  /<Text id="(?<id>[^"]+)" \/>|(?<!=)\{useText\('(?<hook>[^']+)'\)\}/gu
const prop = /\{useText\('(?<id>[^']+)'\)\}|useText\('(?<hook>[^']+)'\)/gu

// MDX source with the translations written in, as it read before they moved
// to the locale files
export function fill(source: string, t: (id: string) => string) {
  const text = (...match: Array<unknown>) => {
    const { hook, id } = match.pop() as Record<string, string | undefined>

    return t(id ?? hook ?? '')
  }

  return source
    .replace(child, text)
    .replace(prop, (...match) => JSON.stringify(text(...match)))
}
