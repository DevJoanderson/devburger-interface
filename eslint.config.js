// eslint.config.js
import babelParser from '@babel/eslint-parser';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importHelpersPlugin from 'eslint-plugin-import-helpers';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,

  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'import-helpers': importHelpersPlugin,
      prettier: prettierPlugin, // <--- AQUI
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React e Hooks
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Prettier
      'prettier/prettier': 'error',

      // Import helpers
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/^react/',
            'module',
            '/^@shared/',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: {
            order: 'asc',
            ignoreCase: true,
          },
        },
      ],

      'no-unused-vars': 'warn',
    },
  },
  {
    env: {
      browser: true,
      es2021: true,
    },
  },
  prettier,
];
