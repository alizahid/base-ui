const positionerKeys = [
  'align',
  'alignOffset',
  'anchor',
  'arrowPadding',
  'collisionAvoidance',
  'collisionBoundary',
  'collisionPadding',
  'disableAnchorTracking',
  'positionMethod',
  'side',
  'sideOffset',
  'sticky',
] as const

type PositionerKey = (typeof positionerKeys)[number]

/**
 * Our floating `Popup` parts include Base UI's `Positioner`, so they also take
 * its placement props (`side`, `align`, `sideOffset`, ...). This splits them out.
 */
export function splitPositionerProps<Props extends object>(props: Props) {
  const positioner: Record<string, unknown> = {}
  const rest: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(props)) {
    if ((positionerKeys as readonly string[]).includes(key)) {
      positioner[key] = value
    } else {
      rest[key] = value
    }
  }

  return [positioner, rest] as [
    Pick<Props, Extract<keyof Props, PositionerKey>>,
    Omit<Props, PositionerKey>,
  ]
}

/** The placement props a floating `Popup` takes on top of its own props. */
export type PositionerProps<Positioner> = Pick<Positioner, Extract<keyof Positioner, PositionerKey>>
