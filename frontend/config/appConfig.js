const APP_NAME = "Nuxt Auth"

export default {
	app: {
		name: APP_NAME
	},
	head: {
		titleTemplate: `%s - ${APP_NAME}`,
		title: APP_NAME,
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		],
	}
}
