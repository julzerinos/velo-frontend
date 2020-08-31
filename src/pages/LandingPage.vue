<template>
  <div class="landing">
    <nav-menu />
    <h1>Landing Page</h1>
    <line-chart v-if="false" :chart-data="chartData" />
    <button @click="fillData">Generate LineChart</button>
  </div>
</template>

<script>
import LineChart from "../components/charts/LineChart.js";
import NavMenu from "../components/NavMenu";

export default {
  name: "LandingPage",
  components: { LineChart, NavMenu },
  data() {
    return {
      chartData: {},
    };
  },
  methods: {
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
</style>
