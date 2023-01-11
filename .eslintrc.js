/* eslint-disable array-bracket-newline */

module.exports = {
  env: {
    jest: true,
    node: true,
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jest',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: '2018',
    sourceType: 'module',
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [
        '.ts',
      ],
    },
    'import/resolver': {
      node: {},
      typescript: {
        directory: './tsconfig.json',
      },
    },
  },
  ignorePatterns: [
    'node_modules/',
  ],
  rules: {
    // Require use of the `import { foo } from 'bar';` form instead of `import foo = require('bar');`
    '@typescript-eslint/no-require-imports': ['error'],
    '@typescript-eslint/indent': ['error', 2],

    // Style
    'quotes': ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'always-multiline'], // ensures clean diffs, see https://medium.com/@nikgraf/why-you-should-enforce-dangling-commas-for-multiline-statements-d034c98e36f8
    'comma-spacing': ['error', { before: false, after: true }], // space after, no space before
    'no-multi-spaces': ['error', { ignoreEOLComments: false }], // no multi spaces
    'array-bracket-spacing': ['error', 'never'], // [1, 2, 3]
    'array-bracket-newline': ['error', 'consistent'], // enforce consistent line breaks between brackets
    'object-curly-spacing': ['error', 'always'], // { key: 'value' }
    'object-curly-newline': ['error', { multiline: true, consistent: true }], // enforce consistent line breaks between braces
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }], // enforce "same line" or "multiple line" on object properties
    'keyword-spacing': ['error'], // require a space before & after keywords
    'brace-style': ['error', '1tbs', { allowSingleLine: true }], // enforce one true brace style
    'space-before-blocks': 'error', // require space before blocks
    'curly': ['error', 'multi-line', 'consistent'], // require curly braces for multiline control statements
    'no-var': ['error'], // require let or const instead of var
    'spaced-comment': ['error', 'always'], // comment always followed by a space
    'array-bracket-newline': ['error', 'always'],

    // Require all imported dependencies are actually declared in package.json
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [ // Only allow importing devDependencies from:
          '**/build-tools/**', // --> Build tools
          '**/test/**', // --> Unit tests
        ],
        optionalDependencies: false, // Disallow importing optional dependencies (those shouldn't be in use in the project)
        peerDependencies: false, // Disallow importing peer dependencies (that aren't also direct dependencies)
      },
    ],

    // Require all imported libraries actually resolve (!!required for import/no-extraneous-dependencies to work!!)
    'import/no-unresolved': ['error'],

    // Require an ordering on all imports -- unfortunately a different ordering than TSLint used to
    // enforce, but there are no compatible ESLint rules as far as I can tell :(
    'import/order': ['error', {
      groups: ['builtin', 'external'],
      alphabetize: { order: 'asc', caseInsensitive: true },
    }],

    // Cannot import from the same module twice
    'no-duplicate-imports': ['error'],

    // Cannot shadow names
    'no-shadow': ['off'],
    '@typescript-eslint/no-shadow': ['error'],

    // Disallow unused variables
    'no-unused-vars': ['error'],

    // Required spacing in property declarations (copied from TSLint, defaults are good)
    'key-spacing': ['error'],

    // Require semicolons
    'semi': ['error', 'always'],

    // Don't unnecessarily quote properties
    'quote-props': ['error', 'consistent-as-needed'],

    // No multiple empty lines
    'no-multiple-empty-lines': ['error'],

    // Max line lengths
    'max-len': ['error', {
      code: 150,
      ignoreUrls: true, // Most common reason to disable it
      ignoreStrings: true, // These are not fantastic but necessary for error messages
      ignoreTemplateLiterals: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
    }],

    // One of the easiest mistakes to make
    '@typescript-eslint/no-floating-promises': ['error'],

    // Make sure that inside try/catch blocks, promises are 'return await'ed
    // (must disable the base rule as it can report incorrect errors)
    'no-return-await': 'off',
    '@typescript-eslint/return-await': 'error',

    // Don't leave log statements littering the premises!
    'no-console': ['error'],

    // Useless diff results
    'no-trailing-spaces': ['error'],

    // Cannot import from the same module twice
    'no-duplicate-imports': ['error'],

    // Must use foo.bar instead of foo['bar'] if possible
    'dot-notation': ['error'],

    // Are you sure | is not a typo for || ?
    'no-bitwise': ['error'],

    // Member ordering
    '@typescript-eslint/member-ordering': ['error', {
      default: [
        'public-static-field',
        'public-static-method',
        'protected-static-field',
        'protected-static-method',
        'private-static-field',
        'private-static-method',

        'field',

        // Constructors
        'constructor', // = ['public-constructor', 'protected-constructor', 'private-constructor']

        // Methods
        'method',
      ],
    }],

    // Overrides for plugin:jest/recommended
    'jest/expect-expect': 'off',
    'jest/no-conditional-expect': 'off',
  },
};