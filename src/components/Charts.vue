<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-2" outlined tile>
          <line-chart :chartData="chartData" />
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
  components: { LineChart },
  data() {
    return {
      chartData: {},
    };
  },
  mounted() {
    this.retrieveData();
  },
  methods: {
    retrieveData() {
      axios
        .get("http://localhost:8081/mock-workout")
        .then((response) => this.storeData(response));
    },

    storeData(serverData) {
      if (serverData == undefined) {
        this.fillData();
        return;
      }

      let tmp = [];
      for (let i = 0; i < serverData.data.workoutRecords.length; i++) {
        tmp.push(serverData.data.workoutRecords[i].power);
      }

      this.chartData = {
        labels: ["Data"],
        datasets: [
          {
            label: "Pawa",
            data: tmp,
          },
        ],
      };
    },

    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    getRandomAmount() {
      return this.getRandomInt(1, 25);
    },
    componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    },
    rgbToHex(r, g, b) {
      return (
        "#" +
        this.componentToHex(r) +
        this.componentToHex(g) +
        this.componentToHex(b)
      );
    },

    fillData() {
      let max = this.getRandomInt(0, this.chartData.datasets.length);
      let min = max - 10 || 0;
      this.chartData = {
        labels: [
          ...Array(Number(this.getRandomAmount().toFixed(0))).keys(),
        ].map((x) => x + 1),
        datasets: this.chartData.datasets.slice(min, max).concat(
          [...Array(Number(this.getRandomAmount().toFixed(0))).keys()].map(
            () => {
              const color = this.rgbToHex(
                this.getRandomInt(0, 255),
                this.getRandomInt(0, 255),
                this.getRandomInt(0, 255)
              );
              return {
                label: color,
                backgroundColor: color,
                data: [
                  ...Array(Number(this.getRandomAmount().toFixed(0))).keys(),
                ].map((x) => this.getRandomInt()),
              };
            }
          )
        ),
      };
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/charts.css";
</style>
