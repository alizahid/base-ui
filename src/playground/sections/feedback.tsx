import {
  Alert,
  Box,
  Button,
  Card,
  EmptyState,
  Group,
  Loader,
  Notification,
  Progress,
  RingProgress,
  SemiCircleProgress,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core'
import { CheckCircledIcon, ExclamationTriangleIcon, InfoCircledIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { Demo, Section } from '../demo'

const alertVariants = ['light', 'filled', 'outline', 'default', 'white', 'transparent'] as const
const colors = ['gray', 'red', 'green', 'amber'] as const

export function FeedbackSection() {
  return (
    <Section title="Feedback">
      <Demo title="Alert" description="Contextual messages in every variant, with icon and close button.">
        <Stack>
          <SimpleGrid cols={{ base: 1, md: 2 }}>
            {alertVariants.map((variant) => (
              <Alert icon={<InfoCircledIcon />} key={variant} title={`Heads up (${variant})`} variant={variant}>
                Your trial ends in 3 days. Add a payment method to keep your projects.
              </Alert>
            ))}
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, md: 2 }}>
            {colors.map((color) => (
              <Alert
                color={color}
                icon={color === 'green' ? <CheckCircledIcon /> : <ExclamationTriangleIcon />}
                key={color}
                title={`Deployment ${color}`}
                withCloseButton
              >
                Build #482 finished in 2m 14s on the production branch.
              </Alert>
            ))}
          </SimpleGrid>
        </Stack>
      </Demo>

      <Demo title="Notification" description="Static notification cards, not the notifications system.">
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          <Notification title="Changes saved">Your profile was updated.</Notification>
          {colors.map((color) => (
            <Notification color={color} key={color} title={`Notification ${color}`}>
              Priya commented on your pull request.
            </Notification>
          ))}
          <Notification loading title="Uploading file">
            report-q3.pdf is uploading, 64% done.
          </Notification>
          <Notification icon={<CheckCircledIcon />} withBorder title="With border">
            Invoice INV-1042 was sent to Acme Inc.
          </Notification>
        </SimpleGrid>
      </Demo>

      <Demo title="Loader" description="Oval, bars and dots in several sizes and colors.">
        <Stack>
          {(['oval', 'bars', 'dots'] as const).map((type) => (
            <Group key={type}>
              <Text w={60}>{type}</Text>
              <Loader size="xs" type={type} />
              <Loader size="sm" type={type} />
              <Loader size="md" type={type} />
              <Loader size="lg" type={type} />
              <Loader color="gray" type={type} />
              <Loader color="red" type={type} />
              <Loader color="green" type={type} />
            </Group>
          ))}
        </Stack>
      </Demo>

      <Demo title="Progress" description="Single value, multiple sections, striped, animated and sizes.">
        <Stack>
          <Progress value={60} />
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <Progress key={size} size={size} value={45} />
          ))}
          <Progress color="green" striped value={70} />
          <Progress animated color="red" value={50} />
          <Progress.Root size="xl">
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
        </Stack>
      </Demo>

      <Demo title="RingProgress" description="Circular progress with one or more sections.">
        <Group>
          <RingProgress label={<Text ta="center">40%</Text>} sections={[{ value: 40, color: 'blue' }]} />
          <RingProgress
            label={<Text ta="center">Usage</Text>}
            sections={[
              { value: 40, color: 'blue' },
              { value: 25, color: 'green' },
              { value: 15, color: 'red' },
            ]}
          />
          <RingProgress roundCaps sections={[{ value: 72, color: 'gray' }]} size={100} thickness={8} />
        </Group>
      </Demo>

      <Demo title="SemiCircleProgress" description="Half-circle gauge for quotas and scores.">
        <Group>
          <SemiCircleProgress label="64%" value={64} />
          <SemiCircleProgress filledSegmentColor="green" label="Storage" labelPosition="bottom" value={82} />
          <SemiCircleProgress filledSegmentColor="red" orientation="down" size={160} value={30} />
        </Group>
      </Demo>

      <Demo title="Skeleton" description="Placeholder for a card while content loads.">
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
      </Demo>

      <Demo title="EmptyState" description="Placeholder for lists with no content, in each variant and alignment.">
        <SimpleGrid cols={{ base: 1, md: 3 }}>
          <EmptyState
            description="Try a different keyword or clear your filters."
            icon={<MagnifyingGlassIcon />}
            title="No results found"
          />
          <EmptyState
            description="Invite teammates to start collaborating."
            icon={<InfoCircledIcon />}
            title="No members yet"
            variant="light"
          >
            <EmptyState.Actions>
              <Button>Invite members</Button>
              <Button variant="default">Learn more</Button>
            </EmptyState.Actions>
          </EmptyState>
          <EmptyState
            align="left"
            color="green"
            description="Everything is up to date."
            icon={<CheckCircledIcon />}
            title="All caught up"
            variant="filled"
          />
        </SimpleGrid>
        <Box mt="lg">
          <EmptyState
            description="Notifications will show up here."
            icon={<InfoCircledIcon />}
            size="sm"
            title="Inbox is empty"
            withIndicatorBackground
          />
        </Box>
      </Demo>
    </Section>
  )
}
