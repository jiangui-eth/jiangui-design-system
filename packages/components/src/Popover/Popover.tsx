import React from 'react'
import { Popover as RadixPopover } from '@jiangui-eth/primitives'
import styles from './Popover.module.css'

export interface PopoverProps {
  trigger: React.ReactElement
  content: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Popover = ({
  trigger,
  content,
  side = 'bottom',
  align = 'center',
  open,
  onOpenChange,
}: PopoverProps) => (
  <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
    <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
    <RadixPopover.Portal>
      <RadixPopover.Content
        side={side}
        align={align}
        sideOffset={8}
        className={styles.content}
      >
        {content}
        <RadixPopover.Arrow className={styles.arrow} />
      </RadixPopover.Content>
    </RadixPopover.Portal>
  </RadixPopover.Root>
)
Popover.displayName = 'Popover'
