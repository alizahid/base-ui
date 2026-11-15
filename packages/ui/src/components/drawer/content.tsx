'use client'

import {
  Drawer as Component,
  type DrawerPopupProps,
} from '@base-ui/react/drawer'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties, use } from 'react'

import { merge } from '#lib/stylex.js'
import { ThemeContext } from '#lib/theme.js'

export type DrawerContentProps = DrawerPopupProps & {
  className?: string
  // floats off the edges of the screen on larger screens
  inset?: boolean
  // the width of a drawer on the start or end side
  size?: '1' | '2' | '3' | '4'
  style?: CSSProperties
}

export function Content({
  children,
  className,
  inset = true,
  size = '2',
  style,
  ...props
}: DrawerContentProps) {
  const theme = use(ThemeContext)
  return (
    // keeps a focused field above the software keyboard
    <Component.VirtualKeyboardProvider>
      <Component.Portal>
        <Component.Backdrop {...stylex.props(styles.backdrop)} />

        <Component.Viewport
          {...stylex.props(styles.viewport, sizes[size], inset && styles.inset)}
        >
          {/* portaled out of the provider's element, so its colors are set
              again for everything inside */}
          <Component.Popup
            data-accent={theme.accent}
            data-gray={theme.gray}
            {...props}
            {...merge(stylex.props(styles.popup), className, style)}
          >
            <div aria-hidden {...stylex.props(styles.handle)} />

            <Component.Content {...stylex.props(styles.content)}>
              {children}
            </Component.Content>
          </Component.Popup>
        </Component.Viewport>
      </Component.Portal>
    </Component.VirtualKeyboardProvider>
  )
}

const large = '@media (min-width: 640px)'
const still = '@media (prefers-reduced-motion: reduce)'

const hidden = ':is([data-starting-style], [data-ending-style])'
const ending = ':is([data-ending-style])'
const swiping =
  ':is(:is([data-swiping], [data-nested-drawer-swiping]):not([data-ending-style]))'

// base ui puts the direction the drawer is swiped away in on the popup, which
// is also the side it sits on. stylex doesn't order these against each other,
// so they must not overlap
const up = ':is([data-swipe-direction="up"])'
const down = ':is([data-swipe-direction="down"])'
const left = ':is([data-swipe-direction="left"])'
const right = ':is([data-swipe-direction="right"])'

const upOpen =
  ':is([data-swipe-direction="up"]:not([data-starting-style], [data-ending-style], [data-nested-drawer-open]))'
const downOpen =
  ':is([data-swipe-direction="down"]:not([data-starting-style], [data-ending-style], [data-nested-drawer-open]))'
const sidesOpen =
  ':is(:is([data-swipe-direction="left"], [data-swipe-direction="right"]):not([data-starting-style], [data-ending-style], [data-nested-drawer-open]))'
// behind another drawer
const upBehind =
  ':is([data-swipe-direction="up"][data-nested-drawer-open]:not([data-starting-style], [data-ending-style]))'
const downBehind =
  ':is([data-swipe-direction="down"][data-nested-drawer-open]:not([data-starting-style], [data-ending-style]))'
const upHidden =
  ':is([data-swipe-direction="up"]:is([data-starting-style], [data-ending-style]))'
const downHidden =
  ':is([data-swipe-direction="down"]:is([data-starting-style], [data-ending-style]))'
const leftHidden =
  ':is([data-swipe-direction="left"]:is([data-starting-style], [data-ending-style]))'
const rightHidden =
  ':is([data-swipe-direction="right"]:is([data-starting-style], [data-ending-style]))'

// top and bottom drawers. base ui measures their heights: behind another
// drawer, one takes the height of the frontmost
const tall =
  ':is(:is([data-swipe-direction="up"], [data-swipe-direction="down"]):not([data-nested-drawer-open]))'
const tallBehind =
  ':is(:is([data-swipe-direction="up"], [data-swipe-direction="down"])[data-nested-drawer-open])'

const wide =
  ':is(:is([data-swipe-direction="left"], [data-swipe-direction="right"]):not([data-nested-drawer-open]))'
const wideBehind =
  ':is(:is([data-swipe-direction="left"], [data-swipe-direction="right"])[data-nested-drawer-open])'

// start and end drawers behind another. base ui has no width to go with
// --drawer-frontmost-height, so these only line up when the drawers are the
// same width
const leftBehind =
  ':is([data-swipe-direction="left"][data-nested-drawer-open]:not([data-starting-style], [data-ending-style]))'
