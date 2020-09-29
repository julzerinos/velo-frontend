<template>
  <v-container>
    <v-overlay :absolute="true" :value="loadingOverlay" z-index="1">
      <v-progress-circular color="amber" indeterminate width="10" size="64"></v-progress-circular>
    </v-overlay>
    <v-overlay :absolute="true" :value="failedOverlay" opacity="1.0" z-index="1">
      Fetch failure
    </v-overlay>
    <v-row>
      <v-col>
        <v-card class="pa-2" outlined tile>
          <line-chart :chartData="chartData"/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    /* eslint-disable vue/no-unused-components */

    import LineChart from "./LineChart.js";

    export default {
        name: "Charts",
        components: {LineChart},
        data() {
            return {
                chartData: {},
                loadingOverlay: false,
                failedOverlay: false,
            };
        },
        mounted() {
            this.retrieveData();
        },
        methods: {
            retrieveData() {
                this.loadingOverlay = true;
                this.$get(
                    'http://localhost:8081/mock-workout',
                    {},
                    (response) => {
                        this.loadingOverlay = false;
                        this.storeData(response);
                    },
                    () => {
                        this.loadingOverlay = false;
                        this.failedOverlay = true;
                    })
            },

            storeData(serverData) {
            },
        },
    };
</script>

<style scoped>
  @import "../../assets/styles/charts.css";
</style>
