import {
  Slider as Component,
  type SliderRootProps as ComponentProps,
} from '@base-ui/react/slider'
import * as stylex from '@stylexjs/stylex'
import { type CSSProperties } from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { type RadiusToken, radii } from '../../lib/radii.js'
import { merge } from '../../lib/stylex.js'

export type SliderProps = Omit<
  ComponentProps,
  'className' | 'color' | 'orientation' | 'style' | 'thumbAlignment'
> & {
  className?: string
  color?: ColorToken | 'gray'
  highContrast?: boolean
  radius?: RadiusToken
  size?: '1' | '2' | '3'
  style?: CSSProperties
  variant?: 'surface' | 'soft'
}

// one thumb for a number, one per item for an array. the label goes to the
// thumbs, which hold the inputs
export function Slider({
  'aria-label': label,
  'aria-labelledby': labelledBy,
  className,
  color,
  highContrast,
  radius,
  size = '2',
  style,
  variant = 'surface',
  ...props
}: SliderProps) {
  const value = props.value ?? props.defaultValue
  const count = Array.isArray(value) ? value.length : 1

  return (
    <Component.Root
      data-accent={color}
      {...props}
      thumbAlignment="edge"
      {...merge(
        stylex.props(
          styles.main,
          variants[variant],
          highContrast && contrast[variant],
          sizes[size],
          radius && radii[radius],
        ),
        className,
        style,
      )}
    >
      <Component.Control {...stylex.props(styles.control)}>
        <Component.Track {...stylex.props(styles.track)}>
          <Component.Indicator
            {...stylex.props(styles.indicator, count > 1 && styles.range)}
          />

          {Array.from({ length: count }, (_, index) => (
            <Component.Thumb
              aria-label={label}
              aria-labelledby={labelledBy}
              index={index}
              // biome-ignore lint/suspicious/noArrayIndexKey: thumbs are identified by their index
              key={index}
              {...stylex.props(styles.thumb)}
            />
          ))}
        </Component.Track>
      </Component.Control>
    </Component.Root>
  )
}

const disabled = ':is([data-disabled])'

// the colours follow radix themes' slider.css; the shape is ours. the track is
// as tall as the thumbs, the thumbs stay inside it, and the fill wraps them
const styles = stylex.create({
  control: {
    backgroundColor: 'var(--slider-track)',
    borderRadius: 'inherit',
    boxShadow: 'var(--slider-track-shadow)',
    cursor: {
      [disabled]: 'not-allowed',
      default: 'pointer',
    },
    height: 'var(--slider-size)',
  },
  // base ui ends the fill at the centre of a thumb. the padding carries it on
  // to the thumb's far edge
  indicator: {
    backgroundColor: {
      [disabled]: 'var(--gray-a6)',
      default: 'var(--slider-range)',
    },
    borderRadius: 'inherit',
    boxShadow: {
      [disabled]: 'none',
      default: 'var(--slider-range-shadow)',
    },
    boxSizing: 'content-box',
    paddingInlineEnd: 'calc(var(--slider-size) / 2)',
  },
  main: {
    borderRadius: 'calc(infinity * 1px)',
    touchAction: 'none',
    userSelect: 'none',
    width: '100%',
  },
  // with two thumbs the fill wraps the first one as well
  range: {
    marginInlineStart: 'calc(var(--slider-size) / -2)',
    paddingInlineStart: 'calc(var(--slider-size) / 2)',
  },
  // the hit area fills the track's height; the dot is drawn inside it
  thumb: {
    '--slider-thumb': {
      [disabled]: 'var(--gray-1)',
      default: 'white',
    },
    '--slider-thumb-shadow': {
      [disabled]: '0 0 0 1px var(--gray-6)',
      default: '0 0 0 1px var(--black-a4)',
    },
    '::before': {
      backgroundColor: 'var(--slider-thumb)',
      borderRadius: 'inherit',
      boxShadow: 'var(--slider-thumb-shadow)',
      content: '""',
      height: '50%',
      width: '50%',
    },
    alignItems: 'center',
    borderRadius: 'inherit',
    display: 'flex',
    height: 'var(--slider-size)',
    justifyContent: 'center',
    outline: {
      ':has(:focus-visible)': '2px solid var(--focus-8)',
      default: 'none',
    },
    outlineOffset: 2,
    width: 'var(--slider-size)',
  },
  track: {
    borderRadius: 'inherit',
    height: '100%',
  },
})

// variants only set variables, the styles above decide where they apply
const variants = stylex.create({
  soft: {
    '--slider-range': 'var(--accent-7)',
    '--slider-range-shadow': 'none',
    '--slider-track': 'var(--gray-a4)',
    '--slider-track-shadow': 'none',
  },
  surface: {
    '--slider-range': 'var(--accent-track)',
    '--slider-range-shadow': 'inset 0 0 0 1px var(--gray-a5)',
    '--slider-track': 'var(--gray-a3)',
    '--slider-track-shadow': 'inset 0 0 0 1px var(--gray-a5)',
  },
})

// a darker fill, like the switch's; no change in dark mode
const contrast = stylex.create({
  soft: {
    '--slider-range':
      'color-mix(in oklab, var(--accent-7), black var(--high-contrast-shade))',
  },
  surface: {
    '--slider-range':
      'color-mix(in oklab, var(--accent-track), black var(--high-contrast-shade))',
  },
})

const sizes = stylex.create({
  1: {
    '--slider-size': 'calc(var(--spacing) * 4)',
  },
  2: {
    '--slider-size': 'calc(var(--spacing) * 5)',
  },
  3: {
    '--slider-size': 'calc(var(--spacing) * 6)',
  },
})
