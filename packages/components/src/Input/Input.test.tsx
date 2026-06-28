import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Input } from './Input'
import { Textarea } from './Textarea'

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input aria-label="name" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} aria-label="test" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('controlled: onChange fires with new value', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Input value="" onChange={onChange} aria-label="ctrl" />)
    await user.type(screen.getByRole('textbox'), 'hello')
    expect(onChange).toHaveBeenCalled()
  })

  it('uncontrolled: defaultValue initializes', () => {
    render(<Input defaultValue="init" aria-label="unctrl" />)
    expect(screen.getByRole<HTMLInputElement>('textbox').value).toBe('init')
  })

  it('status=error sets aria-invalid', () => {
    render(<Input status="error" aria-label="err" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('status=default does not set aria-invalid', () => {
    render(<Input status="default" aria-label="ok" />)
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid')
  })

  it('is disabled when disabled prop set', () => {
    render(<Input disabled aria-label="dis" />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('merges className', () => {
    const { container } = render(<Input className="custom" aria-label="cls" />)
    expect(container.firstChild).toHaveClass('custom')
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <label>
        Name
        <Input />
      </label>,
    )
    expect(
      await axe(container, { rules: { 'color-contrast': { enabled: false } } }),
    ).toHaveNoViolations()
  })
})

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea aria-label="notes" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} aria-label="test" />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('status=error sets aria-invalid', () => {
    render(<Textarea status="error" aria-label="err" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <label>
        Notes
        <Textarea />
      </label>,
    )
    expect(
      await axe(container, { rules: { 'color-contrast': { enabled: false } } }),
    ).toHaveNoViolations()
  })
})
