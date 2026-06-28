import React from 'react'
import { Tooltip as RadixTooltip } from '@jiangui-eth/primitives'
import styles from './Tooltip.module.css'

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  side?: 'top' | 'right' | 'bottom' | 'left'
  delayDuration?: number
}

export const Tooltip = ({ content, children, side = 'top', delayDuration = 700 }: TooltipProps) => (
  <RadixTooltip.Provider>
    <RadixTooltip.Root delayDuration={delayDuration}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content side={side} sideOffset={6} className={styles.content}>
          {content}
          <RadixTooltip.Arrow className={styles.arrow} />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  </RadixTooltip.Provider>
)
Tooltip.displayName = 'Tooltip'
