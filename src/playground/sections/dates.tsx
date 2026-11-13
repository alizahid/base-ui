import { Text } from '@mantine/core'
import {
  Calendar,
  DateInput,
  DatePicker,
  DatePickerInput,
  DateTimePicker,
  MiniCalendar,
  MonthPicker,
  MonthPickerInput,
  QuarterPicker,
  TimeGrid,
  TimeInput,
  TimePicker,
  TimeValue,
  WeekPicker,
  YearPicker,
  YearPickerInput,
} from '@mantine/dates'

import { useState } from 'react'
import { Demo, Row, Section } from '../demo'

const W = 320

const slots = ['09:00', '09:30', '10:00', '10:30', '11:00', '13:30', '14:00', '15:30', '16:00']

/** MiniCalendar is controlled only, so the demo keeps the chosen day itself. */
function MiniCalendarDemo() {
  const [value, setValue] = useState<string | null>('2026-03-12')
  return <MiniCalendar value={value} onChange={setValue} defaultDate="2026-03-09" />
}

export function DatesSection() {
  return (
    <Section title="Dates">
      <Demo title="Calendar" description="Bare month grid with no selection behaviour.">
        <Row label="one month">
          <Calendar defaultDate="2026-03-01" />
        </Row>
        <Row label="two months">
          <div style={{ overflowX: 'auto' }}>
            <Calendar defaultDate="2026-03-01" numberOfColumns={2} />
          </div>
        </Row>
      </Demo>

      <Demo title="MiniCalendar" description="Compact week strip for choosing a day.">
        <Row label="week strip">
          <div style={{ overflowX: 'auto' }}>
            <MiniCalendarDemo />
          </div>
        </Row>
      </Demo>

      <Demo title="DatePicker" description="Single, multiple and range selection.">
        <Row label="single">
          <DatePicker defaultDate="2026-03-01" defaultValue="2026-03-12" />
        </Row>
        <Row label="multiple">
          <DatePicker type="multiple" defaultDate="2026-03-01" defaultValue={['2026-03-05', '2026-03-12', '2026-03-20']} />
        </Row>
        <Row label="range">
          <DatePicker type="range" defaultDate="2026-03-01" defaultValue={['2026-03-09', '2026-03-17']} />
        </Row>
      </Demo>

      <Demo title="WeekPicker" description="Select a whole week.">
        <Row label="week">
          <WeekPicker defaultDate="2026-03-01" defaultValue="2026-03-10" />
        </Row>
      </Demo>

      <Demo title="MonthPicker" description="Pick a month for a billing period.">
        <Row label="month">
          <MonthPicker defaultDate="2026-01-01" defaultValue="2026-03-01" />
        </Row>
      </Demo>

      <Demo title="QuarterPicker" description="Pick a fiscal quarter.">
        <Row label="quarter">
          <QuarterPicker defaultDate="2026-01-01" defaultValue="2026-04-01" />
        </Row>
      </Demo>

      <Demo title="YearPicker" description="Pick a year from a decade view.">
        <Row label="year">
          <YearPicker defaultDate="2026-01-01" defaultValue="2026-01-01" />
        </Row>
      </Demo>

      <Demo title="DateInput" description="Typed date entry with a popover calendar.">
        <Row label="clearable">
          <DateInput maw={W} label="Renewal date" placeholder="Pick a date" defaultValue="2026-03-12" clearable />
        </Row>
        <Row label="error">
          <DateInput maw={W} label="Invalid" placeholder="Pick a date" error="Date is in the past" />
        </Row>
        <Row label="disabled">
          <DateInput maw={W} label="Disabled" placeholder="Pick a date" disabled />
        </Row>
      </Demo>

      <Demo title="DatePickerInput" description="Input that opens a date picker; single, multiple and range.">
        <Row label="single">
          <DatePickerInput maw={W} label="Due date" placeholder="Pick a date" defaultValue="2026-03-12" clearable />
        </Row>
        <Row label="multiple">
          <DatePickerInput maw={W} label="Blackout days" type="multiple" placeholder="Pick dates" defaultValue={['2026-03-05', '2026-03-12']} />
        </Row>
        <Row label="range">
          <DatePickerInput maw={W} label="Reporting period" type="range" placeholder="Pick dates range" defaultValue={['2026-03-01', '2026-03-31']} />
        </Row>
      </Demo>

      <Demo title="DateTimePicker" description="Combined date and time entry.">
        <Row label="default">
          <DateTimePicker maw={W} label="Meeting starts" placeholder="Pick date and time" defaultValue="2026-03-12 14:30:00" />
        </Row>
        <Row label="with seconds">
          <DateTimePicker maw={W} label="With seconds" placeholder="Pick date and time" withSeconds />
        </Row>
      </Demo>

      <Demo title="MonthPickerInput" description="Input for choosing a month.">
        <Row label="single">
          <MonthPickerInput maw={W} label="Billing month" placeholder="Pick month" defaultValue="2026-03-01" />
        </Row>
        <Row label="range">
          <MonthPickerInput maw={W} label="Range" type="range" placeholder="Pick months" defaultValue={['2026-01-01', '2026-03-01']} />
        </Row>
      </Demo>

      <Demo title="YearPickerInput" description="Input for choosing a year.">
        <Row label="single">
          <YearPickerInput maw={W} label="Fiscal year" placeholder="Pick year" defaultValue="2026-01-01" />
        </Row>
      </Demo>

      <Demo title="TimeInput" description="Native time field.">
        <Row label="default">
          <TimeInput maw={W} label="Opens at" defaultValue="09:00" />
        </Row>
        <Row label="with seconds">
          <TimeInput maw={W} label="With seconds" withSeconds defaultValue="09:00:30" />
        </Row>
      </Demo>

      <Demo title="TimePicker" description="Segmented time field with optional dropdown and presets.">
        <Row label="24 hour">
          <TimePicker maw={W} label="24 hour" defaultValue="14:30" />
        </Row>
        <Row label="12 hour">
          <TimePicker maw={W} label="12 hour" format="12h" defaultValue="14:30" />
        </Row>
        <Row label="dropdown">
          <TimePicker maw={W} label="With dropdown" withDropdown clearable />
        </Row>
        <Row label="presets">
          <TimePicker maw={W} label="With presets" withDropdown presets={['09:00', '12:00', '15:00', '18:00']} />
        </Row>
      </Demo>

      <Demo title="TimeGrid" description="Pick a meeting slot from a grid.">
        <Row label="24 hour">
          <TimeGrid maw={W} data={slots} defaultValue="10:00" />
        </Row>
        <Row label="12 hour, disabled slots">
          <TimeGrid maw={W} data={slots} format="12h" disableTime={['09:30', '14:00']} allowDeselect />
        </Row>
      </Demo>

      <Demo title="TimeValue" description="Formatted time display.">
        <Row label="24 hour">
          <Text>
            <TimeValue value="14:30:00" />
          </Text>
        </Row>
        <Row label="12 hour">
          <Text>
            <TimeValue value="14:30:00" format="12h" />
          </Text>
        </Row>
        <Row label="with seconds">
          <Text>
            <TimeValue value="14:30:45" withSeconds />
          </Text>
        </Row>
      </Demo>
    </Section>
  )
}
