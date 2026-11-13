import {
  ArrowRightIcon,
  BellIcon,
  CheckIcon,
  Cross1Icon,
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
  Text,
  Toggle,
  UnstyledButton,
} from '@mantine/core'
import { useState } from 'react'

import * as RT from '@radix-ui/themes'
import { Demo, Row, Section } from '../demo'

const sizes = ['xs', 'sm', 'md', 'lg'] as const

// Mantine variant → Radix Themes variant
const paired = [
  ['filled', 'solid'],
  ['light', 'soft'],
  ['outline', 'outline'],
  ['subtle', 'ghost'],
  ['surface', 'surface'],
] as const
const mantineOnly = ['default', 'transparent', 'white', 'gradient'] as const

// Radix sizes 1–4 are 24/32/40/48px. Button: xs–lg. ActionIcon: sm–xl (its default md is 32px).
const buttonSizes = [
  ['xs', '1'],
  ['sm', '2'],
  ['md', '3'],
  ['lg', '4'],
] as const
const iconSizes = [
  ['sm', '1'],
  ['md', '2'],
  ['lg', '3'],
  ['xl', '4'],
] as const

export function ButtonsSection() {
  const [file, setFile] = useState<File | null>(null)
  const [active, setActive] = useState(true)

  return (
    <Section title="Buttons">
      <Demo title="ActionIcon" description="Icon-only button in every variant, size and color." radix="IconButton">
        {paired.map(([m, r]) => (
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
        {mantineOnly.map((variant) => (
          <Row key={variant} label={variant}>
            <ActionIcon variant={variant} aria-label={variant}>
              <GearIcon />
            </ActionIcon>
          </Row>
        ))}
        <Row label="size xs">
          <ActionIcon size="xs" aria-label="xs">
            <HeartIcon />
          </ActionIcon>
        </Row>
        {iconSizes.map(([m, r]) => (
          <Row
            key={m}
            label={`size ${m} / ${r}`}
            radix={
              <RT.IconButton size={r} aria-label={`size ${r}`}>
                <HeartIcon />
              </RT.IconButton>
            }
          >
            <ActionIcon size={m} aria-label={m}>
              <HeartIcon />
            </ActionIcon>
          </Row>
        ))}
        <Row
          label="color gray"
          radix={
            <RT.IconButton color="gray" aria-label="gray">
              <HeartIcon />
            </RT.IconButton>
          }
        >
          <ActionIcon color="gray" aria-label="gray">
            <HeartIcon />
          </ActionIcon>
        </Row>
        <Row
          label="red, light / soft"
          radix={
            <RT.IconButton color="red" variant="soft" aria-label="red">
              <HeartIcon />
            </RT.IconButton>
          }
        >
          <ActionIcon color="red" variant="light" aria-label="red">
            <HeartIcon />
          </ActionIcon>
        </Row>
        <Row
          label="green, outline"
          radix={
            <RT.IconButton color="green" variant="outline" aria-label="green">
              <HeartIcon />
            </RT.IconButton>
          }
        >
          <ActionIcon color="green" variant="outline" aria-label="green">
            <HeartIcon />
          </ActionIcon>
        </Row>
        <Row
          label="loading"
          radix={
            <RT.IconButton loading aria-label="loading">
              <HeartIcon />
            </RT.IconButton>
          }
        >
          <ActionIcon loading aria-label="loading">
            <HeartIcon />
          </ActionIcon>
        </Row>
        <Row
          label="disabled"
          radix={
            <RT.IconButton disabled aria-label="disabled">
              <HeartIcon />
            </RT.IconButton>
          }
        >
          <ActionIcon disabled aria-label="disabled">
            <HeartIcon />
          </ActionIcon>
        </Row>
      </Demo>

      <Demo title="ActionIcon.Group" description="Attached icon buttons for toolbars.">
        <Row label="default">
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
        </Row>
        <Row label="with section">
          <ActionIcon.Group>
            <ActionIcon variant="filled" aria-label="Star">
              <StarIcon />
            </ActionIcon>
            <ActionIcon.GroupSection variant="filled">12</ActionIcon.GroupSection>
          </ActionIcon.Group>
        </Row>
      </Demo>

      <Demo title="Button" description="Primary action control with variants, sizes, sections and states." radix="Button">
        {paired.map(([m, r]) => (
          <Row key={m} label={`${m} / ${r}`} radix={<RT.Button variant={r}>Save changes</RT.Button>}>
            <Button variant={m}>Save changes</Button>
          </Row>
        ))}
        {mantineOnly.map((variant) => (
          <Row key={variant} label={variant}>
            <Button variant={variant}>Save changes</Button>
          </Row>
        ))}
        {buttonSizes.map(([m, r]) => (
          <Row key={m} label={`size ${m} / ${r}`} radix={<RT.Button size={r}>Save changes</RT.Button>}>
            <Button size={m}>Save changes</Button>
          </Row>
        ))}
        <Row
          label="left icon"
          radix={
            <RT.Button>
              <PlusIcon /> New project
            </RT.Button>
          }
        >
          <Button leftSection={<PlusIcon />}>New project</Button>
        </Row>
        <Row
          label="right icon, soft"
          radix={
            <RT.Button variant="soft">
              Continue <ArrowRightIcon />
            </RT.Button>
          }
        >
          <Button rightSection={<ArrowRightIcon />} variant="light">
            Continue
          </Button>
        </Row>
        <Row label="color gray" radix={<RT.Button color="gray">Gray</RT.Button>}>
          <Button color="gray">Gray</Button>
        </Row>
        <Row
          label="red, light / soft"
          radix={
            <RT.Button color="red" variant="soft">
              Delete
            </RT.Button>
          }
        >
          <Button color="red" variant="light">
            Delete
          </Button>
        </Row>
        <Row
          label="green, outline"
          radix={
            <RT.Button color="green" variant="outline">
              Approve
            </RT.Button>
          }
        >
          <Button color="green" variant="outline">
            Approve
          </Button>
        </Row>
        <Row label="radius full" radix={<RT.Button radius="full">Rounded</RT.Button>}>
          <Button radius="xl">Rounded</Button>
        </Row>
        <Row label="loading" radix={<RT.Button loading>Saving</RT.Button>}>
          <Button loading>Saving</Button>
        </Row>
        <Row label="disabled" radix={<RT.Button disabled>Disabled</RT.Button>}>
          <Button disabled>Disabled</Button>
        </Row>
        <Row label="full width" radix={<RT.Button style={{ width: '100%' }}>Full width</RT.Button>}>
          <Button fullWidth>Full width</Button>
        </Row>
      </Demo>

      <Demo title="Button.Group" description="Attached buttons sharing borders.">
        <Row label="default">
          <Button.Group>
            <Button variant="default">Day</Button>
            <Button variant="default">Week</Button>
            <Button variant="default">Month</Button>
          </Button.Group>
        </Row>
        <Row label="with section">
          <Button.Group>
            <Button>Merge</Button>
            <Button.GroupSection>3 checks</Button.GroupSection>
          </Button.Group>
        </Row>
        <Row label="vertical">
          <Button.Group orientation="vertical" w="fit-content">
            <Button variant="outline">Top</Button>
            <Button variant="outline">Bottom</Button>
          </Button.Group>
        </Row>
      </Demo>

      <Demo title="CloseButton" description="Dismiss button for modals, alerts and chips." radix="IconButton (ghost, gray)">
        <Row label="size xs">
          <CloseButton size="xs" aria-label="xs" />
        </Row>
        <Row label="size sm">
          <CloseButton size="sm" aria-label="sm" />
        </Row>
        <Row
          label="size md / 1"
          radix={
            <RT.IconButton variant="ghost" color="gray" size="1" m="0" aria-label="Close">
              <Cross1Icon />
            </RT.IconButton>
          }
        >
          <CloseButton size="md" aria-label="md" />
        </Row>
        <Row
          label="size lg / 2"
          radix={
            <RT.IconButton variant="ghost" color="gray" size="2" m="0" aria-label="Close">
              <Cross1Icon />
            </RT.IconButton>
          }
        >
          <CloseButton size="lg" aria-label="lg" />
        </Row>
        <Row label="transparent">
          <CloseButton variant="transparent" aria-label="transparent" />
        </Row>
        <Row
          label="disabled"
          radix={
            <RT.IconButton variant="ghost" color="gray" size="1" m="0" disabled aria-label="Close">
              <Cross1Icon />
            </RT.IconButton>
          }
        >
          <CloseButton disabled aria-label="disabled" />
        </Row>
      </Demo>

      <Demo title="CopyButton" description="Copies a value and reports the copied state.">
        <Row label="button">
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
        </Row>
        <Row label="icon">
          <CopyButton value="https://acme.app/invite/team">
            {({ copied, copy }) => (
              <ActionIcon aria-label="Copy invite link" color={copied ? 'green' : 'gray'} onClick={copy} variant="subtle">
                {copied ? <CheckIcon /> : <CopyIcon />}
              </ActionIcon>
            )}
          </CopyButton>
        </Row>
      </Demo>

      <Demo title="FileButton" description="Opens the native file picker from any trigger.">
        <Row label={file ? file.name : 'no file selected'}>
          <FileButton accept="image/png,image/jpeg" onChange={setFile}>
            {(props) => (
              <Button leftSection={<UploadIcon />} variant="default" {...props}>
                Upload avatar
              </Button>
            )}
          </FileButton>
        </Row>
      </Demo>

      <Demo title="UnstyledButton" description="A bare button for building custom controls.">
        <Row label="with icon">
          <UnstyledButton>
            <Group gap="xs">
              <DownloadIcon />
              <Text size="sm">Download report</Text>
            </Group>
          </UnstyledButton>
        </Row>
        <Row label="disabled">
          <UnstyledButton disabled>
            <Text size="sm">Disabled</Text>
          </UnstyledButton>
        </Row>
      </Demo>

      <Demo title="Toggle" description="A pressable button with an on/off state.">
        <Row label="controlled">
          <Toggle active={active} onActiveChange={setActive} aria-label="Favorite">
            <StarIcon />
          </Toggle>
        </Row>
        <Row label="filled">
          <Toggle variant="filled" defaultActive aria-label="Favorite filled">
            <StarIcon />
          </Toggle>
        </Row>
        <Row label="color red">
          <Toggle color="red" defaultActive aria-label="Like">
            <HeartIcon />
          </Toggle>
        </Row>
        <Row label="color gray">
          <Toggle color="gray" aria-label="Notify">
            <BellIcon />
          </Toggle>
        </Row>
        <Row label="auto width">
          <Toggle autoWidth defaultActive>
            Bold
          </Toggle>
        </Row>
        <Row label="disabled">
          <Toggle disabled aria-label="Disabled">
            <StarIcon />
          </Toggle>
        </Row>
        {sizes.map((size) => (
          <Row key={size} label={`size ${size}`}>
            <Toggle size={size} aria-label={size}>
              <StarIcon />
            </Toggle>
          </Row>
        ))}
      </Demo>
    </Section>
  )
}
