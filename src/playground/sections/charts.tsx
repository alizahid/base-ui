import {
  AreaChart,
  BarChart,
  BarsList,
  BubbleChart,
  BulletChart,
  CandlestickChart,
  CompositeChart,
  DonutChart,
  FunnelChart,
  GaugeChart,
  Heatmap,
  LineChart,
  MatrixChart,
  PieChart,
  RadarChart,
  RadialBarChart,
  SankeyChart,
  ScatterChart,
  Sparkline,
  SunburstChart,
  Treemap,
  WaffleChart,
} from '@mantine/charts'
import type { ReactNode } from 'react'

import { Demo, Row, Section } from '../demo'

/** One chart on its own line, kept to a readable width. */
function Chart({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Row label={label}>
      <div style={{ maxWidth: 720 }}>{children}</div>
    </Row>
  )
}

const revenue = [
  { month: 'Jan', revenue: 12400, costs: 8200, signups: 320 },
  { month: 'Feb', revenue: 15800, costs: 9100, signups: 410 },
  { month: 'Mar', revenue: 14200, costs: 9600, signups: 380 },
  { month: 'Apr', revenue: 19600, costs: 10400, signups: 520 },
  { month: 'May', revenue: 22100, costs: 11800, signups: 610 },
  { month: 'Jun', revenue: 26500, costs: 12900, signups: 740 },
]

const plans = [
  { name: 'Free', value: 5400, color: 'gray.6' },
  { name: 'Pro', value: 2800, color: 'indigo.6' },
  { name: 'Team', value: 1200, color: 'teal.6' },
  { name: 'Enterprise', value: 380, color: 'amber.6' },
]

const funnel = [
  { name: 'Visitors', value: 12000, color: 'indigo.6' },
  { name: 'Signups', value: 5400, color: 'violet.6' },
  { name: 'Trials', value: 2300, color: 'teal.6' },
  { name: 'Customers', value: 860, color: 'amber.6' },
]

const skills = [
  { metric: 'Speed', web: 120, mobile: 98 },
  { metric: 'Reliability', web: 98, mobile: 130 },
  { metric: 'Usability', web: 86, mobile: 110 },
  { metric: 'Support', web: 99, mobile: 85 },
  { metric: 'Price', web: 85, mobile: 90 },
]

const heatmap: Record<string, number> = {}

