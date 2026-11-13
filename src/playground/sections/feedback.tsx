import {
  Alert,
  Button,
  Card,
  EmptyState,
  Group,
  Loader,
  Notification,
  Progress,
  RingProgress,
  SemiCircleProgress,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core'
import { CheckCircledIcon, ExclamationTriangleIcon, InfoCircledIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as RT from '@radix-ui/themes'

import { Demo, Row, Section } from '../demo'

const W = 420
const trial = 'Your trial ends in 3 days. Add a payment method to keep your projects.'
const build = 'Build #482 finished in 2m 14s on the production branch.'

// Mantine variant → Radix Callout variant (Callout has no solid, white or transparent look)
const alertVariants = [
  ['light', 'soft'],
  ['outline', 'outline'],
  ['default', 'surface'],
  ['filled', undefined],
  ['white', undefined],
  ['transparent', undefined],
] as const
const colors = ['gray', 'red', 'green', 'amber'] as const
const loaderSizes = [
  ['xs', '1'],
  ['sm', '2'],
  ['md', '3'],
  ['lg', undefined],
] as const
const progressSizes = [
  ['xs', '1'],
  ['sm', '2'],
  ['md', '3'],
  ['lg', undefined],
  ['xl', undefined],
] as const

/** A Radix Callout with a bold first line, standing in for Mantine's Alert title + message. */
function Callout({
  title,
  children,
  icon = <InfoCircledIcon />,
  ...props
}: { title: string; children: string; icon?: React.ReactNode } & RT.Callout.RootProps) {
  return (
    <RT.Callout.Root style={{ maxWidth: W }} {...props}>
      <RT.Callout.Icon>{icon}</RT.Callout.Icon>
      <RT.Callout.Text weight="bold">{title}</RT.Callout.Text>
      <RT.Callout.Text>{children}</RT.Callout.Text>
    </RT.Callout.Root>
  )
}

export function FeedbackSection() {
  return (
    <Section title="Feedback">
      <Demo title="Alert" description="Contextual messages in every variant, with icon and close button." radix="Callout">
        {alertVariants.map(([variant, radix]) => (
          <Row
            key={variant}
            label={radix ? `${variant} / ${radix}` : variant}
            radix={
              radix && (
                <Callout
                  title={`Heads up (${radix})`}
                  variant={radix}
                  color={variant === 'default' ? 'gray' : undefined}
                  highContrast={variant === 'default'}
                >
                  {trial}
                </Callout>
              )
            }
          >
            <Alert icon={<InfoCircledIcon />} maw={W} title={`Heads up (${variant})`} variant={variant}>
              {trial}
            </Alert>
          </Row>
        ))}
        {colors.map((color) => {
          const icon = color === 'green' ? <CheckCircledIcon /> : <ExclamationTriangleIcon />
          return (
            <Row
              key={color}
              label={`color ${color}, close button`}
              radix={
                <Callout color={color} icon={icon} title={`Deployment ${color}`}>
                  {build}
                </Callout>
              }
            >
              <Alert color={color} icon={icon} maw={W} title={`Deployment ${color}`} withCloseButton>
                {build}
              </Alert>
            </Row>
          )
        })}
        <Row
          label="message only"
          radix={
            <RT.Callout.Root style={{ maxWidth: W }}>
              <RT.Callout.Icon>
                <InfoCircledIcon />
              </RT.Callout.Icon>
              <RT.Callout.Text>{trial}</RT.Callout.Text>
            </RT.Callout.Root>
          }
        >
          <Alert icon={<InfoCircledIcon />} maw={W}>
            {trial}
          </Alert>
        </Row>
      </Demo>

      <Demo title="Notification" description="Static notification cards, not the notifications system.">
        <Row label="default">
          <Notification maw={W} title="Changes saved">
            Your profile was updated.
          </Notification>
        </Row>
        {colors.map((color) => (
          <Row key={color} label={`color ${color}`}>
            <Notification color={color} maw={W} title={`Notification ${color}`}>
              Priya commented on your pull request.
            </Notification>
          </Row>
        ))}
        <Row label="loading">
          <Notification loading maw={W} title="Uploading file">
            report-q3.pdf is uploading, 64% done.
          </Notification>
        </Row>
        <Row label="icon, with border">
          <Notification icon={<CheckCircledIcon />} maw={W} withBorder title="With border">
            Invoice INV-1042 was sent to Acme Inc.
          </Notification>
        </Row>
      </Demo>

      <Demo title="Loader" description="Oval, bars and dots in several sizes and colors." radix="Spinner">
        {loaderSizes.map(([size, radix]) => (
          <Row key={size} label={radix ? `oval, size ${size} / ${radix}` : `oval, size ${size}`} radix={radix && <RT.Spinner size={radix} />}>
            <Loader size={size} />
          </Row>
        ))}
        {(['gray', 'red', 'green'] as const).map((color) => (
          <Row
            key={color}
            label={`oval, color ${color}`}
            radix={
              // Spinner has no color prop; it takes the text color around it
              <RT.Text color={color}>
                <RT.Spinner size="3" />
              </RT.Text>
            }
          >
            <Loader color={color} />
          </Row>
        ))}
        {(['bars', 'dots'] as const).flatMap((type) => [
          ...loaderSizes.map(([size]) => (
            <Row key={`${type}-${size}`} label={`${type}, size ${size}`}>
              <Loader size={size} type={type} />
            </Row>
          )),
          ...(['gray', 'red', 'green'] as const).map((color) => (
            <Row key={`${type}-${color}`} label={`${type}, color ${color}`}>
              <Loader color={color} type={type} />
            </Row>
          )),
        ])}
      </Demo>

      <Demo title="Progress" description="Single value, multiple sections, striped, animated and sizes." radix="Progress">
        <Row label="default / size 3" radix={<RT.Progress size="3" style={{ maxWidth: W }} value={60} />}>
          <Progress maw={W} value={60} />
        </Row>
        {progressSizes.map(([size, radix]) => (
          <Row
            key={size}
            label={radix ? `size ${size} / ${radix}` : `size ${size}`}
            radix={radix && <RT.Progress size={radix} style={{ maxWidth: W }} value={45} />}
          >
            <Progress maw={W} size={size} value={45} />
          </Row>
        ))}
        <Row label="color gray" radix={<RT.Progress color="gray" size="3" style={{ maxWidth: W }} value={45} />}>
          <Progress color="gray" maw={W} value={45} />
        </Row>
        <Row label="color green, striped" radix={<RT.Progress color="green" size="3" style={{ maxWidth: W }} value={70} />}>
          <Progress color="green" maw={W} striped value={70} />
        </Row>
        <Row label="color red, animated" radix={<RT.Progress color="red" size="3" style={{ maxWidth: W }} value={50} />}>
          <Progress animated color="red" maw={W} value={50} />
        </Row>
        <Row label="sections with labels">
          <Progress.Root maw={W} size="xl">
            <Progress.Section value={35}>
              <Progress.Label>Documents</Progress.Label>
            </Progress.Section>
            <Progress.Section color="gray" value={25}>
              <Progress.Label>Photos</Progress.Label>
            </Progress.Section>
            <Progress.Section color="green" value={15} striped>
              <Progress.Label>Other</Progress.Label>
            </Progress.Section>
          </Progress.Root>
        </Row>
      </Demo>

      <Demo title="RingProgress" description="Circular progress with one or more sections.">
        <Row label="one section">
          <RingProgress label={<Text ta="center">40%</Text>} sections={[{ value: 40, color: 'blue' }]} />
        </Row>
        <Row label="three sections">
          <RingProgress
            label={<Text ta="center">Usage</Text>}
            sections={[
              { value: 40, color: 'blue' },
              { value: 25, color: 'green' },
              { value: 15, color: 'red' },
            ]}
          />
        </Row>
        <Row label="round caps, thin">
          <RingProgress roundCaps sections={[{ value: 72, color: 'gray' }]} size={100} thickness={8} />
        </Row>
      </Demo>

      <Demo title="SemiCircleProgress" description="Half-circle gauge for quotas and scores.">
        <Row label="default">
          <SemiCircleProgress label="64%" value={64} />
        </Row>
        <Row label="green, label bottom">
          <SemiCircleProgress filledSegmentColor="green" label="Storage" labelPosition="bottom" value={82} />
        </Row>
        <Row label="red, facing down">
          <SemiCircleProgress filledSegmentColor="red" orientation="down" size={160} value={30} />
        </Row>
      </Demo>

      <Demo title="Skeleton" description="Placeholder for a card while content loads." radix="Skeleton">
        <Row label="circle" radix={<RT.Skeleton height="48px" style={{ borderRadius: '100%' }} width="48px" />}>
          <Skeleton circle h={48} w={48} />
        </Row>
        <Row label="text line" radix={<RT.Skeleton height="12px" maxWidth="360px" />}>
          <Skeleton h={12} maw={360} />
        </Row>
        <Row label="block" radix={<RT.Skeleton height="120px" maxWidth="360px" />}>
          <Skeleton h={120} maw={360} />
        </Row>
        <Row
          label="wrapping text"
          radix={
            <RT.Text>
              <RT.Skeleton>Loading the account owner</RT.Skeleton>
            </RT.Text>
          }
        >
          <Skeleton w="fit-content">
            <Text>Loading the account owner</Text>
          </Skeleton>
        </Row>
        <Row
          label="card placeholder"
          radix={
            <RT.Card size="2" style={{ maxWidth: 360 }}>
              <RT.Flex align="center" gap="4" mb="4">
                <RT.Skeleton height="48px" style={{ borderRadius: '100%', flexShrink: 0 }} width="48px" />
                <RT.Flex direction="column" flexGrow="1" gap="2">
                  <RT.Skeleton height="12px" />
                  <RT.Skeleton height="12px" width="60%" />
                </RT.Flex>
              </RT.Flex>
              <RT.Skeleton height="120px" mb="4" />
              <RT.Skeleton height="10px" mb="2" />
              <RT.Skeleton height="10px" mb="2" />
              <RT.Skeleton height="10px" width="80%" />
            </RT.Card>
          }
        >
          <Card maw={360} withBorder>
            <Group mb="md" wrap="nowrap">
              <Skeleton circle h={48} w={48} />
              <Stack gap="xs" flex={1}>
                <Skeleton h={12} />
                <Skeleton h={12} w="60%" />
              </Stack>
            </Group>
            <Skeleton h={120} mb="md" />
            <Skeleton h={10} mb="xs" />
            <Skeleton h={10} mb="xs" />
            <Skeleton h={10} w="80%" />
          </Card>
        </Row>
      </Demo>

      <Demo title="EmptyState" description="Placeholder for lists with no content, in each variant and alignment.">
        <Row label="default">
          <EmptyState
            description="Try a different keyword or clear your filters."
            icon={<MagnifyingGlassIcon />}
            maw={W}
            title="No results found"
          />
        </Row>
        <Row label="light, with actions">
          <EmptyState
            description="Invite teammates to start collaborating."
            icon={<InfoCircledIcon />}
            maw={W}
            title="No members yet"
            variant="light"
          >
            <EmptyState.Actions>
              <Button>Invite members</Button>
              <Button variant="default">Learn more</Button>
            </EmptyState.Actions>
          </EmptyState>
        </Row>
        <Row label="filled, green, left">
          <EmptyState
            align="left"
            color="green"
            description="Everything is up to date."
            icon={<CheckCircledIcon />}
            maw={W}
            title="All caught up"
            variant="filled"
          />
        </Row>
        <Row label="size sm, indicator background">
          <EmptyState
            description="Notifications will show up here."
            icon={<InfoCircledIcon />}
            maw={W}
            size="sm"
            title="Inbox is empty"
            withIndicatorBackground
          />
        </Row>
      </Demo>
    </Section>
  )
}
