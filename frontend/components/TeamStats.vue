<template>
    <v-dialog
        v-model="dialog"
        max-width="1200px"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            View Team Stats
          </v-btn>
        </template>
        <v-card class="px-5 py-5">
            <h1 class="display-1 font-weight-light">
                Statistiques
            </h1>
			<v-simple-table>
                <template #default>
                <thead>
                    <tr>
                        <th class="text-left">
                            Host
                        </th>
                        <th class="text-left">
                            Score
                        </th>
                        <th class="text-left">
                            Guest
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item) in data"
                        :key="item.id"
                    >
                        <td>{{ item.host.name }}</td>
                        <td>{{ item.hostGoals }} - {{ item.guestGoals }}</td>
                        <td>{{ item.guest.name }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </v-card>
      </v-dialog>
  </template>
  <script>
    export default {
        props: {
            teamId: {
                type: String,
                required: true,
		    },
        },
        data: () => ({
            dialog: false,
            form: {
                name: '',
                players: [
                    {
                        firstname: '',
                        lastname: '',
                        email: ''
                    },
                    {
                        firstname: '',
                        lastname: '',
                        email: ''
                    },
                    {
                        firstname: '',
                        lastname: '',
                        email: ''
                    }
                ],
                data: []
            }
        }),
        async fetch() {
            try {
                const res = await this.$axios.get('/matchs?teamId=' + this.teamId);
                this.data = res.data.results
            } catch (error) {
                
            }
        },
        methods: {
            async save () {
                try {
                    await this.$axios.post('/teams', this.form);
                    this.$fetch();
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
  </script>