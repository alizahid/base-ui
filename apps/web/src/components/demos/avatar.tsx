'use client'

import { Avatar, type AvatarProps, colors } from '@repo/ui'

import { Grid, Row } from '../grid'
import { Section, Subsection } from '../section'

const variants = ['solid', 'soft'] as const
const image = (n: number) => `https://i.pravatar.cc/128?img=${n}`
const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const
const fallbacks = ['A', 'W', 'AZ', 'IL', 'WW'] as const
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
] as const satisfies Array<AvatarProps['radius']>

export function AvatarDemo() {
  return (
    <Section title="Avatar">
      <Subsection title="Sizes">
        <Grid columns={['single', 'double', 'image']}>
          {sizes.map((size) => (
            <Row key={size} label={`Size ${size}`}>
              <Avatar fallback="A" size={size} />
              <Avatar fallback="AZ" size={size} />
              <Avatar fallback="AZ" size={size} src={image(Number(size))} />
            </Row>
          ))}
        </Grid>
      </Subsection>

      <Subsection title="Fallbacks">
        <Grid columns={variants}>
          {fallbacks.map((fallback) => (
            <Row key={fallback} label={fallback}>
              {variants.map((variant) => (
                <Avatar
                  fallback={fallback}
                  key={variant}
                  size="6"
                  variant={variant}
                />
              ))}
            </Row>
          ))}
        </Grid>
      </Subsection>

      <Subsection title="Radius">
        <div className="flex flex-wrap gap-4">
          {radii.map((radius, index) => (
            <Avatar
              fallback="AZ"
              key={radius}
              radius={radius}
              src={index % 2 ? image(index + 10) : undefined}
            />
          ))}
        </div>
      </Subsection>

      <Subsection title="Colors">
        <Grid columns={variants}>
          {colors.map((color) => (
            <Row key={color} label={color}>
              {variants.map((variant) => (
                <Avatar
                  color={color}
                  fallback="AZ"
                  key={variant}
                  variant={variant}
                />
              ))}
            </Row>
          ))}
        </Grid>
      </Subsection>
    </Section>
  )
}
