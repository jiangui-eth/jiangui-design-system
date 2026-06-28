import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Disabled option', value: 'disabled', disabled: true },
]

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { options, placeholder: 'Select a fruit…' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
}
export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {}
export const WithDefault: Story = { args: { defaultValue: 'banana' } }
export const Error: Story = { args: { status: 'error' } }
export const Disabled: Story = { args: { disabled: true } }

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: 240 }}>
      <Select options={options} size="sm" placeholder="Small" />
      <Select options={options} size="md" placeholder="Medium" />
      <Select options={options} size="lg" placeholder="Large" />
    </div>
  ),
}
