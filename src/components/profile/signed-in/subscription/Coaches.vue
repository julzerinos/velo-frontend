<template>
  <v-card>
    <v-toolbar
            color="orange accent-5"
            dark
            flat
    >
      <v-spacer/>
      <v-toolbar-title>Connected Coaches</v-toolbar-title>
      <v-spacer/>
    </v-toolbar>

    <v-virtual-scroll
            :height="height"
            :items="coaches"
            bench="5"
            item-height="100"
    >

      <template v-slot:default="{ index, item }">
        <v-list-item v-if="'placeholder' in item">
          <v-list-item-avatar>
            <v-icon>person_add</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Add a new coach</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <!--            <v-btn @click="() => {}"-->
            <!--                   text>-->
            <!--              Add by email-->
            <!--            </v-btn>-->
            <coach-by-email/>
            <v-btn @click="() => {}" disabled
                   text>
              Add by link
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <v-list-item :key="item.name" v-else>
          <v-list-item-avatar>
            <!--            <v-img alt="" v-if="!!profile.profileImagePath"/>-->
            <v-icon>person</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
            <v-list-item-subtitle>Connected since: {{item.since.toDateString()}}</v-list-item-subtitle>
            <v-list-item-subtitle>
              Connection status:
              <span :style="`color: ${item.status === 'connected' ? 'green' : 'orange'}`">{{item.status}}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="() => {}" disabled
                   text>
              Edit subscription
            </v-btn>
            <v-btn @click="removeCoach(index)"
                   text>
              Remove Subscriber
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>
<script>

    import CoachByEmail from "./CoachByEmail";

    export default {
        name: 'Coaches',
        components: {CoachByEmail},
        data() {
            return {
                height: 500,
                currentItem: '',

                coaches: [
                    {
                        placeholder: ''
                    }
                ]
            }
        },
        methods: {
            removeCoach(index) {
                this.coaches.splice(index, 1)
            },
        }
    }
</script>