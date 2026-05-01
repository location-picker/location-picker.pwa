import globals from 'globals'
import tseslint from 'typescript-eslint'

import nextPlugin from '@next/eslint-plugin-next'

const eslintConfig = tseslint.config(
    {
        ignores: ['.next/**', 'build/**', 'out/**', 'next-env.d.ts', 'public/sw.js', 'public/workbox-*.js'],
    },
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            '@next/next': nextPlugin,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs['core-web-vitals'].rules,
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
        },
    },
)

export default eslintConfig
