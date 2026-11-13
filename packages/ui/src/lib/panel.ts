import * as stylex from '@stylexjs/stylex'

const hidden = ':is([data-starting-style], [data-ending-style])'

// the floating surface shared by Popover and HoverCard. ported from radix
// themes' popover.css and hover-card.css, which differ only in their sizes.
// radix animates with keyframes; here base ui's starting and ending styles
// drive a transition instead
export const panel = stylex.create({
  content: {
    backgroundColor: 'var(--panel-background)',
    boxShadow: 'var(--panel-shadow)',
    boxSizing: 'border-box',
    color: 'var(--gray-12)',
    maxWidth: 480,
    minWidth: 'var(--anchor-width)',
    opacity: {
      [hidden]: 0,
      default: 1,
    },
    outline: 'none',
    overflow: 'auto',
    padding: 'var(--panel-padding)',
    position: 'relative',
    transform: {
      [hidden]: 'scale(0.97)',
      default: 'none',
    },
    transformOrigin: 'var(--transform-origin)',
    transitionDuration: {
      '@media (prefers-reduced-motion: reduce)': '0s',
      default: '160ms',
    },
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  positioner: {
    outline: 'none',
    zIndex: 1,
  },
})

// HoverCard only goes up to 3
export const panelSizes = stylex.create({
  1: {
    '--panel-padding': 'calc(var(--spacing) * 3)',
    borderRadius: 'var(--radius-xl)',
  },
  2: {
    '--panel-padding': 'calc(var(--spacing) * 4)',
    borderRadius: 'var(--radius-xl)',
  },
  3: {
    '--panel-padding': 'calc(var(--spacing) * 6)',
    borderRadius: 'var(--radius-2xl)',
  },
  4: {
    '--panel-padding': 'calc(var(--spacing) * 8)',
    borderRadius: 'var(--radius-2xl)',
  },
})
