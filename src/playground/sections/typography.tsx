import {
  Anchor,
  Badge,
  Blockquote,
  Code,
  Highlight,
  List,
  Mark,
  Table,
  Text,
  ThemeIcon,
  Title,
  Typography,
} from '@mantine/core'
import { CheckIcon, InfoCircledIcon } from '@radix-ui/react-icons'

import * as RT from '@radix-ui/themes'
import { Demo, Row, Section } from '../demo'

const invoices = [
  { id: 'INV-1041', customer: 'Acme Industries', amount: '$2,400.00', status: 'Paid', color: 'green' },
  { id: 'INV-1042', customer: 'Globex Corp', amount: '$890.50', status: 'Pending', color: 'amber' },
  { id: 'INV-1043', customer: 'Initech', amount: '$5,120.00', status: 'Overdue', color: 'red' },
  { id: 'INV-1044', customer: 'Umbrella Labs', amount: '$315.00', status: 'Draft', color: 'gray' },
] as const

const QUOTE = 'The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves.'
const FOX = 'The quick brown fox jumps over the lazy dog.'
const LONG_NAME = 'A very long project name that will not fit on a single line'

// Mantine Title order → Radix Heading size (35/28/24/20/18/16px)
const headings = [
  [1, '8'],
  [2, '7'],
  [3, '6'],
  [4, '5'],
  [5, '4'],
  [6, '3'],
] as const
// Mantine Text size → Radix Text size (12/14/16/18/20px)
const textSizes = [
  ['xs', '1'],
  ['sm', '2'],
  ['md', '3'],
  ['lg', '4'],
  ['xl', '5'],
] as const
const weights = [
  [400, 'regular'],
  [500, 'medium'],
  [700, 'bold'],
] as const

