import { FlatCompat } from '@eslint/eslintrc'

import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import jestPlugin from 'eslint-plugin-jest'
import reactPlugin from 'eslint-plugin-react'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [{
  rules: {
    "react/react-in-jsx-scope": "off"
  }
}, {
  plugins: {
    // key "simple-import-sort" is the plugin namespace
    "simple-import-sort": pluginSimpleImportSort
  },
},
{
  rules: {
    "simple-import-sort/imports": [
      "error",
      { groups: ["..."] }
    ]
  }
},
{
  files: ["**/*.{js,mjs,cjs,ts,mts,jsx,tsx}"],
  languageOptions: {
    // common parser options, enable TypeScript and JSX
    parser: "@typescript-eslint/parser",
    parserOptions: {
      sourceType: "module"
    }
  }
},
// Traditional config support (e.g., Next.js recommended rules)
...compat.extends('next/core-web-vitals', 'next', 'next/typescript'),
...compat.extends('react'),

// ESLint's built-in recommended rules
js.configs.recommended,

// React plugin
{
  files: ['**/*.jsx', '**/*.tsx'],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    react: reactPlugin,
  },
  rules: {
    ...reactPlugin.configs.recommended.rules,
  },
},

// TypeScript plugin
{
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  plugins: {
    '@typescript-eslint': typescriptPlugin,
  },
  rules: {
    ...typescriptPlugin.configs.recommended.rules,
  },
},

// Jest plugin (only for test files)
{
  files: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx', '**/__tests__/**/*'],
  plugins: {
    jest: jestPlugin,
  },
  rules: {
    ...jestPlugin.configs.recommended.rules,
  },
},

// Custom rules for any .js files
{
  files: ['**/*.js'],
  rules: {
    'no-console': 'warn',
    'semi': ['error', 'always'],
  },
},
]
