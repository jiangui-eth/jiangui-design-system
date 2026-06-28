import React from 'react'
import { Select as RadixSelect } from '@jiangui-eth/primitives'
import { ChevronDown, Check } from '@jiangui-eth/icons'
import styles from './Select.module.css'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  status?: 'default' | 'error'
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      placeholder = 'Select…',
      disabled,
      size = 'md',
      status = 'default',
    },
    ref,
  ) => (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
      disabled={disabled}
    >
      <RadixSelect.Trigger
        ref={ref}
        aria-invalid={status === 'error' || undefined}
        className={[
          styles.trigger,
          styles[size],
          status === 'error' ? styles.error : undefined,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className={styles.icon}>
          <ChevronDown size={16} aria-hidden />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className={styles.content} position="popper" sideOffset={4}>
          <RadixSelect.Viewport className={styles.viewport}>
            {options.map((opt) => (
              <RadixSelect.Item
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className={styles.item}
              >
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className={styles.indicator}>
                  <Check size={14} aria-hidden />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  ),
)
Select.displayName = 'Select'
