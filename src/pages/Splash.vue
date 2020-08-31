<template>
  <div :class="{ loader: true, scroll:isLoading, fadeout: !isLoading }">
    Velo
    <img class="bike" v-bind:style="{ left: computedLeft }" src="../assets/images/bike.gif" />
  </div>
</template>

<script>
export default {
  name: "Splash",
  props: ["isLoading", "loadPercent"],
  computed: {
    computedLeft: function () {
      return this.loadPercent;
    },
  },
};
</script>

<style scoped>
.loader {
  background-image: url("../assets/images/splash_bg.jpg");
  background-color: #63ab97;
  background-repeat: repeat-x;
  background-position: left;
  background-attachment: fixed;
  background-size: auto 100%;

  bottom: 0;
  display: block;
  left: 0;
  overflow: hidden;
  padding-top: 17vh;
  position: fixed;
  right: 0;
  top: 0;

  font-family: Gloria-Hallelujah;
  text-align: center;
  font-size: 64px;
  color: white;
}

@keyframes scroll {
  to {
    background-position: -3840px;
  }
}

.scroll {
  animation: scroll 20s ease-in-out infinite alternate;
}

.fadeout {
  animation: scroll 20s ease-in-out infinite alternate, fadeout 2s forwards;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}

.bike {
  height: 10%;
  position: absolute;
  left: 0%;
  bottom: 20%;
}
</style>