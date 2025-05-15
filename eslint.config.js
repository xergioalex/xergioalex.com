import astroEslintParser from 'astro-eslint-parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import typescriptParser from '@typescript-eslint/parser';
import svelteParser from 'svelte-eslint-parser';
import sveltePlugin from 'eslint-plugin-svelte';

const config = [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
  },
  {
    files: ['**/*.{js,jsx,astro}'],
    rules: {
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    },
  },
  {
    // Define the configuration for `<script>` tag.
    // Script in `<script>` is assigned a virtual file name with the `.js` extension.
    files: ['**/*.{ts,tsx}', '**/*.astro/*.js'],
    languageOptions: {
      parser: typescriptParser,
    },
    rules: {
      // Note: you must disable the base rule as it can report incorrect errors
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    ignores: [
      'dist',
      'node_modules',
      '.github',
      'types.generated.d.ts',
      '.astro',
      'src/components/common/Mixpanel.astro',
      'src/components/common/GoogleAnalytics.astro',
    ],
  },
  {
    files: ['**/*.svelte'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      svelte: sveltePlugin,
    },
    languageOptions: {
      globals: {
        console: true,
        HTMLInputElement: true,
        KeyboardEvent: true,
        window: true,
        document: true,
        CustomEvent: true,
        HTMLTextAreaElement: true,
        navigator: true,
        HTMLElement: true,
        setTimeout: true,
        MouseEvent: true,
        Node: true,
        Event: true,
        FocusEvent: true,
        NodeJS: true,
        clearTimeout: true,
      },
      parser: svelteParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.svelte'],
      },
    },
    rules: {
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      'svelte/valid-compile': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_|^on[A-Z]|^error',
          caughtErrors: 'none',
        },
      ],
      'svelte/a11y-click-events-have-key-events': 'off',
      'svelte/a11y-no-noninteractive-element-interactions': 'off',
      'svelte/a11y-no-static-element-interactions': 'off',
    },
  },
];

config[0].languageOptions.globals.AudioWorkletGlobalScope = false;
delete config[0].languageOptions.globals['AudioWorkletGlobalScope '];

export default config;
