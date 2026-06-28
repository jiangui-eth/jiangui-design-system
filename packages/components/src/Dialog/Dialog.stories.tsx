import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dialog } from './Dialog'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => (
    <Dialog
      trigger={<button>Open Dialog</button>}
      title="Dialog title"
      description="This dialog has a title, description, and custom content."
    >
      <p style={{ margin: 0 }}>Dialog body content goes here.</p>
    </Dialog>
  ),
}

export const NoDescription: Story = {
  render: () => (
    <Dialog trigger={<button>Open (no description)</button>} title="Title only">
      <p style={{ margin: 0 }}>Content without a description prop.</p>
    </Dialog>
  ),
}

export const Controlled: Story = {
  render: function ControlledDialog() {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <button onClick={() => setOpen(true)}>Open controlled</button>
        <Dialog open={open} onOpenChange={setOpen} title="Controlled dialog">
          <p style={{ margin: 0 }}>This dialog is controlled externally.</p>
        </Dialog>
      </>
    )
  },
}