const rightBehind =
  ':is([data-swipe-direction="right"][data-nested-drawer-open]:not([data-starting-style], [data-ending-style]))'

const behind = ':is([data-nested-drawer-open])'

// the content of a drawer behind another, unless that one is being swiped
const inBehind =
  ':is([data-nested-drawer-open]:not([data-nested-drawer-swiping]) > *)'

// the handle and the content, by the side of the popup they are in
const inUp = ':is([data-swipe-direction="up"] > *)'
const inDown = ':is([data-swipe-direction="down"] > *)'

// the look is Dialog's panel; the motion follows base ui's drawer examples,
// where the popup tracks the finger and a faster swipe closes faster
const styles = stylex.create({
  backdrop: {
    backgroundColor: 'var(--overlay)',
    inset: 0,
    minHeight: '100dvh',
    // fades as the drawer is swiped away
    opacity: {
      [hidden]: 0,
      default: 'calc(1 - var(--drawer-swipe-progress, 0))',
    },
    // ios: covers the whole visible viewport
    position: {
      '@supports (-webkit-touch-callout: none)': 'absolute',
      default: 'fixed',
    },
    transitionDuration: {
      [ending]: 'calc(var(--drawer-swipe-strength, 1) * 300ms)',
      [swiping]: '0ms',
      default: '300ms',
    },
    transitionProperty: {
      [still]: 'none',
      default: 'opacity',
    },
    transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
  },
  content: {
    flexGrow: 1,
    // only an empty strip of a drawer shows behind another
    opacity: {
      [inBehind]: 0,
      default: null,
    },
    paddingBlockEnd:
      'calc(var(--ui-spacing) * 6 + env(safe-area-inset-bottom, 0px))',
    paddingBlockStart: {
      [inDown]: 'calc(var(--ui-spacing) * 4)',
      default: 'calc(var(--ui-spacing) * 6)',
    },
    paddingInline: 'calc(var(--ui-spacing) * 6)',
    transitionDuration: '300ms',
    transitionProperty: {
      [still]: 'none',
      default: 'opacity',
    },
  },
  // the bar to drag a top or bottom drawer by
  handle: {
    backgroundColor: 'var(--gray-a6)',
    borderRadius: 'calc(infinity * 1px)',
    display: {
      [inDown]: 'block',
      [inUp]: 'block',
      default: 'none',
    },
    flexShrink: 0,
    height: 'var(--ui-spacing)',
    marginBlockEnd: {
      [inUp]: 'calc(var(--ui-spacing) * 2)',
      default: null,
    },
    marginBlockStart: {
      [inDown]: 'calc(var(--ui-spacing) * 2)',
      default: null,
    },
    marginInline: 'auto',
    // gone behind another drawer, like the content
    opacity: {
      [inBehind]: 0,
      default: null,
    },
    order: {
      [inUp]: 1,
      default: null,
    },
    transitionDuration: '300ms',
    transitionProperty: {
      [still]: 'none',
      default: 'opacity',
    },
    width: 'calc(var(--ui-spacing) * 9)',
  },
  // on small screens the drawer always reaches the edges
  inset: {
    // floating, so there is no edge to stay attached to
    '--drawer-bleed': {
      [large]: '0px',
      default: 'calc(var(--ui-spacing) * 12)',
    },
    '--drawer-edge-radius': {
      [large]: 'var(--ui-radius-2xl)',
      default: '0px',
    },
    '--drawer-inset': {
      [large]: 'calc(var(--ui-spacing) * 2)',
      default: '0px',
    },
  },
  popup: {
    alignSelf: {
      [down]: 'flex-end',
      [up]: 'flex-start',
      default: 'center',
    },
    backgroundColor: 'var(--panel-background)',
    // the corners at the screen's edge are only round when inset; the others
    // of a top or bottom drawer always are
    borderEndEndRadius: {
      [up]: 'var(--ui-radius-2xl)',
      default: 'var(--drawer-edge-radius)',
    },
    borderEndStartRadius: {
      [up]: 'var(--ui-radius-2xl)',
      default: 'var(--drawer-edge-radius)',
    },
    borderStartEndRadius: {
      [down]: 'var(--ui-radius-2xl)',
      default: 'var(--drawer-edge-radius)',
    },
    borderStartStartRadius: {
      [down]: 'var(--ui-radius-2xl)',
      default: 'var(--drawer-edge-radius)',
    },
    // a slab of the panel past the screen's edge, so dragging the drawer the
    // other way doesn't pull it off the edge. first, so it covers the ring
    boxShadow: {
      [down]:
        '0 var(--drawer-bleed) 0 0 var(--panel-background), var(--dialog-shadow)',
      [left]:
        'calc(-1 * var(--drawer-bleed)) 0 0 0 var(--panel-background), var(--dialog-shadow)',
      [right]:
        'var(--drawer-bleed) 0 0 0 var(--panel-background), var(--dialog-shadow)',
      [up]: '0 calc(-1 * var(--drawer-bleed)) 0 0 var(--panel-background), var(--dialog-shadow)',
      default: 'var(--dialog-shadow)',
    },
    color: 'var(--gray-12)',
    display: 'flex',
    flexDirection: 'column',
    height: {
      [tall]: 'var(--drawer-height, auto)',
      [tallBehind]:
        'var(--drawer-frontmost-height, var(--drawer-height, auto))',
      [wide]: '100%',
      // behind another, a drawer is as much shorter at each end as it shows
      // past the one above it
      [wideBehind]:
        'calc(100% - var(--nested-drawers, 1) * var(--drawer-peek) * 2)',
    },
    // pushed to its own edge with an auto margin on the other side, whichever
    // side the viewport's row starts from: it starts on the right where text
    // runs right to left. top and bottom drawers stay in the middle as they
    // narrow
    marginLeft: {
      [down]: 'auto',
      [right]: 'auto',
      [up]: 'auto',
      default: null,
    },
    marginRight: {
      [down]: 'auto',
      [left]: 'auto',
      [up]: 'auto',
      default: null,
    },
    maxHeight: '100%',
    maxWidth: '100%',
    outline: 'none',
    overflowY: {
      [behind]: 'hidden',
      default: 'auto',
    },
    overscrollBehavior: 'contain',
    position: 'relative',
    transform: {
      [downHidden]: 'translateY(calc(100% + var(--drawer-inset)))',
      [downOpen]:
        'translateY(calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)))',
      [leftHidden]: 'translateX(calc(-100% - var(--drawer-inset)))',
      [rightHidden]: 'translateX(calc(100% + var(--drawer-inset)))',
      [sidesOpen]: 'translateX(var(--drawer-swipe-movement-x, 0px))',
      [upHidden]: 'translateY(calc(-100% - var(--drawer-inset)))',
      [upOpen]:
        'translateY(calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)))',
      default: null,
    },
    transitionDuration: {
      [ending]: 'calc(var(--drawer-swipe-strength, 1) * 300ms)',
      [swiping]: '0ms',
      default: '300ms',
    },
    transitionProperty: {
      [still]: 'none',
      default: 'transform, translate, height, width',
    },
    transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
    // behind other drawers, it moves out by the peek for each one above it.
    // start and end drawers only line up when they are the same width
    translate: {
      [downBehind]:
        '0 calc(var(--nested-drawers, 1) * var(--drawer-peek) * -1)',
      [leftBehind]: 'calc(var(--nested-drawers, 1) * var(--drawer-peek)) 0',
      [rightBehind]:
        'calc(var(--nested-drawers, 1) * var(--drawer-peek) * -1) 0',
      [upBehind]: '0 calc(var(--nested-drawers, 1) * var(--drawer-peek))',
      default: null,
    },
    width: {
      [tallBehind]:
        'calc(100% - var(--nested-drawers, 1) * var(--drawer-peek) * 2)',
      [wide]: 'var(--drawer-width)',
      [wideBehind]: 'var(--drawer-width)',
      default: '100%',
    },
    willChange: 'transform',
  },
  viewport: {
    '--drawer-bleed': 'calc(var(--ui-spacing) * 12)',
    '--drawer-edge-radius': '0px',
    '--drawer-inset': '0px',
    // how much of a drawer shows behind the one above it
    '--drawer-peek':
      'clamp(calc(var(--ui-spacing) * 4), 2.5vw, calc(var(--ui-spacing) * 8))',
    display: 'flex',
    inset: 0,
    padding: 'var(--drawer-inset)',
    position: 'fixed',
  },
})

// full width on small screens
const sizes = stylex.create({
  1: {
    '--drawer-width': {
      [large]: 'calc(var(--ui-spacing) * 80)',
      default: '100%',
    },
  },
  2: {
    '--drawer-width': {
      [large]: 'calc(var(--ui-spacing) * 96)',
      default: '100%',
    },
  },
  3: {
    '--drawer-width': {
      [large]: 'calc(var(--ui-spacing) * 128)',
      default: '100%',
    },
  },
  4: {
    '--drawer-width': {
      [large]: 'calc(var(--ui-spacing) * 160)',
      default: '100%',
    },
  },
})
