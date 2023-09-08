export default {
	redirect: {
		login: '/auth/login',
		logout: '/auth/login',
		callback: '/auth/login/callback',
		home: '/',
	},

	strategies: {
		local: {
			endpoints: {
				login: { url: 'auth/login', method: 'post', propertyName: 'tokens.access' },
				user: { url: 'auth/me', method: 'get', propertyName: 'user' },
				logout: false
			},
			tokenRequired: true,
			tokenType: 'jwt'
		}
	},
}
