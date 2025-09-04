import importPlugin from 'eslint-plugin-import';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import vitest from 'eslint-plugin-vitest';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import json from '@eslint/json';

export default [
    {
        files: ['**/*.js', '**/*.mjs', '**/*.jsx'],
        ...js.configs.recommended,
    },
    {
        files: ['**/*.json'],
        ignores: ['**/package-lock.json', '**/tsconfig.json'],
        language: 'json/json',
        ...json.configs.recommended,
    },

    pluginReact.configs.flat.recommended,
    reactHooks.configs['recommended-latest'],
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
        plugins: {
            import: importPlugin,
            prettier: prettierPlugin,
            '@typescript-eslint': typescriptPlugin,
            js,
        },
        languageOptions: {
            globals: {
                node: true,
                es6: true,
                ...globals.browser,
            },
            parser: typescriptParser, // Assign the imported parser object
            parserOptions: {
                ecmaVersion: 8,
                sourceType: 'module',
                project: './tsconfig.json',
            },
        },
        settings: {
            react: { version: 'detect' },
            'import/resolver': {
                typescript: {},
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    moduleDirectory: ['node_modules', 'src/'],
                },
            },
        },
        rules: {
            '@typescript-eslint/no-non-null-assertion': 'off',
            'no-restricted-imports': [
                'error',
                {
                    patterns: ['src/features/*/*'],
                },
            ],
            'linebreak-style': ['off'],
            'react/prop-types': 'off',

            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                    ],
                    'newlines-between': 'never',
                    alphabetize: { caseInsensitive: true },
                },
            ],
            'no-undef': 'off',
            'no-unused-vars': 'off',
            'import/default': 'off',
            'import/no-named-as-default-member': 'off',
            'import/no-named-as-default': 'off',
            'react/react-in-jsx-scope': 'off',
            'jsx-a11y/anchor-is-valid': 'off',
            '@typescript-eslint/no-unused-vars': ['warn'],
            '@typescript-eslint/explicit-function-return-type': ['off'],
            '@typescript-eslint/explicit-module-boundary-types': ['off'],
            '@typescript-eslint/no-empty-function': ['off'],
            '@typescript-eslint/no-explicit-any': ['off'],
            'prettier/prettier': 0,
            'import/export': 0,
        },
        ignores: ['node_modules/*', 'src/__deprecated/*', 'vite.config.ts'],
    },
    {
        files: ['src/test/**'], // or any other pattern
        plugins: {
            vitest,
        },
        rules: {
            ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
            'vitest/max-nested-describe': ['error', { max: 3 }], // you can also modify rules' behavior using option like this
        },
    },
];
