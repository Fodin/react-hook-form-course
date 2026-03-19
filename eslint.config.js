import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importX from 'eslint-plugin-import-x'

const importRules = {
  'import-x/extensions': [
    'error',
    'ignorePackages',
    {
      ts: 'never',
      tsx: 'never',
      js: 'never',
      jsx: 'never',
    },
  ],
  'import-x/no-cycle': 'error',
  'import-x/no-extraneous-dependencies': ['error', { devDependencies: true }],
  'import-x/no-unresolved': ['error', { ignore: ['^exercises/'] }],
  'import-x/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
      pathGroups: [
        { pattern: 'src/**', group: 'internal', position: 'before' },
        { pattern: 'exercises/**', group: 'internal', position: 'after' },
        { pattern: './*.module.css', group: 'index', position: 'after' },
      ],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
    },
  ],
  'import-x/prefer-default-export': 'off',
}

export default tseslint.config(
  { ignores: ['dist', 'exercises/**/Task*.tsx', 'exercises/**/Cheat.tsx', 'src/exercises/**/Solution.tsx'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import-x': importX,
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: true,
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      ...importRules,
    },
  }
)
