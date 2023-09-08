<template>
	<div>
		<v-container>
			<div class="d-flex justify-space-between">
				<h1 class="display-1 font-weight-light">
					LeaderBoard
				</h1>
        <!-- <div>
          <v-btn @click="exportData(exportFromJSON.types.csv)">
            Export CSV
          </v-btn>
          <v-btn @click="exportData(exportFromJSON.types.xml)">
            Export XML
          </v-btn>
          <v-btn @click="exportData(exportFromJSON.types.html)">
            Export HTML
          </v-btn>
        </div> -->
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
          <th class="text-left">
            Partager sur ...
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
          <td>
              <v-btn 
                v-for="network in networks"
                x-small
                class="mx-2"
                :key="network.network"
                color="white"
                :style="{backgroundColor: network.color}"
              >
              <ShareNetwork
                :network="network.network"
                :url="sharing.url"
                :title="sharing.title"
                :description="sharing.description"
                :quote="sharing.quote"
                :hashtags="sharing.hashtags"
                :twitterUser="sharing.twitterUser"
              >
                <span>{{ network.name }}</span>
              </ShareNetwork>
            </v-btn>
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
// import exportFromJSON from 'export-from-json'
export default {
	name: 'LeaderboardIndex',
	layout: 'dashboard',
	data () {
		return {
        teams: [],
        interval: null,
        // exportFromJSON,
        sharing: {
          url: 'https://score-management-app/leaderboard',
          title: 'Découvrez le leaderboard et les scores des matchs en cours et passés.',
          description: 'Découvrez le premier du classement et les scores des différents matchs sur notre leaderboard dès maintenant.',
          hashtags: 'score,app',
          twitterUser: 'youyuxi'
        },
        networks: [
          { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
          { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
          { network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin', color: '#007bb5' },
          { network: 'messenger', name: 'Messenger', icon: 'fab fah fa-lg fa-facebook-messenger', color: '#0084ff' },
          { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
          { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
          { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' },
        ]
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
      this.interval = setInterval(async () => {
        try {
            const teams = await this.$axios.get('/teams/leaderboard');
            this.teams = teams.data.results;
        } catch (error) {
			    console.log(error)
        }
      }, 10000)
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    methods: {
    exportData (type) {
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
    },
    },
	fetchOnServer: false
}
</script>

<style scoped></style>
