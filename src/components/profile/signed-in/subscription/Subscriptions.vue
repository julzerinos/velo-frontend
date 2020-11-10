<template>
  <div>
    <v-tabs
            fixed-tabs
            slider-color="white"
            v-model="currentTab"
    >
      <v-tab href="#tab-athletes">
        Athletes
      </v-tab>
      <v-tab-item value="tab-athletes">
        <athletes/>
      </v-tab-item>

      <v-tab href="#tab-coaches">
        Coaches
      </v-tab>
      <v-tab-item value="tab-coaches">
        <coaches/>
      </v-tab-item>

    </v-tabs>

    <!--    <athletes v-show="currentTab === 'tab-athletes'"/>-->
  </div>
</template>

<script>
    import Athletes from "./Athletes";
    import Coaches from "./Coaches";

    export default {
        name: "Subscriptions",
        components: {
            Coaches,
            Athletes
        },
        data() {
            return {
                currentTab: ''
            }
        }
    }
</script>

<style scoped>

</style>