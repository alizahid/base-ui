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
  'menu',
  'popover',
  'preview-card',
  'radio',
  'radio-group',
  'select',
  'spinner',
  'switch',
  'text-field',
  'tooltip',
] as const

export type Page = (typeof pages)[number]

export function isPage(slug: string): slug is Page {
  return (pages as ReadonlyArray<string>).includes(slug)
}
