<template>
	<v-container fill-height fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" lg="3">
				<BrandLogo class="text-center mb-8" />

				<v-alert v-if="accountCreated === true" type="success">
					<strong>Congratulation</strong>,
					<p>
						Your account has been created successfully. Now please
						login to your account and follow the steps to verify
						your email.
					</p>

					<v-btn color="primary" to="/auth/login"
						>Login to your account</v-btn
					>
				</v-alert>

				<v-form
					v-else
					:disabled="form.loading"
					@submit.prevent="userRegister"
				>
					<v-card flat>
						<v-card-title>Create Account</v-card-title>
						<v-card-subtitle
							>It's free and always will be.</v-card-subtitle
						>

						<v-card-text>
							<v-alert
								v-if="form.errors.has('error')"
								type="error"
								dismissible
								>{{ form.errors.get('error') }}</v-alert
							>

							<!-- Field: Name -->
							<v-text-field
								v-model="form.data.name"
								:rules="form.rules.name"
								:error="form.errors.has('name')"
								:error-messages="form.errors.get('name')"
								label="Name"
								outlined
								hint="Write your full name"
							></v-text-field>

							<!-- Field: Email -->
							<v-text-field
								v-model="form.data.email"
								:rules="form.rules.email"
								:error="form.errors.has('email')"
								:error-messages="form.errors.get('email')"
								label="Email"
								outlined
							></v-text-field>

							<!-- Field: Password -->
							<v-text-field
								v-model="form.data.password"
								:error="form.errors.has('password')"
								:error-messages="form.errors.get('password')"
								:append-icon="
									showPassword ? 'mdi-eye' : 'mdi-eye-off'
								"
								:type="showPassword ? 'text' : 'password'"
								:rules="form.rules.password"
								label="Password"
								outlined
								@click:append="showPassword = !showPassword"
							></v-text-field>

							<!-- Field: Password Confirmation -->
							<v-text-field
								v-model="form.data.password_confirmation"
								:error="
									form.errors.has('password_confirmation')
								"
								:error-messages="
									form.errors.get('password_confirmation')
								"
								:append-icon="
									showPassword ? 'mdi-eye' : 'mdi-eye-off'
								"
								:type="showPassword ? 'text' : 'password'"
								:rules="form.rules.password_confirmation"
								label="Confirm Password"
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
								>Create</v-btn
							>
						</v-card-text>

						<v-card-actions
							class="d-flex flex-column justify-center"
						>
							Already have account?
							<nuxt-link to="/auth/login">Login</nuxt-link>
						</v-card-actions>
					</v-card>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Errors from '~~/helpers/Errors'

export default {
	name: 'AuthRegister',
	auth: 'guest',
	data: () => {
		return {
			showPassword: false,
			accountCreated: false,
			form: {
				loading: false,
				errors: new Errors(),
				rules: {
					name: [(value) => !!value || 'This field is required.'],
					email: [(value) => !!value || 'This field is required.'],
					password: [(value) => !!value || 'This field is required.'],
					password_confirmation: [
						(value) => !!value || 'This field is required.',
					],
				},
				data: {
					name: '',
					email: '',
					password: '',
					password_confirmation: '',
				},
			},
		}
	},
	head: () => {
		return {
			title: 'Create new Account',
		}
	},
	methods: {
		userRegister() {
			this.loadingStart()

			this.$axios
				.post('/auth/register', this.form.data)
				.then(() => {
					this.accountCreated = true
				})
				.catch((err) => {
					this.form.errors.record(err.response.data)
					this.loadingStop()
				})
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
