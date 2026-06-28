import React from 'react'
import styles from './Layout.module.css'

const GAP_MAP: Record<number, string> = {
  1: 'var(--ds-spacing-1)',
  2: 'var(--ds-spacing-2)',
  3: 'var(--ds-spacing-3)',
  4: 'var(--ds-spacing-4)',
  6: 'var(--ds-spacing-6)',
  8: 'var(--ds-spacing-8)',
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column'
  gap?: 1 | 2 | 3 | 4 | 6 | 8
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between'
  wrap?: boolean
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'column',
      gap,
      align,
      justify,
      wrap = false,
      className,
      style,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={[styles.stack, className].filter(Boolean).join(' ')}
      style={{
        flexDirection: direction,
        gap: gap != null ? GAP_MAP[gap] : undefined,
        alignItems: align,
        justifyContent: justify === 'between' ? 'space-between' : justify,
        flexWrap: wrap ? 'wrap' : undefined,
        ...style,
      }}
      {...props}
    />
  ),
)
Stack.displayName = 'Stack'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 1 | 2 | 3 | 4 | 6 | 8
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ columns = 1, gap, className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={[styles.grid, className].filter(Boolean).join(' ')}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gap != null ? GAP_MAP[gap] : undefined,
        ...style,
      }}
      {...props}
    />
  ),
)
Grid.displayName = 'Grid'

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', decorative = true, className, ...props }, ref) => (
    <hr
      ref={ref}
      role={decorative ? 'none' : 'separator'}
      aria-hidden={decorative || undefined}
      aria-orientation={!decorative ? orientation : undefined}
      className={[
        styles.divider,
        orientation === 'vertical' ? styles.vertical : styles.horizontal,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  ),
)
Divider.displayName = 'Divider'
