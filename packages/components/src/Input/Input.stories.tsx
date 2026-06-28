import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { Textarea } from './Textarea'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    status: { control: 'select', options: ['default', 'error', 'success'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: { placeholder: 'Placeholder text' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
}
export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {}
export const Error: Story = { args: { status: 'error', placeholder: 'Error state' } }
export const Success: Story = { args: { status: 'success', placeholder: 'Success state' } }
export const Disabled: Story = { args: { disabled: true, placeholder: 'Disabled' } }

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: 320 }}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
}

export const TextareaStory: Story = {
  name: 'Textarea',
  render: () => (
    <div style={{ width: 320 }}>
      <Textarea placeholder="Write something…" rows={4} />
    </div>
  ),
}

export const TextareaError: Story = {
  name: 'Textarea Error',
  render: () => (
    <div style={{ width: 320 }}>
      <Textarea status="error" placeholder="Error state" rows={4} />
    </div>
  ),
}
