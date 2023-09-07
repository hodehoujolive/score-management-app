<template>
	<div>
		<v-container>
			<div class="d-flex justify-space-between">
				<h1 class="display-1 font-weight-light">
					Teams
				</h1>

				<CreateTeam />
			</div>
			<div>
				<v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item) in teams"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
			</div>
		</v-container>
	</div>
</template>

<script>
export default {
	name: 'ProfileIndex',
	layout: 'default',
	data () {
		return {
        teams: []
      }
    },
    async fetch() {
        try {
            const teams = await this.$axios.get('/teams', this.form);
            this.teams = teams.data.results;
        } catch (error) {
			console.log(error)
        }
    },
	fetchOnServer: false,
	head: () => ({
		titleTemplate() {
			return `Teams`
		},
	})
}
</script>

<style scoped></style>
