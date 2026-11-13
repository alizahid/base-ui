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

import { Demo, Section } from '../demo'

const accordionVariants = ['default', 'contained', 'filled', 'separated'] as const
const badgeVariants = ['filled', 'light', 'outline', 'dot', 'transparent', 'white', 'default'] as const
const colors = ['blue', 'gray', 'red', 'green', 'amber'] as const
const themeIconVariants = ['filled', 'light', 'outline', 'default', 'transparent', 'white'] as const

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
        <Stack gap="lg">
          {accordionVariants.map((variant) => (
            <Accordion defaultValue={faqs[0].q} key={variant} variant={variant}>
              {faqs.map((item) => (
                <Accordion.Item key={item.q} value={item.q}>
                  <Accordion.Control>{item.q}</Accordion.Control>
                  <Accordion.Panel>{item.a}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          ))}
        </Stack>
      </Demo>

      <Demo title="Avatar" description="Images, initials, icons, variants, colors and groups.">
        <Stack>
          <Group>
            <Avatar alt="Sarah" src="https://i.pravatar.cc/150?img=5" size="sm" />
            <Avatar alt="Marcus" src="https://i.pravatar.cc/150?img=12" />
            <Avatar alt="Priya" radius="xl" size="lg" src="https://i.pravatar.cc/150?img=47" />
            <Avatar>
              <PersonIcon />
            </Avatar>
            <Avatar name="Jane Cooper" color="initials" />
          </Group>
          <Group>
            {(['filled', 'light', 'outline', 'transparent', 'white', 'default'] as const).map((variant) => (
              <Avatar key={variant} variant={variant}>
                {variant.slice(0, 2).toUpperCase()}
              </Avatar>
            ))}
          </Group>
          <Group>
            {colors.map((color) => (
              <Avatar color={color} key={color} variant="light">
                {color.slice(0, 2).toUpperCase()}
              </Avatar>
            ))}
          </Group>
          <Avatar.Group>
            <Avatar src="https://i.pravatar.cc/150?img=1" />
            <Avatar src="https://i.pravatar.cc/150?img=2" />
            <Avatar src="https://i.pravatar.cc/150?img=3" />
            <Avatar>+5</Avatar>
          </Avatar.Group>
        </Stack>
      </Demo>

      <Demo title="Badge" description="All variants, sizes, colors, sections and dot.">
        <Stack>
          {colors.map((color) => (
            <Group key={color}>
              {badgeVariants.map((variant) => (
                <Badge color={color} key={variant} variant={variant}>
                  {variant}
                </Badge>
              ))}
              <Badge color={color} variant="gradient">
                gradient
              </Badge>
            </Group>
          ))}
          <Group>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <Badge key={size} size={size}>
                Size {size}
              </Badge>
            ))}
          </Group>
          <Group>
            <Badge leftSection={<StarIcon />}>Featured</Badge>
            <Badge rightSection={<CheckIcon />} variant="light" color="green">
              Verified
            </Badge>
            <Badge circle color="red">
              3
            </Badge>
            <Badge variant="dot" color="green">
              Online
            </Badge>
          </Group>
        </Stack>
      </Demo>

      <Demo title="Card" description="Product card with image section, badge, text and action.">
        <Card maw={340} padding="lg" withBorder shadow="sm">
          <Card.Section>
            <Image
              alt="Mountain lake"
              h={160}
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"
            />
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
      </Demo>

      <Demo title="ColorSwatch" description="Swatches in a few sizes and colors.">
        <Group>
          {colors.map((color) => (
            <ColorSwatch color={`var(--mantine-color-${color}-6)`} key={color} />
          ))}
          <ColorSwatch color="var(--mantine-color-blue-6)" size={32} withShadow />
          <ColorSwatch color="var(--mantine-color-green-6)" size={40} radius="sm" />
        </Group>
      </Demo>

      <Demo title="DataList" description="Label and value pairs for a customer record.">
        <Stack gap="lg">
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
        </Stack>
      </Demo>

      <Demo title="Image" description="Rounded, fixed-height image with fallback.">
        <Group align="flex-start">
          <Image alt="Desert" h={140} radius="md" src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600" w={220} />
          <Image alt="Broken" fallbackSrc="https://placehold.co/220x140?text=Fallback" h={140} radius="md" src="https://invalid.example/missing.jpg" w={220} />
        </Group>
      </Demo>

      <Demo title="BackgroundImage" description="Image as a container background.">
        <BackgroundImage maw={420} radius="md" src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800">
          <Stack h={160} justify="flex-end" p="md">
            <Badge>Misty valley</Badge>
          </Stack>
        </BackgroundImage>
      </Demo>

      <Demo title="Indicator" description="Dot, count, processing and positions.">
        <Group gap="xl">
          <Indicator>
            <Avatar src="https://i.pravatar.cc/150?img=32" />
          </Indicator>
          <Indicator color="red" label="4" size={16}>
            <Avatar>
              <BellIcon />
            </Avatar>
          </Indicator>
          <Indicator color="green" processing position="bottom-end">
            <Avatar src="https://i.pravatar.cc/150?img=15" />
          </Indicator>
          <Indicator color="amber" label="99+" size={18} withBorder>
            <Avatar>
              <HeartIcon />
            </Avatar>
          </Indicator>
        </Group>
      </Demo>

      <Demo title="Kbd" description="Keyboard shortcuts.">
        <Group>
          <Text size="sm">Open palette</Text>
          <Group gap={4}>
            <Kbd>Ctrl</Kbd>
            <Text size="sm">+</Text>
            <Kbd>K</Kbd>
          </Group>
          <Kbd size="lg">Esc</Kbd>
          <Kbd size="xs">Tab</Kbd>
        </Group>
      </Demo>

      <Demo title="NumberFormatter" description="Currency, percentage and grouped numbers.">
        <Stack gap="xs">
          <NumberFormatter prefix="$" thousandSeparator value={1234567.89} decimalScale={2} />
          <NumberFormatter suffix="%" value={72.5} />
          <NumberFormatter thousandSeparator="." decimalSeparator="," suffix=" €" value={98765.4} />
        </Stack>
      </Demo>

      <Demo title="RollingNumber" description="Animated number; click to change the value.">
        <Group>
          <Text component="div" fw={700} size="xl">
            <RollingNumber decimalScale={0} prefix="$" thousandSeparator value={revenue} />
          </Text>
          <Button onClick={() => setRevenue(Math.round(1000 + Math.random() * 90000))} variant="light">
            Update revenue
          </Button>
        </Group>
      </Demo>

      <Demo title="Spoiler" description="Long text clipped behind a show more control.">
        <Spoiler hideLabel="Show less" maxHeight={60} maw={480} showLabel="Show more">
          <Text size="sm">
            Our platform brings your team's work together in one place. Track projects from first idea to final delivery,
            share progress with stakeholders, and automate the repetitive steps in between. Integrations with the tools
            you already use mean there is nothing to migrate and nothing to relearn. Every plan includes unlimited
            projects, granular permissions, and priority support during business hours.
          </Text>
        </Spoiler>
      </Demo>

      <Demo title="ThemeIcon" description="Icon containers in each variant and color.">
        <Stack>
          {colors.map((color) => (
            <Group key={color}>
              {themeIconVariants.map((variant) => (
                <ThemeIcon color={color} key={variant} variant={variant}>
                  <RocketIcon />
                </ThemeIcon>
              ))}
              <ThemeIcon color={color} variant="gradient">
                <RocketIcon />
              </ThemeIcon>
            </Group>
          ))}
          <Group>
            <ThemeIcon size="sm">
              <StarIcon />
            </ThemeIcon>
            <ThemeIcon size="lg">
              <StarIcon />
            </ThemeIcon>
            <ThemeIcon size="xl" radius="xl">
              <StarIcon />
            </ThemeIcon>
          </Group>
        </Stack>
      </Demo>

      <Demo title="Timeline" description="Order history with an active step.">
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
      </Demo>

      <Demo title="Marquee" description="Continuously scrolling logos or tags.">
        <Marquee duration={30000} pauseOnHover>
          {['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma', 'Slack', 'GitHub'].map((name) => (
            <Badge key={name} size="xl" variant="default">
              {name}
            </Badge>
          ))}
        </Marquee>
      </Demo>

      <Demo title="OverflowList" description="Items collapse into a +N badge when they do not fit.">
        <OverflowList
          data={tags}
          maw={360}
          renderItem={(item) => <Badge key={item}>{item}</Badge>}
          renderOverflow={(items) => <Badge variant="light">+{items.length} more</Badge>}
        />
      </Demo>
    </Section>
  )
}
