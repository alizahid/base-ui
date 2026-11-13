export const pages = [
  'avatar',
  'button',
  'checkbox',
  'checkbox-group',
  'field',
  'icon-button',
  'radio',
  'radio-group',
  'spinner',
  'switch',
  'text-field',
] as const

export type Page = (typeof pages)[number]

export function isPage(slug: string): slug is Page {
  return (pages as ReadonlyArray<string>).includes(slug)
}
