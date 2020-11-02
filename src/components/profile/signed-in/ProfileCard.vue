<template>
  <v-card
          class="fill-height"
          outlined
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-avatar
                class="profile"
                max-width="164"
                size="164">
          <v-img :src="profile.profileImagePath" v-if="!!profile.profileImagePath"></v-img>
          <v-icon size="120" v-else>person</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{profile.name.firstName}} {{profile.name.lastName}}</v-list-item-title>
        <v-list-item-subtitle>Coach of {{profile.athletes.length}} athlete(s)</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
    export default {
        name: 'ProfileCard'
    }

    // TODO: password reset with modal popup https://vuejs.org/v2/examples/modal.html
</script>
