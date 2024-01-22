/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				title: ["Romantine", "sans-serif"],
				sans: ["Cherry Swash", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
}
