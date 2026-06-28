import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  it('renders trigger', () => {
    render(
      <Tooltip content="Tip text">
        <button>Trigger</button>
      </Tooltip>,
    )
    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument()
  })

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="Tip text" delayDuration={0}>
        <button>Trigger</button>
      </Tooltip>,
    )
    await user.hover(screen.getByRole('button'))
    // Radix renders tooltip with role="tooltip"
    expect(await screen.findByRole('tooltip')).toBeInTheDocument()
  })

  it('tooltip content text is correct', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="Custom tip" delayDuration={0}>
        <button>Trigger</button>
      </Tooltip>,
    )
    await user.hover(screen.getByRole('button'))
    const tooltip = await screen.findByRole('tooltip')
    expect(tooltip).toHaveTextContent('Custom tip')
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <Tooltip content="Tip" delayDuration={0}>
        <button>Trigger</button>
      </Tooltip>,
    )
    expect(
      await axe(container, { rules: { 'color-contrast': { enabled: false } } }),
    ).toHaveNoViolations()
  })
})
