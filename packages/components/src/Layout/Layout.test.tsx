import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Stack, Grid, Divider } from './Layout'

describe('Stack', () => {
  it('renders children', () => {
    const { getByText } = render(<Stack><span>Child</span></Stack>)
    expect(getByText('Child')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Stack ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('applies column direction by default', () => {
    const { container } = render(<Stack />)
    expect((container.firstChild as HTMLElement).style.flexDirection).toBe('column')
  })

  it('applies row direction', () => {
    const { container } = render(<Stack direction="row" />)
    expect((container.firstChild as HTMLElement).style.flexDirection).toBe('row')
  })

  it('applies gap style', () => {
    const { container } = render(<Stack gap={4} />)
    expect((container.firstChild as HTMLElement).style.gap).toBeTruthy()
  })

  it('merges className', () => {
    const { container } = render(<Stack className="custom" />)
    expect(container.firstChild).toHaveClass('custom')
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Stack><span>Content</span></Stack>)
    expect(
      await axe(container, { rules: { 'color-contrast': { enabled: false } } }),
    ).toHaveNoViolations()
  })
})

describe('Grid', () => {
  it('renders with grid display', () => {
    const { container } = render(<Grid columns={3} />)
    expect(container.firstChild).toHaveClass('grid')
  })

  it('applies column count via style', () => {
    const { container } = render(<Grid columns={3} />)
    expect((container.firstChild as HTMLElement).style.gridTemplateColumns).toBe('repeat(3, 1fr)')
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Grid><span>cell</span></Grid>)
    expect(
      await axe(container, { rules: { 'color-contrast': { enabled: false } } }),
    ).toHaveNoViolations()
  })
})

describe('Divider', () => {
  it('renders an hr element', () => {
    const { container } = render(<Divider />)
    expect(container.querySelector('hr')).toBeInTheDocument()
  })

  it('decorative: role=none and aria-hidden', () => {
    const { container } = render(<Divider decorative />)
    const hr = container.querySelector('hr')!
    expect(hr).toHaveAttribute('role', 'none')
    expect(hr).toHaveAttribute('aria-hidden', 'true')
  })

  it('non-decorative: role=separator', () => {
    const { container } = render(<Divider decorative={false} />)
    const hr = container.querySelector('hr')!
    expect(hr).toHaveAttribute('role', 'separator')
    expect(hr).not.toHaveAttribute('aria-hidden')
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Divider decorative />)
    expect(
      await axe(container, { rules: { 'color-contrast': { enabled: false } } }),
    ).toHaveNoViolations()
  })
})
