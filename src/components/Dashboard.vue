<template>
  <v-navigation-drawer v-bind:value="value" v-on:input="$emit('input', $event)" app>
    <v-list dense>
      <v-subheader>Pages</v-subheader>

      <v-list-item @click="$router.push({ path: '/' })" link>
        <v-list-item-action>
          <v-icon>show_chart</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Charts</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link disabled>
        <v-list-item-action>
          <v-icon>directions_bike</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Account</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="$router.push({ path: '/settings' })" link>
        <v-list-item-action>
          <v-icon>settings</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-subheader>Settings</v-subheader>

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
    export default {
        name: "Dashboard",
        props: {
            value: {
                // `value` is a keyword used to bind with v-model in parent component
                type: Boolean,
                default: false,
            },
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