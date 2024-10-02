/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/strongly-recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    '@vue/typescript/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['warn', { semi: false }],
    'vue/require-default-prop': 'off',
    'vue/no-v-for-template-key': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/no-v-model-argument': 'off',
    '@typescript-eslint/ban-types': 'off',
    'vue/no-setup-props-destructure': 'off',
    'vue/no-multiple-template-root': 'off',
  },
  ignorePatterns: ['src/api/generated/'],
}
