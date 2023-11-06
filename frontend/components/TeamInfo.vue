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
            View Team Members
          </v-btn>
        </template>
        <v-card class="px-5 py-5">

				<h1 class="display-1 font-weight-light">
					Members
				</h1>
			<v-simple-table>
                <template #default>
                <thead>
                    <tr>
                        <th class="text-left">
                            Firstname
                        </th>
                        <th class="text-left">
                            Lastname
                        </th>
                        <th class="text-left">
                            Email
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(item) in teamMembers"
                    :key="item.firstname"
                    >
                    <td>{{ item.firstname }}</td>
                    <td>{{ item.lastname }}</td>
                    <td>{{ item.email }}</td>
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
            teamMembers: {
                type: Array,
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
            ]
            }
        }),
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