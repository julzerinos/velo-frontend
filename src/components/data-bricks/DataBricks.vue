<template>
  <v-card>
    <v-container class="grid" fill-height fluid v-if="dataBricks.length">
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
                  style="overflow: hidden"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-card-title v-else>No data bricks created! Use the above configuration menu to add new bricks.</v-card-title>
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
                ]
            }
        },
        mounted() {
            this.refreshWorkouts()
        },
        watch: {
            dataBricks: function () {
                this.refreshWorkouts()
            }
        }
    }
</script>

<style scoped>

</style>