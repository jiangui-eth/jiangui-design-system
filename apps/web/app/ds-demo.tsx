'use client'

import React from 'react'
import {
  Button,
  Input,
  Select,
  Checkbox,
  Stack,
  Grid,
  Divider,
  Tooltip,
  Dialog,
  ToastProvider,
  useToast,
} from '@jiangui-eth/components'

const ToastButton = () => {
  const { toast } = useToast()
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => toast({ variant: 'success', title: 'Saved!', description: 'Your changes have been saved.' })}
    >
      Show toast
    </Button>
  )
}

export function DSDemo() {
  const [checked, setChecked] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <ToastProvider>
      <Stack gap={4} style={{ padding: '2rem', maxWidth: 480, margin: '0 auto' }}>
        <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>
          @jiangui-eth/components · Phase 1 Demo
        </h2>

        <Divider />

        <Stack gap={2}>
          <Stack direction="row" gap={2} wrap>
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="secondary">Secondary</Button>
            <Button size="sm" variant="ghost">Ghost</Button>
            <Button size="sm" variant="danger">Danger</Button>
            <Button size="sm" loading>Loading</Button>
          </Stack>
        </Stack>

        <Divider />

        <Grid columns={2} gap={2}>
          <Input placeholder="Email" size="sm" />
          <Input placeholder="Error state" size="sm" status="error" />
        </Grid>

        <Select
          options={[
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'svelte', label: 'Svelte' },
          ]}
          value={value}
          onChange={setValue}
          placeholder="Select a framework"
          size="sm"
        />

        <Checkbox
          label="Accept terms and conditions"
          checked={checked}
          onCheckedChange={(v) => setChecked(v === true)}
        />

        <Stack direction="row" gap={2}>
          <Tooltip content="Opens a dialog" delayDuration={0}>
            <Dialog
              trigger={<Button size="sm" variant="secondary">Open Dialog</Button>}
              title="Example Dialog"
              description="This is an example modal built with Radix Dialog."
            >
              <p style={{ margin: 0, fontSize: '0.875rem' }}>Dialog body content.</p>
            </Dialog>
          </Tooltip>
          <ToastButton />
        </Stack>
      </Stack>
    </ToastProvider>
  )
}
