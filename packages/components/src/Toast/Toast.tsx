import React from 'react'
import { Toast as RadixToast } from '@jiangui-eth/primitives'
import styles from './Toast.module.css'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning'

export interface ToastItem {
  id: string
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

interface ToastContextValue {
  toast: (item: Omit<ToastItem, 'id'>) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export interface ToastProviderProps {
  children: React.ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const toast = React.useCallback((item: Omit<ToastItem, 'id'>) => {
    const id = String(Date.now() + Math.random())
    setToasts((prev) => [...prev, { ...item, id }])
  }, [])

  const dismiss = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <ToastContext.Provider value={{ toast }}>
      <RadixToast.Provider swipeDirection="right">
        {children}
        {toasts.map((t) => (
          <RadixToast.Root
            key={t.id}
            className={[styles.root, styles[t.variant ?? 'default']].join(' ')}
            duration={t.duration ?? 4000}
            onOpenChange={(open) => { if (!open) dismiss(t.id) }}
          >
            {t.title && (
              <RadixToast.Title className={styles.title}>{t.title}</RadixToast.Title>
            )}
            {t.description && (
              <RadixToast.Description className={styles.description}>
                {t.description}
              </RadixToast.Description>
            )}
            <RadixToast.Close className={styles.close} aria-label="Dismiss">
              ✕
            </RadixToast.Close>
          </RadixToast.Root>
        ))}
        <RadixToast.Viewport className={styles.viewport} />
      </RadixToast.Provider>
    </ToastContext.Provider>
  )
}
ToastProvider.displayName = 'ToastProvider'

export const useToast = () => {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
