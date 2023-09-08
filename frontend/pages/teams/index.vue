<template>
	<div>
		<v-container>
			<div class="d-flex justify-space-between">
				<h1 class="display-1 font-weight-light">
					Teams
				</h1>

				<CreateTeam v-if="$auth.user" />
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
    <template #default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Details
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item) in teams"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>
            <TeamInfo :teamMembers="item.teamMembers" />
            <TeamStats :teamId="item.id" />
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
			</div>
		</v-container>
	</div>
</template>

<script>
import TeamInfo from '~/components/TeamInfo.vue';

// import exportFromJSON from 'export-from-json'
export default {
    name: 'TeamsIndex',
    layout: 'dashboard',
    data() {
        return {
            teams: []
        };
    },
    async fetch() {
        try {
            const teams = await this.$axios.get('/teams', this.form);
            this.teams = teams.data.results;
        }
        catch (error) {
            console.log(error);
        }
    },
    fetchOnServer: false,
    head: () => ({
        titleTemplate() {
            return `Teams`;
        }
    }),
    methods: {
        exportData(type) {
            // const fileName = 'download'
            // const data = this.teams.map(p => {
            //   p.teamMembers.map(r => {
            //     delete r.id;
            //     return r
            //   })
            //   delete p.id;
            //   return p
            // })
            // exportFromJSON({ data, fileName, exportType: type })
        }
    },
    components: { TeamInfo }
}
</script>

<style scoped></style>
