import globals from 'globals'
import eslintJS from '@eslint/js'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import { flatConfigs } from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import effectorPlugin from 'eslint-plugin-effector'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

const defaultOptions = {
  files: ['**/*.{js,ts,jsx,tsx}'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: typescriptParser,
    globals: {
      ...globals.browser,
      ...globals.node
    }
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.js', '.tsx', '.jsx']
      }
    }
  },
  ignores: ['dist/**', '.babelrc', 'node_modules']
}

export default [
  eslintJS.configs.recommended,
  flatConfigs.recommended,
  prettierConfig,
  {
    ...defaultOptions,
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      effector: effectorPlugin
    },
    rules: {
      // Prettier rules
      'prettier/prettier': 'error',

      // TypeScript rules
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-var-requires': 'off',

      // General rules
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-useless-catch': 'off',
      'no-plusplus': 'off',
      'no-continue': 'off',
      'no-prototype-builtins': 'off',
      'no-restricted-syntax': 'off',
      'consistent-return': 'off',
      'no-unused-expressions': 'off',
      'no-underscore-dangle': 'off',
      'max-classes-per-file': 'warn',
      'no-unused-vars': 'off',

      // Import rules
      'import/no-cycle': 'off',
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': ['error', {}],
      'import/extensions': 'off',
      'import/no-unresolved': 'error',

      // React rules
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
      'react/jsx-props-no-spreading': 'off',

      // Effector rules
      ...effectorPlugin.configs.recommended.rules,
      ...effectorPlugin.configs.future.rules,
      'effector/mandatory-scope-binding': 'off',
      'effector/enforce-gate-naming-convention': 'error'
    }
  }
]
