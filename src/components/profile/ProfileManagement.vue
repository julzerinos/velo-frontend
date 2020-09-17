<template>
  <v-card
          class="fill-height"
          outlined
  >
    <v-img
            SameSite=Lax height="300" max-height="300"
            src="https://source.unsplash.com/1600x900/?bike,cycling"
    >

    </v-img>
    <v-row
            align="end"
            class="fill-height"
    >
      <v-col>


        <v-list-item>
          <v-list-item-content>
            <v-list-item-avatar
                    class="profile"
                    max-width="164"
                    size="164">
              <v-img :src="profile.profileImagePath"></v-img>

            </v-list-item-avatar>
            <v-list-item-title>{{profile.name.firstName}} {{profile.name.lastName}}</v-list-item-title>
            <v-list-item-subtitle>Coach of {{profile.athletes.length}} athlete(s)</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
    export default {
        name: "ProfileManagement",
        computed: {
            profile() {
                return this.$store.state.profile;
            },

        },


    }
</script>

<style scoped>

</style>