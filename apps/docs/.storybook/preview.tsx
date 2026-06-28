import React from 'react'
import '@jiangui-ds/tokens/css'
import '@jiangui-ds/tokens/dark'
import type { Preview, Decorator } from '@storybook/react'

// Apply data-theme attribute to <html> so CSS variables switch correctly
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals['theme'] as string
  document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '')
  return <Story />
}

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Disable Storybook's own backgrounds since we use data-theme + CSS vars
    backgrounds: { disable: true },
  },
}
export default preview
