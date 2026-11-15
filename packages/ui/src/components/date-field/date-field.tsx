'use client'

import { Popover as Component } from '@base-ui/react/popover'
import * as stylex from '@stylexjs/stylex'
import {
  type CSSProperties,
  type ComponentProps as ReactComponentProps,
  type ReactNode,
  useRef,
  useState,
} from 'react'

import { type ColorToken } from '../../lib/colors.js'
import { ChevronDownIcon, icon } from '../../lib/icons.js'
import { type RadiusToken, radii } from '../../lib/radii.js'
import { merge } from '../../lib/stylex.js'
import { trigger, triggerSizes, triggerVariants } from '../../lib/trigger.js'
import { Content } from '../popover/content.js'
import {
  Calendar,
  type CalendarMode,
  format,
  key,
  same,
  type WeekStart,
} from './calendar.js'

export type DateFieldRange = {
  from: Date
  to: Date
}

type Single = {
  defaultValue?: Date | null
  mode?: 'single'
  onValueChange?: (value: Date | null) => void
  value?: Date | null
}

type Multiple = {
  defaultValue?: Array<Date>
  mode: 'multiple'
  onValueChange?: (value: Array<Date>) => void
  value?: Array<Date>
}

type Range = {
  defaultValue?: DateFieldRange | null
  mode: 'range'
  onValueChange?: (value: DateFieldRange | null) => void
  value?: DateFieldRange | null
}

export type DateFieldProps = Omit<
  ReactComponentProps<'button'>,
  'children' | 'className' | 'color' | 'defaultValue' | 'style' | 'value'
> &
  (Single | Multiple | Range) & {
    className?: string
    closeLabel?: string
    color?: ColorToken | 'gray'
    icon?: ReactNode
    locale?: string
    max?: Date
    min?: Date
    name?: string
    nextLabel?: string
    placeholder?: ReactNode
    previousLabel?: string
    radius?: RadiusToken
    size?: '1' | '2' | '3'
    style?: CSSProperties
    variant?: 'ghost' | 'soft' | 'surface'
    weekStart?: WeekStart
  }

type Value = Array<Date> | Date | DateFieldRange | null | undefined

