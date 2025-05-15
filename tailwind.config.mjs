/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				laomn: ['LaoMN', 'serif'],
				serif: ['serif'],
			},
			colors: {
				grey: '#fcf7e3',
        'grey-light': 'whitesmoke',
			},
		},
	},
	plugins: [
    import("@tailwindcss/typography"),
    // Agrega este plugin para utilidades personalizadas
    function ({ addUtilities }) {
      addUtilities({
        '.small-caps': {
          'font-variant': 'small-caps',
        },
      });
    },
  ],
};
