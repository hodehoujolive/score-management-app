<template>
	<div>
		<v-container>
			<div class="d-flex justify-space-between">
				<h1 class="display-1 font-weight-light">
					Matchs Details
				</h1>

				<CreateTeam />
			</div>
			<div>
				<v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Host
          </th>
          <th class="text-left">
            Points
          </th>
          <th class="text-left">
            Guest
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in matchs"
          :key="i"
        >
          <td>{{ item.host.name }}</td>
          <td>{{ item.hostGoals }} - {{ item.guestGoals }}</td>
          <td>{{ item.guest.name }}</td>
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
	name: 'matchPage',
	layout: 'dashboard',
	data () {
		return {
        matchs: []
      }
    },
    async fetch() {
        try {
            const d = await this.$axios.get('/matchs');
            this.matchs = d.data.results;
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
