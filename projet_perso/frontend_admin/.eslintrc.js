module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    curly: 2,
    'default-case': 'error',
    eqeqeq: 2,
    'no-alert': 1,
    semi: 0,
    'react/prop-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    'prettier/prettier': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    'react-hooks/exhaustive-deps': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/triple-slash-reference': 0,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-empty-interface': 0,
  },
  ignorePatterns: ['node_modules/'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
