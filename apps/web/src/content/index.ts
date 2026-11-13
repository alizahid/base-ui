export const pages = [
  'alert-dialog',
  'avatar',
  'button',
  'checkbox',
  'checkbox-group',
  'combobox',
  'dialog',
  'field',
  'icon-button',
  'radio',
  'radio-group',
  'select',
  'spinner',
  'switch',
  'text-field',
] as const

export type Page = (typeof pages)[number]

export function isPage(slug: string): slug is Page {
  return (pages as ReadonlyArray<string>).includes(slug)
}
