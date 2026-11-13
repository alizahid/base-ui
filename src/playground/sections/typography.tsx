import {
  Anchor,
  Badge,
  Blockquote,
  Code,
  Highlight,
  List,
  Mark,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
  Typography,
} from '@mantine/core'
import { CheckIcon, InfoCircledIcon } from '@radix-ui/react-icons'

import { Demo, Section } from '../demo'

const invoices = [
  { id: 'INV-1041', customer: 'Acme Industries', amount: '$2,400.00', status: 'Paid', color: 'green' },
  { id: 'INV-1042', customer: 'Globex Corp', amount: '$890.50', status: 'Pending', color: 'amber' },
  { id: 'INV-1043', customer: 'Initech', amount: '$5,120.00', status: 'Overdue', color: 'red' },
  { id: 'INV-1044', customer: 'Umbrella Labs', amount: '$315.00', status: 'Draft', color: 'gray' },
]

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
      <Demo title="Title" description="Heading orders 1 to 6.">
        <Stack gap="xs">
          {([1, 2, 3, 4, 5, 6] as const).map((order) => (
            <Title key={order} order={order}>
              Heading level {order}
            </Title>
          ))}
        </Stack>
      </Demo>

      <Demo title="Text" description="Sizes, weights, dimmed, truncation, clamping and gradient.">
        <Stack gap="sm">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <Text key={size} size={size}>
              Size {size}: The quick brown fox jumps over the lazy dog.
            </Text>
          ))}
          <Text fw={400}>Weight 400</Text>
          <Text fw={500}>Weight 500</Text>
          <Text fw={700}>Weight 700</Text>
          <Text c="dimmed">Dimmed secondary text for hints and captions.</Text>
          <Text maw={260} truncate="end">
            A very long project name that will not fit on a single line
          </Text>
          <Text lineClamp={2} maw={320}>
            Line clamp keeps long descriptions tidy by cutting them after two lines, so cards in a grid stay the same
            height no matter how much copy the author wrote for each of them.
          </Text>
          <Text fw={700} gradient={{ from: 'blue', to: 'green', deg: 90 }} size="xl" variant="gradient">
            Gradient headline text
          </Text>
        </Stack>
      </Demo>

      <Demo title="Blockquote" description="Quote with icon and citation.">
        <Blockquote cite="Ada Lovelace, 1843" icon={<InfoCircledIcon />}>
          The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves.
        </Blockquote>
      </Demo>

      <Demo title="Code" description="Inline and block code.">
        <Stack>
          <Text>
            Run <Code>bun install</Code> then <Code color="blue">bun dev</Code> to start.
          </Text>
          <Code block>{`export function greet(name: string) {\n  return \`Hello, \${name}!\`\n}`}</Code>
        </Stack>
      </Demo>

      <Demo title="Highlight" description="Highlight search terms in text.">
        <Stack>
          <Highlight highlight="billing">Update your billing details to avoid interruptions to billing.</Highlight>
          <Highlight color="green" highlight={['export', 'import']}>
            You can import contacts from CSV and export reports at any time.
          </Highlight>
        </Stack>
      </Demo>

      <Demo title="Mark" description="Marked text inside a paragraph.">
        <Text>
          Deadline is <Mark>Friday at 5 PM</Mark>, and the review is <Mark color="red">blocked</Mark> until then.
        </Text>
      </Demo>

      <Demo title="List" description="Ordered, unordered, icons and nested.">
        <Stack>
          <List>
            <List.Item>Create a workspace</List.Item>
            <List.Item>Invite your team</List.Item>
            <List.Item>Connect your first integration</List.Item>
          </List>
          <List type="ordered">
            <List.Item>Install the CLI</List.Item>
            <List.Item>Authenticate</List.Item>
            <List.Item>Deploy your project</List.Item>
          </List>
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
        </Stack>
      </Demo>

      <Demo title="Table" description="Invoices table plus the data prop.">
        <Stack gap="xl">
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
        </Stack>
      </Demo>

      <Demo title="Typography" description="Styled rich HTML content such as articles.">
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
      </Demo>
    </Section>
  )
}
