/**
 * Class strings shared by several components, so things that should look
 * the same (popups, menu items, ...). The box of text inputs is in `field-box.ts` really do.
 */

/** Keyboard focus ring. */
export const focusRing = 'outline-accent-8 outline-offset-2 focus-visible:outline-2'

/** Fade + small scale used by floating popups (menus, popovers, selects, tooltips). */
export const popupAnimation = [
  'origin-(--transform-origin) transition-[opacity,scale] duration-150',
  'data-starting-style:scale-95 data-starting-style:opacity-0',
  'data-ending-style:scale-95 data-ending-style:opacity-0',
].join(' ')

/** The box of a floating popup. */
export const popupSurface =
  'rounded-panel-lg bg-panel text-gray-12 shadow-lg inset-ring inset-ring-gray-a5 outline-none'

/** A list popup: menus, select lists, combobox lists. */
export const listPopup = `${popupSurface} ${popupAnimation} min-w-32 max-w-(--available-width) p-1`

/** A row inside a list popup. Highlight uses the accent color, like Radix Themes. */
export const listItem = [
  // The popup has 4px of padding (p-1), so the row radius is the popup radius minus 4px
  'relative flex h-8 cursor-default select-none items-center gap-2 rounded-inner-1 px-3 text-sm outline-none',
  'data-highlighted:bg-accent-9 data-highlighted:text-accent-contrast',
  'data-disabled:text-gray-a8',
].join(' ')

/** A small heading inside a list popup. */
export const listLabel = 'flex h-8 select-none items-center px-3 text-gray-a10 text-xs'

/** A divider line inside a list popup. */
export const listSeparator = '-mx-1 my-1 h-px bg-gray-a5'

/**
 * Heights of "control" sized parts. A button, an input and a select trigger
 * of the same size line up in a row.
 */
export const controlSize = {
  xs: 'h-6 rounded-ui-sm px-2 text-xs',
  sm: 'h-8 rounded-ui-md px-3 text-sm',
  md: 'h-10 rounded-ui-md px-4 text-base',
  lg: 'h-12 rounded-ui-lg px-6 text-lg',
} as const

export type ControlSize = keyof typeof controlSize
