module.exports = {

	// Meta Head
	head: {
		title: 'mevn',
		meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ hid: 'description', name: 'description', content: 'Nuxt.js project' }
		],
		link: [
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/semantic-ui@2.2.14/dist/semantic.min.css' }
		],
		script: [
		{ type: 'text/javascript', href: 'https://cdn.jsdelivr.net/npm/semantic-ui@2.2.14/dist/semantic.min.js' }
		]
	},

	// Progress Bar
	loading: { color: '#3B8070' },

	css: [
		'noty/lib/noty.css',
		'noty/lib/themes/mint.css',
		'@/assets/css/global.css'
	],

	// Build Config
	build: {
		// Run ESLint on save
		extend (config, { isDev, isClient }) {
			if (isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
		}
	}
}
