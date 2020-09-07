<template>
  <div class="loader">
    <p>Velo</p>
    <iframe style="position: absolute; bottom:5%; right:5%" width="100" height="100" scrolling="yes" frameborder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/261060033&color=%2367299c&auto_play=true&hide_related=false&show_comments=true&show_user=false&show_reposts=false&show_teaser=true&visual=false"></iframe>
    <img class="bike" src="../assets/images/bike.gif"/>
  </div>
</template>

<script>
    export default {
        name: "Splash",
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

    animation: scroll 20s ease-in-out infinite alternate;
  }

  @keyframes scroll {
    to {
      background-position: -3840px;
    }
  }

  .bike {
    height: 10%;
    position: absolute;
    left: 20%;
    bottom: 20%;

    animation: bike-scroll 5s ease-in-out infinite alternate;
  }

  @keyframes bike-scroll {
    to {
      left: 80%;
    }
  }
</style>