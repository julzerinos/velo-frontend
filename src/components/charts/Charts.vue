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
        <v-select
                :items="Object.keys(training.dataSeries)"
                label="Raw training attribute"
                outlined
                v-model="select"
        />
        <v-card class="pa-2" outlined tile>
          <multi-line-chart :chartData="multiLineChartData"/>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import MultiLineChart from "./MultiLineChart";

    export default {
        name: "Charts",
        components: {MultiLineChart},
        data() {
            return {
                select: "power",
                training: this.$mockTraining().training,
                loadingOverlay: false,
                failedOverlay: false,
            };
        },
        computed: {
            // TODO: extract to mixin with error throwing
            multiLineChartData: function () {
                if (!this.training)
                    return undefined
                return {
                    y: this.select,
                    dates: this.training.dataSeries.time,
                    series: [{
                        name: "mockAthlete1",
                        values: this.training.dataSeries[this.select]
                    }]
                }
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
