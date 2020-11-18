<template>
  <v-navigation-drawer app v-bind:value="open" v-on:input="$emit('input', $event)">
    <v-list dense>
      <v-subheader>Pages</v-subheader>

      <v-list-item :key="route.name" :to="{ name: route.name }" link v-for="route in mainAppRoutes">
        <v-list-item-action>
          <v-icon>{{route.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{route.name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider/>

      <v-subheader>Appearance</v-subheader>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Dark Mode</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch v-model="$vuetify.theme.dark"/>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
    import {mainAppRoutes} from "../plugins/router/routes";

    export default {
        name: "Dashboard",
        model: {
            prop: 'open'
        },
        props: {
            open: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            mainAppRoutes: () => mainAppRoutes
        },
        data() {
            return {
                languages: ["English", "Polski"]
            }
        }
    };
</script>

<style scoped>
  @import "../assets/styles/dashboard.css";
</style>