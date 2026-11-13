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

export type ColorToken = (typeof colors)[number]

export const grays = [
  'gray',
  'mauve',
  'slate',
  'sage',
  'olive',
  'sand',
] as const

export type GrayToken = (typeof grays)[number]

export function getGray(color: ColorToken): GrayToken {
  if (
    [
      'tomato',
      'red',
      'ruby',
      'crimson',
      'pink',
      'plum',
      'purple',
      'violet',
    ].includes(color)
  ) {
    return 'mauve'
  }

  if (['iris', 'indigo', 'blue', 'sky', 'cyan'].includes(color)) {
    return 'slate'
  }

  if (['mint', 'teal', 'jade', 'green'].includes(color)) {
    return 'sage'
  }

  if (['grass', 'lime'].includes(color)) {
    return 'olive'
  }

  if (
    ['yellow', 'amber', 'orange', 'brown', 'gold', 'bronze'].includes(color)
  ) {
    return 'sand'
  }

  return 'gray'
}
