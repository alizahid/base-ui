import * as radix from '@radix-ui/colors'
import {
  type CSSVariablesResolver,
  createTheme,
  defaultCssVariablesResolver,
  defaultVariantColorsResolver,
  type MantineColorsTuple,
  type MantineTheme,
  type MantineThemeOverride,
  parseThemeColor,
  type VariantColorsResolver,
} from '@mantine/core'
import tokens from '../radix-tokens.json'

export const accents = [
  'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan',
  'teal', 'jade', 'green', 'grass', 'bronze', 'gold', 'brown', 'orange', 'amber', 'yellow', 'lime', 'mint', 'sky',
] as const
export const grays = ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand'] as const
export const radii = ['none', 'small', 'medium', 'large', 'full'] as const

export type Accent = (typeof accents)[number]
export type Gray = (typeof grays)[number]
export type Radius = (typeof radii)[number]

// Same pairing Radix Themes uses for gray="auto"
export function autoGray(accent: Accent): Gray {
  if (['tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet'].includes(accent)) return 'mauve'
  if (['iris', 'indigo', 'blue', 'sky', 'cyan'].includes(accent)) return 'slate'
  if (['teal', 'jade', 'mint', 'green'].includes(accent)) return 'sage'
  if (['grass', 'lime'].includes(accent)) return 'olive'
  return 'sand'
}

type Scale = Record<string, string>
const r = radix as unknown as Record<string, Scale>
const steps = Array.from({ length: 12 }, (_, i) => i + 1)
const scale = (name: string, dark: boolean, alpha: boolean) => {
  const s = r[`${name}${dark ? 'Dark' : ''}${alpha ? 'A' : ''}`]
  return steps.map((n) => s[`${name}${alpha ? 'A' : ''}${n}`])
}

/**
 * Mantine shades 0–9 mapped onto Radix steps 1–12. Shade 6 (Mantine's "filled") is Radix step 9,
 * so `indigo.6` in charts and props means the solid Radix color.
 */
const SHADE_TO_STEP = [2, 3, 4, 5, 7, 8, 9, 10, 11, 12]
// Mantine's "dark" palette drives its dark-mode surfaces: 0 = text … 7 = body
const DARK_TO_STEP = [12, 11, 11, 10, 7, 5, 3, 1, 1, 1]

const tuple = (name: string) => SHADE_TO_STEP.map((n) => scale(name, false, false)[n - 1]) as unknown as MantineColorsTuple

type Tokens = Record<string, { contrast: string; light: Record<string, string>; dark: Record<string, string> }>
const t = tokens as Tokens

/** The --{name}-1…12, --{name}-a1…a12 and helper variables of one Radix scale, as `as` (e.g. "gray"). */
function radixVars(name: string, dark: boolean, as = name) {
  const out: Record<string, string> = {}
  const solid = scale(name, dark, false)
  const alpha = scale(name, dark, true)
  steps.forEach((n) => {
    out[`--${as}-${n}`] = solid[n - 1]
    out[`--${as}-a${n}`] = alpha[n - 1]
  })
  const tk = t[name]
  out[`--${as}-contrast`] = tk.contrast
  out[`--${as}-surface`] = tk[dark ? 'dark' : 'light'].surface
  out[`--${as}-indicator`] = tk[dark ? 'dark' : 'light'].indicator.replace(`--${name}-`, `--${as}-`)
  out[`--${as}-track`] = tk[dark ? 'dark' : 'light'].track.replaceAll(`--${name}-`, `--${as}-`)
  return out
}

/** Mantine's per-color variables, pointed at a Radix scale. */
function mantineColorVars(color: string, scaleName: string, map = SHADE_TO_STEP) {
  const out: Record<string, string> = {}
  map.forEach((n, i) => {
    out[`--mantine-color-${color}-${i}`] = `var(--${scaleName}-${n})`
  })
  Object.assign(out, {
    [`--mantine-color-${color}-filled`]: `var(--${scaleName}-9)`,
    [`--mantine-color-${color}-filled-hover`]: `var(--${scaleName}-10)`,
    [`--mantine-color-${color}-light`]: `var(--${scaleName}-a3)`,
    [`--mantine-color-${color}-light-hover`]: `var(--${scaleName}-a4)`,
    [`--mantine-color-${color}-light-color`]: `var(--${scaleName}-a11)`,
    [`--mantine-color-${color}-outline`]: `var(--${scaleName}-a11)`,
    [`--mantine-color-${color}-outline-hover`]: `var(--${scaleName}-a2)`,
    [`--mantine-color-${color}-text`]: `var(--${scaleName}-a11)`,
    [`--mantine-color-${color}-contrast`]: `var(--${scaleName}-contrast)`,
  })
  return out
}

