module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'notion-yellow': 'rgb(247, 246, 243)',
				'vs-dark': '#1e1e1e',
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '100%',
						pre: {
							backgroundColor: 'transparent',
						},
					},
				},
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
