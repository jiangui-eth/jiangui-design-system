import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Dialog } from './Dialog'

describe('Dialog', () => {
  it('renders trigger', () => {
    render(<Dialog trigger={<button>Open</button>} title="My Dialog" />)
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
  })

  it('opens on trigger click', async () => {
    const user = userEvent.setup()
    render(<Dialog trigger={<button>Open</button>} title="My Dialog" />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('My Dialog')).toBeInTheDocument()
  })

  it('renders description', async () => {
    const user = userEvent.setup()
    render(
      <Dialog
        trigger={<button>Open</button>}
        title="Title"
        description="Some description"
      />,
    )
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(await screen.findByText('Some description')).toBeInTheDocument()
  })

  it('renders body children', async () => {
    const user = userEvent.setup()
    render(
      <Dialog trigger={<button>Open</button>} title="Title">
        <span>Body content</span>
      </Dialog>,
    )
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('dialog')
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })

  it('closes on close button click', async () => {
    const user = userEvent.setup()
    render(<Dialog trigger={<button>Open</button>} title="My Dialog" />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('dialog')
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes on Escape key', async () => {
    const user = userEvent.setup()
    render(<Dialog trigger={<button>Open</button>} title="My Dialog" />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('dialog')
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('calls onOpenChange when closing', async () => {
    const onOpenChange = vi.fn()
    render(
      <Dialog
        open={true}
        onOpenChange={onOpenChange}
        title="Controlled"
      />,
    )
    await screen.findByRole('dialog')
    await userEvent.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('has no a11y violations when closed', async () => {
    const { container } = render(
      <Dialog trigger={<button>Open</button>} title="Title" />,
    )
    expect(
      await axe(container, { rules: { 'color-contrast': { enabled: false } } }),
    ).toHaveNoViolations()
  })

  it('has no a11y violations when open', async () => {
    const user = userEvent.setup()
    render(
      <Dialog trigger={<button>Open</button>} title="Title" description="Desc" />,
    )
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('dialog')
    expect(
      await axe(document.body, { rules: { 'color-contrast': { enabled: false } } }),
    ).toHaveNoViolations()
  })
})
