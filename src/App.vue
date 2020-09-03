<template>
  <div id="app">
    <layout />
  </div>
</template>

<script>
import Layout from "./pages/Layout";

export default {
  name: "App",
  components: {
    Layout,
  },
  data() {
    return {
    };
  },
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async load() {
      for (let i = 0; i <= 10; i++) {
        this.loadPercent = (i * 10).toString() + "%";
        await this.sleep(500);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style>
@font-face {
  font-family: Gloria-Hallelujah;
  src: url("./assets/fonts/gloria.ttf");
}

:root {
  --cp1-primary: #206a5d;
  --cp1-secondary: #81b214;
  --cp1-accent: #bfdcae;
  --cp1-contrast: #f1f1e8;

  --cp2-primary: #00ad7c;
  --cp2-secondary: #52d681;
  --cp2-accent: #b5ff7d;
  --cp2-contrast: #fff8b5;

  --primary: var(--cp1-primary);
  --secondary: var(--cp1-secondary);
  --accent: var(--cp1-accent);
  --contrast: var(--cp1-contrast);
}
</style>
