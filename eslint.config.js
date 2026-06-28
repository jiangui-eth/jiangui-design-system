import { config as baseConfig } from '@jiangui-eth/eslint-config/base'
import globals from 'globals'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/storybook-static/**',
      '**/.next/**',
      '**/coverage/**',
    ],
  },
]
