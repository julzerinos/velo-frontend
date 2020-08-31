<template>
  <div :class="{ loader: true, fadeout: !isLoading }">
    Loading ...
  </div>
</template>

<script>
export default {
  name: "Splash",
  props: ["isLoading"]
};
</script>

<style>
.loader {
  background-color: #63ab97;
  bottom: 0;
  color: white;
  display: block;
  font-size: 32px;
  left: 0;
  overflow: hidden;
  padding-top: 10vh;
  position: fixed;
  right: 0;
  text-align: center;
  top: 0;
}

.fadeout {
  animation: fadeout 2s forwards;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>