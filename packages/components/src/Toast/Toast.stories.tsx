import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from './Toast'
import type { ToastVariant } from './Toast'

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  decorators: [(Story) => <ToastProvider><Story /></ToastProvider>],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj

const ToastDemo = ({ variant, title, description }: { variant?: ToastVariant; title?: string; description?: string }) => {
  const { toast } = useToast()
  return (
    <button
      onClick={() =>
        toast({ variant, title: title ?? 'Toast title', description: description ?? 'Toast description.' })
      }
    >
      Show {variant ?? 'default'} toast
    </button>
  )
}

export const Default: Story = { render: () => <ToastDemo /> }
export const Success: Story = { render: () => <ToastDemo variant="success" title="Saved!" description="Your changes have been saved." /> }
export const Error: Story = { render: () => <ToastDemo variant="error" title="Error" description="Something went wrong." /> }
export const Warning: Story = { render: () => <ToastDemo variant="warning" title="Warning" description="Please check your input." /> }

export const AllVariants: Story = {
  render: () => {
    const { toast } = useToast()
    return (
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {(['default', 'success', 'error', 'warning'] as ToastVariant[]).map((v) => (
          <button key={v} onClick={() => toast({ variant: v, title: `${v} toast`, description: 'Sample description.' })}>
            {v}
          </button>
        ))}
      </div>
    )
  },
}
