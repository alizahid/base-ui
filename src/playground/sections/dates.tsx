import { Group, Stack, Text } from '@mantine/core'
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
import { Demo, Section } from '../demo'

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
        <Group align="flex-start">
          <Calendar defaultDate="2026-03-01" />
          <Calendar defaultDate="2026-03-01" numberOfColumns={2} />
        </Group>
      </Demo>

      <Demo title="MiniCalendar" description="Compact week strip for choosing a day.">
        <MiniCalendarDemo />
      </Demo>

      <Demo title="DatePicker" description="Single, multiple and range selection.">
        <Group align="flex-start">
          <Stack>
            <Text size="sm">Default</Text>
            <DatePicker defaultDate="2026-03-01" defaultValue="2026-03-12" />
          </Stack>
          <Stack>
            <Text size="sm">Multiple</Text>
            <DatePicker type="multiple" defaultDate="2026-03-01" defaultValue={['2026-03-05', '2026-03-12', '2026-03-20']} />
          </Stack>
          <Stack>
            <Text size="sm">Range</Text>
            <DatePicker type="range" defaultDate="2026-03-01" defaultValue={['2026-03-09', '2026-03-17']} />
          </Stack>
        </Group>
      </Demo>

      <Demo title="WeekPicker" description="Select a whole week.">
        <WeekPicker defaultDate="2026-03-01" defaultValue="2026-03-10" />
      </Demo>

      <Demo title="MonthPicker" description="Pick a month for a billing period.">
        <MonthPicker defaultDate="2026-01-01" defaultValue="2026-03-01" />
      </Demo>

      <Demo title="QuarterPicker" description="Pick a fiscal quarter.">
        <QuarterPicker defaultDate="2026-01-01" defaultValue="2026-04-01" />
      </Demo>

      <Demo title="YearPicker" description="Pick a year from a decade view.">
        <YearPicker defaultDate="2026-01-01" defaultValue="2026-01-01" />
      </Demo>

      <Demo title="DateInput" description="Typed date entry with a popover calendar.">
        <Stack maw={320}>
          <DateInput label="Renewal date" placeholder="Pick a date" defaultValue="2026-03-12" clearable />
          <DateInput label="Invalid" placeholder="Pick a date" error="Date is in the past" />
          <DateInput label="Disabled" placeholder="Pick a date" disabled />
        </Stack>
      </Demo>

      <Demo title="DatePickerInput" description="Input that opens a date picker; single, multiple and range.">
        <Stack maw={320}>
          <DatePickerInput label="Due date" placeholder="Pick a date" defaultValue="2026-03-12" clearable />
          <DatePickerInput label="Blackout days" type="multiple" placeholder="Pick dates" defaultValue={['2026-03-05', '2026-03-12']} />
          <DatePickerInput label="Reporting period" type="range" placeholder="Pick dates range" defaultValue={['2026-03-01', '2026-03-31']} />
        </Stack>
      </Demo>

      <Demo title="DateTimePicker" description="Combined date and time entry.">
        <Stack maw={320}>
          <DateTimePicker label="Meeting starts" placeholder="Pick date and time" defaultValue="2026-03-12 14:30:00" />
          <DateTimePicker label="With seconds" placeholder="Pick date and time" withSeconds />
        </Stack>
      </Demo>

      <Demo title="MonthPickerInput" description="Input for choosing a month.">
        <Stack maw={320}>
          <MonthPickerInput label="Billing month" placeholder="Pick month" defaultValue="2026-03-01" />
          <MonthPickerInput label="Range" type="range" placeholder="Pick months" defaultValue={['2026-01-01', '2026-03-01']} />
        </Stack>
      </Demo>

      <Demo title="YearPickerInput" description="Input for choosing a year.">
        <Stack maw={320}>
          <YearPickerInput label="Fiscal year" placeholder="Pick year" defaultValue="2026-01-01" />
        </Stack>
      </Demo>

      <Demo title="TimeInput" description="Native time field.">
        <Stack maw={320}>
          <TimeInput label="Opens at" defaultValue="09:00" />
          <TimeInput label="With seconds" withSeconds defaultValue="09:00:30" />
        </Stack>
      </Demo>

      <Demo title="TimePicker" description="Segmented time field with optional dropdown and presets.">
        <Stack maw={320}>
          <TimePicker label="24 hour" defaultValue="14:30" />
          <TimePicker label="12 hour" format="12h" defaultValue="14:30" />
          <TimePicker label="With dropdown" withDropdown clearable />
          <TimePicker label="With presets" withDropdown presets={['09:00', '12:00', '15:00', '18:00']} />
        </Stack>
      </Demo>

      <Demo title="TimeGrid" description="Pick a meeting slot from a grid.">
        <Group align="flex-start">
          <TimeGrid data={slots} defaultValue="10:00" />
          <TimeGrid data={slots} format="12h" disableTime={['09:30', '14:00']} allowDeselect />
        </Group>
      </Demo>

      <Demo title="TimeValue" description="Formatted time display.">
        <Group gap="xl">
          <Stack gap={2}>
            <Text size="xs" c="dimmed">24 hour</Text>
            <Text><TimeValue value="14:30:00" /></Text>
          </Stack>
          <Stack gap={2}>
            <Text size="xs" c="dimmed">12 hour</Text>
            <Text><TimeValue value="14:30:00" format="12h" /></Text>
          </Stack>
          <Stack gap={2}>
            <Text size="xs" c="dimmed">With seconds</Text>
            <Text><TimeValue value="14:30:45" withSeconds /></Text>
          </Stack>
        </Group>
      </Demo>
    </Section>
  )
}
