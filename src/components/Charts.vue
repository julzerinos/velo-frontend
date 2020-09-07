<template>
  <v-container>
    <v-overlay :absolute="true" :value="loadingOverlay">
      <v-progress-circular color="amber" indeterminate width="10" size="64"></v-progress-circular>
    </v-overlay>
    <v-overlay :absolute="true" :value="failedOverlay" opacity="1.0">
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

    import LineChart from "../components/charts/LineChart.js";
    import Requests from '../mixins/Requests'

    export default {
        name: "Charts",
        components: {LineChart},
        mixins: [Requests],
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
                Requests.methods.get(
                    'http://localhost:8081/mock-workout',
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
  @import "../assets/styles/charts.css";
</style>
