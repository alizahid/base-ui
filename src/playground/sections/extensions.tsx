import { Carousel } from '@mantine/carousel'
import {
  CodeHighlight,
  CodeHighlightAdapterProvider,
  CodeHighlightTabs,
  plainTextAdapter,
} from '@mantine/code-highlight'
import { Button, Group, Paper, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { isEmail, useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { nprogress } from '@mantine/nprogress'
import { Spotlight, spotlight } from '@mantine/spotlight'
import { RichTextEditor } from '@mantine/tiptap'
import { FileTextIcon, GearIcon, HomeIcon, ImageIcon, UploadIcon, Cross2Icon } from '@radix-ui/react-icons'
import Link from '@tiptap/extension-link'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Demo, Section } from '../demo'

const spotlightActions = [
  { id: 'home', label: 'Dashboard', description: 'Revenue and signups overview', leftSection: <HomeIcon />, onClick: () => undefined },
  { id: 'docs', label: 'Documentation', description: 'Guides and API reference', leftSection: <FileTextIcon />, onClick: () => undefined },
  { id: 'settings', label: 'Settings', description: 'Workspace and billing preferences', leftSection: <GearIcon />, onClick: () => undefined },
]

const teams = [
  { name: 'Sales', members: 12, note: 'Closed 14 deals this month.' },
  { name: 'Support', members: 8, note: 'Median first response under 4 minutes.' },
  { name: 'Growth', members: 5, note: 'Signups up 18% month over month.' },
  { name: 'Design', members: 4, note: 'Shipped the new onboarding flow.' },
]

function SignUpForm() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '', password: '' },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Name must have at least 2 letters' : null),
      email: isEmail('Invalid email'),
      password: (value) => (value.length < 8 ? 'Password must have at least 8 characters' : null),
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        notifications.show({ title: 'Account created', message: `Welcome, ${values.name}.`, color: 'teal' })
      })}
    >
      <Stack maw={360}>
        <TextInput label="Name" placeholder="Ada Lovelace" key={form.key('name')} {...form.getInputProps('name')} />
        <TextInput label="Email" placeholder="ada@example.com" key={form.key('email')} {...form.getInputProps('email')} />
        <PasswordInput label="Password" key={form.key('password')} {...form.getInputProps('password')} />
        <Group>
          <Button type="submit">Sign up</Button>
          <Button variant="default" onClick={() => form.reset()}>
            Reset
          </Button>
        </Group>
      </Stack>
    </form>
  )
}

function Editor() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Link],
    content: '<h2>Release notes</h2><p>Version 2.4 adds <strong>team workspaces</strong> and <em>faster exports</em>.</p><ul><li>Invite members</li><li>Share dashboards</li></ul>',
  })

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  )
}

