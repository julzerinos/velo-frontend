<template>
  <v-card>
    <v-container class="grid" fill-height fluid v-if="loggedIn && dataBricks">
      <v-row :key="i" v-for="(db, i) in dataBricks">
        <v-col :cols="db.brick.cols">
          <data-brick :config="config" style="overflow: hidden"/>
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
        computed: {},
        data() {
            return {
                config: this.defaultConfigs()[0]
            }
        }
    }
</script>

<style scoped>

</style>