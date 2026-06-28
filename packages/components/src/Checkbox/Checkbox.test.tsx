import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Checkbox } from './Checkbox'
import { Radio, RadioGroup } from './RadioGroup'
import { Switch } from './Switch'

describe('Checkbox', () => {
  it('renders with role=checkbox', () => {
    render(<Checkbox label="Accept" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('clicking toggles checked state', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Checkbox label="Accept" onCheckedChange={onChange} />)
    await user.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('indeterminate: aria-checked=mixed', () => {
    render(<Checkbox label="Partial" checked="indeterminate" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed')
  })

  it('disabled does not respond to click', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Checkbox label="Disabled" disabled onCheckedChange={onChange} />)
    await user.click(screen.getByRole('checkbox'), { pointerEventsCheck: 0 })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Checkbox label="Accept" />)
    expect(
      await axe(container, {
        rules: { 'color-contrast': { enabled: false }, 'button-name': { enabled: false } },
      }),
    ).toHaveNoViolations()
  })
})

describe('RadioGroup', () => {
  it('renders radio options', () => {
    render(
      <RadioGroup>
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </RadioGroup>,
    )
    expect(screen.getAllByRole('radio')).toHaveLength(2)
  })

  it('selecting an option fires onValueChange', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(
      <RadioGroup onValueChange={onValueChange}>
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </RadioGroup>,
    )
    await user.click(screen.getByLabelText('A'))
    expect(onValueChange).toHaveBeenCalledWith('a')
  })

  it('disabled radio does not respond to click', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(
      <RadioGroup onValueChange={onValueChange}>
        <Radio value="a" label="A" disabled />
      </RadioGroup>,
    )
    await user.click(screen.getByRole('radio'), { pointerEventsCheck: 0 })
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <RadioGroup aria-label="Options">
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </RadioGroup>,
    )
    expect(
      await axe(container, {
        rules: { 'color-contrast': { enabled: false }, 'button-name': { enabled: false } },
      }),
    ).toHaveNoViolations()
  })
})

describe('Switch', () => {
  it('renders with role=switch', () => {
    render(<Switch label="Notifications" />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('clicking toggles state', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Switch label="Toggle" onCheckedChange={onChange} />)
    await user.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('disabled does not respond to click', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Switch label="Disabled" disabled onCheckedChange={onChange} />)
    await user.click(screen.getByRole('switch'), { pointerEventsCheck: 0 })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Switch label="Notifications" />)
    expect(
      await axe(container, {
        rules: { 'color-contrast': { enabled: false }, 'button-name': { enabled: false } },
      }),
    ).toHaveNoViolations()
  })
})
