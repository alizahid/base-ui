/**
 * The Radix Colors scales that can be used with the `color` prop.
 * Gray scales are left out on purpose.
 */
export const colors = [
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'jade',
  'green',
  'grass',
  'bronze',
  'gold',
  'brown',
  'orange',
  'amber',
  'yellow',
  'lime',
  'mint',
  'sky',
] as const

/**
 * `accent` means "use the accent color of the surrounding theme".
 * Any other value switches the component to that Radix Colors scale.
 */
export type Color = 'accent' | (typeof colors)[number]

/**
 * Turns the `color` prop into the `data-color` attribute that the CSS reads.
 * `accent` (or nothing) sets no attribute, so the color is inherited.
 */
export function colorAttribute(color: Color | undefined) {
  return color && color !== 'accent' ? color : undefined
}
