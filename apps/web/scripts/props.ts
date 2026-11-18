// biome-ignore-all lint/suspicious/noBitwiseOperators: the compiler api's flags are bit masks
import { writeFileSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'

// typescript 7 has no compiler api yet, so this is typescript 5 under an alias
// biome-ignore lint/correctness/noUndeclaredDependencies: installed at the root, where its tsc can't shadow this app's
import ts from 'ts-api'

// writes src/content/props.json: for each docs page, the props its components
// declare themselves, read from the library's types. run with `bun run generate`

const ui = resolve(import.meta.dirname, '../../../packages/ui/src')

const entries = [
  'index.ts',
  'components/date-field/index.ts',
  'components/phone-field/index.ts',
].map((entry) => resolve(ui, entry))

const program = ts.createProgram(entries, {
  jsx: ts.JsxEmit.ReactJSX,
  module: ts.ModuleKind.NodeNext,
  moduleResolution: ts.ModuleResolutionKind.NodeNext,
  noEmit: true,
  skipLibCheck: true,
  strict: true,
  target: ts.ScriptTarget.ES2022,
})

const checker = program.getTypeChecker()

// every element takes these; listing them on each table is noise
const skipped = new Set(['className', 'style'])

const flags =
  ts.TypeFormatFlags.NoTruncation |
  ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope |
  ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType

const capital = /^[A-Z]/u
const undefinedEnd = / \| undefined$/u
const space = /\s+/gu
const pipe = /^\| /u
const literal = /^(?:'[^']*'|-?\d+(?:\.\d+)?|true|false|null)$/u

type Prop = {
  default?: string
  name: string
  required?: true
  type: string
}

type Part = {
  name: string
  props: Array<Prop>
  // a hook's return type; its props are its parameters
  returns?: string
}

function local(node: ts.Node) {
  return node.getSourceFile().fileName.startsWith(ui)
}

// the string literals a type is made of: the keys of a Pick or an Omit
function keys(node: ts.TypeNode) {
  const type = checker.getTypeFromTypeNode(node)

  return (type.isUnion() ? type.types : [type]).flatMap((item) =>
    item.isStringLiteral() ? [item.value] : [],
  )
}

// a named type: Pick adds its keys, Omit takes its keys away, and one of the
// library's own is read through
function reference(node: ts.TypeReferenceNode, names: Set<string>) {
  const name = node.typeName.getText()
  const [first, second] = node.typeArguments ?? []

  if (name === 'Pick' && second) {
    for (const key of keys(second)) {
      names.add(key)
    }
  } else if (name === 'Omit' && first && second) {
    own(first, names)

    for (const key of keys(second)) {
      names.delete(key)
    }
  } else {
    const symbol = checker.getSymbolAtLocation(node.typeName)
    const target =
      symbol && symbol.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(symbol)
        : symbol

    for (const declaration of target?.declarations ?? []) {
      if (ts.isTypeAliasDeclaration(declaration) && local(declaration)) {
        own(declaration.type, names)
      }
    }
  }
}

// the props a type spells out in the library's own source: its literal
// members, what it picks from elsewhere, and the same of any of the library's
// types it builds on. a base ui or html type it extends wholesale adds nothing
function own(node: ts.TypeNode, names = new Set<string>()) {
  if (ts.isIntersectionTypeNode(node) || ts.isUnionTypeNode(node)) {
    for (const type of node.types) {
      own(type, names)
    }
  } else if (ts.isParenthesizedTypeNode(node)) {
    own(node.type, names)
  } else if (ts.isTypeLiteralNode(node)) {
    for (const member of node.members) {
      if (member.name && ts.isIdentifier(member.name)) {
        names.add(member.name.text)
      }
    }
  } else if (ts.isTypeReferenceNode(node)) {
    reference(node, names)
  }

  return names
}

// whether the bracket a string opens with closes at its very end
function wrapped(text: string) {
  let depth = 0

  for (const [index, character] of [...text].entries()) {
    depth += Number(character === '(') - Number(character === ')')

    if (depth === 0) {
      return index === text.length - 1
    }
  }

  return false
}

// a short list of values is spelled out, even when it has a name
function values(type: ts.Type) {
  const items = (type.isUnion() ? type.types : []).filter(
    (item) => !(item.flags & ts.TypeFlags.Undefined),
  )

  if (items.length === 0 || !items.every((item) => item.isLiteral())) {
    return
  }

  const text = items
    .map((item) => checker.typeToString(item, undefined, flags))
    // the checker's order is arbitrary; numbers at least have a natural one
    .sort((a, b) => Number(a) - Number(b) || 0)
    .join(' | ')

  return text.length <= 80 ? text : undefined
}

function expand(type: ts.Type) {
  const text = checker
    .typeToString(type, undefined, flags)
    .replace(undefinedEnd, '')

  return values(type) ?? (wrapped(text) ? text.slice(1, -1) : text)
}

// a prop's type. the library's own are shown as they were written, so
// `ColorToken` stays a name and values keep their order; a name that stands
// for a short list of values is spelled out, as is a lookup like `Props['x']`.
// one from base ui, or with no single declaration, is printed by the checker
function print(symbol: ts.Symbol, at: ts.Node) {
  const [declaration, ...rest] = symbol.declarations ?? []

  if (
    !declaration ||
    rest.length > 0 ||
    !ts.isPropertySignature(declaration) ||
    !declaration.type
  ) {
    return expand(checker.getTypeOfSymbolAtLocation(symbol, at))
  }

  const node = declaration.type
  const type = checker.getTypeFromTypeNode(node)
  const text = expand(type)

  if (ts.isTypeReferenceNode(node)) {
    return values(type) ?? node.getText()
  }

  return local(node) && !ts.isIndexedAccessTypeNode(node)
    ? node.getText().replace(space, ' ').replace(pipe, '')
    : text
}

function part(name: string, type: ts.Type): Part | undefined {
  const [signature] = type.getCallSignatures()

  if (!signature) {
    return
  }

  const parameter = signature.parameters.at(0)?.valueDeclaration

  if (!(parameter && ts.isParameter(parameter) && parameter.type)) {
    return {
      name,
      props: [],
    }
  }

  // the defaults, from where the component destructures its props
  const defaults = new Map<string, string>()

  if (ts.isObjectBindingPattern(parameter.name)) {
    for (const element of parameter.name.elements) {
      // only plain values: a default like `renderItem` says nothing here
      if (element.initializer && literal.test(element.initializer.getText())) {
        defaults.set(
          (element.propertyName ?? element.name).getText(),
          element.initializer.getText(),
        )
      }
    }
  }

  const props = checker.getTypeAtLocation(parameter)

  return {
    name,
    props: [...own(parameter.type)]
      .filter((prop) => !skipped.has(prop))
      .sort()
      .flatMap((prop) => {
        const symbol = checker.getPropertyOfType(props, prop)

        if (!symbol) {
          return []
        }

        return [
          {
            default: defaults.get(prop),
            name: prop,
            required: symbol.flags & ts.SymbolFlags.Optional ? undefined : true,
            type: print(symbol, parameter),
          } satisfies Prop,
        ]
      }),
  }
}

// a hook's parameters, as its implementation declares them, and what its
// first overload returns
function hook(
  name: string,
  symbol: ts.Symbol,
  type: ts.Type,
): Part | undefined {
  const declaration = symbol.declarations?.find(
    (item) => ts.isFunctionDeclaration(item) && item.body,
  )
  const [signature] = type.getCallSignatures()

  if (!(declaration && ts.isFunctionDeclaration(declaration) && signature)) {
    return
  }

  return {
    name,
    props: declaration.parameters.map((parameter) => {
      const initializer = parameter.initializer?.getText()

      return {
        default:
          initializer && literal.test(initializer) ? initializer : undefined,
        name: `${parameter.dotDotDotToken ? '...' : ''}${parameter.name.getText()}`,
        required:
          parameter.questionToken ||
          parameter.initializer ||
          parameter.dotDotDotToken
            ? undefined
            : true,
        type:
          parameter.type?.getText().replace(space, ' ') ??
          checker.typeToString(
            checker.getTypeAtLocation(parameter),
            undefined,
            flags,
          ),
      } satisfies Prop
    }),
    returns: checker
      .typeToString(signature.getReturnType(), undefined, flags)
      .replace(space, ' '),
  }
}

const pages: Record<string, Array<Part>> = {}

for (const entry of entries) {
  const source = program.getSourceFile(entry)
  const module = source && checker.getSymbolAtLocation(source)

  for (const item of module ? checker.getExportsOfModule(module) : []) {
    const symbol =
      item.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(item) : item
    const declaration = symbol.valueDeclaration

    // types have no value
    if (!declaration) {
      continue
    }

    // a hook's page is named after its file
    if (item.name.startsWith('use')) {
      const found = hook(
        item.name,
        symbol,
        checker.getTypeOfSymbolAtLocation(symbol, declaration),
      )

      if (found) {
        pages[basename(declaration.getSourceFile().fileName, '.ts')] = [found]
      }

      continue
    }

    // components start with a capital
    if (!capital.test(item.name)) {
      continue
    }

    // a page is named after the component's folder
    const page = basename(dirname(declaration.getSourceFile().fileName))
    const type = checker.getTypeOfSymbolAtLocation(symbol, declaration)

    // a single component, or an object of parts
    const parts =
      type.getCallSignatures().length > 0
        ? [part(item.name, type)]
        : type
            .getProperties()
            // parts, not helpers like createHandle
            .filter((property) => capital.test(property.name))
            .map((property) =>
              part(
                `${item.name}.${property.name}`,
                checker.getTypeOfSymbolAtLocation(property, declaration),
              ),
            )

    pages[page] = [
      ...(pages[page] ?? []),
      ...parts.filter((value) => value !== undefined),
    ]
  }
}

// Root first, then the rest by name
for (const parts of Object.values(pages)) {
  parts.sort(
    (a, b) =>
      Number(b.name.endsWith('.Root')) - Number(a.name.endsWith('.Root')) ||
      a.name.localeCompare(b.name),
  )
}

writeFileSync(
  resolve(import.meta.dirname, '../src/content/props.json'),
  `${JSON.stringify(
    Object.fromEntries(
      Object.entries(pages).sort(([a], [b]) => a.localeCompare(b)),
    ),
    null,
    2,
  )}\n`,
)
