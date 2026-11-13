'use client'

import { ArrowRightIcon } from '@phosphor-icons/react/ssr'
import { Button, type ButtonProps, colors } from '@repo/ui'

import { Grid, Row } from '../grid'
import { Section, Subsection } from '../section'

const variants = ['solid', 'soft', 'surface', 'outline', 'ghost'] as const
const sizes = ['1', '2', '3', '4'] as const
const radii = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  'full',
] as const satisfies Array<ButtonProps['radius']>

export function ButtonDemo() {
  return (
    <Section title="Button">
      <Subsection title="Variants × sizes">
        <Grid columns={variants}>
          {sizes.map((size) => (
            <Row key={size} label={`Size ${size}`}>
              {variants.map((variant) => (
                <Button key={variant} size={size} variant={variant}>
                  Button
                  <ArrowRightIcon className="size-[1lh]" weight="bold" />
                </Button>
              ))}
            </Row>
          ))}
        </Grid>
      </Subsection>

      <Subsection title="States">
        <Grid columns={variants}>
          <Row label="Default">
            {variants.map((variant) => (
              <Button key={variant} variant={variant}>
                Button
              </Button>
            ))}
          </Row>

          <Row label="Disabled">
            {variants.map((variant) => (
              <Button disabled key={variant} variant={variant}>
                Button
              </Button>
            ))}
          </Row>

          <Row label="Loading">
            {variants.map((variant) => (
              <Button key={variant} loading variant={variant}>
                Button
              </Button>
            ))}
          </Row>
        </Grid>
      </Subsection>

      <Subsection title="Radius">
        <div className="flex flex-wrap gap-4">
          {radii.map((radius) => (
            <Button key={radius} radius={radius}>
              {radius}
            </Button>
          ))}
        </div>
      </Subsection>

      <Subsection title="Colors">
        <Grid columns={variants}>
          {colors.map((color) => (
            <Row key={color} label={color}>
              {variants.map((variant) => (
                <Button color={color} key={variant} variant={variant}>
                  Button
                </Button>
              ))}
            </Row>
          ))}
        </Grid>
      </Subsection>
    </Section>
  )
}
