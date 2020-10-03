<template>
  <v-container>
    <v-overlay :absolute="true" :value="loadingOverlay && false" z-index="1">
      <v-progress-circular color="amber" indeterminate width="10" size="64"></v-progress-circular>
    </v-overlay>
    <v-overlay :absolute="true" :value="failedOverlay && false" opacity="1.0" z-index="1">
      Fetch failure
    </v-overlay>
    <v-row>
      <v-col>
        <v-card class="pa-2" outlined tile>
          <line-chart :data="chartData"/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    /* eslint-disable vue/no-unused-components */

    import LineChart from "./LineChart";

    export default {
        name: "Charts",
        components: {LineChart},
        data() {
            return {
                chartData: {
                    x: this.$mockTraining().training.dataSeries.time,
                    y: this.$mockTraining().training.dataSeries.power
                },
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
                // TODO: change to sexy map
                // console.log(serverData);
                // this.chartData = Object.values(Object.values(serverData.data.workoutRecords).map(x => x['power'])); //.map(x => x.power);
                // console.log(this.chartData);
                // console.log(typeof this.chartData);

                let a = []
                Object.values(serverData.data['workoutRecords']).forEach(x => a.push(x['power']))
                this.chartData = a
            },
        },
    };
</script>

<style scoped>
  @import "../../assets/styles/charts.css";
</style>
