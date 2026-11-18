'use client'

import { Button, Stepper } from 'basedkit'
import { useState } from 'react'

type Props = {
  back: string
  completed: string
  linear?: boolean
  next: string
  steps: Array<{
    content: string
    label: string
  }>
}

// a stepper with the back and next buttons that usually drive one. the state
// is why this is a client component
export function StepperDemo({ back, completed, linear, next, steps }: Props) {
  const [value, setValue] = useState(1)

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <Stepper.Root linear={linear} onValueChange={setValue} value={value}>
        {steps.map((step) => (
          <Stepper.Step key={step.label} label={step.label}>
            {step.content}
          </Stepper.Step>
        ))}

        <Stepper.Completed>{completed}</Stepper.Completed>
      </Stepper.Root>

      <div className="flex justify-center gap-3">
        <Button
          color="gray"
          disabled={value === 0}
          onClick={() => {
            setValue(value - 1)
          }}
          variant="soft"
        >
          {back}
        </Button>

        <Button
          disabled={value === steps.length}
          onClick={() => {
            setValue(value + 1)
          }}
        >
          {next}
        </Button>
      </div>
    </div>
  )
}
