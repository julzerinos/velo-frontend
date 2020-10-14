<template>
  <v-container>
    <v-overlay :absolute="true" :value="loadingOverlay && false" z-index="1">
      <v-progress-circular color="amber" indeterminate width="10" size="64"></v-progress-circular>
    </v-overlay>
    <v-overlay :absolute="true" :value="failedOverlay && false" opacity="1.0" z-index="1">
      Fetch failure
    </v-overlay>
    <v-card class="pa-2" outlined tile>
      <v-select
              :items="Object.keys(training.dataSeries)"
              label="Raw training attribute"
              outlined
              v-model="select"
      />
      <multi-line-chart :training="training"/>
    </v-card>
    <v-card class="pa-2" outlined tile>
      <BarChart
              :bar-padding="0.5"
              :data-set="barChartData"
              :margin-left="40"
              :margin-top="40"
              :tick-count="5"
              class="chart"
      />
    </v-card>
  </v-container>
</template>

<script>
    import MultiLineChart from "./line-charts/MultiLineChart";
    import BarChart from "./bar-charts/BarChart";

    export default {
        name: "Charts",
        components: {MultiLineChart, BarChart},
        props: ['charts'],
        data() {
            return {
                select: "power",
                training: this.$mockTraining().training,
                loadingOverlay: false,
                failedOverlay: false,
            };
        },
        computed: {

            barChartData: function () {
                if (!this.training)
                    return undefined

                return [
                    [
                        "Zone 1",
                        this.training.dataSeries.power.reduce((n, x) => n + (x < 250), 0)
                    ],
                    [
                        "Zone 2",
                        this.training.dataSeries.power.reduce((n, x) => n + (x < 270 && x >= 250), 0)
                    ],
                    [
                        "Zone 3",
                        this.training.dataSeries.power.reduce((n, x) => n + (x < 290 && x >= 270), 0)
                    ],
                    [
                        "Zone 4",
                        this.training.dataSeries.power.reduce((n, x) => n + (x < 310 && x >= 290), 0)
                    ],
                    [
                        "Zone 5",
                        this.training.dataSeries.power.reduce((n, x) => n + (x < 330 && x >= 310), 0)
                    ],
                    [
                        "Zone 6",
                        this.training.dataSeries.power.reduce((n, x) => n + (x < 350 && x >= 330), 0)
                    ],
                    [
                        "Zone 7",
                        this.training.dataSeries.power.reduce((n, x) => n + (x >= 350), 0)
                    ],
                ]
            }
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