const blackWhite = () => {
  const out: Record<string, string> = {}
  steps.forEach((n) => {
    out[`--black-a${n}`] = r.blackA[`blackA${n}`]
    out[`--white-a${n}`] = r.whiteA[`whiteA${n}`]
  })
  return out
}

const shadows = {
  light: {
    '--shadow-1': 'inset 0 0 0 1px var(--gray-a5), inset 0 1.5px 2px 0 var(--gray-a2), inset 0 1.5px 2px 0 var(--black-a2)',
    '--shadow-2': '0 0 0 1px color-mix(in oklab, var(--gray-a3), var(--gray-3) 25%), 0 0 0 0.5px var(--black-a1), 0 1px 1px 0 var(--gray-a2), 0 2px 1px -1px var(--black-a1), 0 1px 3px 0 var(--black-a1)',
    '--shadow-3': '0 0 0 1px color-mix(in oklab, var(--gray-a3), var(--gray-3) 25%), 0 2px 3px -2px var(--gray-a3), 0 3px 12px -4px var(--black-a2), 0 4px 16px -8px var(--black-a2)',
    '--shadow-4': '0 0 0 1px color-mix(in oklab, var(--gray-a3), var(--gray-3) 25%), 0 8px 40px var(--black-a1), 0 12px 32px -16px var(--gray-a3)',
    '--shadow-5': '0 0 0 1px color-mix(in oklab, var(--gray-a3), var(--gray-3) 25%), 0 12px 60px var(--black-a3), 0 12px 32px -16px var(--gray-a5)',
    '--shadow-6': '0 0 0 1px color-mix(in oklab, var(--gray-a3), var(--gray-3) 25%), 0 12px 60px var(--black-a3), 0 16px 64px var(--gray-a2), 0 16px 36px -20px var(--gray-a7)',
  },
  dark: {
    '--shadow-1': 'inset 0 -1px 1px 0 var(--gray-a3), inset 0 0 0 1px var(--gray-a3), inset 0 3px 4px 0 var(--black-a5), inset 0 0 0 1px var(--gray-a4)',
    '--shadow-2': '0 0 0 1px color-mix(in oklab, var(--gray-a6), var(--gray-6) 25%), 0 0 0 0.5px var(--black-a3), 0 1px 1px 0 var(--black-a6), 0 2px 1px -1px var(--black-a6), 0 1px 3px 0 var(--black-a5)',
    '--shadow-3': '0 0 0 1px color-mix(in oklab, var(--gray-a6), var(--gray-6) 25%), 0 2px 3px -2px var(--black-a3), 0 3px 8px -2px var(--black-a6), 0 4px 12px -4px var(--black-a7)',
    '--shadow-4': '0 0 0 1px color-mix(in oklab, var(--gray-a6), var(--gray-6) 25%), 0 8px 40px var(--black-a3), 0 12px 32px -16px var(--black-a5)',
    '--shadow-5': '0 0 0 1px color-mix(in oklab, var(--gray-a6), var(--gray-6) 25%), 0 12px 60px var(--black-a5), 0 12px 32px -16px var(--black-a7)',
    '--shadow-6': '0 0 0 1px color-mix(in oklab, var(--gray-a6), var(--gray-6) 25%), 0 12px 60px var(--black-a4), 0 16px 64px var(--black-a6), 0 16px 36px -20px var(--black-a11)',
  },
}

// Mantine-only color names, drawn from the closest Radix scale
const ALIASES: Record<string, string> = { grape: 'purple', dark: 'gray' }

/** Radix scale behind a Mantine color name; "gray" and "dark" are the theme gray. */
const scaleOf = (color: string) => (color === 'gray' || color === 'dark' ? 'gray' : (ALIASES[color] ?? color))

