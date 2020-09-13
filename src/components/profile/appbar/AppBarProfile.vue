<template>
  <v-menu
          :close-on-content-click="false"
          offset-x
          v-model="open"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
              text
              v-bind="attrs"
              v-on="on"
      >
        Profile
        <v-icon right>directions_bike</v-icon>
      </v-btn>
    </template>

    <profile-logged-in v-if="loggedIn" v-model="open"/>
    <profile-logged-out v-else v-model="open"/>

  </v-menu>
</template>

<script>
    /* eslint-disable vue/no-unused-components */

    import ProfileLoggedIn from "./ProfileLoggedIn";
    import ProfileLoggedOut from "./ProfileLoggedOut";

    export default {
        name: "AppBarProfile",
        components: {
            ProfileLoggedIn,
            ProfileLoggedOut
        },
        data: () => ({
            open: false
        }),
        computed: {
            loggedIn() {
                return this.$store.state.loggedIn;
            }
        }
    }
</script>

<style scoped>

</style>