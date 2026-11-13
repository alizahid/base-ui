import { Spinner } from '@repo/ui'

import { Section, Subsection } from '../section'

const sizes = ['1', '2', '3', '4'] as const

export function SpinnerDemo() {
  return (
    <Section title="Spinner">
      <Subsection title="Sizes">
        <div className="flex items-center gap-4">
          {sizes.map((size) => (
            <Spinner key={size} size={size} />
          ))}
        </div>
      </Subsection>
    </Section>
  )
}
