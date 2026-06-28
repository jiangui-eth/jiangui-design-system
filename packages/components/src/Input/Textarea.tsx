import React from 'react'
import styles from './Input.module.css'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  status?: 'default' | 'error' | 'success'
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ status = 'default', className, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={status === 'error' || undefined}
      className={[
        styles.root,
        styles.textarea,
        status !== 'default' ? styles[status] : undefined,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  ),
)
Textarea.displayName = 'Textarea'
