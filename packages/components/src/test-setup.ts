import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'
import { expect } from 'vitest'

expect.extend(toHaveNoViolations)

// Radix UI primitives use Pointer Events + scrollIntoView + ResizeObserver which jsdom doesn't implement.
if (typeof window !== 'undefined') {
  window.HTMLElement.prototype.hasPointerCapture = () => false
  window.HTMLElement.prototype.setPointerCapture = () => {}
  window.HTMLElement.prototype.releasePointerCapture = () => {}
  window.HTMLElement.prototype.scrollIntoView = () => {}

  // Radix Popover / Tooltip use ResizeObserver for positioning
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
