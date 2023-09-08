<template>
	<v-container fill-height fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" lg="3">

				<v-form :disabled="form.loading" @submit.prevent="userLogin">
					<v-card flat>
						<v-card-title>Account Login</v-card-title>
						<v-card-subtitle
							>Get access to your account.</v-card-subtitle
						>
						{{ $auth.user }}

						<v-card-text>
							<v-alert
								v-if="form.errors.has('error')"
								type="error"
								dismissible
								>{{ form.errors.get('error') }}</v-alert
							>

							<!-- Field: Email -->
							<v-text-field
								v-model="form.data.email"
								:rules="form.rules.email"
								label="Email"
								outlined
							></v-text-field>

							<!-- Field: Password -->
							<v-text-field
								v-model="form.data.password"
								:append-icon="
									showPassword ? 'mdi-eye' : 'mdi-eye-off'
								"
								:type="showPassword ? 'text' : 'password'"
								:rules="form.rules.password"
								label="Password"
								outlined
								@click:append="showPassword = !showPassword"
							></v-text-field>


							<!-- Button: Submit -->
							<v-btn
								type="submit"
								block
								:disabled="form.loading"
								:loading="form.loading"
								large
								color="primary"
								>Login</v-btn
							>
						</v-card-text>
					</v-card>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Errors from '~/helpers/Errors'

export default {
	name: 'AuthLogin',
	auth: 'guest',
	data: () => {
		return {
			showPassword: false,
			form: {
				loading: false,
				errors: new Errors(),
				rules: {
					email: [(value) => !!value || 'This field is required.'],
					password: [(value) => !!value || 'This field is required.'],
				},
				data: {
					email: '',
					password: ''
				},
			},
		}
	},
	head: () => {
		return {
			title: 'Log In',
		}
	},

	methods: {
		async userLogin() {
			try {
			this.loadingStart()

			const res = await this.$auth
				.loginWith('local', {
					data: this.form.data,
				})
				this.$auth.setUser(res.data.user);
				this.$router.push('/leaderboard')
			} catch(err) {
				this.form.errors.record(err.response.data)
				this.loadingStop()
			}
		},

		loadingStart() {
			this.form.loading = true
		},

		loadingStop() {
			this.form.loading = false
		},
	},
}
</script>

<style scoped></style>
