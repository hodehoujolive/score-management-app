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
				user: { url: 'me', method: 'get', propertyName: 'data' },
				logout: false
			}
		}
	},
}
