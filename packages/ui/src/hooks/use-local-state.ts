'use client'

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react'

// the storage event only fires in other tabs, so `write` dispatches one here
function subscribe(listener: () => void) {
  window.addEventListener('storage', listener)

  return () => window.removeEventListener('storage', listener)
}

function parse(raw: string | null) {
  try {
    return raw === null ? undefined : JSON.parse(raw)
  } catch {
    // not JSON, like a value another script wrote: reads as unset
  }
}

function write(key: string, value: unknown) {
  if (value === undefined) {
    localStorage.removeItem(key)
  } else {
    localStorage.setItem(key, JSON.stringify(value))
  }

  window.dispatchEvent(
    new StorageEvent('storage', {
      key,
    }),
  )
}

// useState, kept in localStorage as JSON. every use of a key stays in sync,
// across tabs too. the server and the first client render see `initial`, and
// setting undefined removes the key
export function useLocalState<T>(
  key: string,
  initial: T,
): [T, Dispatch<SetStateAction<T>>]
export function useLocalState<T>(
  key: string,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>]
export function useLocalState<T>(key: string, initial?: T) {
  const raw = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key),
    () => null,
  )

  const stored = useMemo(() => parse(raw) as T | undefined, [raw])

  const set = useCallback<Dispatch<SetStateAction<T | undefined>>>(
    (value) => {
      write(
        key,
        typeof value === 'function'
          ? (value as (previous: T | undefined) => T | undefined)(
              parse(localStorage.getItem(key)) ?? initial,
            )
          : value,
      )
    },
    [key, initial],
  )

  return [stored ?? initial, set]
}