for (let i = 0; i < 120; i++) {
  const date = new Date(2025, 0, 1 + i).toISOString().slice(0, 10)

  heatmap[date] = (i * 37) % 11
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const hours = ['9am', '12pm', '3pm', '6pm']

const matrix = days.flatMap((x, i) => hours.map((y, j) => ({ x, y, value: ((i + 2) * (j + 3) * 7) % 23 })))

export function ChartsSection() {
  return (
    <Section title="Charts">
      <Demo title="AreaChart" description="Monthly revenue and costs, default and stacked.">
        <Chart label="default">
          <AreaChart
            h={260}
            data={revenue}
            dataKey="month"
            series={[
              { name: 'revenue', color: 'indigo.6' },
              { name: 'costs', color: 'crimson.6' },
            ]}
            withLegend
          />
        </Chart>
        <Chart label="stacked">
          <AreaChart
            h={260}
            data={revenue}
            dataKey="month"
            type="stacked"
            series={[
              { name: 'revenue', color: 'teal.6' },
              { name: 'costs', color: 'amber.6' },
            ]}
            withLegend
          />
        </Chart>
      </Demo>

      <Demo title="BarChart" description="Revenue by month, grouped and stacked.">
        <Chart label="grouped">
          <BarChart
            h={260}
            data={revenue}
            dataKey="month"
            series={[
              { name: 'revenue', color: 'indigo.6' },
              { name: 'costs', color: 'violet.6' },
            ]}
            withLegend
          />
        </Chart>
        <Chart label="stacked">
          <BarChart
            h={260}
            data={revenue}
            dataKey="month"
            type="stacked"
            series={[
              { name: 'revenue', color: 'teal.6' },
              { name: 'costs', color: 'amber.6' },
            ]}
            withLegend
          />
        </Chart>
      </Demo>

      <Demo title="LineChart" description="Signups and revenue over six months.">
        <Chart label="linear">
          <LineChart
            h={260}
            data={revenue}
            dataKey="month"
            series={[
              { name: 'signups', color: 'indigo.6' },
              { name: 'costs', color: 'crimson.6' },
            ]}
            curveType="linear"
            withLegend
          />
        </Chart>
      </Demo>

      <Demo title="CompositeChart" description="Bars, an area and a line in one chart.">
        <Chart label="bar, area, line">
          <CompositeChart
            h={260}
            data={revenue}
            dataKey="month"
            series={[
              { name: 'revenue', color: 'indigo.6', type: 'bar' },
              { name: 'costs', color: 'amber.6', type: 'area' },
              { name: 'signups', color: 'teal.6', type: 'line' },
            ]}
            withLegend
            maxBarWidth={36}
          />
        </Chart>
      </Demo>

      <Demo title="DonutChart" description="Subscribers by plan.">
        <Chart label="labels">
          <DonutChart data={plans} chartLabel="9,780" withLabelsLine withLabels />
        </Chart>
        <Chart label="thin">
          <DonutChart data={plans} thickness={14} size={160} />
        </Chart>
      </Demo>

      <Demo title="PieChart" description="Share of subscribers by plan.">
        <Chart label="tooltip">
          <PieChart data={plans} withTooltip />
        </Chart>
        <Chart label="percent labels">
          <PieChart data={plans} withLabels labelsType="percent" />
        </Chart>
      </Demo>

      <Demo title="RadarChart" description="Web versus mobile scores.">
        <Chart label="two series">
          <RadarChart
            h={300}
            data={skills}
            dataKey="metric"
            withPolarRadiusAxis
            withLegend
            series={[
              { name: 'web', color: 'indigo.6', opacity: 0.3 },
              { name: 'mobile', color: 'teal.6', opacity: 0.3 },
            ]}
          />
        </Chart>
      </Demo>

      <Demo title="ScatterChart" description="Order value against delivery time for two regions.">
        <Chart label="two groups">
          <ScatterChart
            h={260}
            dataKey={{ x: 'hours', y: 'value' }}
            labels={{ x: 'Delivery time', y: 'Order value' }}
            unit={{ x: 'h', y: '$' }}
            data={[
              {
                name: 'Europe',
                color: 'indigo.6',
                data: [
                  { hours: 4, value: 120 },
                  { hours: 12, value: 80 },
                  { hours: 20, value: 210 },
                  { hours: 30, value: 150 },
                  { hours: 44, value: 90 },
                ],
              },
              {
                name: 'Asia',
                color: 'crimson.6',
                data: [
                  { hours: 8, value: 60 },
                  { hours: 18, value: 140 },
                  { hours: 26, value: 70 },
                  { hours: 36, value: 200 },
                  { hours: 48, value: 110 },
                ],
              },
            ]}
          />
        </Chart>
      </Demo>

      <Demo title="BubbleChart" description="Weekly activity: hour, day and message volume.">
        <Chart label="volume">
          <BubbleChart
            h={160}
            color="violet.6"
            range={[16, 225]}
            label="Messages"
            dataKey={{ x: 'hour', y: 'index', z: 'value' }}
            data={[
              { hour: '8am', index: 1, value: 200 },
              { hour: '10am', index: 1, value: 450 },
              { hour: '12pm', index: 1, value: 120 },
              { hour: '2pm', index: 1, value: 780 },
              { hour: '4pm', index: 1, value: 330 },
              { hour: '6pm', index: 1, value: 90 },
            ]}
          />
        </Chart>
      </Demo>

      <Demo title="RadialBarChart" description="Quota attainment per team.">
        <Chart label="labels">
          <RadialBarChart
            h={280}
            dataKey="value"
            withLabels
            withLegend
            data={[
              { name: 'Sales', value: 92, color: 'indigo.6' },
              { name: 'Support', value: 74, color: 'teal.6' },
              { name: 'Growth', value: 58, color: 'amber.6' },
              { name: 'Design', value: 36, color: 'crimson.6' },
            ]}
          />
        </Chart>
      </Demo>

      <Demo title="FunnelChart" description="Conversion from visitor to customer.">
        <Chart label="labels right">
          <FunnelChart data={funnel} withLabels labelsPosition="right" size={240} w={320} />
        </Chart>
      </Demo>

      <Demo title="Sparkline" description="Compact trend lines for dashboard cards.">
        <Chart label="mrr">
          <Sparkline w={200} h={50} data={[10, 14, 12, 18, 22, 21, 28]} color="teal.6" />
        </Chart>
        <Chart label="churn">
          <Sparkline w={200} h={50} data={[8, 7, 9, 12, 11, 15, 16]} color="crimson.6" />
        </Chart>
        <Chart label="trend colors">
          <Sparkline
            w={200}
            h={50}
            data={[10, 14, 12, 18, 22, 21, 28]}
            trendColors={{ positive: 'teal.6', negative: 'crimson.6', neutral: 'gray.6' }}
          />
        </Chart>
      </Demo>

      <Demo title="Heatmap" description="Daily commit activity.">
        <Chart label="four months">
          <Heatmap data={heatmap} startDate="2025-01-01" endDate="2025-04-30" withTooltip withWeekdayLabels withMonthLabels />
        </Chart>
      </Demo>

      <Demo title="CandlestickChart" description="Weekly share price.">
        <Chart label="weekly">
          <CandlestickChart
            h={260}
            dataKey="week"
            data={[
              { week: 'W1', open: 100, high: 112, low: 96, close: 108 },
              { week: 'W2', open: 108, high: 118, low: 104, close: 103 },
              { week: 'W3', open: 103, high: 110, low: 98, close: 109 },
              { week: 'W4', open: 109, high: 124, low: 107, close: 121 },
              { week: 'W5', open: 121, high: 126, low: 112, close: 115 },
              { week: 'W6', open: 115, high: 130, low: 113, close: 128 },
            ]}
          />
        </Chart>
      </Demo>

      <Demo title="BarsList" description="Top pages by visits.">
        <Chart label="top pages">
          <BarsList
            barsLabel="Page"
            valueLabel="Visits"
            data={[
              { name: '/pricing', value: 4200, color: 'indigo.6' },
              { name: '/docs', value: 3100, color: 'indigo.6' },
              { name: '/blog', value: 1800, color: 'indigo.6' },
              { name: '/changelog', value: 900, color: 'indigo.6' },
            ]}
          />
        </Chart>
      </Demo>

      <Demo title="Treemap" description="Revenue by product line.">
        <Chart label="nested">
          <Treemap
            height={260}
            data={[
              { name: 'Subscriptions', color: 'indigo.6', children: [{ name: 'Pro', value: 480 }, { name: 'Team', value: 320 }] },
              { name: 'Services', color: 'teal.6', children: [{ name: 'Consulting', value: 210 }, { name: 'Training', value: 90 }] },
              { name: 'Marketplace', color: 'amber.6', value: 150 },
            ]}
          />
        </Chart>
      </Demo>

      <Demo title="SankeyChart" description="Traffic sources flowing to plans.">
        <Chart label="flows">
          <SankeyChart
            height={260}
            data={{
              nodes: [
                { name: 'Search', color: 'indigo.6' },
                { name: 'Social', color: 'violet.6' },
                { name: 'Referral', color: 'teal.6' },
                { name: 'Free', color: 'gray.6' },
                { name: 'Pro', color: 'amber.6' },
              ],
              links: [
                { source: 0, target: 3, value: 500 },
                { source: 0, target: 4, value: 200 },
                { source: 1, target: 3, value: 300 },
                { source: 1, target: 4, value: 60 },
                { source: 2, target: 3, value: 120 },
                { source: 2, target: 4, value: 140 },
              ],
            }}
          />
        </Chart>
      </Demo>

      <Demo title="SunburstChart" description="Revenue split by region and plan.">
        <Chart label="labels">
          <SunburstChart
            size={260}
            withLabels
            data={[
              { name: 'Americas', color: 'indigo.6', children: [{ name: 'Pro US', value: 300 }, { name: 'Team US', value: 200 }] },
              { name: 'Europe', color: 'teal.6', children: [{ name: 'Pro EU', value: 240 }, { name: 'Team EU', value: 120 }] },
              { name: 'Asia', color: 'amber.6', children: [{ name: 'Pro APAC', value: 160 }, { name: 'Team APAC', value: 80 }] },
            ]}
          />
        </Chart>
      </Demo>

      <Demo title="BulletChart" description="Quarterly revenue against target.">
        <Chart label="target">
          <BulletChart
            value={72}
            target={85}
            label="Revenue"
            ranges={[
              { value: 50, color: 'gray.3' },
              { value: 80, color: 'gray.2' },
              { value: 100, color: 'gray.1' },
            ]}
            barColor="indigo.6"
          />
        </Chart>
      </Demo>

      <Demo title="GaugeChart" description="Server capacity in use.">
        <Chart label="single color">
          <GaugeChart value={68} label="68%" filledColor="indigo.6" />
        </Chart>
        <Chart label="sections">
          <GaugeChart
            value={85}
            label="85%"
            sections={[
              { value: 50, color: 'teal.6' },
              { value: 80, color: 'amber.6' },
              { value: 100, color: 'crimson.6' },
            ]}
          />
        </Chart>
      </Demo>

      <Demo title="WaffleChart" description="Customer share by plan out of 100.">
        <Chart label="legend">
          <WaffleChart
            withLegend
            data={[
              { name: 'Free', value: 55, color: 'gray.6' },
              { name: 'Pro', value: 28, color: 'indigo.6' },
              { name: 'Team', value: 12, color: 'teal.6' },
              { name: 'Enterprise', value: 5, color: 'amber.6' },
            ]}
          />
        </Chart>
      </Demo>

      <Demo title="MatrixChart" description="Support tickets by weekday and time of day.">
        <Chart label="legend">
          <MatrixChart data={matrix} withLegend />
        </Chart>
      </Demo>
    </Section>
  )
}
