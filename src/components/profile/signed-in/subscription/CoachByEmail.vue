<template>
  <v-dialog
          v-model="dialog"
          width="500"
  >
    <template v-slot:activator="{ on }">
      <v-btn
              text
              v-on="on"
      >
        Add by email
      </v-btn>
    </template>

    <v-card>
      <v-card-title
              class="headline justify-center"
              primary-title
      >
        Add coach by email
      </v-card-title>
      <v-card-text>
        Search coaches by email or id below.
        <v-combobox
                :items="coaches"
                hide-no-data
                item-text="email"
                item-value="name"
                label="Coaches"
                placeholder="Start typing to Search"
                prepend-icon="person_add"
                v-model="coach"
        >
        </v-combobox>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
                @click="dialog = false"
                color="pink"
                dark
        >
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
                :disabled="!coach"
                :loading="false"
                @click="submit"
                color="primary"
        >
          Submit
        </v-btn>
        <v-spacer></v-spacer>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

    import {mapActions} from "vuex";

    export default {
        name: "CoachByEmail",
        data() {
            return {
                dialog: false,
                coach: '',
                coaches: [
                    {
                        name: "Coach Coachiński",
                        email: 'coach@inski.pl',
                        since: new Date(),
                        status: "connected"
                    },
                    {
                        name: "Coacharita",
                        email: 'coach@arita.brazila',
                        since: new Date(),
                        status: "pending"
                    },
                ]
            }
        },
        methods: {
            ...mapActions({
                addCoach: 'addCoachAsync'
            }),

            submit() {
                this.addCoach({coachEmail: this.coach})
            }
        }
    }
</script>

<style scoped>

</style>