export const pages = [
  'alert-dialog',
  'avatar',
  'badge',
  'button',
  'callout',
  'card',
  'checkbox',
  'checkbox-group',
  'combobox',
  'dialog',
  'field',
  'icon-button',
  'menu',
  'number-field',
  'otp-field',
  'popover',
  'preview-card',
  'progress',
  'radio',
  'radio-group',
  'scroll-area',
  'select',
  'separator',
  'skeleton',
  'slider',
  'spinner',
  'switch',
  'table',
  'tabs',
  'text-area',
  'text-field',
  'toast',
  'tooltip',
] as const

export type Page = (typeof pages)[number]

export function isPage(slug: string): slug is Page {
  return (pages as ReadonlyArray<string>).includes(slug)
}
