export default [
  {
    ignores: ['dist/', 'node_modules/', '.astro/', '**/*.astro']
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        document: 'readonly',
        window: 'readonly',
        URL: 'readonly',
        MediaQueryListEvent: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off'
    }
  }
];