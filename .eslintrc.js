module.exports = {
  root: true,
  // extends: ['plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  extends: ['plugin:vue/vue3-recommended', 'prettier'],
  parserOptions: {
    // parser: '@typescript-eslint/parser'
  },
  // plugins: ['@typescript-eslint', 'prettier'],
  plugins: ['prettier'],
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true
  },
  rules: {
    'prettier/prettier': 'warn',
    'vue/attributes-order': 'off',
    'vue/multi-word-component-names': 'off',
    'no-console': 'warn'
  }
}
