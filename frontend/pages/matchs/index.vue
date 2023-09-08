<template>
	<div>
		<v-container>
			<div class="d-flex justify-space-between">
				<h1 class="display-1 font-weight-light">
					Matchs Details
				</h1>

				<v-btn
        v-if="$auth.user"
                    color="blue darken-1"
                    text
                    @click="$router.push('/matchs/create')"
                    >
                    Create Match
                    </v-btn>
			</div>
      <!-- <div class="d-flex justify-space-between">
        <h1></h1>
        <div>
          <v-btn @click="exportData(exportFromJSON.types.csv)">
            Export CSV
          </v-btn>
          <v-btn @click="exportData(exportFromJSON.types.xml)">
            Export XML
          </v-btn>
          <v-btn @click="exportData(exportFromJSON.types.html)">
            Export HTML
          </v-btn>
        </div>
			</div> -->
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
// import exportFromJSON from 'export-from-json'
export default {
	name: 'matchPage',
	layout: 'dashboard',
	data () {
		return {
        matchs: [],
        // exportFromJSON
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
	}),
    methods: {
    exportData (type) {
      // const fileName = 'download'
      // const data = this.matchs.map(p => {
      //   delete p.guest.id
      //   delete p.host.id
      //   delete p.id;
      //   return p
      // })
      // exportFromJSON({ data, fileName, exportType: type })
    },
    }
}
</script>

<style scoped></style>
