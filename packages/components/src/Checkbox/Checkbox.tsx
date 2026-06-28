import React from 'react'
import { Checkbox as RadixCheckbox } from '@jiangui-eth/primitives'
import { Check, Minus } from '@jiangui-eth/icons'
import styles from './Checkbox.module.css'

export interface CheckboxProps {
  checked?: boolean | 'indeterminate'
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  disabled?: boolean
  label?: string
  id?: string
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked, defaultChecked, onCheckedChange, disabled, label, id }, ref) => {
    const inputId = id ?? React.useId()
    return (
      <div className={styles.wrapper}>
        <RadixCheckbox.Root
          ref={ref}
          id={inputId}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className={styles.root}
        >
          <RadixCheckbox.Indicator className={styles.indicator}>
            {checked === 'indeterminate' ? (
              <Minus size={12} aria-hidden />
            ) : (
              <Check size={12} aria-hidden />
            )}
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
      </div>
    )
  },
)
Checkbox.displayName = 'Checkbox'
