import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'
import { Radio, RadioGroup } from './RadioGroup'
import { Switch } from './Switch'

const meta: Meta = {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj

export const CheckboxDefault: Story = {
  name: 'Checkbox',
  render: () => <Checkbox label="Accept terms" />,
}

export const CheckboxChecked: Story = {
  name: 'Checkbox Checked',
  render: () => <Checkbox label="Checked" defaultChecked />,
}

export const CheckboxIndeterminate: Story = {
  name: 'Checkbox Indeterminate',
  render: () => <Checkbox label="Indeterminate" checked="indeterminate" />,
}

export const CheckboxDisabled: Story = {
  name: 'Checkbox Disabled',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
}

export const RadioGroupStory: Story = {
  name: 'RadioGroup',
  render: () => (
    <RadioGroup defaultValue="b">
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
      <Radio value="c" label="Option C" />
      <Radio value="d" label="Disabled" disabled />
    </RadioGroup>
  ),
}

export const SwitchDefault: Story = {
  name: 'Switch',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Switch label="Notifications" />
      <Switch label="Dark mode" defaultChecked />
      <Switch label="Disabled" disabled />
    </div>
  ),
}
