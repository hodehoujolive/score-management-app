<template>
	<v-container fill-height fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" lg="3">

				<v-form :disabled="form.loading" @submit.prevent="save">
					<v-card flat>
						<v-card-title>Game</v-card-title>

						<v-card-text>
							<v-alert
								v-if="form.errors.has('error')"
								type="error"
								dismissible
								>{{ form.errors.get('error') }}</v-alert
							>

							<v-select
							:items="items"
							v-model="form.data.host"
							label="Host"
							outlined
							></v-select>

							<!-- Field: Password -->
							<v-text-field
								v-model="form.data.hostGoals"
								:type="text"
								:rules="form.hostGoals"
								label="Host Goals"
								outlined
							></v-text-field>

							<v-card-actions
								class="d-flex flex-column justify-center"
							>
								<div class="my-3 text--disabled">VS</div>
							</v-card-actions>


							<v-select
							:items="items"
							v-model="form.data.guest"
							label="Guest"
							outlined
							></v-select>

							<!-- Field: Password -->
							<v-text-field
								v-model="form.data.guestGoals"
								:type="text"
								label="Guest Goals"
								outlined
							></v-text-field>


							<!-- Button: Submit -->
							<v-btn
								type="submit"
								block
								:disabled="form.loading"
								:loading="form.loading"
								large
								color="primary"
								>Save</v-btn
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
					guest: '',
					host: '',
					hostGoals: '',
					guestGoals: ''
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
		userLogin() {
			this.loadingStart()

			this.$auth
				.loginWith('local', {
					data: this.form.data,
				})
				.catch((err) => {
					console.log(err)
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
