/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 120,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,

  plugins: [
    require.resolve('prettier-plugin-astro'),
    'prettier-plugin-svelte',
  ],

  overrides: [
    { files: '*.astro', options: { parser: 'astro' } },
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
        svelteStrictMode: false,
        svelteAllowShorthand: true,
        svelteIndentScriptAndStyle: true,
      },
    },
  ],
};
