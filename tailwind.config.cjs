/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	safelist: ['lg:max-w-[1100px]', 'lg:max-w-[900px]'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				serif: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
				mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		themes: [
			{
				warm: {
					"color-scheme": "light",
					"primary":          "#7C6354",
					"primary-content":  "#FAF8F4",
					"secondary":        "#B5967A",
					"secondary-content":"#FAF8F4",
					"accent":           "#C0F610",
					"accent-content":   "#2E2825",
					"neutral":          "#4A4440",
					"neutral-content":  "#FAF8F4",
					"base-100":         "#FAF8F4",
					"base-200":         "#F0EBE3",
					"base-300":         "#E3DAD0",
					"base-content":     "#2E2825",
					"info":             "#6B8FAB",
					"success":          "#6B9E7A",
					"warning":          "#C9934A",
					"error":            "#B85C5C",
				},
			},
			"dark",
		],
		darkTheme: "dark",
		logs: false,
	},
}
