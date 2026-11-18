'use client'

import { Button, Toast, type ToastProps, toast } from 'basedkit'
import { useSyncExternalStore } from 'react'

type Options = Pick<ToastProps, 'position' | 'variant'>

// the site has one <Toast>, so an example that shows a position or a variant
// changes that one's props before adding its toast
let options: Options = {}

const listeners = new Set<() => void>()

function configure(next: Options) {
  options = next

  for (const listener of listeners) {
    listener()
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)

  return () => listeners.delete(listener)
}

export function Toaster() {
  const current = useSyncExternalStore(
    subscribe,
    () => options,
    () => options,
  )

  return <Toast {...current} />
}

type Props = Options & {
  action?: string
  description?: string
  label: string
  title: string
  type?: 'success' | 'error' | 'warning' | 'info'
}

// toasts are added from event handlers, which is why these are client
// components
export function ToastDemo({
  action,
  description,
  label,
  position,
  title,
  type,
  variant,
}: Props) {
  return (
    <Button
      onClick={() => {
        configure({
          position,
          variant,
        })

        const id = toast.add({
          actionProps: action
            ? {
                children: action,
                onClick: () => toast.close(id),
              }
            : undefined,
          description,
          title,
          type,
        })
      }}
      variant="soft"
    >
      {label}
    </Button>
  )
}

type PromiseProps = {
  error: string
  label: string
  loading: string
  success: string
}

export function ToastPromiseDemo({
  error,
  label,
  loading,
  success,
}: PromiseProps) {
  return (
    <Button
      onClick={() => {
        configure({})

        toast.promise(
          new Promise((resolve) => {
            setTimeout(resolve, 2000)
          }),
          {
            error: {
              title: error,
              type: 'error',
            },
            loading: {
              title: loading,
            },
            success: {
              title: success,
              type: 'success',
            },
          },
        )
      }}
      variant="soft"
    >
      {label}
    </Button>
  )
}
