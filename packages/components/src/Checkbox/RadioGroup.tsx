import React from 'react'
import { Radio as RadixRadio } from '@jiangui-eth/primitives'
import styles from './Checkbox.module.css'

export interface RadioProps {
  value: string
  label?: string
  disabled?: boolean
}

export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  ({ value, label, disabled }, ref) => {
    const id = React.useId()
    return (
      <div className={styles.wrapper}>
        <RadixRadio.Item
          ref={ref}
          id={id}
          value={value}
          disabled={disabled}
          className={styles.radioItem}
        >
          <RadixRadio.Indicator className={styles.radioIndicator} />
        </RadixRadio.Item>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
      </div>
    )
  },
)
Radio.displayName = 'Radio'

export interface RadioGroupProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  children: React.ReactNode
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value, defaultValue, onValueChange, disabled, children }, ref) => (
    <RadixRadio.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      className={styles.radioGroup}
    >
      {children}
    </RadixRadio.Root>
  ),
)
RadioGroup.displayName = 'RadioGroup'
