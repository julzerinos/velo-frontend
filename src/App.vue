<template>
  <div id="app">
    <splash :isLoading="isLoading" :loadPercent="loadPercent" />
    <landing-page v-if="!isLoading" />
  </div>
</template>

<script>
import LandingPage from "./pages/LandingPage";
import Splash from "./pages/Splash";

export default {
  name: "App",
  components: {
    LandingPage,
    Splash,
  },
  data() {
    return {
      isLoading: true,
      loadPercent: 0,
    };
  },
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async load() {
      for (let i = 0; i <= 10; i++) {
        this.loadPercent = (i*10).toString() + "%";
        await this.sleep(500);
      }
      this.isLoading = false;
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<style>
@font-face {
  font-family: Gloria-Hallelujah;
  src: url('./assets/fonts/gloria.ttf');
}
</style>
