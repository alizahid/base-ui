import { useRender } from '@base-ui/react/use-render'
import { createContext, useContext, useMemo } from 'react'
import { cn } from '../../lib/cn'
import type { ThemeColor } from '../../lib/colors'
import type { Appearance, Gray, Radius } from '../../lib/theme'

export type Theme = {
  /** `inherit` means the appearance comes from a parent, for example a `dark` class on `<html>`. */
  appearance: Appearance
  color: ThemeColor
  gray: Gray
  radius: Radius
}

const defaultTheme: Theme = {
  appearance: 'inherit',
  color: 'blue',
  gray: 'slate',
  radius: 'medium',
}

const ThemeContext = createContext<Theme | null>(null)

/** Reads the theme of the closest `ThemeProvider`, or the defaults when there is none. */
export function useTheme() {
  return useContext(ThemeContext) ?? defaultTheme
}

/**
 * Props that carry the current theme onto an element outside the provider's
 * `div`. Popups are rendered in a portal at the end of `<body>`, so every
 * portal spreads these to keep the color, gray, radius and light/dark look.
 */
export function useThemeProps() {
  const theme = useContext(ThemeContext)

  if (!theme) {
    return {}
  }

  return {
    className: theme.appearance === 'inherit' ? undefined : theme.appearance,
    'data-color': theme.color,
    'data-gray': theme.gray,
    'data-radius': theme.radius,
  }
}

export type ThemeProviderProps = Omit<useRender.ComponentProps<'div'>, 'color'> &
  Partial<Theme> & {
    /**
     * Paints the page background and sets the text color.
     * @default true for the outermost provider and when `appearance` is set, otherwise false
     */
    hasBackground?: boolean
  }

/**
 * Sets the accent color, gray, radius and light/dark appearance for everything inside.
 * Can be nested; anything not set is taken from the parent provider.
 */
export function ThemeProvider({
  appearance: appearanceProp,
  className,
  color: colorProp,
  gray: grayProp,
  hasBackground: hasBackgroundProp,
  radius: radiusProp,
  render,
  ...props
}: ThemeProviderProps) {
  const parent = useContext(ThemeContext)
  const root = parent === null

  const inherited = parent ?? defaultTheme
  const appearance = appearanceProp ?? inherited.appearance
  const color = colorProp ?? inherited.color
  const gray = grayProp ?? inherited.gray
  const radius = radiusProp ?? inherited.radius

  const theme = useMemo(
    () => ({ appearance, color, gray, radius }),
    [appearance, color, gray, radius],
  )

  const explicitAppearance = appearanceProp !== undefined && appearanceProp !== 'inherit'
  const hasBackground = hasBackgroundProp ?? (root || explicitAppearance)

  const element = useRender({
    defaultTagName: 'div',
    props: {
      // All values are always written out, so the CSS variables are worked out
      // on this element and nested providers behave the same at any depth
      'data-color': color,
      'data-gray': gray,
      'data-radius': radius,
      ...props,
      className: cn(
        appearance !== 'inherit' && appearance,
        hasBackground && 'bg-gray-1 text-gray-12',
        root && 'min-h-dvh',
        className,
      ),
    },
    render,
  })

  return <ThemeContext.Provider value={theme}>{element}</ThemeContext.Provider>
}
