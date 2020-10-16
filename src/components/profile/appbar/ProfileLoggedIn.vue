<template>
  <v-card>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="profile.profileImagePath" alt="" v-if="!!profile.profileImagePath"/>
          <v-icon v-else>person</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{profile.name.firstName}} {{profile.name.lastName}}</v-list-item-title>
          <v-list-item-subtitle>Coach of {{profile.athletes.length}} athlete(s)</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn :to="{ name: 'profile' }" :value="value" @click="$emit('input', $event.target.value)"
                 text>View profile
          </v-btn>
          <v-btn :value="value" @click="emitInputWrapper($event)"
                 text>Log out
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
    export default {
        name: "ProfileLoggedInVCard",
        data: () => ({
            fav: false,
        }),
        props: {
            value: {
                // `value` is a keyword used to bind with v-model in parent component
                type: Boolean,
                required: true,
                default: false,
            }
        },
        methods: {
            emitInputWrapper(event) {
                this.$emit('input', event.target.value)
                this.logout();
            }
        },
    }
</script>

<style scoped>

</style>