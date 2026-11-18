import * as stylex from '@stylexjs/stylex'

const hidden = ':is([data-starting-style], [data-ending-style])'
const still = '@media (prefers-reduced-motion: reduce)'

// radix slides a popup 4px towards its trigger as it fades: the offset depends
// on which side of the trigger it sits. written out, as stylex has to be able
// to read these at build time
const top =
  ':is(:is([data-starting-style], [data-ending-style])[data-side="top"])'
const bottom =
  ':is(:is([data-starting-style], [data-ending-style])[data-side="bottom"])'
const left =
  ':is(:is([data-starting-style], [data-ending-style])[data-side="left"])'
const right =
  ':is(:is([data-starting-style], [data-ending-style])[data-side="right"])'
const other =
  ':is(:is([data-starting-style], [data-ending-style]):not([data-side="top"], [data-side="bottom"], [data-side="left"], [data-side="right"]))'

// the floating surface shared by Popover and PreviewCard. ported from radix
// themes' popover.css and hover-card.css, which differ only in their sizes.
// radix animates with keyframes; here base ui's starting and ending styles
// drive a transition instead
export const panel = stylex.create({
  // a preview card has a lighter shadow than a popover, and no minimum width
  card: {
    boxShadow: 'var(--card-shadow)',
    minWidth: 0,
  },
  content: {
    backgroundColor: 'var(--panel-background)',
    borderRadius: 'var(--inset-radius)',
    boxShadow: 'var(--panel-shadow)',
    color: 'var(--gray-12)',
    maxWidth: 'calc(var(--ui-spacing) * 128)',
    // as wide as its trigger at least, unless what is inside has a width of
    // its own, like a calendar
    minWidth: 'var(--panel-min-width, var(--anchor-width))',
    outline: 'none',
    overflow: 'auto',
    padding: 'var(--inset-padding)',
    position: 'relative',
  },
  // the fade and slide a popup opens and closes with
  motion: {
    opacity: {
      [hidden]: 0,
      default: null,
    },
    transform: {
      [other]: 'scale(0.97)',
      [bottom]: 'translateY(calc(var(--ui-spacing) * -1)) scale(0.97)',
      [left]: 'translateX(var(--ui-spacing)) scale(0.97)',
      [right]: 'translateX(calc(var(--ui-spacing) * -1)) scale(0.97)',
      [top]: 'translateY(var(--ui-spacing)) scale(0.97)',
      default: null,
    },
    transformOrigin: 'var(--transform-origin)',
    // closes faster than it opens
    transitionDuration: {
      ':is([data-ending-style])': '100ms',
      default: '150ms',
    },
    // no motion at all for people who ask for less of it
    transitionProperty: {
      [still]: 'none',
      default: 'opacity, transform',
    },
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  positioner: {
    outline: 'none',
    zIndex: 1,
  },
})

// PreviewCard only goes up to 3. the padding and radius are named for Inset,
// which reads them
export const panelSizes = stylex.create({
  1: {
    '--inset-padding': 'calc(var(--ui-spacing) * 3)',
    '--inset-radius': 'var(--ui-radius-lg)',
  },
  2: {
    '--inset-padding': 'calc(var(--ui-spacing) * 4)',
    '--inset-radius': 'var(--ui-radius-lg)',
  },
  3: {
    '--inset-padding': 'calc(var(--ui-spacing) * 6)',
    '--inset-radius': 'var(--ui-radius-xl)',
  },
  4: {
    '--inset-padding': 'calc(var(--ui-spacing) * 8)',
    '--inset-radius': 'var(--ui-radius-xl)',
  },
})