export function ExtensionsSection() {
  return (
    <Section title="Extensions">
      <Demo title="Notifications" description="Toasts from @mantine/notifications.">
        <Group>
          <Button variant="default" onClick={() => notifications.show({ title: 'Heads up', message: 'Your trial ends in 3 days.' })}>
            Default
          </Button>
          <Button
            color="teal"
            onClick={() => notifications.show({ title: 'Payment received', message: 'Invoice #1042 was paid.', color: 'teal' })}
          >
            Success
          </Button>
          <Button
            color="red"
            onClick={() =>
              notifications.show({ title: 'Upload failed', message: 'The file is larger than 10 MB.', color: 'red', icon: <Cross2Icon /> })
            }
          >
            Error
          </Button>
          <Button
            variant="light"
            onClick={() => {
              const id = notifications.show({ loading: true, title: 'Exporting report', message: 'Preparing CSV...', autoClose: false, withCloseButton: false })

              setTimeout(
                () => notifications.update({ id, loading: false, color: 'teal', title: 'Export ready', message: 'revenue-q2.csv is ready.', autoClose: 3000, withCloseButton: true }),
                2000,
              )
            }}
          >
            Loading then update
          </Button>
        </Group>
      </Demo>

      <Demo title="Modals manager" description="Imperative modals from @mantine/modals.">
        <Group>
          <Button
            variant="default"
            onClick={() =>
              modals.openConfirmModal({
                title: 'Delete project',
                children: <Text size="sm">This removes the project and all of its data. This cannot be undone.</Text>,
                labels: { confirm: 'Delete', cancel: 'Cancel' },
                confirmProps: { color: 'red' },
              })
            }
          >
            Confirm modal
          </Button>
          <Button
            onClick={() =>
              modals.open({
                title: 'Invite teammate',
                children: (
                  <Stack>
                    <TextInput label="Email" placeholder="teammate@example.com" data-autofocus />
                    <Button onClick={() => modals.closeAll()}>Send invite</Button>
                  </Stack>
                ),
              })
            }
          >
            Content modal
          </Button>
        </Group>
      </Demo>

      <Demo title="Spotlight" description="Command palette opened with a button.">
        <Button leftSection={<GearIcon />} onClick={() => spotlight.open()}>
          Open spotlight
        </Button>
        <Spotlight actions={spotlightActions} nothingFound="Nothing found" highlightQuery searchProps={{ placeholder: 'Search...' }} />
      </Demo>

      <Demo title="Carousel" description="Team cards with controls and indicators.">
        <Carousel withIndicators slideSize={{ base: '100%', sm: '50%' }} slideGap="md" emblaOptions={{ loop: true }}>
          {teams.map((team) => (
            <Carousel.Slide key={team.name}>
              <Paper withBorder p="lg">
                <Title order={4}>{team.name}</Title>
                <Text size="sm" c="dimmed">
                  {team.members} members
                </Text>
                <Text mt="sm">{team.note}</Text>
              </Paper>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Demo>

      <Demo title="Dropzone" description="Image upload with idle, accept and reject states; drag a file over it.">
        <Dropzone onDrop={() => undefined} accept={IMAGE_MIME_TYPE} maxSize={5 * 1024 ** 2}>
          <Group justify="center" gap="md" mih={120}>
            <Dropzone.Accept>
              <UploadIcon />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <Cross2Icon />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <ImageIcon />
            </Dropzone.Idle>
            <div>
              <Text>Drag images here or click to select</Text>
              <Text size="sm" c="dimmed">
                PNG, JPG or WebP up to 5 MB
              </Text>
            </div>
          </Group>
        </Dropzone>
      </Demo>

      <Demo title="NavigationProgress" description="Top-of-page progress bar.">
        <Group>
          <Button variant="default" onClick={() => nprogress.start()}>
            Start
          </Button>
          <Button variant="default" onClick={() => nprogress.increment()}>
            Increment
          </Button>
          <Button variant="default" onClick={() => nprogress.complete()}>
            Complete
          </Button>
          <Button variant="default" onClick={() => nprogress.reset()}>
            Reset
          </Button>
        </Group>
      </Demo>

      <CodeHighlightAdapterProvider adapter={plainTextAdapter}>
        <Demo title="CodeHighlight" description="Code block with copy button and line numbers (plain text adapter).">
          <CodeHighlight
            language="tsx"
            withLineNumbers
            code={`export function Revenue({ total }: { total: number }) {
  return <Text fw={600}>{total.toLocaleString()}</Text>
}`}
          />
        </Demo>

        <Demo title="CodeHighlightTabs" description="Multiple files in tabs.">
          <CodeHighlightTabs
            code={[
              { fileName: 'app.tsx', language: 'tsx', code: 'export const App = () => <Dashboard />' },
              { fileName: 'package.json', language: 'json', code: '{\n  "name": "dashboard",\n  "version": "2.4.0"\n}' },
            ]}
          />
        </Demo>
      </CodeHighlightAdapterProvider>

      <Demo title="RichTextEditor" description="Tiptap editor with StarterKit and Link.">
        <Editor />
      </Demo>

      <Demo title="useForm" description="Sign-up form with validation; submit it empty to see errors.">
        <SignUpForm />
      </Demo>
    </Section>
  )
}
