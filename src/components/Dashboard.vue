https://vuetifyjs.com/en/components/lists/

<template>
  <v-navigation-drawer v-bind:value="value" v-on:input="$emit('input', $event)" app>
    <v-list dense>
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-email</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-subheader>Appeareance</v-subheader>

      <v-list-item>
        <template>
          <v-list-item-content>
            <v-list-item-title>Dark Mode</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch v-model="$vuetify.theme.dark" />
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Dashboard",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/dashboard.css";
</style>