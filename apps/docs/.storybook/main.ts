import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  // Pick up stories from all packages
  stories: ['../../../packages/*/src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}
export default config
