<template>
	<v-container fill-height fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" lg="8">

				<v-form :disabled="form.loading" @submit.prevent="save">
					<v-card flat>
						<v-card-title>Match</v-card-title>

						<v-card-text>

							<v-select
							v-model="form.data.host"
							:items="teams"
							item-text="name"
							item-value="id"
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
								<div class="mt-3 mb-5 text--disabled">VS</div>
							</v-card-actions>

							<v-select
							v-model="form.data.guest"
							:items="teams"
							item-text="name"
							item-value="id"
							label="Guest"
							outlined
							>
						</v-select>

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
	name: 'createMatch',
	auth: 'guest',
	layout: 'dashboard',
	data: () => {
		return {
			showPassword: false,
			teams: [],
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
	async fetch() {
		try {
			const teams = await this.$axios.get('/teams');
			this.teams = teams.data.results
		} catch (err) {
			this.form.errors.record(err.response.data)
		}
	},
	head: () => {
		return {
			title: 'Log In',
		}
	},
	methods: {
		async save() {
			try {
				this.loadingStart();
				const teams = await this.$axios.post('/matchs', this.form.data);
				this.teams = teams.data.results;
				this.$router.push('/leaderboard')
			} catch (err) {
				this.form.errors.record(err.response.data)
				
				this.loadingStop();
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
