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
    import axios from "axios";

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
            // Todo: move to global config / method (mixin)
            axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
                const config = err.config;
                // If config does not exist or the retry option is not set, reject
                if (!config || !config.retry) return Promise.reject(err);

                // Set the variable for keeping track of the retry count
                config.__retryCount = config.__retryCount || 0;

                // Check if we've maxed out the total number of retries
                if (config.__retryCount >= config.retry) {
                    // Reject with the error
                    return Promise.reject(err);
                }

                // Increase the retry count
                config.__retryCount += 1;

                // Create new promise to handle exponential backoff
                const backoff = new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve();
                    }, config.retryDelay || 1);
                });

                // Return the promise in which recalls axios to retry the request
                return backoff.then(function () {
                    return axios(config);
                });
            });

            this.retrieveData();
        },
        methods: {
            retrieveData: function () {
                this.loadingOverlay = true;
                axios
                    .get("http://localhost:8081/mock-workout", {retry: 1, retryDelay: 1000})
                    .then((response) => {
                        console.log("success")
                        this.loadingOverlay = false;
                        this.storeData(response);
                    }, () => {
                        console.log("fail")
                        this.loadingOverlay = false;
                        this.failedOverlay = true;
                    });
            },

            storeData(serverData) {
                let tmp = [];
                for (let i = 0; i < serverData.data.workoutRecords.length; i++) {
                    tmp.push(serverData.data.workoutRecords[i].power);
                }

                this.chartData = {
                    labels: ["Data"],
                    datasets: [
                        {
                            label: "Power",
                            data: tmp,
                        },
                    ],
                };
            },

        },
    };
</script>

<style scoped>
  @import "../assets/styles/charts.css";
</style>
