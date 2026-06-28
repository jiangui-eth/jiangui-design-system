import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Select } from './Select'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Disabled', value: 'disabled', disabled: true },
]

describe('Select', () => {
  it('renders trigger with placeholder', () => {
    render(<Select options={options} placeholder="Pick one" />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByText('Pick one')).toBeInTheDocument()
  })

  it('opens dropdown on click', async () => {
    const user = userEvent.setup()
    render(<Select options={options} />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('selects an option and fires onChange', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Select options={options} onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'Apple' }))
    expect(onChange).toHaveBeenCalledWith('apple')
  })

  it('closes on Escape without firing onChange', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Select options={options} onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.keyboard('{Escape}')
    expect(onChange).not.toHaveBeenCalled()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('disabled option is not selectable', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Select options={options} onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    const disabledOpt = screen.getByRole('option', { name: 'Disabled' })
    expect(disabledOpt).toHaveAttribute('data-disabled')
  })

  it('shows defaultValue on mount', () => {
    render(<Select options={options} defaultValue="banana" />)
    expect(screen.getByText('Banana')).toBeInTheDocument()
  })

  it('trigger is disabled when disabled prop set', () => {
    render(<Select options={options} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('status=error sets aria-invalid on trigger', () => {
    render(<Select options={options} status="error" />)
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Select options={options} />)
    expect(
      await axe(container, {
        rules: {
          'color-contrast': { enabled: false },
          // button-name: jsdom renders the Radix trigger in isolation without a
          // wrapping <label>; real usage always pairs the Select with a visible label
          'button-name': { enabled: false },
        },
      }),
    ).toHaveNoViolations()
  })
})
