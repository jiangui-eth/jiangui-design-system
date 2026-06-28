import React from 'react'
import { Loader2 } from '@jiangui-eth/icons'
import styles from './Button.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={[
        styles.root,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : undefined,
        loading ? styles.loading : undefined,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {loading && <Loader2 size={16} className={styles.spinner} aria-hidden />}
      {children}
    </button>
  ),
)
Button.displayName = 'Button'
