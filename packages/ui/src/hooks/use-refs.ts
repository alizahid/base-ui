'use client'

import { type Ref, type RefCallback, useCallback } from 'react'

// merges refs into one, so a component can use a ref it also forwards:
//
//   const local = useRef<HTMLDivElement>(null)
//   <div ref={useRefs(local, props.ref)} />
export function useRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return useCallback(
    (node: T | null) => {
      const cleanups = refs.map((ref) => assign(ref, node))

      return () => {
        for (const cleanup of cleanups) {
          cleanup?.()
        }
      }
    },
    // biome-ignore lint/correctness/useExhaustiveDependencies: the refs are the deps
    refs,
  )
}

function assign<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === 'function') {
    const cleanup = ref(node)

    return typeof cleanup === 'function' ? cleanup : () => ref(null)
  }

  if (ref) {
    ref.current = node

    return () => {
      ref.current = null
    }
  }
}
