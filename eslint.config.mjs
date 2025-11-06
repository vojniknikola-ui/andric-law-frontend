import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const reactFlat = reactPlugin.configs.flat?.recommended ?? reactPlugin.configs.recommended;
const reactHooksRecommended = reactHooksPlugin.configs.recommended;
const jsxA11yRecommended = jsxA11yPlugin.configs.recommended;
const importRecommended = importPlugin.configs.recommended;
const nextRecommended = nextPlugin.configs.recommended;
const nextCoreWebVitals = nextPlugin.configs['core-web-vitals'];

const tsFilePatterns = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'];
const applyTypeScriptFiles = (configs) =>
  configs.map((config) =>
    config.files ? config : { ...config, files: tsFilePatterns }
  );

export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**'],
  },
  js.configs.recommended,
  ...applyTypeScriptFiles(tsPlugin.configs['flat/recommended']),
  {
    files: tsFilePatterns,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      ...reactFlat?.rules,
      ...reactHooksRecommended?.rules,
      ...jsxA11yRecommended?.rules,
      ...importRecommended?.rules,
      ...nextRecommended?.rules,
      ...nextCoreWebVitals?.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
    },
  },
];
