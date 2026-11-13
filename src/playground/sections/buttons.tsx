import {
  ArrowRightIcon,
  BellIcon,
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  GearIcon,
  HeartIcon,
  PlusIcon,
  StarIcon,
  UploadIcon,
} from '@radix-ui/react-icons'
import {
  ActionIcon,
  Button,
  CloseButton,
  CopyButton,
  FileButton,
  Group,
  Stack,
  Text,
  Toggle,
  UnstyledButton,
} from '@mantine/core'
import { useState } from 'react'

import * as RT from '@radix-ui/themes'
import { Demo, Row, Section } from '../demo'

const variants = ['filled', 'light', 'outline', 'subtle', 'default', 'transparent', 'white', 'gradient'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const

export function ButtonsSection() {
  const [file, setFile] = useState<File | null>(null)
  const [active, setActive] = useState(true)

  return (
    <Section title="Buttons">
      <Demo title="ActionIcon" description="Icon-only button in every variant, size and color." radix="IconButton">
        {(
          [
            ['filled', 'solid'],
            ['light', 'soft'],
            ['outline', 'outline'],
            ['subtle', 'ghost'],
            ['surface', 'surface'],
          ] as const
        ).map(([m, r]) => (
          <Row
            key={m}
            label={`${m} / ${r}`}
            radix={
              <RT.IconButton variant={r} aria-label={r}>
                <GearIcon />
              </RT.IconButton>
            }
          >
            <ActionIcon variant={m} aria-label={m}>
              <GearIcon />
            </ActionIcon>
          </Row>
        ))}
        <Row label="default">
          <ActionIcon variant="default" aria-label="default">
            <GearIcon />
          </ActionIcon>
        </Row>
      </Demo>

      <Demo title="ActionIcon.Group" description="Attached icon buttons for toolbars.">
        <Group>
          <ActionIcon.Group>
            <ActionIcon variant="default" aria-label="Star">
              <StarIcon />
            </ActionIcon>
            <ActionIcon variant="default" aria-label="Notify">
              <BellIcon />
            </ActionIcon>
            <ActionIcon variant="default" aria-label="Settings">
              <GearIcon />
            </ActionIcon>
          </ActionIcon.Group>
          <ActionIcon.Group>
            <ActionIcon variant="filled" aria-label="Star">
              <StarIcon />
            </ActionIcon>
            <ActionIcon.GroupSection variant="filled">12</ActionIcon.GroupSection>
          </ActionIcon.Group>
        </Group>
      </Demo>

      <Demo title="Button" description="Primary action control with variants, sizes, sections and states.">
        <Stack>
          <Group>
            {variants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </Group>
          <Group>
            {sizes.map((size) => (
              <Button key={size} size={size}>
                Save changes
              </Button>
            ))}
          </Group>
          <Group>
            <Button leftSection={<PlusIcon />}>New project</Button>
            <Button rightSection={<ArrowRightIcon />} variant="light">
              Continue
            </Button>
            <Button color="gray">Gray</Button>
            <Button color="red" variant="light">
              Delete
            </Button>
            <Button color="green" variant="outline">
              Approve
            </Button>
            <Button radius="xl">Rounded</Button>
            <Button loading>Saving</Button>
            <Button disabled>Disabled</Button>
          </Group>
          <Button fullWidth>Full width</Button>
        </Stack>
      </Demo>

      <Demo title="Button.Group" description="Attached buttons sharing borders.">
        <Group>
          <Button.Group>
            <Button variant="default">Day</Button>
            <Button variant="default">Week</Button>
            <Button variant="default">Month</Button>
          </Button.Group>
          <Button.Group>
            <Button>Merge</Button>
            <Button.GroupSection>3 checks</Button.GroupSection>
          </Button.Group>
          <Button.Group orientation="vertical">
            <Button variant="outline">Top</Button>
            <Button variant="outline">Bottom</Button>
          </Button.Group>
        </Group>
      </Demo>

      <Demo title="CloseButton" description="Dismiss button for modals, alerts and chips.">
        <Group>
          {sizes.map((size) => (
            <CloseButton key={size} size={size} aria-label={size} />
          ))}
          <CloseButton variant="transparent" aria-label="transparent" />
          <CloseButton disabled aria-label="disabled" />
        </Group>
      </Demo>

      <Demo title="CopyButton" description="Copies a value and reports the copied state.">
        <Group>
          <CopyButton value="npm i @mantine/core">
            {({ copied, copy }) => (
              <Button
                color={copied ? 'green' : undefined}
                leftSection={copied ? <CheckIcon /> : <CopyIcon />}
                onClick={copy}
                variant="light"
              >
                {copied ? 'Copied' : 'Copy install command'}
              </Button>
            )}
          </CopyButton>
          <CopyButton value="https://acme.app/invite/team">
            {({ copied, copy }) => (
              <ActionIcon aria-label="Copy invite link" color={copied ? 'green' : 'gray'} onClick={copy} variant="subtle">
                {copied ? <CheckIcon /> : <CopyIcon />}
              </ActionIcon>
            )}
          </CopyButton>
        </Group>
      </Demo>

      <Demo title="FileButton" description="Opens the native file picker from any trigger.">
        <Group>
          <FileButton accept="image/png,image/jpeg" onChange={setFile}>
            {(props) => (
              <Button leftSection={<UploadIcon />} variant="default" {...props}>
                Upload avatar
              </Button>
            )}
          </FileButton>
          <Text size="sm">{file ? file.name : 'No file selected'}</Text>
        </Group>
      </Demo>

      <Demo title="UnstyledButton" description="A bare button for building custom controls.">
        <Group>
          <UnstyledButton>
            <Group gap="xs">
              <DownloadIcon />
              <Text size="sm">Download report</Text>
            </Group>
          </UnstyledButton>
          <UnstyledButton disabled>
            <Text size="sm">Disabled</Text>
          </UnstyledButton>
        </Group>
      </Demo>

      <Demo title="Toggle" description="A pressable button with an on/off state.">
        <Stack>
          <Group>
            <Toggle active={active} onActiveChange={setActive} aria-label="Favorite">
              <StarIcon />
            </Toggle>
            <Toggle variant="filled" defaultActive aria-label="Favorite filled">
              <StarIcon />
            </Toggle>
            <Toggle color="red" defaultActive aria-label="Like">
              <HeartIcon />
            </Toggle>
            <Toggle color="gray" aria-label="Notify">
              <BellIcon />
            </Toggle>
            <Toggle autoWidth defaultActive>
              Bold
            </Toggle>
            <Toggle disabled aria-label="Disabled">
              <StarIcon />
            </Toggle>
          </Group>
          <Group>
            {sizes.map((size) => (
              <Toggle key={size} size={size} aria-label={size}>
                <StarIcon />
              </Toggle>
            ))}
          </Group>
        </Stack>
      </Demo>
    </Section>
  )
}
