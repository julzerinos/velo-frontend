<template>
  <v-container class="grid" fill-height fluid>
    <v-row>
      <v-col cols="4" id="athlete">
        <v-card class="pa-2" outlined tile>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-card-subtitle>Currently viewing data for:</v-card-subtitle>
                <v-card-title>Kornel Skórka</v-card-title>
                <v-list-item-avatar
                        class="profile"
                        max-width="164"
                        size="164">
                  <v-img src="https://cdn.cnn.com/cnnnext/dam/assets/121012051552-armstrong-usps-horizontal-large-gallery.jpg"></v-img>
                </v-list-item-avatar>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="8" id="charts">
        <v-card outlined tile>
          <charts/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    /* eslint-disable vue/no-unused-components */
    import Charts from "../components/charts/Charts";
    import LineChart from "../components/charts/LineChart";

    export default {
        name: "MainContent",
        title: "Charts",
        components: {Charts, LineChart},
    };
</script>

<style scoped>

</style>
