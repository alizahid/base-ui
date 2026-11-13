import {
  Accordion,
  Avatar,
  BackgroundImage,
  Badge,
  Button,
  Card,
  ColorSwatch,
  DataList,
  Group,
  Image,
  Indicator,
  Kbd,
  Marquee,
  NumberFormatter,
  OverflowList,
  RollingNumber,
  Spoiler,
  Stack,
  Text,
  ThemeIcon,
  Timeline,
} from '@mantine/core'
import { BellIcon, CheckIcon, HeartIcon, PersonIcon, RocketIcon, StarIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import * as RT from '@radix-ui/themes'
import { Demo, Row, Section } from '../demo'

const accordionVariants = ['default', 'contained', 'filled', 'separated'] as const
const colors = ['blue', 'gray', 'red', 'green', 'amber'] as const
const themeIconVariants = ['filled', 'light', 'outline', 'default', 'transparent', 'white', 'gradient'] as const
const cardImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800'
const pravatar = (n: number) => `https://i.pravatar.cc/150?img=${n}`

const faqs = [
  { q: 'Can I change plans later?', a: 'Yes. Upgrades apply immediately and downgrades take effect at the end of the billing period.' },
  { q: 'Do you offer refunds?', a: 'We refund annual plans within 30 days of purchase, no questions asked.' },
  { q: 'How do I invite teammates?', a: 'Open Settings, choose Members, and send an invite by email. Seats are prorated.' },
]

const tags = ['Design', 'Frontend', 'Backend', 'Mobile', 'DevOps', 'Security', 'Data', 'Research', 'Support', 'Marketing', 'Sales', 'Finance']

export function DataDisplaySection() {
  const [revenue, setRevenue] = useState(12840)

  return (
    <Section title="Data display">
      <Demo title="Accordion" description="Collapsible FAQ panels in every variant.">
        {accordionVariants.map((variant) => (
          <Row key={variant} label={variant}>
            <Accordion defaultValue={faqs[0].q} variant={variant}>
              {faqs.map((item) => (
                <Accordion.Item key={item.q} value={item.q}>
                  <Accordion.Control>{item.q}</Accordion.Control>
                  <Accordion.Panel>{item.a}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Row>
        ))}
      </Demo>

      <Demo title="Avatar" description="Images, initials, icons, variants, colors and groups." radix="Avatar">
        <Row label="image, size sm / 2" radix={<RT.Avatar size="2" src={pravatar(5)} fallback="S" />}>
          <Avatar alt="Sarah" src={pravatar(5)} size="sm" />
        </Row>
        <Row label="image, size md / 3" radix={<RT.Avatar size="3" src={pravatar(12)} fallback="M" />}>
          <Avatar alt="Marcus" src={pravatar(12)} />
        </Row>
        <Row label="image, size lg / 4, round" radix={<RT.Avatar size="4" radius="full" src={pravatar(47)} fallback="P" />}>
          <Avatar alt="Priya" radius="xl" size="lg" src={pravatar(47)} />
        </Row>
        <Row label="icon" radix={<RT.Avatar color="gray" fallback={<PersonIcon />} />}>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </Row>
        <Row label="initials from name">
          <Avatar name="Jane Cooper" color="initials" />
        </Row>
        <Row label="filled / solid" radix={<RT.Avatar variant="solid" color="gray" fallback="FI" />}>
          <Avatar variant="filled">FI</Avatar>
        </Row>
        <Row label="light / soft" radix={<RT.Avatar variant="soft" color="gray" fallback="LI" />}>
          <Avatar variant="light">LI</Avatar>
        </Row>
        {(['outline', 'transparent', 'white', 'default'] as const).map((variant) => (
          <Row key={variant} label={variant}>
            <Avatar variant={variant}>{variant.slice(0, 2).toUpperCase()}</Avatar>
          </Row>
        ))}
        {colors.map((color) => (
          <Row key={color} label={`color ${color}`} radix={<RT.Avatar color={color} fallback={color.slice(0, 2).toUpperCase()} />}>
            <Avatar color={color} variant="light">
              {color.slice(0, 2).toUpperCase()}
            </Avatar>
          </Row>
        ))}
        <Row label="group">
          <Avatar.Group>
            <Avatar src={pravatar(1)} />
            <Avatar src={pravatar(2)} />
            <Avatar src={pravatar(3)} />
            <Avatar>+5</Avatar>
          </Avatar.Group>
        </Row>
      </Demo>

      <Demo title="Badge" description="All variants, sizes, colors, sections and dot." radix="Badge">
        {(
          [
            ['filled', 'solid'],
            ['light', 'soft'],
            ['outline', 'outline'],
            ['surface', 'surface'],
          ] as const
        ).map(([m, r]) => (
          <Row key={m} label={`${m} / ${r}`} radix={<RT.Badge size="2" variant={r}>{m}</RT.Badge>}>
            <Badge variant={m}>{m}</Badge>
          </Row>
        ))}
        {(['dot', 'transparent', 'white', 'default', 'gradient'] as const).map((variant) => (
          <Row key={variant} label={variant}>
            <Badge variant={variant}>{variant}</Badge>
          </Row>
        ))}
        {colors.map((color) => (
          <Row key={color} label={`color ${color}`} radix={<RT.Badge size="2" color={color}>{color}</RT.Badge>}>
            <Badge color={color} variant="light">
              {color}
            </Badge>
          </Row>
        ))}
        {(
          [
            ['xs', '1'],
            ['sm', '1'],
            ['md', '2'],
            ['lg', '3'],
            ['xl', undefined],
          ] as const
        ).map(([size, r]) => (
          <Row
            key={size}
            label={r ? `size ${size} / ${r}` : `size ${size}`}
            radix={r && <RT.Badge size={r} variant="solid">Size {size}</RT.Badge>}
          >
            <Badge size={size}>Size {size}</Badge>
          </Row>
        ))}
        <Row
          label="left icon"
          radix={
            <RT.Badge size="2" variant="solid">
              <StarIcon />
              Featured
            </RT.Badge>
          }
        >
          <Badge leftSection={<StarIcon />}>Featured</Badge>
        </Row>
        <Row
          label="right icon"
          radix={
            <RT.Badge size="2" color="green">
              Verified
              <CheckIcon />
            </RT.Badge>
          }
        >
          <Badge rightSection={<CheckIcon />} variant="light" color="green">
            Verified
          </Badge>
        </Row>
        <Row label="circle">
          <Badge circle color="red">
            3
          </Badge>
        </Row>
        <Row label="dot, color green">
          <Badge variant="dot" color="green">
            Online
          </Badge>
        </Row>
      </Demo>

      <Demo title="Card" description="Product card with image section, badge, text and action." radix="Card">
        <Row
          label="with image"
          radix={
            <RT.Card size="3" style={{ maxWidth: 340 }}>
              <RT.Inset clip="padding-box" side="top" pb="current">
                <img alt="Mountain lake" src={cardImage} style={{ display: 'block', objectFit: 'cover', width: '100%', height: 160 }} />
              </RT.Inset>
              <RT.Flex justify="between" align="center" mb="2">
                <RT.Text weight="medium">Lake Tahoe weekend</RT.Text>
                <RT.Badge size="2" variant="solid" color="green">
                  On sale
                </RT.Badge>
              </RT.Flex>
              <RT.Text as="p" color="gray" size="2">
                Two nights in a lakeside cabin with kayak rental and breakfast included.
              </RT.Text>
              <RT.Button mt="4" style={{ width: '100%' }}>
                Book now
              </RT.Button>
            </RT.Card>
          }
        >
          <Card maw={340} padding="lg" withBorder shadow="sm">
            <Card.Section>
              <Image alt="Mountain lake" h={160} src={cardImage} />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={600}>Lake Tahoe weekend</Text>
              <Badge color="green">On sale</Badge>
            </Group>
            <Text c="dimmed" size="sm">
              Two nights in a lakeside cabin with kayak rental and breakfast included.
            </Text>
            <Button fullWidth mt="md">
              Book now
            </Button>
          </Card>
        </Row>
      </Demo>

      <Demo title="ColorSwatch" description="Swatches in a few sizes and colors.">
        {colors.map((color) => (
          <Row key={color} label={`color ${color}`}>
            <ColorSwatch color={`var(--mantine-color-${color}-6)`} />
          </Row>
        ))}
        <Row label="size 32, shadow">
          <ColorSwatch color="var(--mantine-color-blue-6)" size={32} withShadow />
        </Row>
        <Row label="size 40, radius sm">
          <ColorSwatch color="var(--mantine-color-green-6)" size={40} radius="sm" />
        </Row>
      </Demo>

      <Demo title="DataList" description="Label and value pairs for a customer record." radix="DataList">
        <Row
          label="horizontal"
          radix={
            <RT.DataList.Root>
              <RT.DataList.Item>
                <RT.DataList.Label>Customer</RT.DataList.Label>
                <RT.DataList.Value>Acme Industries</RT.DataList.Value>
              </RT.DataList.Item>
              <RT.DataList.Item align="center">
                <RT.DataList.Label>Plan</RT.DataList.Label>
                <RT.DataList.Value>
                  <RT.Badge size="2" variant="solid">
                    Business
                  </RT.Badge>
                </RT.DataList.Value>
              </RT.DataList.Item>
              <RT.DataList.Item>
                <RT.DataList.Label>Renewal date</RT.DataList.Label>
                <RT.DataList.Value>March 14, 2027</RT.DataList.Value>
              </RT.DataList.Item>
            </RT.DataList.Root>
          }
        >
          <DataList withDivider>
            <DataList.Item>
              <DataList.ItemLabel>Customer</DataList.ItemLabel>
              <DataList.ItemValue>Acme Industries</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Plan</DataList.ItemLabel>
              <DataList.ItemValue>
                <Badge>Business</Badge>
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Renewal date</DataList.ItemLabel>
              <DataList.ItemValue>March 14, 2027</DataList.ItemValue>
            </DataList.Item>
          </DataList>
        </Row>
        <Row
          label="vertical, size md / 3"
          radix={
            <RT.DataList.Root orientation="vertical" size="3">
              <RT.DataList.Item>
                <RT.DataList.Label>Billing email</RT.DataList.Label>
                <RT.DataList.Value>billing@acme.com</RT.DataList.Value>
              </RT.DataList.Item>
              <RT.DataList.Item>
                <RT.DataList.Label>Seats</RT.DataList.Label>
                <RT.DataList.Value>42 of 50 used</RT.DataList.Value>
              </RT.DataList.Item>
            </RT.DataList.Root>
          }
        >
          <DataList orientation="vertical" size="md">
            <DataList.Item>
              <DataList.ItemLabel>Billing email</DataList.ItemLabel>
              <DataList.ItemValue>billing@acme.com</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Seats</DataList.ItemLabel>
              <DataList.ItemValue>42 of 50 used</DataList.ItemValue>
            </DataList.Item>
          </DataList>
        </Row>
      </Demo>

      <Demo title="Image" description="Rounded, fixed-height image with fallback.">
        <Row label="radius md">
          <Image alt="Desert" h={140} radius="md" src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600" w={220} />
        </Row>
        <Row label="fallback">
          <Image alt="Broken" fallbackSrc="https://placehold.co/220x140?text=Fallback" h={140} radius="md" src="https://invalid.example/missing.jpg" w={220} />
        </Row>
      </Demo>

      <Demo title="BackgroundImage" description="Image as a container background.">
        <Row>
          <BackgroundImage maw={420} radius="md" src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800">
            <Stack h={160} justify="flex-end" p="md">
              <Badge>Misty valley</Badge>
            </Stack>
          </BackgroundImage>
        </Row>
      </Demo>

      <Demo title="Indicator" description="Dot, count, processing and positions.">
        <Row label="dot">
          <Indicator inline>
            <Avatar src={pravatar(32)} />
          </Indicator>
        </Row>
        <Row label="count, color red">
          <Indicator inline color="red" label="4" size={16}>
            <Avatar>
              <BellIcon />
            </Avatar>
          </Indicator>
        </Row>
        <Row label="processing, bottom end">
          <Indicator inline color="green" processing position="bottom-end">
            <Avatar src={pravatar(15)} />
          </Indicator>
        </Row>
        <Row label="with border">
          <Indicator inline color="amber" label="99+" size={18} withBorder>
            <Avatar>
              <HeartIcon />
            </Avatar>
          </Indicator>
        </Row>
      </Demo>

      <Demo title="Kbd" description="Keyboard shortcuts." radix="Kbd">
        <Row
          label="in a sentence"
          radix={
            <RT.Flex align="center" gap="2">
              <RT.Text size="2">Open palette</RT.Text>
              <RT.Flex align="center" gap="1">
                <RT.Kbd>Ctrl</RT.Kbd>
                <RT.Text size="2">+</RT.Text>
                <RT.Kbd>K</RT.Kbd>
              </RT.Flex>
            </RT.Flex>
          }
        >
          <Group gap="xs">
            <Text size="sm">Open palette</Text>
            <Group gap={4}>
              <Kbd>Ctrl</Kbd>
              <Text size="sm">+</Text>
              <Kbd>K</Kbd>
            </Group>
          </Group>
        </Row>
        <Row label="size xs / 1" radix={<RT.Kbd size="1">Tab</RT.Kbd>}>
          <Kbd size="xs">Tab</Kbd>
        </Row>
        <Row label="size sm / 2" radix={<RT.Kbd size="2">Tab</RT.Kbd>}>
          <Kbd size="sm">Tab</Kbd>
        </Row>
        <Row label="size md / 3" radix={<RT.Kbd size="3">Tab</RT.Kbd>}>
          <Kbd size="md">Tab</Kbd>
        </Row>
        <Row label="size lg / 4" radix={<RT.Kbd size="4">Esc</RT.Kbd>}>
          <Kbd size="lg">Esc</Kbd>
        </Row>
      </Demo>

      <Demo title="NumberFormatter" description="Currency, percentage and grouped numbers.">
        <Row label="currency">
          <NumberFormatter prefix="$" thousandSeparator value={1234567.89} decimalScale={2} />
        </Row>
        <Row label="percentage">
          <NumberFormatter suffix="%" value={72.5} />
        </Row>
        <Row label="custom separators">
          <NumberFormatter thousandSeparator="." decimalSeparator="," suffix=" €" value={98765.4} />
        </Row>
      </Demo>

      <Demo title="RollingNumber" description="Animated number; click to change the value.">
        <Row label="value">
          <Text component="div" fw={700} size="xl">
            <RollingNumber decimalScale={0} prefix="$" thousandSeparator value={revenue} />
          </Text>
        </Row>
        <Row label="trigger">
          <Button onClick={() => setRevenue(Math.round(1000 + Math.random() * 90000))} variant="light">
            Update revenue
          </Button>
        </Row>
      </Demo>

      <Demo title="Spoiler" description="Long text clipped behind a show more control.">
        <Row>
          <Spoiler hideLabel="Show less" maxHeight={60} maw={480} showLabel="Show more">
            <Text size="sm">
              Our platform brings your team's work together in one place. Track projects from first idea to final delivery,
              share progress with stakeholders, and automate the repetitive steps in between. Integrations with the tools
              you already use mean there is nothing to migrate and nothing to relearn. Every plan includes unlimited
              projects, granular permissions, and priority support during business hours.
            </Text>
          </Spoiler>
        </Row>
      </Demo>

      <Demo title="ThemeIcon" description="Icon containers in each variant and color.">
        {themeIconVariants.map((variant) => (
          <Row key={variant} label={variant}>
            <ThemeIcon variant={variant}>
              <RocketIcon />
            </ThemeIcon>
          </Row>
        ))}
        {colors.map((color) => (
          <Row key={color} label={`color ${color}`}>
            <ThemeIcon color={color} variant="light">
              <RocketIcon />
            </ThemeIcon>
          </Row>
        ))}
        <Row label="size sm">
          <ThemeIcon size="sm">
            <StarIcon />
          </ThemeIcon>
        </Row>
        <Row label="size lg">
          <ThemeIcon size="lg">
            <StarIcon />
          </ThemeIcon>
        </Row>
        <Row label="size xl, round">
          <ThemeIcon size="xl" radius="xl">
            <StarIcon />
          </ThemeIcon>
        </Row>
      </Demo>

      <Demo title="Timeline" description="Order history with an active step.">
        <Row>
          <Timeline active={2} bulletSize={24}>
            <Timeline.Item bullet={<CheckIcon />} title="Order placed">
              <Text c="dimmed" size="sm">
                Your order #4821 was received.
              </Text>
              <Text size="xs">Nov 10, 9:12 AM</Text>
            </Timeline.Item>
            <Timeline.Item bullet={<CheckIcon />} title="Packed">
              <Text c="dimmed" size="sm">
                The warehouse finished packing.
              </Text>
              <Text size="xs">Nov 11, 2:40 PM</Text>
            </Timeline.Item>
            <Timeline.Item bullet={<RocketIcon />} title="Shipped" lineVariant="dashed">
              <Text c="dimmed" size="sm">
                Handed to the carrier.
              </Text>
              <Text size="xs">Nov 12, 8:05 AM</Text>
            </Timeline.Item>
            <Timeline.Item title="Delivered">
              <Text c="dimmed" size="sm">
                Expected Nov 15.
              </Text>
            </Timeline.Item>
          </Timeline>
        </Row>
      </Demo>

      <Demo title="Marquee" description="Continuously scrolling logos or tags.">
        <Row>
          <Marquee duration={30000} pauseOnHover>
            {['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma', 'Slack', 'GitHub'].map((name) => (
              <Badge key={name} size="xl" variant="default">
                {name}
              </Badge>
            ))}
          </Marquee>
        </Row>
      </Demo>

      <Demo title="OverflowList" description="Items collapse into a +N badge when they do not fit.">
        <Row>
          <OverflowList
            data={tags}
            maw={360}
            renderItem={(item) => <Badge key={item}>{item}</Badge>}
            renderOverflow={(items) => <Badge variant="light">+{items.length} more</Badge>}
          />
        </Row>
      </Demo>
    </Section>
  )
}
