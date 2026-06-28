import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { ToastProvider, useToast } from './Toast'

const Trigger = ({ title = 'Test toast', description = 'Test body' } = {}) => {
  const { toast } = useToast()
  return <button onClick={() => toast({ title, description })}>Show toast</button>
}

const renderWithProvider = (ui = <Trigger />) =>
  render(<ToastProvider>{ui}</ToastProvider>)

describe('ToastProvider / useToast', () => {
  it('renders children', () => {
    renderWithProvider(<span>App content</span>)
    expect(screen.getByText('App content')).toBeInTheDocument()
  })

  it('shows toast on demand', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    await user.click(screen.getByRole('button', { name: 'Show toast' }))
    expect(await screen.findByText('Test toast')).toBeInTheDocument()
    expect(screen.getByText('Test body')).toBeInTheDocument()
  })

  it('shows success variant', async () => {
    const user = userEvent.setup()
    const SuccessTrigger = () => {
      const { toast } = useToast()
      return (
        <button onClick={() => toast({ variant: 'success', title: 'Done!' })}>
          Show
        </button>
      )
    }
    renderWithProvider(<SuccessTrigger />)
    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(await screen.findByText('Done!')).toBeInTheDocument()
  })

  it('shows error variant', async () => {
    const user = userEvent.setup()
    const ErrTrigger = () => {
      const { toast } = useToast()
      return (
        <button onClick={() => toast({ variant: 'error', title: 'Error!' })}>
          Show
        </button>
      )
    }
    renderWithProvider(<ErrTrigger />)
    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(await screen.findByText('Error!')).toBeInTheDocument()
  })

  it('can dismiss toast via close button', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    await user.click(screen.getByRole('button', { name: 'Show toast' }))
    await screen.findByText('Test toast')
    await user.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(screen.queryByText('Test toast')).not.toBeInTheDocument()
  })

  it('throws when useToast is used outside provider', () => {
    const BadConsumer = () => { useToast(); return null }
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<BadConsumer />)).toThrow('useToast must be used inside <ToastProvider>')
    spy.mockRestore()
  })

  it('has no a11y violations', async () => {
    const { container } = renderWithProvider()
    expect(
      await axe(container, { rules: { 'color-contrast': { enabled: false } } }),
    ).toHaveNoViolations()
  })
})
