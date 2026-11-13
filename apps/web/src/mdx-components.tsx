import { Avatar, Button, Field, Spinner, TextField } from '@repo/ui'
// biome-ignore lint/correctness/noUndeclaredDependencies: types-only module from @types/mdx
import { type MDXComponents } from 'mdx/types'
import { type ComponentProps } from 'react'

function Example(props: ComponentProps<'div'>) {
  return (
    <div
      className="mt-4 flex min-h-32 flex-wrap items-center justify-center gap-4 rounded-lg bg-(--gray-2) p-6"
      {...props}
    />
  )
}

const components: MDXComponents = {
  Avatar,
  Button,
  Example,
  Field,
  h1: (props) => <h1 className="mb-4 text-4xl font-bold" {...props} />,
  h2: (props) => <h2 className="mt-10 mb-4 text-2xl font-bold" {...props} />,
  h3: (props) => <h3 className="mt-8 text-lg font-bold" {...props} />,
  Spinner,
}

export function useMDXComponents(): MDXComponents {
  // nested components don't fit the MDXComponents index signature
  return {
    ...components,
    TextField: {
      Root: TextField.Root,
      Slot: TextField.Slot,
    },
  } as unknown as MDXComponents
}
