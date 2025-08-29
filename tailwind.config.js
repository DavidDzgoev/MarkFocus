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
							wordBreak: 'break-word',
							whiteSpace: 'pre-wrap',
						},
						p: {
							wordBreak: 'break-word',
							whiteSpace: 'pre-wrap',
						},
						'h1, h2, h3, h4, h5, h6': {
							wordBreak: 'break-word',
							whiteSpace: 'pre-wrap',
						},
						'li, blockquote': {
							wordBreak: 'break-word',
							whiteSpace: 'pre-wrap',
						},
					},
				},
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
