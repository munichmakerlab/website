import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default [
  { ignores: ['.astro/', 'dist/'] },
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'], languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  { rules: { 'vue/multi-word-component-names': 'off' } },
  ...eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
];
