import antfu from '@antfu/eslint-config'

export default antfu({
    ignores: [
        '**/node_modules/**',
        '**/*.config.*',
        '**/dist/**',
        '**/*.md',
        '**/*.json',
        '**/*.yaml',
        '**/*.yml',
    ],
    typescript: {
        tsconfigPath: 'tsconfig.json',
        overrides: {
            'ts/no-namespace': 'off',
            'ts/method-signature-style': 'off',
        }
    },
    rules: {
        'ts/no-unsafe-return': 'off',
        'ts/strict-boolean-expressions': 'off',
        'ts/no-misused-promises': [2, { checksVoidReturn: { attributes: false } }],
        'react/no-array-index-key': 'off',
        'test/prefer-lowercase-title': 'off',
        'node/prefer-global/process': 'off'
    },
    stylistic: {
        quotes: 'single',
        indent: 4,
    }
})