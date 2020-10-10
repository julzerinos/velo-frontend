<template>
  <v-container class="grid" fill-height fluid>
    <v-row>
      <v-col cols="12">
        <data-bricks-setup/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <data-bricks/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import DataBricksSetup from "../components/main-content/DataBricksSetup";
    import DataBricks from "../components/main-content/DataBricks";

    export default {
        name: "MainContent",
        title: "Charts",
        components: {DataBricksSetup, DataBricks},
    };
</script>

<style scoped>

</style>
