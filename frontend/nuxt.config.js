import appConfig from './config/appConfig'
import themeConfig from './config/themeConfig'
import authConfig from './config/authConfig'
import axiosConfig from './config/axiosConfig'
import buildConfig from './config/buildConfig'

export default {
	loading: { color: '#ff5252', height: '3px' },

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: appConfig.head,

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/axios.js'
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'@nuxtjs/auth-next',
		'vue-social-sharing/nuxt'
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: axiosConfig,

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: themeConfig.vuetify,

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: buildConfig,

	// Auth Module Config
	auth: authConfig,

	// // Router Config
	// router: routerConfig,
}
