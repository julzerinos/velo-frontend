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
    import DataBricksSetup from "../components/data-bricks/DataBricksSetup";
    import DataBricks from "../components/data-bricks/DataBricks";

    export default {
        name: "DataBricksLayout",
        components: {DataBricksSetup, DataBricks},
    };
</script>

<style scoped>

</style>
