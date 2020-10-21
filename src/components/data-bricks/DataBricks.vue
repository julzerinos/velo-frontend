<template>
  <v-card>
    <v-container class="grid" fill-height fluid v-if="dataBrickConfigs.length > 0">
      <v-row :key="i" v-for="(db, i) in dataBrickConfigs">
        <v-col :cols="db.brickConfig.cols">
          <data-brick style="overflow: hidden" v-bind:config="db.dataConfig"/>
        </v-col>
      </v-row>
    </v-container>
    <v-card-title v-else>No data bricks created! Use the above configuration menu to add new bricks.</v-card-title>
  </v-card>
</template>

<script>
    import DataBrick from "./DataBrick";
    import {mapGetters} from "vuex";

    export default {
        name: "DataBricks",
        components: {DataBrick},
        computed: {
            ...mapGetters({
                dataBrickConfigs: 'dataBricks'
            })
        },
    }
</script>

<style scoped>

</style>