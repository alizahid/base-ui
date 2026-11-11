/** The Radix Colors gray scales that can be used as the theme gray. */
export const grays = ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand'] as const

export type Gray = (typeof grays)[number]

/** How round the corners are. `full` makes buttons and similar parts pill shaped. */
export const radii = ['none', 'small', 'medium', 'large', 'full'] as const

export type Radius = (typeof radii)[number]

export const appearances = ['inherit', 'light', 'dark'] as const

export type Appearance = (typeof appearances)[number]

export const panelBackgrounds = ['translucent', 'solid'] as const

export type PanelBackground = (typeof panelBackgrounds)[number]
