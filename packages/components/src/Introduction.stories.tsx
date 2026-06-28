import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Design System/Introduction',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}
export default meta

const SWATCHES = [
  { name: 'primary',         var: '--ds-color-primary' },
  { name: 'secondary',       var: '--ds-color-secondary' },
  { name: 'success',         var: '--ds-color-success' },
  { name: 'warning',         var: '--ds-color-warning' },
  { name: 'error',           var: '--ds-color-error' },
  { name: 'info',            var: '--ds-color-info' },
  { name: 'bg-surface',      var: '--ds-color-bg-surface' },
  { name: 'text-default',    var: '--ds-color-text-default' },
]

export const Tokens: StoryObj = {
  name: 'Design Tokens',
  render: () => (
    <div style={{ fontFamily: 'sans-serif', color: 'var(--ds-color-text-default)', backgroundColor: 'var(--ds-color-bg-surface)', padding: '2rem', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 'var(--ds-font-size-2xl)', fontWeight: 'var(--ds-font-weight-bold)', marginBottom: '0.5rem' }}>
        jiangui Design System
      </h1>
      <p style={{ color: 'var(--ds-color-text-subtle)', marginBottom: '2rem' }}>
        Phase 0 — Token system live. Toggle the Theme toolbar above to switch dark mode.
      </p>

      <h2 style={{ fontSize: 'var(--ds-font-size-lg)', fontWeight: 'var(--ds-font-weight-semibold)', marginBottom: '1rem' }}>
        Semantic Color Tokens
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {SWATCHES.map(({ name, var: cssVar }) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--ds-border-radius-md)',
              backgroundColor: `var(${cssVar})`,
              border: '1px solid var(--ds-color-border-default)',
            }} />
            <span style={{ fontSize: 'var(--ds-font-size-xs)', color: 'var(--ds-color-text-subtle)' }}>
              {name}
            </span>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 'var(--ds-font-size-lg)', fontWeight: 'var(--ds-font-weight-semibold)', margin: '2rem 0 1rem' }}>
        Typography Scale
      </h2>
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const).map(size => (
        <p key={size} style={{ fontSize: `var(--ds-font-size-${size})`, marginBottom: '0.25rem', color: 'var(--ds-color-text-default)' }}>
          font-size-{size}
        </p>
      ))}
    </div>
  ),
}
