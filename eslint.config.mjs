import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import("eslint").FlatConfig[]} */
export default [
  // Configurações recomendadas do ESLint para JavaScript
  js.configs.recommended,

  // Configurações de ambiente
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Configurações para arquivos TypeScript e Vue
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/ban-ts-comment': 'warn',
    },
  },

  // Configurações para arquivos Vue
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 2020,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      vue: vuePlugin,
    },
    rules: {
      ...vuePlugin.configs['vue3-recommended'].rules,
      'vue/multi-word-component-names': 'off',
    },
  },

  // Configurações do Prettier
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': [
        'error',
        {
          semi: true,
          trailingComma: 'es5',
          singleQuote: true,
        },
      ],
    },
  },

  // Regras adicionais
  {
    files: ['**/*.{js,ts,vue}'],
    rules: {
      'prefer-const': ['error', { destructuring: 'all', ignoreReadBeforeAssign: false }],
    },
  },
];
