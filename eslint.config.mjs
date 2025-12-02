import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import boundaries from 'eslint-plugin-boundaries';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      boundaries,
    },
    settings: {
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        {
          mode: 'full',
          type: 'app',
          capture: ['fileName'],
          pattern: 'src/app/**/*',
        },
        {
          mode: 'full',
          type: 'feature',
          pattern: 'src/features/*/**/*',
          capture: ['featureName'],
        },
        {
          mode: 'full',
          type: 'shared',
          pattern: 'src/shared/**/*',
        },
        {
          mode: 'full',
          type: 'config',
          pattern: 'src/*.{ts,tsx}', // Root files like middleware.ts, auth.ts (if any)
        },
      ],
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: 'app',
              allow: ['feature', 'shared'],
            },
            {
              from: 'app',
              allow: ['feature', 'shared', 'app'],
            },
            {
              from: 'feature',
              allow: ['shared', ['feature', { featureName: '${from.featureName}' }]],
            },
            {
              from: 'shared',
              allow: ['shared'],
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'generated/**',
  ]),
]);

export default eslintConfig;
