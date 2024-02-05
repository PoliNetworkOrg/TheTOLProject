/* eslint-env node */
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser', 
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: true,
  },
  plugins: ['react-refresh'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react-refresh/only-export-components': 'warn'
  },
  overrides: [
    {
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      files: ["./**/*.{js,cjs}"],
    },
  ],
}
