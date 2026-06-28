import React from 'react'
import { Switch as RadixSwitch } from '@jiangui-eth/primitives'
import styles from './Checkbox.module.css'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked, onCheckedChange, disabled, label }, ref) => {
    const id = React.useId()
    return (
      <div className={styles.wrapper}>
        <RadixSwitch.Root
          ref={ref}
          id={id}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className={styles.switchRoot}
        >
          <RadixSwitch.Thumb className={styles.switchThumb} />
        </RadixSwitch.Root>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
      </div>
    )
  },
)
Switch.displayName = 'Switch'
