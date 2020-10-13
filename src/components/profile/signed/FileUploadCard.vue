<template>
  <v-card
          class="fill-height"
          outlined
  >

    <v-card-title>Data source</v-card-title>

    <a @click="openPopup()"
       v-if="!profile.isStravaConnected">
      <v-img
              :src="stravaConnectButton"
              max-width="300"
      ></v-img>
    </a>
    <v-img :src="stravaPoweredButton" max-width="300" v-else></v-img>

  </v-card>
</template>
<script>
    import {mapActions} from "vuex";

    export default {
        name: 'FileUploadCard',
        data() {
            return {
                stravaConnectButton: require('@/assets/brand-specific/strava/connect_orange.svg'),
                stravaPoweredButton: require('@/assets/brand-specific/strava/powered_colors.svg'),

                redirectURI: "http://localhost:8081/strava/auth"
            }
        },
        computed: {
            stravaURL() {
                return `
https://www.strava.com/oauth/authorize
?client_id=***REMOVED***
&redirect_uri=${this.redirectURI}
&response_type=code
&scope=profile:read_all,activity:read_all
&state=user_id:${this.profile.id}`
            }
        },
        methods: {
            ...mapActions({
                profileChangeProperty: 'profileChangePropertyAsync'
            }),
            openPopup() {
                const newWindow = window.open(
                    this.stravaURL,
                    '_blank',
                    'height=675,width=600,menubar=no,location=no,status=no,titlebar=no,')

                const check = function () {
                    if (newWindow.closed) {
                        clearInterval(timer);

                        // TODO: Change to backend get for updating on strava
                        // TODO: Create profile function for updating this value
                        this.profileChangeProperty({property: 'isStravaConnected', value: true})
                    }
                }

                const timer = setInterval(check.bind(this), 500)

                if (window.focus)
                    newWindow.focus()
            }
        }
    }
</script>