export function TypographySection() {
  const rows = invoices.map((invoice) => (
    <Table.Tr key={invoice.id}>
      <Table.Td>{invoice.id}</Table.Td>
      <Table.Td>{invoice.customer}</Table.Td>
      <Table.Td>{invoice.amount}</Table.Td>
      <Table.Td>
        <Badge color={invoice.color} variant="light">
          {invoice.status}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Section title="Typography">
      <Demo title="Title" description="Heading orders 1 to 6." radix="Heading">
        {headings.map(([order, size]) => (
          <Row
            key={order}
            label={`order ${order} / size ${size}`}
            radix={
              <RT.Heading as={`h${order}`} size={size}>
                Heading level {order}
              </RT.Heading>
            }
          >
            <Title order={order}>Heading level {order}</Title>
          </Row>
        ))}
      </Demo>

      <Demo title="Text" description="Sizes, weights, dimmed, truncation, clamping and gradient." radix="Text">
        {textSizes.map(([m, r]) => (
          <Row
            key={m}
            label={`size ${m} / ${r}`}
            radix={
              <RT.Text as="p" size={r}>
                {FOX}
              </RT.Text>
            }
          >
            <Text size={m}>{FOX}</Text>
          </Row>
        ))}
        {weights.map(([m, r]) => (
          <Row
            key={m}
            label={`weight ${m} / ${r}`}
            radix={
              <RT.Text as="p" weight={r}>
                Weight {m}
              </RT.Text>
            }
          >
            <Text fw={m}>Weight {m}</Text>
          </Row>
        ))}
        <Row
          label="dimmed / gray"
          radix={
            <RT.Text as="p" color="gray">
              Dimmed secondary text for hints and captions.
            </RT.Text>
          }
        >
          <Text c="dimmed">Dimmed secondary text for hints and captions.</Text>
        </Row>
        <Row
          label="truncate"
          radix={
            <RT.Text as="p" truncate style={{ maxWidth: 260 }}>
              {LONG_NAME}
            </RT.Text>
          }
        >
          <Text maw={260} truncate="end">
            {LONG_NAME}
          </Text>
        </Row>
        <Row label="line clamp">
          <Text lineClamp={2} maw={320}>
            Line clamp keeps long descriptions tidy by cutting them after two lines, so cards in a grid stay the same
            height no matter how much copy the author wrote for each of them.
          </Text>
        </Row>
        <Row label="gradient">
          <Text fw={700} gradient={{ from: 'blue', to: 'green', deg: 90 }} size="xl" variant="gradient">
            Gradient headline text
          </Text>
        </Row>
      </Demo>

      <Demo title="Blockquote" description="Quote with icon and citation." radix="Blockquote">
        <Row label="plain" radix={<RT.Blockquote size="3">{QUOTE}</RT.Blockquote>}>
          <Blockquote>{QUOTE}</Blockquote>
        </Row>
        <Row label="icon and cite">
          <Blockquote cite="Ada Lovelace, 1843" icon={<InfoCircledIcon />}>
            {QUOTE}
          </Blockquote>
        </Row>
      </Demo>

      <Demo title="Code" description="Inline and block code." radix="Code">
        <Row
          label="inline"
          radix={
            <RT.Text as="p">
              Run <RT.Code>bun install</RT.Code> to set up.
            </RT.Text>
          }
        >
          <Text>
            Run <Code>bun install</Code> to set up.
          </Text>
        </Row>
        <Row
          label="color blue"
          radix={
            <RT.Text as="p">
              Then <RT.Code color="blue">bun dev</RT.Code> to start.
            </RT.Text>
          }
        >
          <Text>
            Then <Code color="blue">bun dev</Code> to start.
          </Text>
        </Row>
        <Row label="block">
          <Code block>{`export function greet(name: string) {\n  return \`Hello, \${name}!\`\n}`}</Code>
        </Row>
      </Demo>

      <Demo title="Highlight" description="Highlight search terms in text.">
        <Row label="one term">
          <Highlight highlight="billing">Update your billing details to avoid interruptions to billing.</Highlight>
        </Row>
        <Row label="color green">
          <Highlight color="green" highlight={['export', 'import']}>
            You can import contacts from CSV and export reports at any time.
          </Highlight>
        </Row>
      </Demo>

      <Demo title="Mark" description="Marked text inside a paragraph.">
        <Row label="default">
          <Text>
            Deadline is <Mark>Friday at 5 PM</Mark>.
          </Text>
        </Row>
        <Row label="color red">
          <Text>
            The review is <Mark color="red">blocked</Mark> until then.
          </Text>
        </Row>
      </Demo>

      <Demo title="List" description="Ordered, unordered, icons and nested.">
        <Row label="unordered">
          <List>
            <List.Item>Create a workspace</List.Item>
            <List.Item>Invite your team</List.Item>
            <List.Item>Connect your first integration</List.Item>
          </List>
        </Row>
        <Row label="ordered">
          <List type="ordered">
            <List.Item>Install the CLI</List.Item>
            <List.Item>Authenticate</List.Item>
            <List.Item>Deploy your project</List.Item>
          </List>
        </Row>
        <Row label="with icons">
          <List
            center
            icon={
              <ThemeIcon radius="xl" size={20}>
                <CheckIcon />
              </ThemeIcon>
            }
            spacing="xs"
          >
            <List.Item>Unlimited projects</List.Item>
            <List.Item>Priority support</List.Item>
            <List.Item>Single sign-on</List.Item>
          </List>
        </Row>
        <Row label="nested">
          <List withPadding>
            <List.Item>
              Frontend
              <List listStyleType="circle" withPadding>
                <List.Item>React</List.Item>
                <List.Item>TypeScript</List.Item>
              </List>
            </List.Item>
            <List.Item>Backend</List.Item>
          </List>
        </Row>
      </Demo>

      <Demo title="Table" description="Invoices table plus the data prop." radix="Table">
        <Row
          label="bordered / surface"
          radix={
            <RT.Table.Root variant="surface">
              <RT.Table.Header>
                <RT.Table.Row>
                  <RT.Table.ColumnHeaderCell>Invoice</RT.Table.ColumnHeaderCell>
                  <RT.Table.ColumnHeaderCell>Customer</RT.Table.ColumnHeaderCell>
                  <RT.Table.ColumnHeaderCell>Amount</RT.Table.ColumnHeaderCell>
                  <RT.Table.ColumnHeaderCell>Status</RT.Table.ColumnHeaderCell>
                </RT.Table.Row>
              </RT.Table.Header>
              <RT.Table.Body>
                {invoices.map((invoice) => (
                  <RT.Table.Row key={invoice.id}>
                    <RT.Table.Cell>{invoice.id}</RT.Table.Cell>
                    <RT.Table.Cell>{invoice.customer}</RT.Table.Cell>
                    <RT.Table.Cell>{invoice.amount}</RT.Table.Cell>
                    <RT.Table.Cell>
                      <RT.Badge color={invoice.color}>{invoice.status}</RT.Badge>
                    </RT.Table.Cell>
                  </RT.Table.Row>
                ))}
              </RT.Table.Body>
            </RT.Table.Root>
          }
        >
          <Table highlightOnHover striped withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Invoice</Table.Th>
                <Table.Th>Customer</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Row>
        <Row label="data prop, column borders">
          <Table
            data={{
              caption: 'Team members',
              head: ['Name', 'Role', 'Location'],
              body: [
                ['Sarah Chen', 'Designer', 'Singapore'],
                ['Marcus Webb', 'Engineer', 'Berlin'],
                ['Priya Patel', 'Product manager', 'Toronto'],
              ],
            }}
            withColumnBorders
            withTableBorder
          />
        </Row>
      </Demo>

      <Demo title="Typography" description="Styled rich HTML content such as articles.">
        <Row label="article">
          <Typography maw={560}>
            <h2>Shipping faster with small batches</h2>
            <p>
              Teams that release in <strong>small batches</strong> find problems sooner and recover faster. Read the{' '}
              <a href="https://mantine.dev">full guide</a> for details.
            </p>
            <h3>What to try first</h3>
            <ul>
              <li>Merge to main at least once a day</li>
              <li>Keep pull requests under 200 lines</li>
              <li>
                Run <code>bun test</code> before every push
              </li>
            </ul>
            <blockquote>If it hurts, do it more often.</blockquote>
            <p>
              <Anchor href="https://mantine.dev">Learn more</Anchor> about continuous delivery.
            </p>
          </Typography>
        </Row>
      </Demo>
    </Section>
  )
}
