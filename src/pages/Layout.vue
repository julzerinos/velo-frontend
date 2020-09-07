For theme color control
https://www.reddit.com/r/vuetifyjs/comments/cixlfr/vuetify_20_darklight_background_swap/

<template>
  <div id="landing">
    <dashboard v-model="drawer"/>

    <v-app-bar app>
      <v-btn text @click.stop="drawer = !drawer">Dashboard</v-btn>

      <v-spacer/>
      <v-toolbar-title class="app-name-title">Velo</v-toolbar-title>

      <v-spacer/>
      <v-icon>directions_bike</v-icon>
    </v-app-bar>

    <v-main>
      <!-- Todo add transitions -->
      <router-view/>
    </v-main>

    <v-footer app>
      <span>App in development</span>
    </v-footer>
  </div>
</template>

<script>
    /* eslint-disable vue/no-unused-components */
    import MainContent from "../components/MainContent";
    import Dashboard from "../components/Dashboard";

    export default {
        name: "Layout",
        components: {MainContent, Dashboard},
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
