import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier/flat';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  prettierPlugin,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'prettier/prettier': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],

      // 2. 기타 설정
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'warn',

      // 3. Import 순서
      // eslint.config.mjs 내 rules 섹션
      'import/order': [
        'error',
        {
          groups: ['type', ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object']],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next/**',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['type'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          warnOnUnassignedImports: true,
        },
      ],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
