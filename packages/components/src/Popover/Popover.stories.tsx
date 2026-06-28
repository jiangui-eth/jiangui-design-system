import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from './Popover'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover
      trigger={<button>Open popover</button>}
      content={
        <div>
          <p style={{ margin: 0, fontWeight: 600 }}>Popover title</p>
          <p style={{ margin: '0.5rem 0 0' }}>Some popover content here.</p>
        </div>
      }
    />
  ),
}

export const Sides: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '1rem', padding: '4rem' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Popover
          key={side}
          side={side}
          trigger={<button style={{ padding: '0.5rem 1rem' }}>{side}</button>}
          content={<p style={{ margin: 0 }}>{side} popover</p>}
        />
      ))}
    </div>
  ),
}
