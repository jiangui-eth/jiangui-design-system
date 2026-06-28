import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Popover } from './Popover'

describe('Popover', () => {
  const renderPopover = (props = {}) =>
    render(
      <Popover
        trigger={<button>Open</button>}
        content={<div>Popover content</div>}
        {...props}
      />,
    )

  it('renders trigger button', () => {
    renderPopover()
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
  })

  it('opens on trigger click', async () => {
    const user = userEvent.setup()
    renderPopover()
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText('Popover content')).toBeInTheDocument()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    renderPopover()
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByText('Popover content')
    await user.keyboard('{Escape}')
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
  })

  it('closes on outside click', async () => {
    const user = userEvent.setup()
    renderPopover()
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByText('Popover content')
    await user.click(document.body)
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
  })

  it('controlled: respects open + onOpenChange', async () => {
    const onOpenChange = vi.fn()
    render(
      <Popover
        trigger={<button>Open</button>}
        content={<div>Content</div>}
        open={true}
        onOpenChange={onOpenChange}
      />,
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = renderPopover()
    expect(
      await axe(container, { rules: { 'color-contrast': { enabled: false } } }),
    ).toHaveNoViolations()
  })
})
