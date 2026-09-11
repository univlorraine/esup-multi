// @ts-check
import eslint from '@eslint/js';
import angular from 'angular-eslint';
import localRules from 'eslint-plugin-local-rules';
import prettier from 'eslint-plugin-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'www/**',
      'coverage/**',
      'cve-report/**',
      '.angular/**',
      'node_modules/**',
      'android/**',
      'ios/**',
    ],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintPluginPrettierRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      'local-rules': localRules,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/component-class-suffix': [
        'error',
        {
          suffixes: ['Page', 'Component'],
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/naming-convention': 'error',
      '@angular-eslint/no-forward-ref': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'local-rules/no-unsafe-browser-open': 'error',
    },
  },
  {
    files: ['eslint.config.mjs'],
    extends: [eslint.configs.recommended],
  },
  {
    files: ['**/*.html'],
    plugins: {
      prettier,
    },
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      '@angular-eslint/template/use-track-by-function': 'error',
      'prettier/prettier': 'error',
    },
  },
);
