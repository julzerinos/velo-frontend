<template>
  <v-card>
    <v-card-title v-if="!loggedIn">You are not logged in!</v-card-title>
    <v-card-title v-else-if="dataBricks.length < 1">No data bricks defined. Use the above configuration menu to create a
      data brick.
    </v-card-title>
    <v-container class="grid" fill-height fluid v-else>
      <v-row :key="i" v-for="(db, i) in dataBricks">
        <v-col :cols="db.brick.cols">
          <v-app-bar
                  color="green lighten-3"
                  dense
                  flat
          >
            <v-toolbar-title>{{db.brick.name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu
                    bottom
                    left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                        :key="j"
                        v-for="(action, j) in dataBrickActions"
                >
                  <v-list-item-title @click="action.action({index: i})">{{ action.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-app-bar>
          <data-brick
                  :data="db.data"
                  :brick="db.brick"
                  :global-loading="dataBricksLoading"
                  style="overflow: hidden"
                  :ref="`db${i}`"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
    import DataBrick from "./DataBrick";

    export default {
        name: "DataBricks",
        components: {DataBrick},
        data() {
            return {
                dataBrickActions: [
                    {name: "Remove", action: this.removeDataBrick}
                ],
                dataBricksLoading: true,
                latestTimeRangeUnion: {}
            }
        },
        mounted() {
            this.loadWorkouts()
        },
        watch: {
            dataBricks: function () {
                this.loadWorkouts()
            }
        },
        methods: {
            loadWorkouts: function () {
                const newTimeRangeUnion = this.getTimeRangeUnion()
                // if (this.timeRangeUnionsEqual(this.latestTimeRangeUnion, newTimeRangeUnion))
                //     return
                // this.latestTimeRangeUnion = newTimeRangeUnion

                this.dataBricksLoading = true
                // this.refreshWorkouts(newTimeRangeUnion, this.onFinish)
                ////

                this.refreshWorkoutsInMemory(newTimeRangeUnion, this.onFinish).then(
                    r => {
                        for (const ref of Object.values(this.$refs))
                            ref[0].populate(r)
                    }
                )
            },
            onFinish: function () {
                this.dataBricksLoading = false
            }
        }
    }
</script>

<style scoped>

</style>