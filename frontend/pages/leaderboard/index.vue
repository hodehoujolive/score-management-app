<template>
	<div>
		<v-container>
			<div class="d-flex justify-space-between">
				<h1 class="display-1 font-weight-light">
					LeaderBoard
				</h1>
			</div>
			<div>
				<v-simple-table>
    <template #default>
      <thead>
        <tr>
          <th class="text-left">
            Position
          </th>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Points
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in teams"
          :key="item.name"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.points }}</td>
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
	name: 'LeaderboardIndex',
	layout: 'dashboard',
	data () {
		return {
        teams: []
      }
    },
    async fetch() {
        try {
            const teams = await this.$axios.get('/teams/leaderboard');
            this.teams = teams.data.results;
        } catch (error) {
			    console.log(error)
        }
    },
	head: () => ({
		titleTemplate() {
			return `Teams`
		},
	}),
    mounted() {
      setInterval(async () => {
        try {
            const teams = await this.$axios.get('/teams/leaderboard');
            this.teams = teams.data.results;
        } catch (error) {
			    console.log(error)
        }
      }, 10000)
    },
	fetchOnServer: false
}
</script>

<style scoped></style>
