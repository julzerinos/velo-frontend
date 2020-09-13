<template>
  <div>
    <profile-management v-if="loggedIn"/>
    <v-container class="grid" fill-height fluid v-else>
      <v-row>
        <v-col>
          <v-img
                  class=""
                  max-height="250"
                  src="https://skoda-welovecycling.s3.amazonaws.com/2/2020/04/Solo-Cycling-CVR-profimedia-0513759448.jpg"
          >
          </v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col id="sign-in">
          <sign-in :redirected="redirectTypeCheck === '1'"/>
        </v-col>
        <v-col id="sign-up">
          <sign-up :redirected="redirectTypeCheck === '2'"/>
        </v-col>
      </v-row>
    </v-container>
  </div>

</template>

<script>
    import SignIn from '../components/profile/SignIn'
    import SignUp from '../components/profile/SignUp'
    import ProfileManagement from '../components/profile/ProfileManagement'


    export default {
        name: 'Profile',
        components: {
            SignIn,
            SignUp,
            ProfileManagement
        },
        props: {
            redirectType: {
                type: Number,
                default: 0
            }
        },
        computed: {
            loggedIn() {
                return this.$store.state.loggedIn;
            },
            redirectTypeCheck() {
                if ('redirectType' in this.$route.query)
                    return this.$route.query.redirectType;
                else
                    return String(this.redirectType);
            }
        },


    }
</script>