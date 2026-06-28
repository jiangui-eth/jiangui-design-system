import React from 'react'
import styles from './Input.module.css'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  status?: 'default' | 'error' | 'success'
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', status = 'default', className, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={status === 'error' || undefined}
      className={[
        styles.root,
        styles[size],
        status !== 'default' ? styles[status] : undefined,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  ),
)
Input.displayName = 'Input'
