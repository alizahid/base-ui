export const pages = ['avatar', 'button', 'spinner'] as const

export type Page = (typeof pages)[number]

export function isPage(slug: string): slug is Page {
  return (pages as ReadonlyArray<string>).includes(slug)
}
