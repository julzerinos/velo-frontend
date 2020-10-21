<template>
  <div id="landing">
    <snackbar-alert/>

    <dashboard v-model="drawer"/>

    <v-app-bar app>
      <v-btn @click.stop="drawer = !drawer" text>
        <v-icon left>dashboard</v-icon>
        Dashboard
      </v-btn>

      <v-spacer/>
      <v-toolbar-title class="app-name-title">
        <router-link style="text-decoration: none; color: inherit;" to="/maincontent">Velo</router-link>
      </v-toolbar-title>

      <v-spacer/>

      <app-bar-profile/>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <v-footer app>
      <span>App in development</span>
    </v-footer>
  </div>
</template>

<script>
    // TODO: Theme control (https://www.reddit.com/r/vuetifyjs/comments/cixlfr/vuetify_20_darklight_background_swap/)

    import Dashboard from "./Dashboard";

    import AppBarProfile from '../components/profile/appbar/AppBarProfile'
    import SnackbarAlert from "../components/alerts/SnackbarAlert";

    export default {
        name: "Layout",
        components: {
            SnackbarAlert,
            Dashboard,
            AppBarProfile
        },
        data() {
            return {
                drawer: false,
            };
        },
    };
</script>

<style scoped>
  @import "../assets/styles/landing.css";
</style>