// a button that looks like a Select and opens a calendar. `mode` decides what
// is picked and what the value is: a Date for single (the default), an array
// of them for multiple, and { from, to } for a range. a single date and a
// finished range close the calendar; multiple stays open. with a `name`, the
// days are sent in a form as 2026-11-16, one entry each. `min` and `max`
// limit what can be picked, `locale` sets the language, the date format and
// the day the week starts on. `icon` goes before the value, a calendar for
// instance. while the calendar is open it keeps the focus: tab goes round the
// month buttons and the days. className and style go to the button
export function DateField({
  className,
  closeLabel = 'Close',
  color,
  defaultValue,
  disabled,
  icon: glyph,
  locale = 'en',
  max,
  min,
  mode = 'single',
  name,
  nextLabel = 'Next month',
  onValueChange,
  placeholder,
  previousLabel = 'Previous month',
  radius,
  size = '2',
  style,
  value,
  variant = 'surface',
  weekStart,
  ...props
}: DateFieldProps) {
  const popup = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)

  const [inner, setInner] = useState(() => list(defaultValue))

  // the start of a range whose end hasn't been picked yet
  const [pending, setPending] = useState<Date | null>(null)

  const selected = value === undefined ? inner : list(value)

  function commit(next: Array<Date>) {
    if (value === undefined) {
      setInner(next)
    }

    // the callback's type follows `mode`, which typescript can't see here
    const report = onValueChange as ((value: Value) => void) | undefined

    report?.(shape(mode, next))
  }

  function onSelect(date: Date) {
    if (mode === 'single') {
      commit([date])

      setOpen(false)

      return
    }

    if (mode === 'multiple') {
      commit(
        selected.some((item) => same(item, date))
          ? selected.filter((item) => !same(item, date))
          : [...selected, date].sort((a, b) => a.getTime() - b.getTime()),
      )

      return
    }

    if (!pending) {
      setPending(date)

      return
    }

    commit([pending, date].sort((a, b) => a.getTime() - b.getTime()))

    setPending(null)

    setOpen(false)
  }

  const label = text(mode, selected, locale)

  return (
    <Component.Root
      // tab stays inside the calendar while it is open, going round its
      // month buttons and the days, instead of leaving and closing it
      modal="trap-focus"
      onOpenChange={(next) => {
        setOpen(next)

        // an unfinished range is dropped when the calendar closes
        if (!next) {
          setPending(null)
        }
      }}
      open={open}
    >
      <Component.Trigger
        data-accent={color}
        data-placeholder={label ? undefined : ''}
        disabled={disabled}
        {...props}
        {...merge(
          stylex.props(
            trigger.trigger,
            triggerVariants[variant],
            triggerSizes[size],
            radius && radii[radius],
          ),
          className,
          style,
        )}
      >
        {glyph ? (
          <span {...stylex.props(trigger.icon, styles.icon)}>{glyph}</span>
        ) : null}

        {/* a date is formatted in the reader's time zone, which the server
            may not share */}
        <span
          suppressHydrationWarning
          {...stylex.props(trigger.value, styles.value)}
        >
          {label || placeholder}
        </span>

        <ChevronDownIcon {...stylex.props(icon.small, trigger.icon)} />
      </Component.Trigger>

      {name
        ? selected.map((date) => (
            <input
              key={key(date)}
              name={name}
              type="hidden"
              value={key(date)}
            />
          ))
        : null}

      {/* focus starts on a day, the picked one or today, so the arrow keys
          work straight away */}
      <Content
        initialFocus={() =>
          popup.current?.querySelector<HTMLElement>(
            '[data-date][tabindex="0"]',
          ) ?? null
        }
        ref={popup}
        size="1"
      >
        <Calendar
          locale={locale}
          max={max}
          min={min}
          mode={mode}
          nextLabel={nextLabel}
          onSelect={onSelect}
          previousLabel={previousLabel}
          selected={pending ? [pending] : selected}
          weekStart={weekStart}
        />

        {/* with focus trapped, a screen reader on a touch screen needs a way
            out. it is not shown and not in the tab order; escape and a click
            outside close the calendar for everyone else */}
        <Component.Close
          aria-label={closeLabel}
          tabIndex={-1}
          {...stylex.props(styles.close)}
        />
      </Content>
    </Component.Root>
  )
}

const styles = stylex.create({
  // there for screen readers only
  close: {
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
  },
  // as tall as the line of text beside it, like the library's own icons
  icon: {
    display: 'flex',
    height: '1lh',
  },
  // takes the room between the icon and the chevron, so the value starts
  // right after the icon instead of sitting in the middle
  value: {
    flexGrow: 1,
  },
})

// any of the three value shapes as a list of days
function list(value: Value): Array<Date> {
  if (!value) {
    return []
  }

  if (value instanceof Date) {
    return [value]
  }

  return Array.isArray(value) ? value : [value.from, value.to]
}

// and back, into the shape the mode reports
function shape(mode: CalendarMode, dates: Array<Date>): Value {
  if (mode === 'multiple') {
    return dates
  }

  const [from, to] = dates

  if (mode === 'single') {
    return from ?? null
  }

  return from && to
    ? {
        from,
        to,
      }
    : null
}

// what the button shows: the date, the dates as a list, or the range, each
// the way the locale writes them
function text(mode: CalendarMode, dates: Array<Date>, locale: string) {
  const formatter = format(locale, {
    dateStyle: 'medium',
  })

  const [from, to] = dates

  if (mode === 'range') {
    return from && to ? formatter.formatRange(from, to) : ''
  }

  return new Intl.ListFormat(locale, {
    style: 'short',
    type: 'unit',
  }).format(dates.map((date) => formatter.format(date)))
}
