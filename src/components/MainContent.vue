<template>
  <v-container class="grid" fill-height fluid>
    <v-row>
      <v-col id="athlete">
        <v-card class="pa-2" outlined tile>test</v-card>
      </v-col>
      <v-col id="charts">
        <v-card outlined tile>
          <charts/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    /* eslint-disable vue/no-unused-components */
    import Charts from "../components/Charts";

    export default {
        name: "MainContent",
        components: {Charts},
        data() {
            return {};
        },
        methods: {},
    };
</script>

<style scoped>
  .grid * {
    min-height: 100%;
  }
</style>
