module.exports = {
	/*
	 ** Headers of the page
	 */
	head: {
		title: '导航系统',
		meta: [{
				charset: 'utf-8'
			},
			{ hid: 'description', name: 'description', content: 'Nuxt.js koa mongodb 导航系统' }
		],
//		script: [{
//				src: ''
//			},
//		],
		link: [{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon.ico'
		}]
	},
	css: ['iview/dist/styles/iview.css'],
	/*
	 ** Customize the progress bar color
	 */
	loading: {
		color: '#ffe600'
	},
	/*
	 ** Build configuration
	 */
	build: {
		vendor: ['axios'],
		/*
		 ** Run ESLint on save
		 */
		//  extend (config, { isDev, isClient }) {
		//    if (isDev && isClient) {
		//      config.module.rules.push({
		//        enforce: 'pre',
		//        test: /\.(js|vue)$/,
		//        loader: 'eslint-loader',
		//        exclude: /(node_modules)/
		//      })
		//    }
		//  }
	},
//	axios: {
//		baseURL: 'http://vueh5.xueshanshan.top',
//		credentials: false,
//		proxyHeaders: false
//	},
	postcss: function() {
		return [px2rem({
			remUnit: 75
		})];
	},
	modules: ['@nuxtjs/pwa', '@nuxtjs/axios'],
	plugins: ['~/plugins/components.js', '~/plugins/filters.js']
}