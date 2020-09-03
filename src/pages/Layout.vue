For theme color control
https://www.reddit.com/r/vuetifyjs/comments/cixlfr/vuetify_20_darklight_background_swap/ 

<template>
  <v-app id="landing">
    <dashboard v-model="drawer" />

    <v-app-bar app>
      <v-btn text @click.stop="drawer = !drawer">Dashboard</v-btn>

      <v-spacer />
      <v-toolbar-title class="app-name-title">Velo</v-toolbar-title>
    </v-app-bar>

    <main-content />

    <v-footer app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import MainContent from "../components/MainContent";
import Dashboard from "../components/Dashboard";

export default {
  name: "LandingPage",
  components: { MainContent, Dashboard },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
@import "../assets/styles/landing.css";
</style>
