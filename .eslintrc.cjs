module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['vite.config.ts'],
}
