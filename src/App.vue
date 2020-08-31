<template>
  <div id="app">
    <splash :isLoading="isLoading"/>
    <landing-page v-if="!isLoading" />
  </div>
</template>

<script>
import LandingPage from './pages/LandingPage'
import Splash from './pages/Splash'

export default {
  name: 'App',
  components: {
    LandingPage,
    Splash
  },
  data() {
    return {
      isLoading: true
    }
  },
  methods: {
    load() {
      setTimeout(() => { this.isLoading = false; }, 1000);
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scope>

</style>
