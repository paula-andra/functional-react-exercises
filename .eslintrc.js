module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
            jsx: true,
        },
    },
    plugins: [
        '@typescript-eslint',
        'import', // https://github.com/benmosher/eslint-plugin-import
        'jest', // https://github.com/jest-community/eslint-plugin-jest
        'react-hooks',
    ],
    extends: ['plugin:@typescript-eslint/recommended'],
    rules: {
        'no-multiple-empty-lines': 'error',
        'import/no-extraneous-dependencies': 'error',
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
            },
        ],
        'import/newline-after-import': 'error',
        'jest/no-focused-tests': 'error',
        eqeqeq: [
            'error',
            'always',
            {
                null: 'ignore',
            },
        ], // Check type-unsafe equality operators
        'no-console': [
            'error',
            {
                allow: ['warn', 'error'],
            },
        ],
        'no-var': 'error',
        'no-unused-expressions': 'off',
        'object-shorthand': 'error',
        'spaced-comment': 'error',
        'sort-imports': [
            'error',
            {
                ignoreDeclarationSort: true,
            },
        ],
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': 'off', // TS checks itself
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/prefer-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        '@typescript-eslint/ban-types': 'off',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'absolute-urls': 'off',
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    overrides: [
        {
            files: [ "**/*.ts?(x)" ],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                },
                ecmaVersion: 2018,
                sourceType: "module"
            },
            plugins: [
                "@typescript-eslint"
            ],
            // You can add Typescript specific rules here.
            // If you are adding the typescript variant of a rule which is there in the javascript
            // ruleset, disable the JS one.
            rules: {
                "@typescript-eslint/no-array-constructor": "warn",
                "no-array-constructor": "off"
            }
        }
    ],
};
