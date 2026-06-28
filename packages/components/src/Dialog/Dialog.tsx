import React from 'react'
import { Dialog as RadixDialog } from '@jiangui-eth/primitives'
import styles from './Dialog.module.css'

export interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactElement
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  closeLabel?: string
}

export const Dialog = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  closeLabel = 'Close',
}: DialogProps) => (
  <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
    {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
    <RadixDialog.Portal>
      <RadixDialog.Overlay className={styles.overlay} />
      <RadixDialog.Content className={styles.content} aria-describedby={description ? undefined : 'dialog-desc'}>
        {title && (
          <RadixDialog.Title className={styles.title}>{title}</RadixDialog.Title>
        )}
        {description && (
          <RadixDialog.Description className={styles.description}>
            {description}
          </RadixDialog.Description>
        )}
        {!description && (
          <span id="dialog-desc" style={{ display: 'none' }} />
        )}
        <div className={styles.body}>{children}</div>
        <RadixDialog.Close asChild>
          <button className={styles.close} aria-label={closeLabel}>
            <span aria-hidden>✕</span>
          </button>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
)
Dialog.displayName = 'Dialog'
