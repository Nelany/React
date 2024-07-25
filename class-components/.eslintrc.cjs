module.exports = {
  root: true,
  env: { browser: true, es2020: true },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],

  ignorePatterns: ['dist', '.eslintrc.cjs'],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['react-refresh', '@typescript-eslint', 'import', 'react-compiler'],

  rules: {
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
    ],
    'react-compiler/react-compiler': 'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    '@typescript-eslint/no-explicit-any': 'error',
    'implicit-arrow-linebreak': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },

    'import/resolver': {
      alias: {
        map: [['', './public']],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
};
