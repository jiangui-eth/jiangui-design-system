import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <Tooltip content="This is a tooltip" delayDuration={0}>
      <button>Hover me</button>
    </Tooltip>
  ),
}

export const Sides: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '2rem', padding: '3rem' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side} content={`${side} tooltip`} side={side} delayDuration={0}>
          <button style={{ padding: '0.5rem 1rem' }}>{side}</button>
        </Tooltip>
      ))}
    </div>
  ),
}
