<template>
  <v-card>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>You are not logged in.</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-actions>

      <v-btn :to="{ name: 'Profile', params: {redirectType: 1} }"
             :value="open"
             @click="$emit('input', $event.target.value)" text>Sign in
      </v-btn>
      <v-btn :to="{ name: 'Profile', params: {redirectType: 2} }"
             :value="open"
             @click="$emit('input', $event.target.value)" text>Sign up
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
    export default {
        name: "ProfileLoggedOutVCard",
        model: {
            prop: 'open'
        },
        props: {
            open: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
    }
</script>

<style scoped>
  /* Todo: remove active styling from vue router buttons
       https://stackoverflow.com/questions/46083220/how-to-vuejs-router-link-active-style
       */
</style>