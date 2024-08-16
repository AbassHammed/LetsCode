import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  ...compat.extends(
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],

      curly: 'warn',
      eqeqeq: 'error',
      'no-eq-null': 'error',
      'no-use-before-define': ['error', 'nofunc'],

      'brace-style': [
        'error',
        '1tbs',
        {
          allowSingleLine: true,
        },
      ],

      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': 'error',
      'comma-style': 'error',
      'func-call-spacing': 'error',

      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
          MemberExpression: 1,
        },
      ],

      'key-spacing': [
        'error',
        {
          mode: 'minimum',
        },
      ],

      'keyword-spacing': 'error',
      'object-curly-spacing': ['error', 'always'],
      'one-var': ['error', 'never'],

      quotes: [
        'error',
        'single',
        {
          allowTemplateLiterals: true,
        },
      ],

      semi: ['error', 'always'],

      'space-before-function-paren': [
        'error',
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always',
        },
      ],

      'space-infix-ops': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'as-needed'],
      'arrow-spacing': 'error',
      'no-duplicate-imports': 'error',
      'no-useless-constructor': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
    },
  },
];

export default config;
