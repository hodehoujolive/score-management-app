<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="1200px"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Create Team
          </v-btn>
        </template>
        <v-card>
            <v-form @submit.prevent="save">
                <v-card-title>
                    <span class="text-h5">Create Team</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                    <v-row>
                        <v-col
                        cols="12"
                        >
                        <v-text-field
                            v-model="form.name"
                            label="Name*"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        >
                        <h4>Players</h4>
                        </v-col>
                        <v-col v-for="i of [0, 1, 2]" :key="i">
                            <v-card
                                elevation="2"
                            >
                                <v-col
                                cols="12"
                                >
                                <v-text-field
                                    v-model="form.players[i].firstname"
                                    label="Firstname*"
                                    required
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                >
                                <v-text-field
                                    v-model="form.players[i].lastname"
                                    label="Lastname*"
                                    required
                                ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                <v-text-field
                                    v-model="form.players[i].email"
                                    label="Email*"
                                    required
                                ></v-text-field>
                                </v-col>
                            </v-card>
                        </v-col>
                    </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                    >
                    Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                        type="submit"
                    >
                    Save
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
      </v-dialog>
  </template>
  <script>
    export default {
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
                this.$nuxt.refresh()
            } catch (error) {
                console.log(error)
            }
        }
      }
    }
  </script>