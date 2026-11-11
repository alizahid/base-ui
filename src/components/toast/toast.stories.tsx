import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { Dialog } from '../dialog'
import { createToastManager, Toast, useToast } from '.'

const positions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const

const meta = {
  title: 'Components/Toast',
  component: Toast.Provider,
  args: { limit: 3, position: 'bottom-right', timeout: 5000 },
  argTypes: {
    position: { control: 'select', options: positions },
  },
} satisfies Meta<typeof Toast.Provider>

export default meta

type Story = StoryObj<typeof meta>

let count = 0

function AddButton() {
  const toast = useToast()

  return (
    <Button
      onClick={() => {
        count += 1
        toast.add({
          title: `Toast ${count} created`,
          description: 'This is a toast notification.',
        })
      }}
    >
      Create toast
    </Button>
  )
}

/** Mount `Toast.Provider` once, then call `useToast().add()` anywhere inside. */
export const Playground: Story = {
  render: (args) => (
    <Toast.Provider {...args}>
      <AddButton />
    </Toast.Provider>
  ),
}

function TypeButtons() {
  const toast = useToast()

  return (
    <div className="flex flex-wrap gap-3">
      {(['success', 'error', 'warning', 'info'] as const).map((type) => (
        <Button
          key={type}
          onClick={() =>
            toast.add({ type, title: `A ${type} toast`, description: 'The dot shows the type.' })
          }
          variant="soft"
        >
          {type}
        </Button>
      ))}
    </div>
  )
}

/** `type` success, error, warning or info adds a colored dot and colors the action. */
export const Types: Story = {
  render: () => (
    <Toast.Provider>
      <TypeButtons />
    </Toast.Provider>
  ),
}

function ActionButton() {
  const toast = useToast()

  return (
    <Button
      onClick={() => {
        const id = toast.add({
          title: 'File deleted',
          description: 'report.pdf was moved to the trash.',
          timeout: 0,
          actionProps: { children: 'Undo', onClick: () => toast.close(id) },
        })
      }}
      variant="soft"
    >
      Delete file
    </Button>
  )
}

/** `actionProps` adds a button. `timeout: 0` keeps the toast until it is closed. */
export const Action: Story = {
  render: () => (
    <Toast.Provider>
      <ActionButton />
    </Toast.Provider>
  ),
}

function PromiseButton() {
  const toast = useToast()

  return (
    <Button
      onClick={() =>
        toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
          loading: { title: 'Saving...' },
          success: { title: 'Saved', type: 'success' },
          error: { title: 'Could not save', type: 'error' },
        })
      }
      variant="soft"
    >
      Save
    </Button>
  )
}

/** `promise()` updates one toast while a promise runs. */
export const PromiseToast: Story = {
  name: 'Promise',
  render: () => (
    <Toast.Provider>
      <PromiseButton />
    </Toast.Provider>
  ),
}

const manager = createToastManager()

/** A manager made with `createToastManager` can add toasts from outside React. */
export const GlobalManager: Story = {
  render: () => (
    <Toast.Provider toastManager={manager}>
      <Button
        onClick={() => manager.add({ title: 'Added from outside', description: 'No hook needed.' })}
        variant="soft"
      >
        Create toast
      </Button>
    </Toast.Provider>
  ),
}

/** `className` is for the box of every toast, `classNames` for its parts. */
export const ClassNameOverride: Story = {
  render: () => (
    <Toast.Provider
      className="rounded-none bg-accent-3"
      classNames={{ title: 'text-accent-11', close: 'rounded-full' }}
      position="top-center"
    >
      <AddButton />
    </Toast.Provider>
  ),
}

/** Toasts show above an open dialog and can still be clicked. */
export const AboveDialog: Story = {
  render: () => (
    <Toast.Provider>
      <Dialog.Root>
        <Dialog.Trigger render={<Button variant="soft" />}>Open dialog</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Dialog</Dialog.Title>
          <Dialog.Description className="mb-4">
            Create a toast while the dialog is open.
          </Dialog.Description>
          <AddButton />
        </Dialog.Content>
      </Dialog.Root>
    </Toast.Provider>
  ),
}
