/* eslint-env node */
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier' // this prevents conflicts between eslint and prettier (eslint-config-prettier)
  ],
  parser: '@typescript-eslint/parser',
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: true
  },
  plugins: ['react-refresh', 'unused-imports'],
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['./**/*.{js,cjs}']
    }
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react-refresh/only-export-components': 'warn',

    // no unused vars/imports
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ]
  },
  settings: {
    react: { // eslint-plugin-react
      version: 'detect' 
    }
  }
}
