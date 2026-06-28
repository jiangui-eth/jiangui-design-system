import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('applies variant class', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>)
    expect(container.firstChild).toHaveClass('secondary')
  })

  it('applies size class', () => {
    const { container } = render(<Button size="lg">Large</Button>)
    expect(container.firstChild).toHaveClass('lg')
  })

  it('applies fullWidth class', () => {
    const { container } = render(<Button fullWidth>Full</Button>)
    expect(container.firstChild).toHaveClass('fullWidth')
  })

  it('is disabled when disabled prop set', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Button disabled onClick={onClick}>Disabled</Button>)
    await user.click(screen.getByRole('button'), { pointerEventsCheck: 0 })
    expect(onClick).not.toHaveBeenCalled()
  })

  it('merges className', () => {
    const { container } = render(<Button className="custom">Button</Button>)
    expect(container.firstChild).toHaveClass('custom')
  })

  describe('accessibility', () => {
    it.each(['primary', 'secondary', 'ghost'] as const)('%s variant has no violations', async (variant) => {
      const { container } = render(<Button variant={variant}>{variant}</Button>)
      expect(
        await axe(container, { rules: { 'color-contrast': { enabled: false } } }),
      ).toHaveNoViolations()
    })

    it('disabled button has no violations', async () => {
      const { container } = render(<Button disabled>Disabled</Button>)
      expect(
        await axe(container, { rules: { 'color-contrast': { enabled: false } } }),
      ).toHaveNoViolations()
    })
  })
})
