import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, test, expect, vi } from 'vitest'

// ── Baseline tests — validates that the test infrastructure is wired up ───────

describe('Testing Library', () => {
  test('renders a DOM element and queries by role', () => {
    render(<button type="button">Click me</button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  test('jest-dom matchers: toBeVisible, toHaveTextContent', () => {
    render(<p data-testid="msg">Hello DS</p>)
    const el = screen.getByTestId('msg')
    expect(el).toBeVisible()
    expect(el).toHaveTextContent('Hello DS')
  })
})

describe('user-event', () => {
  test('click triggers handler', async () => {
    const handler = vi.fn()
    render(<button type="button" onClick={handler}>Action</button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledOnce()
  })

  test('keyboard: focus and type into input', async () => {
    render(<input aria-label="search" />)
    const input = screen.getByRole('textbox', { name: 'search' })
    await userEvent.click(input)
    await userEvent.keyboard('hello')
    expect(input).toHaveValue('hello')
  })
})

describe('jest-axe a11y', () => {
  test('semantic landmark has no violations', async () => {
    const { container } = render(
      <main>
        <h1>jiangui Design System</h1>
        <p>Component library infrastructure test.</p>
      </main>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  test('button with accessible label has no violations', async () => {
    const { container } = render(
      <button type="button" aria-label="Close dialog">×</button>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
