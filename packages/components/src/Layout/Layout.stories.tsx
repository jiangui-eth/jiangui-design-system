import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Stack, Grid, Divider } from './Layout'

const Box = ({ children }: { children?: React.ReactNode }) => (
  <div
    style={{
      padding: '0.5rem 1rem',
      background: 'var(--ds-color-primary-subtle, #e0e7ff)',
      borderRadius: 4,
      fontSize: 12,
    }}
  >
    {children}
  </div>
)

const meta: Meta = {
  title: 'Components/Layout',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj

export const StackColumn: Story = {
  name: 'Stack (column)',
  render: () => (
    <Stack gap={2}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
}

export const StackRow: Story = {
  name: 'Stack (row)',
  render: () => (
    <Stack direction="row" gap={2} align="center">
      <Box>A</Box>
      <Box>B</Box>
      <Box>C</Box>
    </Stack>
  ),
}

export const GridStory: Story = {
  name: 'Grid (3 columns)',
  render: () => (
    <Grid columns={3} gap={2}>
      {Array.from({ length: 6 }, (_, i) => <Box key={i}>Cell {i + 1}</Box>)}
    </Grid>
  ),
}

export const DividerHorizontal: Story = {
  name: 'Divider (horizontal)',
  render: () => (
    <Stack gap={2}>
      <Box>Above</Box>
      <Divider />
      <Box>Below</Box>
    </Stack>
  ),
}

export const DividerVertical: Story = {
  name: 'Divider (vertical)',
  render: () => (
    <Stack direction="row" gap={2} style={{ height: 60 }}>
      <Box>Left</Box>
      <Divider orientation="vertical" />
      <Box>Right</Box>
    </Stack>
  ),
}
