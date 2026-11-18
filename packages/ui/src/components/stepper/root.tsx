import { mergeProps } from '@base-ui/react/merge-props'
import * as stylex from '@stylexjs/stylex'
import {
  Children,
  type ComponentProps,
  type CSSProperties,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react'

import { Spinner } from '#components/spinner/spinner.js'
import { type ColorToken } from '#lib/colors.js'
import { CheckIcon, icon } from '#lib/icons.js'
import { type RadiusToken, radii } from '#lib/radii.js'
import { merge } from '#lib/stylex.js'

import { Completed, type StepperCompletedProps } from './completed.js'
import { type StepperStepProps } from './step.js'

export type StepperRootProps = Omit<
  ComponentProps<'div'>,
  'className' | 'color' | 'style'
> & {
  className?: string
  color?: ColorToken | 'gray'
  // the check a finished step shows, unless the step has its own
  completedIcon?: ReactNode
  // steps ahead of the active one can't be clicked, only the ones behind
  linear?: boolean
  onValueChange?: (value: number) => void
  orientation?: 'horizontal' | 'vertical'
  // the corners of the step indicators, round by default
  radius?: RadiusToken
  size?: '1' | '2' | '3'
  style?: CSSProperties
  // the active step, from 0. the number of steps means all of them are done
  value: number
}

type State = 'active' | 'completed' | 'upcoming'

// a sequence of steps with the active one's content below. `value` is the
// active step: the ones before it are completed, the ones after upcoming. it
// is controlled, usually by back and next buttons of your own. with
// `onValueChange` the steps are buttons that report the step that was
// clicked; without it they are plain text, unless a step has a `render`. the root has no state or effects,
// so it renders on the server too. className and style go to the root
export function Root({
  children,
  className,
  color,
  completedIcon,
  linear,
  onValueChange,
  orientation = 'horizontal',
  radius,
  size = '2',
  style,
  value,
  ...props
}: StepperRootProps) {
  const nodes = Children.toArray(children).filter((node) =>
    isValidElement(node),
  )

  const steps = nodes.filter((node) => node.type !== Completed) as Array<
    ReactElement<StepperStepProps>
  >

  const completed = nodes.find((node) => node.type === Completed) as
    | ReactElement<StepperCompletedProps>
    | undefined

  const content =
    value < steps.length
      ? steps[value]?.props.children
      : completed?.props.children

  return (
    <div
      data-accent={color}
      data-orientation={orientation}
      {...props}
      {...merge(stylex.props(styles.main, sizes[size]), className, style)}
    >
      <ol {...stylex.props(styles.list)}>
        {steps.map((step, index) => {
          const state = stateOf(index, value)

          const inner = (
            <>
              <span
                {...stylex.props(styles.indicator, radius && radii[radius])}
              >
                {mark(step.props, state, index, size, completedIcon)}
              </span>

              {step.props.label ? (
                <span {...stylex.props(styles.label)}>{step.props.label}</span>
              ) : null}
            </>
          )

          const shared = {
            'aria-busy': step.props.loading || undefined,
            'aria-current': state === 'active' ? ('step' as const) : undefined,
            'aria-label': step.props['aria-label'],
            ...stylex.props(styles.step),
          }

          // a step is its `render`, or a button when clicks are reported, or
          // plain text
          const base = (step.props.render ??
            (onValueChange ? (
              <button
                disabled={
                  step.props.disabled || (linear && index > value) || false
                }
                onClick={() => {
                  onValueChange(index)
                }}
                type="button"
              />
            ) : (
              <div />
            ))) as ReactElement<Record<string, unknown>>

          return (
            <li
              data-accent={step.props.color}
              data-state={state}
              // biome-ignore lint/suspicious/noArrayIndexKey: steps are told apart by their place
              key={index}
              {...merge(
                stylex.props(styles.item),
                step.props.className,
                step.props.style,
              )}
            >
              {cloneElement(base, mergeProps(shared, base.props), inner)}
            </li>
          )
        })}
      </ol>

      {content ? <div>{content}</div> : null}
    </div>
  )
}

function stateOf(index: number, value: number): State {
  if (index < value) {
    return 'completed'
  }

  return index === value ? 'active' : 'upcoming'
}

// what a step's indicator holds: a spinner while it loads, a check once it is
// done, and its icon or its number until then
function mark(
  step: StepperStepProps,
  state: State,
  index: number,
  size: NonNullable<StepperRootProps['size']>,
  completedIcon: ReactNode,
) {
  if (step.loading) {
    return <Spinner size={size} />
  }

  if (state === 'completed') {
    return (
      step.completedIcon ??
      completedIcon ?? <CheckIcon {...stylex.props(icon.line)} />
    )
  }

  return step.icon ?? index + 1
}

// stylex doesn't order these against each other, so they must not overlap.
// a step is hovered when the button or link inside it is, and can be pressed
const hovered = ':has(:is(button:enabled, a[href]):hover)'

const completed = `:is([data-state="completed"]:not(${hovered}))`
const completedHover = `:is([data-state="completed"]${hovered})`
const active = `:is([data-state="active"]:not(${hovered}))`
const activeHover = `:is([data-state="active"]${hovered})`
const upcomingHover = `:is([data-state="upcoming"]${hovered})`

const vertical = ':is([data-orientation="vertical"] *)'
const still = '@media (prefers-reduced-motion: reduce)'

// our own design, in radix themes' colors: an upcoming step is gray, the
// active one a tinted surface, a completed one solid
const styles = stylex.create({
  indicator: {
    alignItems: 'center',
    backgroundColor: 'var(--stepper-indicator-background)',
    borderRadius: 'calc(infinity * 1px)',
    boxShadow: 'var(--stepper-indicator-shadow)',
    color: 'var(--stepper-indicator-color)',
    display: 'flex',
    flexShrink: 0,
    fontVariantNumeric: 'tabular-nums',
    fontWeight: '500',
    height: 'var(--stepper-indicator-size)',
    justifyContent: 'center',
    transitionDuration: '150ms',
    transitionProperty: {
      [still]: 'none',
      default: 'background-color, box-shadow, color',
    },
    width: 'var(--stepper-indicator-size)',
  },
  // a step and the line to the next one. the state only sets variables here;
  // the indicator, the label and the line read them
  item: {
    '--stepper-indicator-background': {
      [active]: 'var(--accent-a3)',
      [activeHover]: {
        '@media (hover: hover)': 'var(--accent-a4)',
        default: 'var(--accent-a3)',
      },
      [completed]: 'var(--accent-9)',
      [completedHover]: {
        '@media (hover: hover)': 'var(--accent-10)',
        default: 'var(--accent-9)',
      },
      [upcomingHover]: {
        '@media (hover: hover)': 'var(--gray-a4)',
        default: 'var(--gray-a3)',
      },
      default: 'var(--gray-a3)',
    },
    '--stepper-indicator-color': {
      ':is([data-state="active"])': 'var(--accent-a11)',
      ':is([data-state="completed"])': 'var(--accent-contrast)',
      default: 'var(--gray-a11)',
    },
    '--stepper-indicator-shadow': {
      ':is([data-state="active"])': 'inset 0 0 0 1px var(--accent-a7)',
      default: 'none',
    },
    '--stepper-label': {
      ':is([data-state="upcoming"])': 'var(--gray-a11)',
      default: 'var(--gray-12)',
    },
    '--stepper-line': {
      ':is([data-state="completed"])': 'var(--accent-9)',
      default: 'var(--gray-a5)',
    },
    // the room between two steps in a column, which the line runs through
    '--stepper-space': 'calc(var(--ui-spacing) * 6)',
    // the line to the next step: a set length in a row, and down from the
    // indicator in a column
    '::after': {
      backgroundColor: 'var(--stepper-line)',
      borderRadius: 'calc(infinity * 1px)',
      bottom: {
        [vertical]: 'var(--ui-spacing)',
        default: null,
      },
      content: {
        ':is(:last-child)': 'none',
        default: '""',
      },
      height: {
        [vertical]: 'auto',
        default: 2,
      },
      insetInlineStart: {
        [vertical]: 'calc(var(--stepper-indicator-size) / 2 - 1px)',
        default: null,
      },
      position: {
        [vertical]: 'absolute',
        default: null,
      },
      // below the indicator, which sits in the middle of the step, above
      // the room left under it
      top: {
        [vertical]:
          'calc((100% - var(--stepper-space)) / 2 + var(--stepper-indicator-size) / 2 + var(--ui-spacing))',
        default: null,
      },
      transitionDuration: '150ms',
      transitionProperty: {
        [still]: 'none',
        default: 'background-color',
      },
      width: {
        [vertical]: 2,
        default: null,
      },
    },
    alignItems: 'center',
    // in a row, a grid of the step and its line: the line's column is as long
    // as it is allowed when there is room and gives way down to a stub when
    // there isn't, before the row has to overflow. the last step has no line
    display: {
      [vertical]: 'flex',
      default: 'grid',
    },
    gap: 'var(--stepper-gap)',
    gridTemplateColumns: {
      ':is(:last-child)': 'max-content',
      default:
        'max-content minmax(calc(var(--ui-spacing) * 4), calc(var(--ui-spacing) * 24))',
    },
    paddingBottom: {
      [`${vertical}:not(:last-child)`]: 'var(--stepper-space)',
      default: null,
    },
    position: 'relative',
  },
  label: {
    color: 'var(--stepper-label)',
    fontWeight: '500',
    minWidth: 0,
    transitionDuration: '150ms',
    transitionProperty: {
      [still]: 'none',
      default: 'color',
    },
    // one line in a row, where the lines between the steps give way instead.
    // in a column it wraps
    whiteSpace: {
      [vertical]: 'normal',
      default: 'nowrap',
    },
  },
  // the steps sit together in the middle of a row wider than they need, and
  // the row scrolls sideways, with no scrollbar, when it is narrower. a step's
  // focus ring reaches past the step, which a scroller would clip, so the
  // scroller is that much bigger on every side and pads the difference
  list: {
    display: 'flex',
    flexDirection: {
      [vertical]: 'column',
      default: null,
    },
    gap: {
      [vertical]: 0,
      default: 'var(--stepper-gap)',
    },
    // safe: a row too long to centre starts at its start, where it can be
    // scrolled from
    justifyContent: 'safe center',
    margin: 'calc(var(--ui-spacing) * -1.5)',
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: 'calc(var(--ui-spacing) * 1.5)',
    scrollbarWidth: 'none',
  },
  main: {
    color: 'var(--gray-12)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'calc(var(--ui-spacing) * 4)',
  },
  step: {
    // the focus ring, on a box of its own so it can reach further past the
    // label than around the indicator, and the text gets room
    '::before': {
      borderRadius: 'var(--ui-radius-md)',
      content: {
        ':is(:focus-visible)': '""',
        default: 'none',
      },
      insetBlock: 'calc(var(--ui-spacing) * -1)',
      insetInlineEnd: {
        ':has(> :nth-child(2))': 'calc(var(--ui-spacing) * -1.5)',
        default: 'calc(var(--ui-spacing) * -1)',
      },
      insetInlineStart: 'calc(var(--ui-spacing) * -1)',
      outline: '2px solid var(--focus-8)',
      outlineOffset: -2,
      pointerEvents: 'none',
      position: 'absolute',
    },
    alignItems: 'center',
    cursor: {
      ':is(button:enabled, a[href])': 'pointer',
      default: 'default',
    },
    display: 'flex',
    gap: 'var(--stepper-gap)',
    minWidth: 0,
    outline: 'none',
    position: 'relative',
    textAlign: 'start',
    userSelect: 'none',
  },
})

const sizes = stylex.create({
  1: {
    '--stepper-gap': 'calc(var(--ui-spacing) * 2)',
    '--stepper-indicator-size': 'calc(var(--ui-spacing) * 6)',
    fontSize: 'var(--ui-text-xs)',
    lineHeight: 'var(--ui-text-xs--line-height)',
  },
  2: {
    '--stepper-gap': 'calc(var(--ui-spacing) * 3)',
    '--stepper-indicator-size': 'calc(var(--ui-spacing) * 8)',
    fontSize: 'var(--ui-text-sm)',
    lineHeight: 'var(--ui-text-sm--line-height)',
  },
  3: {
    '--stepper-gap': 'calc(var(--ui-spacing) * 3)',
    '--stepper-indicator-size': 'calc(var(--ui-spacing) * 10)',
    fontSize: 'var(--ui-text-base)',
    lineHeight: 'var(--ui-text-base--line-height)',
  },
})