function schemeVars(dark: boolean, gray: Gray) {
  const out: Record<string, string> = { ...blackWhite(), ...radixVars(gray, dark, 'gray') }
  for (const a of accents) Object.assign(out, radixVars(a, dark))
  // Raw gray scales too, so color="sand" etc. still works
  for (const g of grays) if (g !== 'gray') Object.assign(out, radixVars(g, dark))
  for (const a of accents) Object.assign(out, mantineColorVars(a, a))
  for (const g of grays) if (g !== 'gray') Object.assign(out, mantineColorVars(g, g))
  Object.assign(out, mantineColorVars('grape', 'purple'), mantineColorVars('gray', 'gray'))
  Object.assign(out, mantineColorVars('dark', 'gray', DARK_TO_STEP))
  Object.assign(out, dark ? shadows.dark : shadows.light)
  Object.assign(out, {
    '--color-background': dark ? 'var(--gray-1)' : '#fff',
    '--color-panel-solid': dark ? 'var(--gray-2)' : '#fff',
    '--color-panel-translucent': dark ? 'var(--gray-a2)' : 'rgb(255 255 255 / 0.7)',
    '--color-surface': dark ? 'rgb(0 0 0 / 0.25)' : 'rgb(255 255 255 / 0.85)',
    '--color-overlay': dark ? 'var(--black-a8)' : 'var(--black-a6)',

    '--mantine-color-body': 'var(--color-background)',
    '--mantine-color-text': 'var(--gray-12)',
    '--mantine-color-bright': 'var(--gray-12)',
    '--mantine-color-dimmed': 'var(--gray-11)',
    '--mantine-color-placeholder': 'var(--gray-a10)',
    '--mantine-color-anchor': 'var(--accent-a11)',
    '--mantine-color-error': 'var(--red-a11)',
    '--mantine-color-success': 'var(--green-a11)',
    '--mantine-color-default': 'var(--color-surface)',
    '--mantine-color-default-hover': 'var(--gray-a2)',
    '--mantine-color-default-color': 'var(--gray-12)',
    '--mantine-color-default-border': 'var(--gray-a7)',
    '--mantine-color-disabled': 'var(--gray-a3)',
    '--mantine-color-disabled-color': 'var(--gray-a8)',
    '--mantine-color-disabled-border': 'var(--gray-a6)',
    '--mantine-primary-color-contrast': 'var(--accent-contrast)',
  })
  return out
}

function accentVars(accent: Accent) {
  const out: Record<string, string> = {}
  steps.forEach((n) => {
    out[`--accent-${n}`] = `var(--${accent}-${n})`
    out[`--accent-a${n}`] = `var(--${accent}-a${n})`
  })
  for (const k of ['contrast', 'surface', 'indicator', 'track']) out[`--accent-${k}`] = `var(--${accent}-${k})`
  out['--focus-8'] = 'var(--accent-8)'
  out['--focus-a8'] = 'var(--accent-a8)'
  return out
}

export function cssVariablesResolver(accent: Accent, gray: Gray): CSSVariablesResolver {
  return (theme) => {
    const base = defaultCssVariablesResolver(theme)
    return {
      variables: { ...base.variables, ...accentVars(accent) },
      light: { ...base.light, ...schemeVars(false, gray) },
      dark: { ...base.dark, ...schemeVars(true, gray) },
    }
  }
}

/** Mantine variants → Radix variants: filled = solid, light = soft, subtle = ghost, plus "surface". */
const variantColorResolver: VariantColorsResolver = (input) => {
  const parsed = parseThemeColor({ color: input.color || input.theme.primaryColor, theme: input.theme })
  if (!parsed.isThemeColor || parsed.shade !== undefined) return defaultVariantColorsResolver(input)
  const c = scaleOf(parsed.color)
  const v = (s: string | number) => `var(--${c}-${s})`
  switch (input.variant) {
    case 'filled':
      return { background: v(9), hover: v(10), color: v('contrast'), border: '1px solid transparent' }
    case 'light':
      return { background: v('a3'), hover: v('a4'), color: v('a11'), border: '1px solid transparent' }
    case 'outline':
      return { background: 'transparent', hover: v('a2'), color: v('a11'), border: `1px solid ${v('a8')}` }
    case 'subtle':
      return { background: 'transparent', hover: v('a3'), color: v('a11'), border: '1px solid transparent' }
    case 'transparent':
      return { background: 'transparent', hover: 'transparent', color: v('a11'), border: '1px solid transparent' }
    case 'surface':
      return { background: v('surface'), hover: v('a3'), color: v('a11'), border: `1px solid ${v('a7')}` }
    case 'white':
      return { background: '#fff', hover: 'var(--gray-2)', color: v('a11'), border: '1px solid transparent' }
    case 'default':
      return {
        background: 'var(--color-surface)',
        hover: 'var(--gray-a2)',
        color: 'var(--gray-12)',
        border: '1px solid var(--gray-a7)',
      }
    default:
      return defaultVariantColorsResolver(input)
  }
}

const rem = (px: number) => `${px / 16}rem`
const radius = (n: number) => `var(--radius-${n})`

/**
 * Radix components read their color from --accent-*. A Mantine `color` prop becomes a class
 * that swaps that scale for one component, the same way Radix's data-accent-color does.
 */
