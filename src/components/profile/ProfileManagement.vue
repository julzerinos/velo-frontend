<template>
  <v-container>
    <v-img
            SameSite=Lax height="300" max-height="300"
            src="https://source.unsplash.com/1600x900/?bike,cycling"
    >

    </v-img>
    <v-row
            align="end"
            class="fill-height"
    >
      <v-col cols="8">
        <v-card
                class="fill-height"
                outlined
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-avatar
                      class="profile"
                      max-width="164"
                      size="164">
                <v-img :src="profile.profileImagePath" v-if="!!profile.profileImagePath"></v-img>
                <v-icon size="120" v-else>person</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>{{profile.name.firstName}} {{profile.name.lastName}}</v-list-item-title>
              <v-list-item-subtitle>Coach of {{profile.athletes.length}} athlete(s)</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
                class="fill-height"
                outlined
        >

          <v-card-title>Data source</v-card-title>

          <v-img :src="stravaConnectButton" v-if="isStravaConnected"></v-img>
          <v-img :src="stravaPoweredButton" v-else></v-img>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: "ProfileManagement",
        data() {
            return {
                stravaConnectButton: require('@/assets/brand-specific/strava/connect_orange.svg'),
                stravaPoweredButton: require('@/assets/brand-specific/strava/powered_colors.svg'),
                isStravaConnected: true
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>