const ACCENT_KEYS = [...steps.flatMap((n) => [`${n}`, `a${n}`]), 'contrast', 'surface', 'indicator', 'track']
export const accentClassesCss = [...accents, ...grays]
  .map((c) => {
    const vars = ACCENT_KEYS.map((k) => `--accent-${k}:var(--${c}-${k})`).join(';')
    // Like Radix, the focus ring follows the component color, except for gray
    const focus = c === 'gray' ? '' : ';--focus-8:var(--accent-8);--focus-a8:var(--accent-a8)'
    return `.rx-accent-${c}{${vars}${focus}}`
  })
  .join('\n')

/** Components with a `color` prop. Each gets the accent class on its root. */
const COLORED = [
  'ActionIcon', 'Alert', 'AngleSlider', 'Anchor', 'Avatar', 'Badge', 'Blockquote', 'Burger', 'Button', 'Checkbox',
  'CheckboxIndicator', 'Chip', 'Code', 'Highlight', 'Indicator', 'Loader', 'Mark', 'NavLink', 'Notification',
  'Pagination', 'Progress', 'Radio', 'RadioIndicator', 'RangeSlider', 'Rating', 'SegmentedControl', 'Slider',
  'Stepper', 'Switch', 'TableOfContents', 'Tabs', 'ThemeIcon', 'Timeline', 'Toggle',
]

function accentClass(theme: MantineTheme, color: unknown) {
  if (typeof color !== 'string') return undefined
  const parsed = parseThemeColor({ color, theme })
  return parsed.isThemeColor ? `rx-accent-${scaleOf(parsed.color)}` : undefined
}

export function createRadixTheme(accent: Accent, gray: Gray): MantineThemeOverride {
  const colors: Record<string, MantineColorsTuple> = {}
  for (const a of accents) colors[a] = tuple(a)
  for (const g of grays) if (g !== 'gray') colors[g] = tuple(g)
  colors.grape = tuple('purple')
  colors.gray = tuple(gray)
  colors.dark = DARK_TO_STEP.map((n) => scale(gray, true, false)[n - 1]) as unknown as MantineColorsTuple

  return createTheme({
    colors,
    primaryColor: accent,
    primaryShade: 6,
    white: '#fff',
    black: scale(gray, false, false)[11],
    variantColorResolver,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI (Custom)', Roboto, 'Helvetica Neue', 'Open Sans (Custom)', system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
    fontFamilyMonospace: "Menlo, 'Consolas (Custom)', 'Bitstream Vera Sans Mono', monospace",
    fontSmoothing: true,
    fontSizes: { xs: rem(12), sm: rem(14), md: rem(16), lg: rem(18), xl: rem(20) },
    lineHeights: { xs: '1.3333', sm: '1.4286', md: '1.5', lg: '1.4444', xl: '1.4' },
    fontWeights: { regular: '400', medium: '500', bold: '700' },
    spacing: { xs: rem(8), sm: rem(12), md: rem(16), lg: rem(24), xl: rem(32) },
    radius: { xs: radius(1), sm: radius(2), md: radius(3), lg: radius(4), xl: radius(5) },
    defaultRadius: 'sm',
    shadows: { xs: 'var(--shadow-2)', sm: 'var(--shadow-3)', md: 'var(--shadow-4)', lg: 'var(--shadow-5)', xl: 'var(--shadow-6)' },
    headings: {
      fontWeight: '700',
      sizes: {
        h1: { fontSize: rem(35), lineHeight: rem(40) },
        h2: { fontSize: rem(28), lineHeight: rem(36) },
        h3: { fontSize: rem(24), lineHeight: rem(30) },
        h4: { fontSize: rem(20), lineHeight: rem(28) },
        h5: { fontSize: rem(18), lineHeight: rem(26) },
        h6: { fontSize: rem(16), lineHeight: rem(24) },
      },
    },
    defaultGradient: { from: `${accent}.7`, to: `${accent}.5`, deg: 135 },
    cursorType: 'default',
    focusRing: 'auto',
    components: {
      ...Object.fromEntries(
        COLORED.map((name) => [
          name,
          { classNames: (theme: MantineTheme, props: { color?: unknown }) => ({ root: accentClass(theme, props.color) }) },
        ]),
      ),
      Modal: { defaultProps: { overlayProps: { backgroundOpacity: 1, color: 'var(--color-overlay)' } } },
      Drawer: { defaultProps: { overlayProps: { backgroundOpacity: 1, color: 'var(--color-overlay)' } } },
    },
  })
}
